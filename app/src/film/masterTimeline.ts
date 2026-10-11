export const MASTER_TRANSITION_FRAMES = 18;
export const MASTER_RUNTIME_PATH = "/assets/v2/master/frames";
export const MASTER_POSTER = `${MASTER_RUNTIME_PATH}/f001.jpg`;
const APPROVED_SCENE_IDS = [
  "00-roof-transform",
  "03-city-to-infrastructure",
  "04-pergola-payoff",
  "05-operations-proof",
  "07-dusk-continues",
  "06-commercial-trust",
] as const;
const EXCLUDED_SCENE_IDS = ["01-interior-energy", "02-unused-roof"] as const;
const SCENE_SEGMENTS = [
  {id: "roof-transform", sceneId: "00-roof-transform", chapter: "roof"},
  {id: "city-infrastructure", sceneId: "03-city-to-infrastructure", chapter: "architecture"},
  {id: "pergola-payoff", sceneId: "04-pergola-payoff", chapter: "architecture"},
  {id: "operations", sceneId: "05-operations-proof", chapter: "operations"},
  {id: "dusk", sceneId: "07-dusk-continues", chapter: "operations"},
  {id: "decision", sceneId: "06-commercial-trust", chapter: "operations"},
] as const;

type Chapter = "roof" | "architecture" | "finance" | "operations" | "assessment";
export type MasterSegmentKind = "scene" | "hold" | "plate" | "transition";

export interface MasterSceneInput {
  id: string;
  label?: string;
  chapter?: string;
  sourceKind?: string;
  source?: string;
  sourceStartFrame: number;
  sourceEndFrame: number;
  runtimePath: string;
  poster?: string;
  frameCount: number;
  evidenceLabel: string;
  concept?: boolean;
}

export interface MasterManifestInput {
  fps: number;
  frameWidth: number;
  frameHeight: number;
  scenes: readonly MasterSceneInput[] | Record<string, MasterSceneInput>;
}

export interface MasterSegment {
  id: string;
  kind: MasterSegmentKind;
  chapter: Chapter;
  startFrame: number;
  endFrame: number;
  frameCount: number;
  poster: string;
  evidenceLabel: string;
  sceneId?: string;
  sourceStartFrame?: number;
  sourceEndFrame?: number;
  sourceRuntimePath?: string;
  fromSegmentId?: string;
  toSegmentId?: string;
  style?: "endpoint-dissolve";
  color?: string;
}

export interface MasterExcludedScene {
  sceneId: string;
  reason: string;
}

export interface MasterTimeline {
  version: 1;
  fps: 30;
  frameWidth: 1280;
  frameHeight: 720;
  runtimePath: typeof MASTER_RUNTIME_PATH;
  frameCount: number;
  poster: typeof MASTER_POSTER;
  segments: MasterSegment[];
  excludedScenes: MasterExcludedScene[];
  transitionFrames: number;
  sourceOrder: string[];
}

export interface MasterFrameEndpoint {
  sourceUrl?: string;
  sourceFrameNumber?: number;
  color?: string;
  segmentId: string;
}

export interface MasterFrameMapping {
  kind: MasterSegmentKind;
  segmentId: string;
  sceneId?: string;
  sourceUrl?: string;
  sourceFrameNumber?: number;
  runtimeFrameNumber?: number;
  color?: string;
  blend?: number;
  from?: MasterFrameEndpoint;
  to?: MasterFrameEndpoint;
}

const sceneValues = (input: MasterManifestInput): MasterSceneInput[] =>
  Array.isArray(input?.scenes) ? [...input.scenes] : Object.values(input?.scenes ?? {});

const outputFrameUrl = (frame: number): string =>
  `${MASTER_RUNTIME_PATH}/f${String(frame + 1).padStart(3, "0")}.jpg`;

function assertInteger(value: unknown, label: string): asserts value is number {
  if (!Number.isInteger(value)) throw new Error(`${label} must be an integer`);
}

const assertSource = (scene: MasterSceneInput): void => {
  if (!scene || typeof scene !== "object" || typeof scene.id !== "string") throw new Error("manifest contains an invalid scene entry");
  assertInteger(scene.sourceStartFrame, `${scene.id}: sourceStartFrame`);
  assertInteger(scene.sourceEndFrame, `${scene.id}: sourceEndFrame`);
  assertInteger(scene.frameCount, `${scene.id}: frameCount`);
  if (scene.sourceStartFrame < 1 || scene.sourceEndFrame < scene.sourceStartFrame) throw new Error(`${scene.id}: source range must be 1-based inclusive`);
  if (scene.sourceEndFrame - scene.sourceStartFrame + 1 !== scene.frameCount) throw new Error(`${scene.id}: frameCount does not match source range`);
  if (!/^\/assets\/v2\/frames\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(scene.runtimePath)) throw new Error(`${scene.id}: runtimePath is not a safe curated frame path`);
  if (!scene.evidenceLabel) throw new Error(`${scene.id}: evidenceLabel is required`);
};

