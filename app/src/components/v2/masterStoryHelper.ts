export type MasterSegmentKind = "scene" | "hold" | "plate" | "transition";
export type MasterChapter = "roof" | "architecture" | "finance" | "operations" | "assessment";

export interface MasterSegment {
  id: string;
  kind: MasterSegmentKind;
  chapter: MasterChapter;
  startFrame: number;
  endFrame: number;
  frameCount: number;
  sceneId?: string;
  poster: string;
  evidenceLabel: string;
}

export interface ExcludedMasterScene {
  sceneId: string;
  reason: string;
}

export interface MasterManifest {
  version: 1;
  fps: number;
  frameWidth: number;
  frameHeight: number;
  runtimePath: string;
  frameCount: number;
  poster: string;
  segments: MasterSegment[];
  excludedScenes: ExcludedMasterScene[];
}

export interface MasterScrollSlice {
  id: string;
  kind: "segment" | "hold" | "transition";
  segmentId?: string;
  startFrame: number;
  endFrame: number;
  scrollStart: number;
  scrollEnd: number;
}

export interface MasterScrollMap {
  slices: MasterScrollSlice[];
  totalScroll: number;
}

export interface RestoredMasterPlayhead {
  scrollPosition: number;
  frame: number;
}

/**
 * The film has a single scroll playhead, but not every argument deserves the
 * same amount of reading time. Finance gets a deliberately longer scroll
 * slice; this keeps the full assumptions legible without adding another pin.
 */
const SCROLL_WEIGHTS: Record<string, number> = {
  "sky-opening": 70,
  "roof-transform": 160,
  "city-infrastructure": 120,
  "pergola-payoff": 100,
  finance: 260,
  operations: 150,
  dusk: 160,
  decision: 70,
  assessment: 42,
};

const TRANSITION_SCROLL_WEIGHT = 18;

export const clampMasterFrame = (frame: number, manifest: MasterManifest): number =>
  Math.max(0, Math.min(Math.max(0, manifest.frameCount - 1), Math.round(frame)));

export const clampProgress = (progress: number): number => Math.max(0, Math.min(1, progress));

const lerp = (start: number, end: number, progress: number): number => start + (end - start) * clampProgress(progress);

export function getMasterSegment(manifest: MasterManifest, id: string): MasterSegment {
  const segment = manifest.segments.find((candidate) => candidate.id === id);
  if (!segment) throw new Error(`Missing master segment: ${id}`);
  return segment;
}

export function getMasterScrollMap(manifest: MasterManifest): MasterScrollMap {
  const segments = [...manifest.segments].sort((left, right) => left.startFrame - right.startFrame);
  const slices: MasterScrollSlice[] = [];
  let cursor = 0;

  segments.forEach((segment, index) => {
    const previous = segments[index - 1];
    if (previous && segment.startFrame > previous.endFrame) {
      slices.push({
        id: `${previous.id}→${segment.id}`,
        kind: "transition",
        startFrame: previous.endFrame,
        endFrame: segment.startFrame,
        scrollStart: cursor,
        scrollEnd: cursor + TRANSITION_SCROLL_WEIGHT,
      });
      cursor += TRANSITION_SCROLL_WEIGHT;
    }

    const weight = segment.kind === "transition" ? TRANSITION_SCROLL_WEIGHT : SCROLL_WEIGHTS[segment.id] ?? Math.max(24, segment.frameCount);
    if (segment.id === "finance") {
      const readingFrame = segment.startFrame + Math.floor(segment.frameCount / 3);
      const parts = [
        { id: "finance-enter", kind: "segment" as const, startFrame: segment.startFrame, endFrame: readingFrame, weight: 32 },
        { id: "finance-read", kind: "hold" as const, startFrame: readingFrame, endFrame: readingFrame + 1, weight: 200 },
        { id: "finance-leave", kind: "segment" as const, startFrame: readingFrame + 1, endFrame: segment.endFrame, weight: 28 },
      ];
      parts.forEach((part) => {
        slices.push({
          id: part.id,
          kind: part.kind,
          segmentId: segment.id,
          startFrame: part.startFrame,
          endFrame: part.endFrame,
          scrollStart: cursor,
          scrollEnd: cursor + part.weight,
        });
        cursor += part.weight;
      });
      return;
    }
    slices.push({
      id: segment.id,
      kind: segment.kind === "transition" ? "transition" : "segment",
      segmentId: segment.kind === "transition" ? undefined : segment.id,
      startFrame: segment.startFrame,
      endFrame: segment.endFrame,
      scrollStart: cursor,
      scrollEnd: cursor + weight,
    });
    cursor += weight;
  });

  return { slices, totalScroll: Math.max(cursor, 1) };
}

export function masterFrameForScroll(scrollPosition: number, map: MasterScrollMap, manifest: MasterManifest): number {
  const position = Math.max(0, Math.min(map.totalScroll, scrollPosition));
  const slice = map.slices.find((candidate) => position < candidate.scrollEnd) ?? map.slices[map.slices.length - 1];
  if (!slice) return 0;
  const localProgress = (position - slice.scrollStart) / Math.max(0.0001, slice.scrollEnd - slice.scrollStart);
  const lastFrame = Math.max(slice.startFrame, slice.endFrame - 1);
  return clampMasterFrame(lerp(slice.startFrame, lastFrame, localProgress), manifest);
}

export function masterFrameForProgress(progress: number, map: MasterScrollMap, manifest: MasterManifest): number {
  return masterFrameForScroll(clampProgress(progress) * map.totalScroll, map, manifest);
}

export function restoreMasterPlayhead(progress: number, map: MasterScrollMap, manifest: MasterManifest): RestoredMasterPlayhead {
  const scrollPosition = clampProgress(progress) * map.totalScroll;
  return { scrollPosition, frame: masterFrameForScroll(scrollPosition, map, manifest) };
}

export function getScrollPositionForSegment(id: string, map: MasterScrollMap): number {
  return map.slices.find((slice) => slice.segmentId === id)?.scrollStart ?? 0;
}

/** Physical marker offset: the master section adds 100vh for the sticky stage,
 * so scroll positions are expressed directly in viewport-height units rather
 * than as a percentage of the whole section. */
export function getMasterMarkerTopVh(id: string, map: MasterScrollMap): number {
  return getScrollPositionForSegment(id, map);
}

export function getMasterSliceAtFrame(frame: number, map: MasterScrollMap, manifest: MasterManifest): MasterScrollSlice | undefined {
  const safeFrame = clampMasterFrame(frame, manifest);
  return map.slices.find((slice) => safeFrame >= slice.startFrame && safeFrame < slice.endFrame);
}

export function getMasterFrameProgress(frame: number, segment: MasterSegment, manifest: MasterManifest): number {
  const safeFrame = clampMasterFrame(frame, manifest);
  return clampProgress((safeFrame - segment.startFrame) / Math.max(1, segment.frameCount - 1));
}
