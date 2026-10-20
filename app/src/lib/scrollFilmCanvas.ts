/**
 * Shared scroll-film canvas engine (scroll-film-studio lane B).
 * Lerped playhead + sliding ImageBitmap window for smooth scrubbing.
 */

export const SCROLL_FILM_LERP = 0.14;
export const SCROLL_FILM_BITMAP_AHEAD = 18;
export const SCROLL_FILM_BITMAP_KEEP = 28;
export const SCROLL_FILM_MAX_DPR = 1.5;

export type ProgressToFrame = (progress01: number, totalFrames: number) => number;

export interface ScrollFilmOptions {
  canvas: HTMLCanvasElement;
  /** Observe this element for canvas DPR resize (defaults to canvas parent). */
  resizeRoot?: Element | null;
  /** 1-based frame URL builder */
  frameUrl: (index1: number) => string;
  totalFrames: number;
  /** Optional non-linear map (e.g. compress near-black breath beats). */
  mapProgress?: ProgressToFrame;
  onFrame?: (index0: number, progress01: number) => void;
}

export interface ScrollFilmController {
  setProgress: (progress01: number) => void;
  destroy: () => void;
  getDisplayedIndex: () => number;
  redraw: () => void;
}

/** Compress a near-black mid-film gap into a short breath so scrub never feels dead. */
export function createGapCompressedMapper(
  blackStart1: number,
  blackEnd1: number,
  breathShare = 0.06,
): ProgressToFrame {
  return (p, total) => {
    const last = Math.max(0, total - 1);
    const lo = Math.max(0, blackStart1 - 1);
    const hi = Math.min(last, blackEnd1 - 1);
    if (hi <= lo) return Math.min(last, Math.max(0, p * last));

    const before = lo;
    const after = last - hi;
    const usable = before + after;
    if (usable <= 0) return Math.min(last, Math.max(0, p * last));

    const beforeShare = (1 - breathShare) * (before / usable);
    const afterShare = (1 - breathShare) * (after / usable);

    if (p <= beforeShare) {
      const t = beforeShare === 0 ? 0 : p / beforeShare;
      return t * lo;
    }
    if (p <= beforeShare + breathShare) {
      const t = (p - beforeShare) / breathShare;
      return lo + t * (hi - lo);
    }
    const t = afterShare === 0 ? 1 : (p - beforeShare - breathShare) / afterShare;
    return hi + t * after;
  };
}