const evidenceFor = (segment: Pick<MasterSegment, "kind" | "evidenceLabel" | "color">): string => segment.kind === "plate"
  ? `Text-free editorial plate (${segment.color})`
  : segment.kind === "hold"
    ? "Concept visualization — sky-first opening hold"
    : segment.evidenceLabel;

/**
 * Build an additive assembly plan. Source scene ranges are copied in full;
 * bridges occupy their own ranges and never overlap or trim a source frame.
 */
export const createMasterTimeline = (
  input: MasterManifestInput,
  transitionFrames = MASTER_TRANSITION_FRAMES,
): MasterTimeline => {
  assertInteger(transitionFrames, "transitionFrames");
  if (transitionFrames < 0) throw new Error("transitionFrames must be non-negative");
  if (!input || input.fps !== 30 || input.frameWidth !== 1280 || input.frameHeight !== 720) throw new Error("master manifest must be 30 fps at 1280x720");
  const scenes = sceneValues(input);
  const seen = new Set<string>();
  for (const scene of scenes) {
    assertSource(scene);
    if (seen.has(scene.id)) throw new Error(`Duplicate scene: ${scene.id}`);
    seen.add(scene.id);
  }
  const expected: Set<string> = new Set([...APPROVED_SCENE_IDS, ...EXCLUDED_SCENE_IDS]);
  for (const scene of scenes) if (!expected.has(scene.id)) throw new Error(`Unreviewed scene: ${scene.id}`);
  for (const sceneId of APPROVED_SCENE_IDS) if (!seen.has(sceneId)) throw new Error(`Missing approved scene: ${sceneId}`);
  for (const sceneId of EXCLUDED_SCENE_IDS) if (!seen.has(sceneId)) throw new Error(`Missing excluded scene: ${sceneId}`);

  const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));
  const segments: MasterSegment[] = [];
  let cursor = 0;
  const append = (segment: Omit<MasterSegment, "startFrame" | "endFrame" | "frameCount" | "poster"> & {frameCount: number}): MasterSegment => {
    const result: MasterSegment = {...segment, startFrame: cursor, endFrame: cursor + segment.frameCount, poster: outputFrameUrl(cursor)};
    segments.push(result);
    cursor = result.endFrame;
    return result;
  };
  const appendTransition = (from: MasterSegment, to: Pick<MasterSegment, "id" | "kind" | "chapter" | "evidenceLabel" | "color">): void => {
    if (transitionFrames === 0) return;
    append({
      id: `bridge-${from.id}-to-${to.id}`,
      kind: "transition",
      chapter: to.chapter,
      frameCount: transitionFrames,
      evidenceLabel: `Editorial bridge: ${evidenceFor(from)} → ${evidenceFor(to)}; endpoint dissolve/exposure lift; matched geometry not claimed.`,
      fromSegmentId: from.id,
      toSegmentId: to.id,
      style: "endpoint-dissolve",
    });
  };
  const sceneSegment = (definition: typeof SCENE_SEGMENTS[number]): MasterSegment => {
    const scene = sceneById.get(definition.sceneId)!;
    return append({
      id: definition.id,
      kind: "scene",
      chapter: definition.chapter,
      frameCount: scene.frameCount,
      sceneId: scene.id,
      sourceStartFrame: scene.sourceStartFrame,
      sourceEndFrame: scene.sourceEndFrame,
      sourceRuntimePath: scene.runtimePath,
      evidenceLabel: scene.evidenceLabel,
    });
  };
  append({
    id: "sky-opening", kind: "hold", chapter: "roof", frameCount: 60,
    sceneId: "00-roof-transform", sourceStartFrame: 1, sourceEndFrame: 1,
    sourceRuntimePath: sceneById.get("00-roof-transform")!.runtimePath,
    evidenceLabel: "Concept visualization — sky-first opening hold",
  });
  const roof = sceneSegment(SCENE_SEGMENTS[0]);
  // The hold and the roof scene share the exact first image, so no bridge is inserted.
  let previous = roof;
  for (const definition of SCENE_SEGMENTS.slice(1, 3)) {
    const scene = sceneById.get(definition.sceneId)!;
    appendTransition(previous, {id: definition.id, kind: "scene", chapter: definition.chapter, evidenceLabel: scene.evidenceLabel});
    previous = sceneSegment(definition);
  }
  const financeDefinition = {id: "finance", kind: "plate" as const, chapter: "finance" as const, color: "#f6efe2", evidenceLabel: "Text-free editorial plate (#f6efe2)"};
  appendTransition(previous, financeDefinition);
  const finance = append({id: financeDefinition.id, kind: financeDefinition.kind, chapter: financeDefinition.chapter, frameCount: 120, color: financeDefinition.color, evidenceLabel: financeDefinition.evidenceLabel});
  previous = finance;
  for (const definition of SCENE_SEGMENTS.slice(3)) {
    const scene = sceneById.get(definition.sceneId)!;
    appendTransition(previous, {id: definition.id, kind: "scene", chapter: definition.chapter, evidenceLabel: scene.evidenceLabel});
    previous = sceneSegment(definition);
  }
  const assessmentDefinition = {id: "assessment", kind: "plate" as const, chapter: "assessment" as const, color: "#f6efe2", evidenceLabel: "Text-free editorial plate (#f6efe2)"};
  appendTransition(previous, assessmentDefinition);
  append({id: assessmentDefinition.id, kind: assessmentDefinition.kind, chapter: assessmentDefinition.chapter, frameCount: 30, color: assessmentDefinition.color, evidenceLabel: assessmentDefinition.evidenceLabel});

  return {
    version: 1,
    fps: 30,
    frameWidth: 1280,
    frameHeight: 720,
    runtimePath: MASTER_RUNTIME_PATH,
    frameCount: cursor,
    poster: MASTER_POSTER,
    segments,
    excludedScenes: EXCLUDED_SCENE_IDS.map((sceneId) => ({sceneId, reason: "optional alternate prelude conflicts with sky-first quality bar"})),
    transitionFrames,
    sourceOrder: [...APPROVED_SCENE_IDS],
  };
};

