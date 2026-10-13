export interface CanvasPixelSize {
  width: number;
  height: number;
}

export const MAX_INITIAL_FRAME_RETRIES = 1;

export const shouldRetryInitialFrame = (retryCount: number): boolean => retryCount < MAX_INITIAL_FRAME_RETRIES;

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