export function createScrollFilm(options: ScrollFilmOptions): ScrollFilmController {
  const {
    canvas,
    frameUrl,
    totalFrames: initialTotal,
    mapProgress,
    onFrame,
  } = options;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    return {
      setProgress: () => undefined,
      destroy: () => undefined,
      getDisplayedIndex: () => 0,
      redraw: () => undefined,
    };
  }

  let cancelled = false;
  const totalFrames = Math.max(1, Math.floor(initialTotal));
  let rafId = 0;
  let targetFrame = 0;
  let currentFrame = 0;
  let displayed = -1;
  let bmpCenter = -999;
  let lastProgress = 0;
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;

  const images: (HTMLImageElement | undefined)[] = [];
  const bitmaps = new Map<number, ImageBitmap>();
  const decoding = new Set<number>();

  const updateCanvasDimensions = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, SCROLL_FILM_MAX_DPR);
    const targetW = Math.max(1, Math.round(rect.width * dpr));
    const targetH = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  };

  updateCanvasDimensions();

  const loadFrame = (i0: number): HTMLImageElement => {
    if (images[i0]) return images[i0]!;
    const img = new Image();
    img.src = frameUrl(i0 + 1);
    img.decoding = "async";
    images[i0] = img;
    return img;
  };

  const drawSource = (source: CanvasImageSource, nw: number, nh: number) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = nw / nh;
    const canvasRatio = cw / ch;
    let dw = cw;
    let dh = ch;
    let ox = 0;
    let oy = 0;
    if (canvasRatio > imgRatio) {
      dw = cw;
      dh = cw / imgRatio;
      oy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * imgRatio;
      ox = (cw - dw) / 2;
    }
    ctx.drawImage(source, ox, oy, dw, dh);
  };

  const nearestReady = (idx: number): number | null => {
    for (let d = 0; d < totalFrames; d++) {
      for (const i of [idx - d, idx + d]) {
        if (i < 0 || i >= totalFrames) continue;
        if (bitmaps.has(i)) return i;
        const img = images[i];
        if (img && img.complete && img.naturalWidth > 0) return i;
      }
    }
    return null;
  };

  const drawFrame = (idx: number, force = false) => {
    if (!force && idx === displayed) return;
    const bmp = bitmaps.get(idx);
    if (bmp) {
      drawSource(bmp, bmp.width, bmp.height);
      displayed = idx;
      onFrame?.(idx, lastProgress);
      return;
    }
    const ready = nearestReady(idx);
    if (ready == null) return;
    const nearBmp = bitmaps.get(ready);
    if (nearBmp) {
      drawSource(nearBmp, nearBmp.width, nearBmp.height);
      displayed = ready;
      onFrame?.(ready, lastProgress);
      return;
    }
    const img = images[ready];
    if (img && img.complete && img.naturalWidth > 0) {
      drawSource(img, img.naturalWidth, img.naturalHeight);
      displayed = ready;
      onFrame?.(ready, lastProgress);
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateCanvasDimensions();
      drawFrame(Math.round(currentFrame), true);
    }, 120);
  });
  resizeObserver.observe(options.resizeRoot ?? canvas.parentElement ?? canvas);

  const ensureBitmaps = (center: number) => {
    if (Math.abs(center - bmpCenter) < 3) return;
    bmpCenter = center;
    const lo = Math.max(0, center - SCROLL_FILM_BITMAP_AHEAD);
    const hi = Math.min(totalFrames - 1, center + SCROLL_FILM_BITMAP_AHEAD);
    for (let i = lo; i <= hi; i++) {
      if (bitmaps.has(i) || decoding.has(i)) continue;
      const img = loadFrame(i);
      if (!img.complete || img.naturalWidth === 0) {
        img.decode?.().catch(() => undefined);
        img.onload = () => {
          if (!cancelled) ensureBitmaps(Math.round(currentFrame));
        };
        continue;
      }
      decoding.add(i);
      createImageBitmap(img)
        .then((b) => {
          decoding.delete(i);
          if (cancelled) {
            b.close();
            return;
          }
          if (Math.abs(i - bmpCenter) > SCROLL_FILM_BITMAP_KEEP) {
            b.close();
            return;
          }
          bitmaps.set(i, b);
          if (i === displayed || i === Math.round(currentFrame)) drawFrame(i, true);
        })
        .catch(() => decoding.delete(i));
    }
    for (const k of Array.from(bitmaps.keys())) {
      if (k < center - SCROLL_FILM_BITMAP_KEEP || k > center + SCROLL_FILM_BITMAP_KEEP) {
        bitmaps.get(k)?.close();
        bitmaps.delete(k);
      }
    }
  };

  const tick = () => {
    if (cancelled) return;
    currentFrame += (targetFrame - currentFrame) * SCROLL_FILM_LERP;
    if (Math.abs(targetFrame - currentFrame) < 0.02) currentFrame = targetFrame;
    const idx = Math.round(currentFrame);
    ensureBitmaps(idx);
    drawFrame(idx);
    rafId = requestAnimationFrame(tick);
  };

  const preloadWindow = (start: number, end: number) => {
    for (let i = start; i <= end; i++) loadFrame(i);
  };

  preloadWindow(0, Math.min(29, totalFrames - 1));
  const first = loadFrame(0);
  const reveal = () => {
    updateCanvasDimensions();
    drawFrame(0, true);
    ensureBitmaps(0);
  };
  if (first.complete && first.naturalWidth > 0) reveal();
  else first.onload = reveal;

  let next = 30;
  const pump = () => {
    if (cancelled || next >= totalFrames) return;
    const end = Math.min(totalFrames - 1, next + 19);
    preloadWindow(next, end);
    next = end + 1;
    if (next < totalFrames) {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(pump, { timeout: 1000 });
      } else {
        setTimeout(pump, 80);
      }
    }
  };
  if ("requestIdleCallback" in window) window.requestIdleCallback(pump, { timeout: 500 });
  else setTimeout(pump, 100);

  rafId = requestAnimationFrame(tick);

  return {
    setProgress: (progress01: number) => {
      lastProgress = Math.min(1, Math.max(0, progress01));
      const mapped = mapProgress
        ? mapProgress(lastProgress, totalFrames)
        : lastProgress * (totalFrames - 1);
      targetFrame = Math.min(totalFrames - 1, Math.max(0, mapped));
    },
    destroy: () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      for (const b of bitmaps.values()) b.close();
      bitmaps.clear();
    },
    getDisplayedIndex: () => displayed,
    redraw: () => {
      updateCanvasDimensions();
      drawFrame(Math.round(currentFrame), true);
    },
  };
}

export async function fetchFrameManifest(
  url: string,
  fallback: number,
): Promise<number> {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) return fallback;
    const manifest = (await res.json()) as { count?: number };
    if (typeof manifest.count === "number" && manifest.count > 1) {
      return Math.floor(manifest.count);
    }
  } catch {
    /* keep fallback */
  }
  return fallback;
}
