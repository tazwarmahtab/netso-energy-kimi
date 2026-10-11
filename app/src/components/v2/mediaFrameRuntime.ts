import { GLOBAL_MAX_CACHED_FRAMES } from "../../film/runtimeConstants.ts";

export const MAX_CONCURRENT_FRAME_LOADS = 6;
export const MAX_CACHED_DECODED_FRAMES = GLOBAL_MAX_CACHED_FRAMES;

export type FrameRuntimeStatus = "queued" | "loading" | "loaded" | "error" | "evicted";

export type FrameRuntimeImage = Pick<
  HTMLImageElement,
  "decoding" | "naturalWidth" | "naturalHeight" | "src" | "onload" | "onerror"
>;

export type FrameRuntimeSnapshot = {
  key: string;
  status: FrameRuntimeStatus;
  image: FrameRuntimeImage | null;
};

export type FrameLease = {
  key: string;
  getSnapshot: () => FrameRuntimeSnapshot | undefined;
  subscribe: (listener: (snapshot: FrameRuntimeSnapshot) => void) => () => void;
  request: (priority?: number) => void;
  release: () => void;
};

type LeaseListener = (snapshot: FrameRuntimeSnapshot) => void;

type RuntimeRecord = {
  key: string;
  image: FrameRuntimeImage;
  status: Exclude<FrameRuntimeStatus, "evicted">;
  lastUsed: number;
  queueOrder: number;
  leases: Set<RuntimeLease>;
  loadToken: number;
  active: boolean;
};

type RuntimeLease = {
  key: string;
  record: RuntimeRecord | null;
  listeners: Set<LeaseListener>;
  priority: number;
  released: boolean;
};

export type FrameRuntimeOptions = {
  imageFactory?: () => FrameRuntimeImage;
  maxConcurrent?: number;
  maxCachedDecoded?: number;
};

export type FrameRuntimeStats = {
  activeRequests: number;
  cachedDecodedFrames: number;
  queuedRequests: number;
  keys: string[];
};

const snapshotFor = (record: RuntimeRecord, status: FrameRuntimeStatus = record.status): FrameRuntimeSnapshot => ({
  key: record.key,
  status,
  image: status === "loaded" ? record.image : null,
});

const defaultImageFactory = (): FrameRuntimeImage => new Image();

/**
 * A page-wide image request queue. Leases deliberately expose snapshots rather
 * than records so evicted images cannot stay alive through component state.
 */
export class MediaFrameRuntime {
  private readonly imageFactory: () => FrameRuntimeImage;
  private readonly maxConcurrent: number;
  private readonly maxCachedDecoded: number;
  private readonly records = new Map<string, RuntimeRecord>();
  private activeRequests = 0;
  private clock = 0;
  private queueOrder = 0;

  constructor(options: FrameRuntimeOptions = {}) {
    this.imageFactory = options.imageFactory ?? defaultImageFactory;
    this.maxConcurrent = Math.max(1, Math.round(options.maxConcurrent ?? MAX_CONCURRENT_FRAME_LOADS));
    this.maxCachedDecoded = Math.max(1, Math.round(options.maxCachedDecoded ?? MAX_CACHED_DECODED_FRAMES));
  }

  acquire(key: string, priority = 0): FrameLease {
    const lease: RuntimeLease = {
      key,
      record: null,
      listeners: new Set(),
      priority,
      released: false,
    };
    this.bindLease(lease);
    this.requestLease(lease, priority);

    return {
      key,
      getSnapshot: () => lease.record ? snapshotFor(lease.record) : undefined,
      subscribe: (listener) => {
        if (lease.released) return () => undefined;
        lease.listeners.add(listener);
        const snapshot = lease.record && snapshotFor(lease.record);
        if (snapshot) listener(snapshot);
        return () => lease.listeners.delete(listener);
      },
      request: (nextPriority = priority) => this.requestLease(lease, nextPriority),
      release: () => this.releaseLease(lease),
    };
  }

  stats(): FrameRuntimeStats {
    return {
      activeRequests: this.activeRequests,
      cachedDecodedFrames: [...this.records.values()].filter((record) => record.status === "loaded").length,
      queuedRequests: [...this.records.values()].filter((record) => record.status === "queued").length,
      keys: [...this.records.keys()],
    };
  }

