import manifestJson from "./cinematicManifest.json";

export interface CinematicBridge {
  id: string;
  afterSceneId: string;
  label: string;
  targetSceneId: string;
  mode: "asset-structure" | "structure-illustration" | "illustration-operations" | "operations-assessment";
}

export interface CinematicScene {
  id: string;
  label: string;
  chapter: "roof" | "architecture" | "finance" | "operations";
  sourceKind: "video" | "image-sequence";
  source: string;
  sourceStartFrame: number;
  sourceEndFrame: number;
  runtimePath: string;
  poster: string;
  posterFrame?: number;
  frameCount: number;
  sceneHeight: string;
  evidence?: string;
  evidenceLabel: string;
  concept: boolean;
  endHoldProgress?: number;
  purpose: string;
  pageOrder: number;
}

export interface CinematicManifest {
  fps: number;
  frameWidth: number;
  frameHeight: number;
  globalMaxCachedFrames?: number;
  intro: {
    sceneId: string;
    startFrame: number;
    endFrame: number;
  };
  bridges: CinematicBridge[];
  scenes: CinematicScene[] | Record<string, CinematicScene>;
}

export const CINEMATIC_MANIFEST = manifestJson as CinematicManifest;

const sceneValues = Array.isArray(CINEMATIC_MANIFEST.scenes)
  ? CINEMATIC_MANIFEST.scenes
  : Object.values(CINEMATIC_MANIFEST.scenes);

export const CINEMATIC_SCENES = [...sceneValues].sort((left, right) => left.pageOrder - right.pageOrder);
export const CINEMATIC_BRIDGES = [...(CINEMATIC_MANIFEST.bridges ?? [])];
// Legacy Remotion compositions still use the curated scene list independently
// of the additive public master assembly. This is the un-overlapped scene sum;
// TransitionSeries applies its own transition subtraction at render time.
export const CINEMATIC_MASTER_FRAME_COUNT = CINEMATIC_SCENES.reduce((total, scene) => total + scene.frameCount, 0);

export const getCinematicScene = (sceneId: string): CinematicScene => {
  const scene = CINEMATIC_SCENES.find((candidate) => candidate.id === sceneId);
  if (!scene) throw new Error(`Missing cinematic scene: ${sceneId}`);
  return scene;
};

export const getCinematicBridge = (bridgeId: string): CinematicBridge => {
  const bridge = CINEMATIC_BRIDGES.find((candidate) => candidate.id === bridgeId);
  if (!bridge) throw new Error(`Missing cinematic bridge: ${bridgeId}`);
  return bridge;
};

export const getRuntimeFrameUrl = (runtimePath: string, frameIndex: number): string => {
  const cleanPath = runtimePath.replace(/\/+$/, "");
  return `${cleanPath}/f${String(Math.max(0, Math.round(frameIndex)) + 1).padStart(3, "0")}.jpg`;
};

export const runtimeFrameUrlForScene = (scene: CinematicScene, frameIndex: number): string =>
  getRuntimeFrameUrl(scene.runtimePath, frameIndex);

export const GLOBAL_MAX_CACHED_FRAMES = Math.max(
  1,
  Math.round(CINEMATIC_MANIFEST.globalMaxCachedFrames ?? 48),
);
