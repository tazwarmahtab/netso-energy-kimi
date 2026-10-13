import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getRuntimeFrameUrl } from "../../film/runtimeManifest";
import {
  clampMasterFrame,
  getMasterScrollMap,
  getMasterSliceAtFrame,
  getMasterMarkerTopVh,
  masterFrameForProgress,
  restoreMasterPlayhead,
  type MasterManifest,
} from "./masterStoryHelper";
import { getCanvasPixelSize, shouldRetryInitialFrame } from "./frameSequenceMath";
import {
  mediaFrameRuntime,
  type FrameLease,
  type FrameRuntimeImage,
  type FrameRuntimeSnapshot,
} from "./mediaFrameRuntime";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface FrameSequenceMarker {
  id: string;
  segmentId: string;
  chapter: string;
}

export interface FrameSequenceProps {
  id?: string;
  label: string;
  manifest?: MasterManifest;
  children: ReactNode;
  className?: string;
  markers?: FrameSequenceMarker[];
  /** Called for the frame the playhead asks the runtime to draw. */
  onRequestedFrame?: (frame: number) => void;
  /** Called only after an image has actually been drawn to the canvas. */
  onDrawnFrame?: (frame: number) => void;
  assetTag?: string;
  /** Legacy scene props retained so the unused SkyHero remains type-safe. */
  path?: string;
  totalFrames?: number;
  poster?: string;
  posterAlt?: string;
  concept?: boolean;
  evidenceLabel?: string;
  holdEndProgress?: number;
  sceneHeight?: string;
  playbackStartProgress?: number;
  onSceneProgress?: (progress: number) => void;
  startFrame?: number;
  endFrame?: number;
}

const NEARBY_FRAMES = 8;
const IDLE_FRAMES = 18;
const SCRUB_SECONDS = 0.95;
const FRAME_WINDOW_STEP = 4;
const FRAME_HYSTERESIS = 1;
const MOTION_MARKER_NUDGE_PX = 4;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: (deadline: IdleDeadline) => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

type InitialMediaStatus = "pending" | "ready" | "failed";

const isStaticEnvironment = (isLegacy: boolean): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    || (isLegacy && window.matchMedia("(max-width: 900px)").matches);
};

const mapLegacyProgress = (sceneProgress: number, playbackStart: number, holdEnd: number): number => {
  const playable = playbackStart > 0 && sceneProgress <= playbackStart
    ? 0
    : (sceneProgress - playbackStart) / Math.max(0.0001, 1 - playbackStart);
  return holdEnd > 0 && playable >= 1 - holdEnd
    ? 1
    : Math.max(0, Math.min(1, playable / Math.max(0.0001, 1 - holdEnd)));
};

const getNearestLoadedIndex = (
  records: ReadonlyMap<number, FrameLease>,
  requestedIndex: number,
  maxFrame: number,
): number | null => {
  let nearest: number | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;
  records.forEach((lease, index) => {
    const snapshot = lease.getSnapshot();
    if (snapshot?.status !== "loaded" || !snapshot.image?.naturalWidth || index < 0 || index > maxFrame) return;
    const distance = Math.abs(index - requestedIndex);
    if (distance < nearestDistance || (distance === nearestDistance && index > (nearest ?? -1))) {
      nearest = index;
      nearestDistance = distance;
    }
  });
  return nearest;
};

const getFrameUrl = (manifest: MasterManifest, frame: number, assetTag?: string): string => {
  const url = getRuntimeFrameUrl(manifest.runtimePath, frame);
  return assetTag ? `${url}?${encodeURIComponent(assetTag)}` : url;
};

function setInteractiveStoryState(section: HTMLElement, manifest: MasterManifest, frame: number, staticMode: boolean): void {
  const elements = section.querySelectorAll<HTMLElement>("[data-story-segment-id]");
  if (staticMode) {
    elements.forEach((element) => {
      const hiddenInStaticMode = element.dataset.storyStaticHidden === "true";
      element.dataset.storyActive = String(!hiddenInStaticMode);
      element.setAttribute("aria-hidden", String(hiddenInStaticMode));
      element.inert = hiddenInStaticMode;
    });
    return;
  }

  const scrollMap = getMasterScrollMap(manifest);
  const activeSlice = getMasterSliceAtFrame(frame, scrollMap, manifest);
  const activeSegmentId = activeSlice?.segmentId;
  elements.forEach((element) => {
    const isActive = element.dataset.storySegmentId === activeSegmentId;
    element.dataset.storyActive = String(isActive);
    element.setAttribute("aria-hidden", String(!isActive));
    element.inert = !isActive;
  });
  section.dataset.masterSegment = activeSegmentId ?? "transition";
}

