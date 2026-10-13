import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_CACHED_DECODED_FRAMES,
  MAX_CONCURRENT_FRAME_LOADS,
  MediaFrameRuntime,
} from "./mediaFrameRuntime.ts";

const createHarness = (options = {}) => {
  const images = new Map();
  const imageFactory = () => {
    let source = "";
    const image = {
      decoding: "",
      naturalWidth: 0,
      naturalHeight: 0,
      onload: null,
      onerror: null,
      get src() {
        return source;
      },
      set src(value) {
        source = value;
        if (value) images.set(value, image);
      },
    };
    return image;
  };
  const runtime = new MediaFrameRuntime({ imageFactory, ...options });
  const finish = (key, outcome = "load") => {
    const image = images.get(key);
    assert.ok(image, `expected an image request for ${key}`);
    if (outcome === "load") {
      image.naturalWidth = 100;
      image.naturalHeight = 100;
      image.onload?.();
    } else {
      image.onerror?.();
    }
  };
  return { runtime, images, finish };
};

test("runtime keeps the approved page-wide bounds", () => {
  assert.equal(MAX_CONCURRENT_FRAME_LOADS, 6);
  assert.equal(MAX_CACHED_DECODED_FRAMES, 48);
});

test("one page-wide pump starts queued work after another scene finishes", () => {
  const { runtime, finish } = createHarness({ maxConcurrent: 2 });
  const first = runtime.acquire("scene-a/f001.jpg", 0);
  const second = runtime.acquire("scene-b/f001.jpg", 1);
  const queued = runtime.acquire("scene-c/f001.jpg", 2);

  assert.equal(runtime.stats().activeRequests, 2);
  assert.equal(runtime.stats().queuedRequests, 1);
  finish(first.key);

  assert.equal(runtime.stats().activeRequests, 2);
  assert.equal(queued.getSnapshot()?.status, "loading");
  assert.equal(second.getSnapshot()?.status, "loading");
});

test("priority changes let a reverse scroll overtake stale prefetch work", () => {
  const { runtime, finish } = createHarness({ maxConcurrent: 1 });
  const current = runtime.acquire("scene/f010.jpg", 0);
  const staleForward = runtime.acquire("scene/f030.jpg", 20);
  const reverseTarget = runtime.acquire("scene/f009.jpg", -1);

  finish(current.key);

  assert.equal(reverseTarget.getSnapshot()?.status, "loading");
  assert.equal(staleForward.getSnapshot()?.status, "queued");
});

test("released loading leases cancel cleanly and free a slot", () => {
  const { runtime, images } = createHarness({ maxConcurrent: 1 });
  const first = runtime.acquire("scene-a/f001.jpg");
  const second = runtime.acquire("scene-b/f001.jpg");

  first.release();

  assert.equal(images.get("scene-a/f001.jpg").src, "");
  assert.equal(second.getSnapshot()?.status, "loading");
  assert.equal(runtime.stats().activeRequests, 1);
});

test("decoded frames use an LRU budget and leases lose evicted image references", () => {
  const { runtime, finish, images } = createHarness({ maxConcurrent: 3, maxCachedDecoded: 2 });
  const oldest = runtime.acquire("scene-a/f001.jpg");
  const recent = runtime.acquire("scene-b/f001.jpg");
  finish(oldest.key);
  finish(recent.key);

  recent.request(0);
  const newest = runtime.acquire("scene-c/f001.jpg");
  finish(newest.key);

  assert.equal(oldest.getSnapshot(), undefined);
  assert.equal(images.get(oldest.key).src, "");
  assert.equal(runtime.stats().cachedDecodedFrames, 2);
  assert.equal(recent.getSnapshot()?.status, "loaded");
  assert.equal(newest.getSnapshot()?.status, "loaded");
});

test("shared keys deduplicate requests and failures notify subscribers", () => {
  const { runtime, finish, images } = createHarness({ maxConcurrent: 2 });
  const first = runtime.acquire("shared/f001.jpg");
  const second = runtime.acquire("shared/f001.jpg");
  const statuses = [];
  second.subscribe((snapshot) => statuses.push(snapshot.status));

  assert.equal(images.size, 1);
  finish("shared/f001.jpg", "error");

  assert.deepEqual(statuses, ["loading", "error"]);
  assert.equal(first.getSnapshot()?.status, "error");
  assert.equal(second.getSnapshot()?.status, "error");
});