export const getMasterSegment = (timeline: MasterTimeline, masterFrame: number): MasterSegment => {
  assertInteger(masterFrame, "masterFrame");
  if (masterFrame < 0 || masterFrame >= timeline.frameCount) throw new Error(`masterFrame ${masterFrame} is outside the assembled frame range`);
  return timeline.segments.find((segment) => masterFrame >= segment.startFrame && masterFrame < segment.endFrame)!;
};

export const getMasterFrameMapping = (timeline: MasterTimeline, masterFrame: number): MasterFrameMapping => {
  const segment = getMasterSegment(timeline, masterFrame);
  if (segment.kind === "transition") {
    const from = timeline.segments.find((candidate) => candidate.id === segment.fromSegmentId)!;
    const to = timeline.segments.find((candidate) => candidate.id === segment.toSegmentId)!;
    // Scene fields embedded in the plan are sufficient to reconstruct source URLs.
    const endpoint = (candidate: MasterSegment, atEnd: boolean): MasterFrameEndpoint => {
      if (candidate.kind === "plate") return {segmentId: candidate.id, color: candidate.color};
      const runtimeFrameNumber = candidate.kind === "hold" ? 1 : atEnd ? candidate.frameCount : 1;
      const sourceFrameNumber = candidate.kind === "hold" ? 1 : atEnd ? candidate.sourceEndFrame! : candidate.sourceStartFrame!;
      return {segmentId: candidate.id, sourceUrl: `${candidate.sourceRuntimePath}/f${String(runtimeFrameNumber).padStart(3, "0")}.jpg`, sourceFrameNumber};
    };
    const offset = masterFrame - segment.startFrame;
    return {kind: "transition", segmentId: segment.id, blend: (offset + 1) / (segment.frameCount + 1), from: endpoint(from, true), to: endpoint(to, false)};
  }
  if (segment.kind === "plate") return {kind: "plate", segmentId: segment.id, color: segment.color};
  const runtimeFrameNumber = segment.kind === "hold" ? 1 : masterFrame - segment.startFrame + 1;
  const sourceFrameNumber = segment.kind === "hold" ? 1 : segment.sourceStartFrame! + runtimeFrameNumber - 1;
  return {
    kind: segment.kind,
    segmentId: segment.id,
    sceneId: segment.sceneId,
    runtimeFrameNumber,
    sourceFrameNumber,
    sourceUrl: `${segment.sourceRuntimePath}/f${String(runtimeFrameNumber).padStart(3, "0")}.jpg`,
  };
};
