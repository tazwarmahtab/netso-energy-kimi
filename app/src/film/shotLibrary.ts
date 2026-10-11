import {
  CINEMATIC_MANIFEST,
  CINEMATIC_MASTER_FRAME_COUNT,
  CINEMATIC_SCENES,
} from "./runtimeManifest";

export type ShotKind = "still-motion" | "documentary" | "architecture" | "operations" | "decision";
export type Authenticity = "concept" | "source-derived";
export type FilmChapter = "roof" | "architecture" | "finance" | "operations";
export type SourceStatus = "concept-visualization" | "supplied-footage-context";

export interface FilmShot {
  id: string;
  label: string;
  chapter: FilmChapter;
  kind: ShotKind;
  authenticity: Authenticity;
  sourceStatus: SourceStatus;
  media: string;
  poster: string;
  durationInFrames: number;
  sourceRange: string;
  angle: string;
  purpose: string;
  transitionOut: string;
  masterStartFrame: number;
  masterEndFrame: number;
}

const sceneKinds: Record<string, ShotKind> = {
  "00-roof-transform": "architecture",
  "01-interior-energy": "still-motion",
  "02-unused-roof": "still-motion",
  "03-city-to-infrastructure": "architecture",
  "04-pergola-payoff": "architecture",
  "05-operations-proof": "operations",
  "07-dusk-continues": "operations",
  "06-commercial-trust": "decision",
};

const sceneAngles: Record<string, string> = {
  "00-roof-transform": "locked roof-to-solar transformation",
  "01-interior-energy": "low interior looking up",
  "02-unused-roof": "locked rooftop wide",
  "03-city-to-infrastructure": "street-level rise to rooftop",
  "04-pergola-payoff": "slow architectural push-in",
  "05-operations-proof": "hand/tool/meter inserts",
  "07-dusk-continues": "wide dusk patrol",
  "06-commercial-trust": "medium group conversation under canopy",
};

const toStaticFilePath = (path: string): string => {
  const publicMarker = "/public/";
  const publicIndex = path.indexOf(publicMarker);
  if (publicIndex >= 0) return path.slice(publicIndex + publicMarker.length);
  return path.replace(/^\/+/, "");
};

const renderableScenes = CINEMATIC_SCENES;
const legacySceneStarts = new Map<string, number>();
let legacyCursor = 0;
for (const scene of renderableScenes) {
  legacySceneStarts.set(scene.id, legacyCursor);
  legacyCursor += scene.frameCount;
}

const bridgeLabels = new Map(CINEMATIC_MANIFEST.bridges.map((bridge) => [bridge.afterSceneId, bridge.label]));

export const FPS = CINEMATIC_MANIFEST.fps;
export const TRANSITION_FRAMES = 18;

/**
 * Remotion outputs are derivatives. Never use a manifest source path as an
 * output path: the source MP4s are editorial inputs and must remain intact.
 */
export const getShotOutputPath = (shot: FilmShot): string =>
  `assets/v2/renders/shots/netso-shot-${shot.id}.mp4`;

export const FILM_SHOTS: FilmShot[] = renderableScenes.map((scene) => ({
  masterStartFrame: legacySceneStarts.get(scene.id) ?? 0,
  masterEndFrame: (legacySceneStarts.get(scene.id) ?? 0) + scene.frameCount,
  id: scene.id,
  label: scene.label,
  chapter: scene.chapter,
  kind: sceneKinds[scene.id],
  authenticity: scene.concept ? "concept" : "source-derived",
  sourceStatus: scene.evidence === "context" ? "supplied-footage-context" : "concept-visualization",
  // Remotion consumes the approved runtime frame sequence, not the raw source
  // video. This keeps the rendered duration exactly equal to the curated range.
  media: toStaticFilePath(scene.runtimePath),
  poster: toStaticFilePath(scene.poster),
  durationInFrames: scene.frameCount,
  sourceRange: `approved frames ${scene.sourceStartFrame}–${scene.sourceEndFrame} / ${scene.frameCount} curated frames`,
  angle: sceneAngles[scene.id],
  purpose: scene.purpose,
  transitionOut: bridgeLabels.get(scene.id) ?? "End of film",
}));

export const STORYBOARD_DURATION_IN_FRAMES =
  Math.max(1, CINEMATIC_MASTER_FRAME_COUNT - TRANSITION_FRAMES * Math.max(0, renderableScenes.length - 1));