  private bindLease(lease: RuntimeLease): RuntimeRecord {
    const existing = this.records.get(lease.key);
    if (existing) {
      lease.record = existing;
      existing.leases.add(lease);
      return existing;
    }

    const record: RuntimeRecord = {
      key: lease.key,
      image: this.imageFactory(),
      status: "queued",
      lastUsed: ++this.clock,
      queueOrder: ++this.queueOrder,
      leases: new Set([lease]),
      loadToken: 0,
      active: false,
    };
    record.image.decoding = "async";
    this.records.set(record.key, record);
    lease.record = record;
    return record;
  }

  private requestLease(lease: RuntimeLease, priority: number): void {
    if (lease.released) return;
    lease.priority = priority;
    const record = lease.record && this.records.get(lease.key) === lease.record
      ? lease.record
      : this.bindLease(lease);

    if (record.status === "loaded") record.lastUsed = ++this.clock;
    this.pump();
  }

  private releaseLease(lease: RuntimeLease): void {
    if (lease.released) return;
    lease.released = true;
    lease.listeners.clear();
    const record = lease.record;
    lease.record = null;
    if (!record) return;

    record.leases.delete(lease);
    if (record.leases.size > 0 || record.status === "loaded") return;

    if (record.active) this.cancelLoading(record);
    this.records.delete(record.key);
    this.pump();
  }

  private notify(record: RuntimeRecord, status: FrameRuntimeStatus = record.status): void {
    const snapshot = snapshotFor(record, status);
    [...record.leases].forEach((lease) => {
      lease.listeners.forEach((listener) => listener(snapshot));
    });
  }

  private startLoading(record: RuntimeRecord): void {
    if (record.status !== "queued" || record.leases.size === 0 || this.activeRequests >= this.maxConcurrent) return;

    record.status = "loading";
    record.active = true;
    record.loadToken += 1;
    const token = record.loadToken;
    this.activeRequests += 1;

    const finish = (status: "loaded" | "error") => {
      if (!record.active || record.loadToken !== token || this.records.get(record.key) !== record) return;
      record.active = false;
      this.activeRequests = Math.max(0, this.activeRequests - 1);
      record.status = status;
      if (status === "loaded") record.lastUsed = ++this.clock;
      this.notify(record);
      this.evictDecodedFrames();
      this.pump();
    };

    record.image.onload = () => finish("loaded");
    record.image.onerror = () => finish("error");
    record.image.src = record.key;
  }

  private cancelLoading(record: RuntimeRecord): void {
    if (!record.active) return;
    record.active = false;
    record.loadToken += 1;
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    record.image.onload = null;
    record.image.onerror = null;
    record.image.src = "";
  }

  private pump(): void {
    const queued = [...this.records.values()]
      .filter((record) => record.status === "queued" && record.leases.size > 0)
      .sort((left, right) => {
        const leftPriority = Math.min(...[...left.leases].map((lease) => lease.priority));
        const rightPriority = Math.min(...[...right.leases].map((lease) => lease.priority));
        return leftPriority - rightPriority || left.queueOrder - right.queueOrder;
      });

    while (this.activeRequests < this.maxConcurrent && queued.length > 0) {
      const record = queued.shift();
      if (record) this.startLoading(record);
    }
  }

  private evictDecodedFrames(): void {
    const loaded = () => [...this.records.values()]
      .filter((record) => record.status === "loaded")
      .sort((left, right) => left.lastUsed - right.lastUsed);

    while (loaded().length > this.maxCachedDecoded) {
      const candidate = loaded()[0];
      if (!candidate) return;
      this.evict(candidate);
    }
  }

  private evict(record: RuntimeRecord): void {
    if (record.active) this.cancelLoading(record);
    this.records.delete(record.key);
    [...record.leases].forEach((lease) => {
      lease.record = null;
      lease.listeners.forEach((listener) => listener(snapshotFor(record, "evicted")));
    });
    record.leases.clear();
    record.image.onload = null;
    record.image.onerror = null;
    record.image.src = "";
  }
}

export const mediaFrameRuntime = new MediaFrameRuntime();