function clearInteractiveStoryState(section: HTMLElement): void {
  section.querySelectorAll<HTMLElement>("[data-story-segment-id]").forEach((element) => {
    element.dataset.storyActive = "false";
    element.setAttribute("aria-hidden", "true");
    element.inert = true;
  });
  section.dataset.masterSegment = "transition";
}

export default function FrameSequence({
  id,
  label,
  manifest,
  children,
  className = "",
  markers = [],
  onRequestedFrame,
  onDrawnFrame,
  assetTag,
  path,
  totalFrames = 1,
  poster = "",
  posterAlt = "",
  concept = false,
  evidenceLabel,
  holdEndProgress,
  playbackStartProgress,
  sceneHeight,
  onSceneProgress,
  startFrame = 0,
  endFrame,
}: FrameSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const callbacksRef = useRef({ onRequestedFrame, onDrawnFrame, onSceneProgress });
  const isLegacy = !manifest;
  const legacyEndFrame = Math.min(Math.max(0, totalFrames - 1), Math.max(startFrame, endFrame ?? totalFrames - 1));
  const runtimeManifest = useMemo<MasterManifest>(() => manifest ?? ({
    version: 1,
    fps: 30,
    frameWidth: 1280,
    frameHeight: 720,
    runtimePath: path ?? "",
    frameCount: Math.max(1, totalFrames),
    poster,
    segments: [{ id: "legacy", kind: "scene", chapter: "roof", startFrame, endFrame: legacyEndFrame + 1, frameCount: legacyEndFrame - startFrame + 1, poster, evidenceLabel: evidenceLabel ?? "" }],
    excludedScenes: [],
  }), [evidenceLabel, legacyEndFrame, manifest, path, poster, startFrame, totalFrames]);
  const map = useMemo(() => getMasterScrollMap(runtimeManifest), [runtimeManifest]);
  const [staticMode, setStaticMode] = useState(() => isStaticEnvironment(isLegacy));
  const [mediaFallback, setMediaFallback] = useState(false);
  const maxFrame = Math.max(0, runtimeManifest.frameCount - 1);
  const legacyPlaybackStart = Math.max(0, Math.min(0.95, playbackStartProgress ?? 0));
  const legacyHoldEnd = Math.max(0, Math.min(0.95, holdEndProgress ?? 0));
  const fallbackMode = staticMode || mediaFallback;
  const mediaStateKey = `${runtimeManifest.runtimePath}|${runtimeManifest.frameCount}|${assetTag ?? ""}|${fallbackMode ? "static" : "motion"}`;
  const [initialMedia, setInitialMedia] = useState<{ key: string; status: InitialMediaStatus }>(() => ({ key: mediaStateKey, status: "pending" }));
  const initialFrameLoaded = initialMedia.key === mediaStateKey && initialMedia.status === "ready";
  const initialFrameFailed = initialMedia.key === mediaStateKey && initialMedia.status === "failed";

  useEffect(() => {
    callbacksRef.current = { onRequestedFrame, onDrawnFrame, onSceneProgress };
  }, [onDrawnFrame, onRequestedFrame, onSceneProgress]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => {
      const nextMode = motionQuery.matches || (isLegacy && window.matchMedia("(max-width: 900px)").matches);
      setStaticMode((currentMode) => {
        if (currentMode !== nextMode) setInitialMedia({ key: "", status: "pending" });
        return nextMode;
      });
    };
    updateMode();
    motionQuery.addEventListener("change", updateMode);
    const widthQuery = isLegacy ? window.matchMedia("(max-width: 900px)") : undefined;
    widthQuery?.addEventListener("change", updateMode);
    return () => {
      motionQuery.removeEventListener("change", updateMode);
      widthQuery?.removeEventListener("change", updateMode);
    };
  }, [isLegacy]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.dataset.requestedMasterFrame = "0";
    section.dataset.drawnMasterFrame = "0";
    if (fallbackMode) setInteractiveStoryState(section, runtimeManifest, 0, true);
    else clearInteractiveStoryState(section);
    if (!fallbackMode) {
      markers.forEach((marker) => {
        const markerElement = section.querySelector<HTMLElement>(`[data-marker-segment-id="${marker.segmentId}"]`);
        if (markerElement) markerElement.style.top = `calc(${getMasterMarkerTopVh(marker.segmentId, map)}vh + ${MOTION_MARKER_NUDGE_PX}px)`;
      });
      return;
    }
    const syncStaticMarkers = () => {
      markers.forEach((marker) => {
        const requestedAnchor = section.querySelector<HTMLElement>(`[data-story-segment-id="${marker.segmentId}"]`);
        const anchor = requestedAnchor?.dataset.storyStaticHidden === "true"
          ? section.querySelector<HTMLElement>(`[data-story-chapter="${requestedAnchor.dataset.storyChapter}"]:not([data-story-static-hidden="true"])`)
          : requestedAnchor;
        const markerElement = section.querySelector<HTMLElement>(`[data-marker-segment-id="${marker.segmentId}"]`);
        if (anchor && markerElement) markerElement.style.top = `${anchor.getBoundingClientRect().top - section.getBoundingClientRect().top}px`;
      });
    };
    syncStaticMarkers();
    window.addEventListener("resize", syncStaticMarkers, { passive: true });
    return () => window.removeEventListener("resize", syncStaticMarkers);
  }, [fallbackMode, map, markers, runtimeManifest]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      if (!section || !canvas || fallbackMode || runtimeManifest.frameCount < 1) return undefined;
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) {
        setMediaFallback(true);
        return undefined;
      }

      let disposed = false;
      let activated = false;
      let nearViewport = false;
      let requestedFrame = isLegacy ? startFrame : 0;
      let lastDrawnFrame: number | null = null;
      let windowCenter = requestedFrame;
      let renderRaf: number | null = null;
      let resizeRaf: number | null = null;
      let refreshTimeout: number | null = null;
      let idleHandle: number | null = null;
      let idleTimeout: number | null = null;
      let retryTimeout: number | null = null;
      let frameTween: gsap.core.Tween | null = null;
      let resizeObserver: ResizeObserver | null = null;
      let activationObserver: IntersectionObserver | null = null;
      let viewportObserver: IntersectionObserver | null = null;
      let initialGateOpen = true;
      let initialTarget = requestedFrame;
      let retryCount = 0;
      const frameLeases = new Map<number, FrameLease>();
      const subscriptions = new Map<number, () => void>();

      setInitialMedia({ key: mediaStateKey, status: "pending" });

      const setInitialStatus = (status: InitialMediaStatus) => {
        setInitialMedia({ key: mediaStateKey, status });
      };

      const draw = (image: FrameRuntimeImage): boolean => {
        if (!image.naturalWidth || !canvas.width || !canvas.height) return false;
        const canvasRatio = canvas.width / canvas.height;
        const imageRatio = image.naturalWidth / image.naturalHeight;
        let width = canvas.width;
        let height = canvas.width / imageRatio;
        let x = 0;
        let y = (canvas.height - height) / 2;
        if (canvasRatio < imageRatio) {
          height = canvas.height;
          width = canvas.height * imageRatio;
          x = (canvas.width - width) / 2;
          y = 0;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image as CanvasImageSource, x, y, width, height);
        return true;
      };

      const resizeCanvas = (source?: FrameRuntimeImage) => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        const sourceWidth = source?.naturalWidth || runtimeManifest.frameWidth;
        const sourceHeight = source?.naturalHeight || runtimeManifest.frameHeight;
        const { width: nextWidth, height: nextHeight } = getCanvasPixelSize(width, height, sourceWidth, sourceHeight, window.devicePixelRatio || 1);
        if (canvas.width === nextWidth && canvas.height === nextHeight) return;
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
      };

      const getSnapshot = (index: number): FrameRuntimeSnapshot | undefined => frameLeases.get(index)?.getSnapshot();

      const dropFrame = (index: number) => {
        const lease = frameLeases.get(index);
        if (!lease) return;
        subscriptions.get(index)?.();
        subscriptions.delete(index);
        frameLeases.delete(index);
        lease.release();
      };

      const scheduleRender = () => {
        if (renderRaf !== null || disposed) return;
        renderRaf = window.requestAnimationFrame(() => {
          renderRaf = null;
          if (disposed) return;
          const nearestLoaded = initialGateOpen ? initialTarget : getNearestLoadedIndex(frameLeases, requestedFrame, maxFrame);
          const retained = lastDrawnFrame === null ? undefined : getSnapshot(lastDrawnFrame);
          const retainedIsBetter = lastDrawnFrame !== null && retained?.status === "loaded" && Boolean(retained.image?.naturalWidth)
            && nearestLoaded !== null && Math.abs(lastDrawnFrame - requestedFrame) <= Math.abs(nearestLoaded - requestedFrame) + FRAME_HYSTERESIS;
          const drawIndex = initialGateOpen ? initialTarget : retainedIsBetter ? lastDrawnFrame : nearestLoaded;
          if (drawIndex === null || drawIndex === undefined) return;
          const snapshot = getSnapshot(drawIndex);
          if (snapshot?.status !== "loaded" || !snapshot.image) return;
          resizeCanvas(snapshot.image);
          if (!draw(snapshot.image)) return;
          lastDrawnFrame = drawIndex;
          section.dataset.drawnMasterFrame = String(drawIndex);
          setInteractiveStoryState(section, runtimeManifest, drawIndex, false);
          callbacksRef.current.onDrawnFrame?.(drawIndex);
          if (initialGateOpen && drawIndex === initialTarget) {
            initialGateOpen = false;
            setInitialStatus("ready");
          }
        });
      };

      const onFrameChange = (index: number, snapshot: FrameRuntimeSnapshot) => {
        if (disposed) return;
        if (snapshot.status === "loaded") {
          scheduleRender();
          return;
        }
        if (snapshot.status === "error" && initialGateOpen && index === initialTarget) {
          if (shouldRetryInitialFrame(retryCount) && retryTimeout === null) {
            retryCount += 1;
            setInitialStatus("failed");
            retryTimeout = window.setTimeout(() => {
              retryTimeout = null;
              if (disposed) return;
              dropFrame(index);
              initialGateOpen = true;
              initialTarget = requestedFrame;
              setInitialStatus("pending");
              enqueue(initialTarget, 0);
            }, 1200);
          } else {
            setInitialStatus("failed");
            setMediaFallback(true);
          }
        }
        if (snapshot.status === "evicted") {
          dropFrame(index);
          if (nearViewport && (index === requestedFrame || index === initialTarget)) enqueue(index, 0);
        }
      };

      const enqueue = (index: number, priority: number) => {
          const safeIndex = clampMasterFrame(index, runtimeManifest);
        let lease = frameLeases.get(safeIndex);
        if (!lease) {
          lease = mediaFrameRuntime.acquire(getFrameUrl(runtimeManifest, safeIndex, assetTag), priority);
          frameLeases.set(safeIndex, lease);
          subscriptions.set(safeIndex, lease.subscribe((snapshot) => onFrameChange(safeIndex, snapshot)));
        } else {
          lease.request(priority);
        }
        if (lease.getSnapshot()?.status === "loaded") scheduleRender();
      };

      const syncWindow = (center: number, radius: number) => {
        if (disposed || !nearViewport) return;
        const safeCenter = clampMasterFrame(center, runtimeManifest);
        const desired = new Set<number>();
        for (let offset = 0; offset <= radius; offset += 1) {
          desired.add(safeCenter + offset);
          desired.add(safeCenter - offset);
        }
        [...frameLeases.keys()].forEach((index) => { if (!desired.has(index)) dropFrame(index); });
        [...desired]
          .sort((left, right) => Math.abs(left - safeCenter) - Math.abs(right - safeCenter))
          .forEach((index) => { if (index >= 0 && index <= maxFrame) enqueue(index, Math.abs(index - safeCenter) + (radius > NEARBY_FRAMES ? 40 : 0)); });
      };

      const cancelIdlePrefetch = () => {
        if (idleTimeout !== null) window.clearTimeout(idleTimeout);
        idleTimeout = null;
        const idleWindow = window as IdleWindow;
        if (idleHandle !== null) idleWindow.cancelIdleCallback?.(idleHandle);
        idleHandle = null;
      };

      const prefetchIdle = () => {
        idleHandle = null;
        idleTimeout = null;
        if (!disposed && activated && nearViewport) syncWindow(requestedFrame, IDLE_FRAMES);
      };

      const scheduleIdlePrefetch = () => {
        if (idleHandle !== null || idleTimeout !== null || disposed || !nearViewport) return;
        const idleWindow = window as IdleWindow;
        if (idleWindow.requestIdleCallback) idleHandle = idleWindow.requestIdleCallback(prefetchIdle, { timeout: 900 });
        else idleTimeout = window.setTimeout(prefetchIdle, 180);
      };

      const setRequestedFrame = (nextFrame: number) => {
        const next = clampMasterFrame(nextFrame, runtimeManifest);
        if (next === requestedFrame) return;
        requestedFrame = next;
        section.dataset.requestedMasterFrame = String(next);
        callbacksRef.current.onRequestedFrame?.(next);
        if (initialGateOpen) initialTarget = next;
        if (next === 0 || next === maxFrame || Math.abs(next - windowCenter) >= FRAME_WINDOW_STEP) {
          windowCenter = next;
          syncWindow(next, NEARBY_FRAMES);
        }
        scheduleRender();
        scheduleIdlePrefetch();
      };

      const resizeNow = () => {
        resizeRaf = null;
        if (disposed) return;
        const nearest = getNearestLoadedIndex(frameLeases, requestedFrame, maxFrame);
        resizeCanvas(nearest === null ? undefined : getSnapshot(nearest)?.image ?? undefined);
        scheduleRender();
        if (refreshTimeout !== null) window.clearTimeout(refreshTimeout);
        refreshTimeout = window.setTimeout(() => { refreshTimeout = null; if (!disposed) ScrollTrigger.refresh(); }, 80);
      };
      const scheduleResize = () => { if (resizeRaf === null) resizeRaf = window.requestAnimationFrame(resizeNow); };
      const releaseAllFrames = () => [...frameLeases.keys()].forEach(dropFrame);

      const activateSequence = () => {
        if (disposed || activated) return;
        activated = true;
        nearViewport = true;
        enqueue(initialTarget, 0);
        syncWindow(initialTarget, NEARBY_FRAMES);
        scheduleIdlePrefetch();
        resizeCanvas();

        const playhead = { scrollPosition: 0 };
        frameTween = gsap.to(playhead, {
          scrollPosition: map.totalScroll,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            const sceneProgress = playhead.scrollPosition / map.totalScroll;
            const frame = masterFrameForProgress(
              isLegacy ? mapLegacyProgress(sceneProgress, legacyPlaybackStart, legacyHoldEnd) : sceneProgress,
              map,
              runtimeManifest,
            );
            setRequestedFrame(frame);
            callbacksRef.current.onSceneProgress?.(sceneProgress);
            section.style.setProperty("--master-progress", (playhead.scrollPosition / map.totalScroll).toFixed(4));
          },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: SCRUB_SECONDS,
          },
        });
        const restoredProgress = frameTween.scrollTrigger?.progress;
        if (typeof restoredProgress === "number") {
          const restored = restoreMasterPlayhead(restoredProgress, map, runtimeManifest);
          playhead.scrollPosition = restored.scrollPosition;
          const frame = isLegacy
            ? masterFrameForProgress(mapLegacyProgress(restoredProgress, legacyPlaybackStart, legacyHoldEnd), map, runtimeManifest)
            : restored.frame;
          requestedFrame = frame;
          initialTarget = frame;
          windowCenter = frame;
          section.dataset.requestedMasterFrame = String(frame);
          callbacksRef.current.onRequestedFrame?.(frame);
          syncWindow(frame, NEARBY_FRAMES);
          scheduleRender();
        }

        resizeObserver = new ResizeObserver(scheduleResize);
        resizeObserver.observe(section);
        window.addEventListener("resize", scheduleResize, { passive: true });

        if (typeof IntersectionObserver !== "undefined") {
          viewportObserver = new IntersectionObserver((entries) => {
            if (disposed) return;
            nearViewport = entries.some((entry) => entry.isIntersecting);
            if (nearViewport) { syncWindow(requestedFrame, NEARBY_FRAMES); scheduleIdlePrefetch(); }
            else { cancelIdlePrefetch(); releaseAllFrames(); }
          }, { rootMargin: "900px 0px", threshold: 0 });
          viewportObserver.observe(section);
        }
      };

      if (typeof IntersectionObserver === "undefined") activateSequence();
      else {
        activationObserver = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            activationObserver?.disconnect();
            activationObserver = null;
            activateSequence();
          }
        }, { rootMargin: "900px 0px", threshold: 0 });
        activationObserver.observe(section);
      }

      return () => {
        disposed = true;
        activationObserver?.disconnect();
        viewportObserver?.disconnect();
        resizeObserver?.disconnect();
        window.removeEventListener("resize", scheduleResize);
        if (frameTween) { frameTween.scrollTrigger?.kill(); frameTween.kill(); }
        if (renderRaf !== null) window.cancelAnimationFrame(renderRaf);
        if (resizeRaf !== null) window.cancelAnimationFrame(resizeRaf);
        if (refreshTimeout !== null) window.clearTimeout(refreshTimeout);
        if (retryTimeout !== null) window.clearTimeout(retryTimeout);
        cancelIdlePrefetch();
        releaseAllFrames();
        subscriptions.clear();
        frameLeases.clear();
      };
    },
    { scope: sectionRef, dependencies: [assetTag, fallbackMode, legacyHoldEnd, legacyPlaybackStart, map, mediaStateKey, runtimeManifest, isLegacy], revertOnUpdate: true },
  );

  const sequenceReady = fallbackMode || initialFrameLoaded;
  const sequenceStyle = {
    "--master-sequence-height": isLegacy ? (sceneHeight ?? "360vh") : `${100 + map.totalScroll}vh`,
    "--master-progress": "0",
    "--media-scene-height": sceneHeight ?? "360vh",
    "--sequence-scene-height": sceneHeight ?? "360vh",
  } as CSSProperties;

  return (
    <section
      id={id}
      ref={sectionRef}
      data-v2-chapter="roof"
      data-master-sequence="true"
      data-static-mode={fallbackMode ? "true" : "false"}
      data-master-fallback={mediaFallback ? "true" : "false"}
      data-sequence-ready={sequenceReady ? "true" : "false"}
      data-media-ready={sequenceReady ? "true" : "false"}
      data-media-terminal-error={initialFrameFailed ? "true" : "false"}
      data-requested-master-frame="0"
      data-drawn-master-frame="0"
      aria-label={label}
      aria-busy={!fallbackMode && !initialFrameLoaded && !initialFrameFailed ? "true" : undefined}
      style={sequenceStyle}
      className={`${isLegacy ? "v2-sequence v2-media-scene" : ""} v2-master-sequence ${fallbackMode ? "v2-master-sequence--static" : ""} ${isLegacy && fallbackMode ? "v2-media-scene--static" : ""} ${mediaFallback ? "v2-master-sequence--fallback" : ""} ${className}`.trim()}
    >
      <div className={`v2-master-sequence__stage ${isLegacy ? "v2-sequence__stage v2-media-scene__stage" : ""}`}>
        <img
          className={`v2-master-sequence__poster ${isLegacy ? "v2-sequence__poster v2-media-scene__poster" : ""}`}
          src={runtimeManifest.poster}
          alt={fallbackMode ? posterAlt : ""}
          aria-hidden="true"
          width={runtimeManifest.frameWidth}
          height={runtimeManifest.frameHeight}
          onLoad={(event) => event.currentTarget.parentElement?.removeAttribute("data-poster-failed")}
          onError={(event) => {
            const image = event.currentTarget;
            image.parentElement?.setAttribute("data-poster-failed", "true");
            if (image.dataset.retried !== "true") {
              image.dataset.retried = "true";
              window.setTimeout(() => {
                image.src = `${runtimeManifest.poster}${runtimeManifest.poster.includes("?") ? "&" : "?"}retry=1`;
              }, 1200);
            }
          }}
        />
        <canvas ref={canvasRef} className={`v2-master-sequence__canvas ${isLegacy ? "v2-sequence__canvas v2-media-scene__video" : ""}`} aria-hidden="true" />
        <div className={`v2-master-sequence__veil ${isLegacy ? "v2-sequence__veil v2-media-scene__veil" : ""}`} aria-hidden="true" />
        {isLegacy && evidenceLabel && <div className="v2-media-scene__evidence"><span className="v2-signal" /> {evidenceLabel}</div>}
        {isLegacy && concept && !evidenceLabel && <div className="v2-media-scene__concept"><span className="v2-signal" /> Concept visualization</div>}
        {children}
      </div>
      {markers.map((marker) => {
        const position = getMasterMarkerTopVh(marker.segmentId, map);
        return (
          <span
            key={marker.id}
            id={marker.id}
            data-v2-chapter={marker.chapter}
            data-marker-segment-id={marker.segmentId}
            className="v2-master-sequence__marker"
           style={{ top: `calc(${position}vh + ${MOTION_MARKER_NUDGE_PX}px)` }}
            aria-hidden="true"
          />
        );
      })}
    </section>
  );
}
