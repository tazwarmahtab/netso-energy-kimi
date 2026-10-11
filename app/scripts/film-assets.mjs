import {existsSync, readdirSync, statSync} from "node:fs";
import {join, relative, resolve, sep} from "node:path";

const safeSceneIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const assertSafeSceneId = (sceneId) => {
  if (typeof sceneId !== "string" || !safeSceneIdPattern.test(sceneId)) {
    throw new Error(`unsafe scene id: ${String(sceneId)}`);
  }
  return sceneId;
};

export const sortScenes = (scenes) => [...scenes].sort((left, right) => left.pageOrder - right.pageOrder);

export const assertValidSceneRange = (scene) => {
  if (!scene || typeof scene !== "object") throw new Error("manifest contains an invalid scene entry");
  if (!Number.isInteger(scene.sourceStartFrame) || !Number.isInteger(scene.sourceEndFrame)) {
    throw new Error(`${scene.id}: source range must use integer frame numbers`);
  }
  if (scene.sourceStartFrame < 1 || scene.sourceEndFrame < scene.sourceStartFrame) {
    throw new Error(`${scene.id}: source range must be a 1-based inclusive range`);
  }
  const expectedCount = scene.sourceEndFrame - scene.sourceStartFrame + 1;
  if (scene.frameCount !== expectedCount) {
    throw new Error(`${scene.id}: frameCount ${scene.frameCount} does not match inclusive range count ${expectedCount}`);
  }
  return expectedCount;
};

export const pathInside = (root, ...parts) => {
  const resolvedRoot = resolve(root);
  const candidate = resolve(resolvedRoot, ...parts);
  const relativePath = relative(resolvedRoot, candidate);
  if (relativePath === ".." || relativePath.startsWith(`..${sep}`) || relativePath.startsWith(sep)) {
    throw new Error(`path escapes root ${resolvedRoot}: ${candidate}`);
  }
  return candidate;
};

export const resolveManifestSourcePath = (appRoot, repoRoot, source) => {
  if (typeof source !== "string") throw new Error("manifest source must be a string");
  if (source.startsWith("/assets/")) return pathInside(join(appRoot, "public"), source.slice(1));
  return pathInside(repoRoot, source);
};

export const runtimeDirectory = (appRoot, runtimePath) => {
  const runtimeRoot = join(appRoot, "public", "assets", "v2", "frames");
  const runtimePrefix = "/assets/v2/frames";
  if (typeof runtimePath !== "string" || !runtimePath.startsWith(`${runtimePrefix}/`)) {
    throw new Error(`runtimePath must stay under /assets/v2/frames/: ${String(runtimePath)}`);
  }
  return pathInside(runtimeRoot, runtimePath.slice(`${runtimePrefix}/`.length));
};

export const curatedVideoPath = (repoRoot, sceneId) =>
  pathInside(join(repoRoot, "film", "curated-v2"), `${assertSafeSceneId(sceneId)}.mp4`);

export const shotDerivativePath = (appRoot, sceneId) =>
  pathInside(join(appRoot, "public", "assets", "v2", "renders", "shots"), `netso-shot-${assertSafeSceneId(sceneId)}.mp4`);

export const frameName = (index) => `f${String(index).padStart(3, "0")}.jpg`;

export const hasExpectedFrameNames = (outputDir, frameCount) => {
  if (!existsSync(outputDir)) return false;
  const expectedNames = Array.from({length: frameCount}, (_, index) => frameName(index + 1));
  const actualNames = readdirSync(outputDir).filter((name) => /^f\d{3}\.jpg$/.test(name)).sort();
  if (actualNames.length !== expectedNames.length || actualNames.some((name, index) => name !== expectedNames[index])) return false;
  try {
    return expectedNames.every((name) => {
      const path = join(outputDir, name);
      const metadata = statSync(path);
      return metadata.isFile() && metadata.size > 0;
    });
  } catch {
    return false;
  }
};

export const isDistinctDerivative = (derivativePath, sourcePaths) =>
  sourcePaths.every((sourcePath) => resolve(derivativePath) !== resolve(sourcePath));
