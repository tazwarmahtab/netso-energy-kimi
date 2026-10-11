import {execFileSync, spawnSync} from "node:child_process";
import {existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {assertValidSceneRange, curatedVideoPath, hasExpectedFrameNames, resolveManifestSourcePath, runtimeDirectory, sortScenes} from "./film-assets.mjs";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(appRoot, "..");
const manifestPath = join(appRoot, "src", "film", "cinematicManifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const fail = (message) => {
  throw new Error(message);
};

const requireCommand = (command) => {
  const result = spawnSync(command, ["-version"], {stdio: "ignore"});
  if (result.error || result.status !== 0) {
    fail(`${command} is required to render film frames. Install it and ensure it is on PATH.`);
  }
};

const probeVideo = (videoPath, sceneId, expectedDimensions = true) => {
  let metadata;
  try {
    metadata = JSON.parse(execFileSync("ffprobe", [
      "-v", "error",
      "-select_streams", "v:0",
      "-count_frames",
      "-show_entries", "stream=width,height,nb_read_frames",
      "-of", "json",
      videoPath,
    ], {encoding: "utf8"}));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    fail(`${sceneId}: ffprobe could not read ${videoPath}: ${detail}`);
  }

  const stream = metadata.streams?.[0];
  if (!stream) fail(`${sceneId}: ffprobe found no video stream in ${videoPath}`);
  if (expectedDimensions && (stream.width !== 1920 || stream.height !== 1080)) {
    fail(`${sceneId}: expected a 1920x1080 source video, got ${stream.width}x${stream.height}`);
  }

  const frameCount = Number(stream.nb_read_frames);
  if (!Number.isInteger(frameCount) || frameCount < 1) {
    fail(`${sceneId}: ffprobe could not determine a positive frame count for ${videoPath}`);
  }
  return {frameCount, width: Number(stream.width), height: Number(stream.height)};
};

const runFfmpeg = (args, sceneId, outputPath) => {
  const result = spawnSync("ffmpeg", args, {stdio: "inherit"});
  if (result.error) fail(`${sceneId}: ffmpeg could not write ${outputPath}: ${result.error.message}`);
  if (result.status !== 0) fail(`${sceneId}: ffmpeg exited with status ${result.status} while writing ${outputPath}`);
};

const validateScene = (scene) => {
  if (!scene || typeof scene !== "object") fail("manifest contains an invalid scene entry");
  if (!scene.id || !scene.source || !scene.runtimePath) fail("manifest scene is missing id, source, or runtimePath");
  if (scene.sourceKind !== "video" && scene.sourceKind !== "image-sequence") {
    fail(`${scene.id}: sourceKind must be video or image-sequence`);
  }
  try {
    assertValidSceneRange(scene);
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
  if (!scene.runtimePath.startsWith("/assets/v2/frames/") || scene.runtimePath.includes("/assets/frames")) {
    fail(`${scene.id}: runtimePath must be a curated /assets/v2/frames URL, not a legacy raw path`);
  }
  const posterFrame = Math.max(1, Math.round(scene.posterFrame ?? 1));
  if (posterFrame > scene.frameCount || scene.poster !== `${scene.runtimePath}/f${String(posterFrame).padStart(3, "0")}.jpg`) {
    fail(`${scene.id}: poster must point to frame ${posterFrame} in ${scene.runtimePath}`);
  }
};

const validateImageSequence = (sourceDirectory, scene) => {
  if (!existsSync(sourceDirectory)) fail(`${scene.id}: missing image-sequence source directory ${sourceDirectory}`);
  for (let index = scene.sourceStartFrame; index <= scene.sourceEndFrame; index += 1) {
    const sourceFrame = join(sourceDirectory, `f${String(index).padStart(3, "0")}.jpg`);
    if (!existsSync(sourceFrame)) fail(`${scene.id}: missing source frame ${sourceFrame}`);
  }
};

const buildCuratedVideo = (sourcePath, scene) => {
  const outputPath = curatedVideoPath(repoRoot, scene.id);
  const temporaryPath = `${outputPath}.tmp-${process.pid}.mp4`;
  rmSync(temporaryPath, {force: true});

  const commonOutputArgs = [
    "-frames:v", String(scene.frameCount),
    "-r", String(manifest.fps),
    "-fps_mode", "cfr",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-an",
    "-movflags", "+faststart",
    "-y", temporaryPath,
  ];

  if (scene.sourceKind === "image-sequence") {
    runFfmpeg([
      "-hide_banner",
      "-loglevel", "error",
      "-threads", "1",
      "-f", "image2",
      "-framerate", String(manifest.fps),
      "-start_number", String(scene.sourceStartFrame),
      "-i", join(sourcePath, "f%03d.jpg"),
      "-vf", `scale=1920:1080:flags=lanczos,setsar=1`,
      ...commonOutputArgs,
    ], scene.id, outputPath);
  } else {
    const firstInputFrame = scene.sourceStartFrame - 1;
    const lastInputFrame = scene.sourceEndFrame - 1;
    runFfmpeg([
      "-hide_banner",
      "-loglevel", "error",
      "-threads", "1",
      "-i", sourcePath,
      "-map", "0:v:0",
      "-vf", `select=between(n\\,${firstInputFrame}\\,${lastInputFrame}),setpts=N/${manifest.fps}/TB,scale=1920:1080:flags=lanczos,setsar=1`,
      ...commonOutputArgs,
    ], scene.id, outputPath);
  }

  const curated = probeVideo(temporaryPath, `${scene.id} staged curated output`);
  if (curated.frameCount !== scene.frameCount) {
    fail(`${scene.id}: curated MP4 contains ${curated.frameCount} frames, expected ${scene.frameCount}`);
  }
  // Replace only after the staged MP4 has passed validation; raw sources and a
  // previously valid curated MP4 are never removed first.
  renameSync(temporaryPath, outputPath);
};

const hasValidCuratedVideo = (videoPath, scene) => {
  if (!existsSync(videoPath)) return false;
  try {
    return probeVideo(videoPath, `${scene.id} existing curated output`).frameCount === scene.frameCount;
  } catch {
    return false;
  }
};

const renderFrames = (videoPath, outputDir, scene) => {
  const outputPattern = join(outputDir, "f%03d.jpg");
  runFfmpeg([
    "-hide_banner",
    "-loglevel", "error",
    "-threads", "1",
    "-i", videoPath,
    "-map", "0:v:0",
    "-vf", "scale=1280:720:flags=lanczos,setsar=1",
    "-frames:v", String(scene.frameCount),
    "-start_number", "1",
    "-fps_mode", "passthrough",
    "-q:v", "2",
    "-flags:v", "+bitexact",
    "-an",
    "-y",
    outputPattern,
  ], scene.id, outputDir);
};

const validateFrameSet = (outputDir, scene) => {
  if (!hasExpectedFrameNames(outputDir, scene.frameCount)) return false;
  try {
    const metadata = JSON.parse(execFileSync("ffprobe", [
      "-v", "error", "-f", "image2", "-framerate", String(manifest.fps),
      "-start_number", "1", "-count_frames", "-select_streams", "v:0",
      "-show_entries", "stream=width,height,nb_read_frames", "-of", "json",
      join(outputDir, "f%03d.jpg"),
    ], {encoding: "utf8"}));
    const stream = metadata.streams?.[0];
    return Number(stream?.nb_read_frames) === scene.frameCount && stream?.width === manifest.frameWidth && stream?.height === manifest.frameHeight;
  } catch {
    return false;
  }
};

const replaceFrameSet = (videoPath, outputDir, scene) => {
  const parentDirectory = dirname(outputDir);
  const stagedDirectory = join(parentDirectory, `.frames-stage-${scene.id}-${process.pid}`);
  rmSync(stagedDirectory, {recursive: true, force: true});
  mkdirSync(stagedDirectory, {recursive: true});
  try {
    renderFrames(videoPath, stagedDirectory, scene);
    if (!validateFrameSet(stagedDirectory, scene)) {
      fail(`${scene.id}: staged frame set failed validation`);
    }

    const backupDirectory = `${outputDir}.backup-${process.pid}`;
    rmSync(backupDirectory, {recursive: true, force: true});
    let movedExisting = false;
    try {
      if (existsSync(outputDir)) {
        renameSync(outputDir, backupDirectory);
        movedExisting = true;
      }
      renameSync(stagedDirectory, outputDir);
      if (movedExisting) rmSync(backupDirectory, {recursive: true, force: true});
    } catch (error) {
      if (!existsSync(outputDir) && movedExisting && existsSync(backupDirectory)) renameSync(backupDirectory, outputDir);
      throw error;
    }
  } finally {
    rmSync(stagedDirectory, {recursive: true, force: true});
  }
};

try {
  requireCommand("ffprobe");
  requireCommand("ffmpeg");
  if (manifest.fps !== 30 || manifest.frameWidth !== 1280 || manifest.frameHeight !== 720) {
    fail("manifest must use 30 fps and 1280x720 runtime frames");
  }
  if (!Array.isArray(manifest.scenes) || manifest.scenes.length === 0) fail("manifest has no scenes");
  mkdirSync(join(repoRoot, "film", "curated-v2"), {recursive: true});

  const scenes = sortScenes(manifest.scenes);
  const pageOrders = new Set();
  for (const scene of scenes) {
    validateScene(scene);
    if (pageOrders.has(scene.pageOrder)) fail(`${scene.id}: duplicate pageOrder ${scene.pageOrder}`);
    pageOrders.add(scene.pageOrder);

    const sourcePath = resolveManifestSourcePath(appRoot, repoRoot, scene.source);
    if (scene.sourceKind === "image-sequence") {
      validateImageSequence(sourcePath, scene);
    } else {
      if (!existsSync(sourcePath)) fail(`${scene.id}: missing source video ${sourcePath}`);
      const source = probeVideo(sourcePath, scene.id);
      if (scene.sourceEndFrame > source.frameCount) {
        fail(`${scene.id}: source range ends at frame ${scene.sourceEndFrame}, but source has ${source.frameCount} frames`);
      }
    }

    const curatedPath = curatedVideoPath(repoRoot, scene.id);
    if (!hasValidCuratedVideo(curatedPath, scene)) {
      buildCuratedVideo(sourcePath, scene);
    } else {
      console.log(`${scene.id}: reusing validated curated MP4 ${curatedPath}`);
    }
    const outputDir = runtimeDirectory(appRoot, scene.runtimePath);
    if (validateFrameSet(outputDir, scene)) {
      console.log(`${scene.id}: reusing validated ${scene.frameCount}-frame runtime set → ${outputDir}`);
    } else {
      replaceFrameSet(curatedPath, outputDir, scene);
      console.log(`${scene.id}: staged and committed ${scene.frameCount}-frame runtime set → ${outputDir}`);
    }
    console.log(`${scene.id}: curated ${scene.frameCount} frames (${(statSync(curatedPath).size / 1024 / 1024).toFixed(2)} MiB) → ${outputDir}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
