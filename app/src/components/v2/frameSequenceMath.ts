export interface CanvasPixelSize {
  width: number;
  height: number;
}

export const STATIC_VIEWPORT_MAX_WIDTH = 900;
export const MAX_INITIAL_FRAME_RETRIES = 1;
export const REQUESTED_FRAME_FALLBACK_MS = 3000;
export const REQUESTED_FRAME_RETRY_DELAY_MS = 1200;

export const shouldRetryInitialFrame = (retryCount: number): boolean => retryCount < MAX_INITIAL_FRAME_RETRIES;

export interface StaticModeSignals {
  reducedMotion?: boolean;
  reducedData?: boolean;
  saveData?: boolean;
  viewportWidth?: number;
}

/**
 * Static media is an explicit preference, a conservative data-saving hint, or
 * the deliberately art-directed small-screen path. Missing browser signals do
 * not opt a visitor out of the enhanced route.
 */
export const shouldUseStaticMode = ({
  reducedMotion = false,
  reducedData = false,
  saveData = false,
  viewportWidth,
}: StaticModeSignals): boolean => reducedMotion
  || reducedData
  || saveData
  || (typeof viewportWidth === "number" && Number.isFinite(viewportWidth) && viewportWidth <= STATIC_VIEWPORT_MAX_WIDTH);

/**
 * Keep decoded canvas dimensions bounded while preserving enough source
 * resolution for a narrow-to-wide resize without reallocating on every draw.
 */
export function getCanvasPixelSize(
  cssWidth: number,
  cssHeight: number,
  sourceWidth: number,
  sourceHeight: number,
  devicePixelRatio: number,
): CanvasPixelSize {
  const width = Math.max(1, cssWidth);
  const height = Math.max(1, cssHeight);
  const safeSourceWidth = Math.max(1, sourceWidth);
  const safeSourceHeight = Math.max(1, sourceHeight);
  const sourceDpr = Math.min(safeSourceWidth / width, safeSourceHeight / height);
  const dpr = Math.max(1, Math.min(2, sourceDpr, devicePixelRatio || 1));
  return { width: Math.max(1, Math.round(width * dpr)), height: Math.max(1, Math.round(height * dpr)) };
}
