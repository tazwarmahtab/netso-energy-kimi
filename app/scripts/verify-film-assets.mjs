import {existsSync, readdirSync, readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {assertValidSceneRange, curatedVideoPath, hasExpectedFrameNames, resolveManifestSourcePath, runtimeDirectory, sortScenes, shotDerivativePath} from "./film-assets.mjs";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(appRoot, "..");
const manifest = JSON.parse(readFileSync(join(appRoot, "src", "film", "cinematicManifest.json"), "utf8"));

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const probe = (path, options = []) => JSON.parse(execFileSync("ffprobe", [
  "-v", "error",
  ...options,
  "-of", "json",
  path,
], {encoding: "utf8"}));

assert(manifest.fps === 30, "manifest: expected 30 fps");
assert(manifest.frameWidth === 1280 && manifest.frameHeight === 720, "manifest: expected 1280x720 runtime frames");
assert(manifest.globalMaxCachedFrames === 48, "manifest: expected globalMaxCachedFrames=48");
assert(manifest.intro?.sceneId === "01-interior-energy", "manifest: intro scene must be 01-interior-energy");
assert(manifest.intro?.startFrame === 0 && manifest.intro?.endFrame === 35, "manifest: intro range must be 0..35");

const scenes = sortScenes(manifest.scenes);
const expectedSceneOrder = [
  "01-interior-energy",
  "02-unused-roof",
  "00-roof-transform",
  "03-city-to-infrastructure",
  "04-pergola-payoff",
  "05-operations-proof",
  "07-dusk-continues",
  "06-commercial-trust",
];
assert(JSON.stringify(scenes.map((scene) => scene.id)) === JSON.stringify(expectedSceneOrder), "manifest: page order must be interior, unused roof, roof transform, city, payoff, proof, dusk, then meeting");
const expectedBridgeOrder = ["roof-architecture", "architecture-finance", "finance-operations", "operations-assessment"];
assert(JSON.stringify((manifest.bridges ?? []).map((bridge) => bridge.id)) === JSON.stringify(expectedBridgeOrder), "manifest: bridge order is incorrect");

const transitionFrames = 18;
let masterFrameCursor = 0;
const masterRanges = scenes.map((scene, index) => {
  const masterStartFrame = masterFrameCursor;
  const transitionOutFrames = index === scenes.length - 1
    ? 0
    : Math.min(transitionFrames, Math.max(0, scene.frameCount - 1));
  const masterEndFrame = masterStartFrame + scene.frameCount;
  masterFrameCursor = masterEndFrame - transitionOutFrames;
  return {id: scene.id, masterStartFrame, masterEndFrame};
});
const expectedMasterFrameCount = scenes.reduce((total, scene) => total + scene.frameCount, 0) - transitionFrames * (scenes.length - 1);
assert(masterFrameCursor === expectedMasterFrameCount, "master timeline: duration does not match scene frames minus transitions");
assert(masterRanges[0]?.masterStartFrame === 0, "master timeline: first scene must start at frame 0");
for (let index = 1; index < masterRanges.length; index += 1) {
  const previous = masterRanges[index - 1];
  const current = masterRanges[index];
  assert(current.masterStartFrame < previous.masterEndFrame, `master timeline: ${current.id} does not overlap its predecessor`);
  assert(current.masterStartFrame === previous.masterEndFrame - transitionFrames, `master timeline: ${current.id} has an unexpected transition offset`);
}

for (const scene of scenes) {
   assertValidSceneRange(scene);
  assert(scene.runtimePath.startsWith("/assets/v2/frames/"), `${scene.id}: runtimePath is not a curated frame URL`);
  assert(!scene.runtimePath.includes("/assets/frames"), `${scene.id}: runtimePath points at the legacy raw frame path`);
  const posterFrame = Math.max(1, Math.round(scene.posterFrame ?? 1));
  assert(scene.poster === `${scene.runtimePath}/f${String(posterFrame).padStart(3, "0")}.jpg`, `${scene.id}: poster must match posterFrame ${posterFrame}`);

  const rawSourcePath = resolveManifestSourcePath(appRoot, repoRoot, scene.source);
  if (scene.sourceKind === "video") {
    assert(existsSync(rawSourcePath), `${scene.id}: missing source video: ${rawSourcePath}`);
    const sourceMetadata = probe(rawSourcePath, ["-select_streams", "v:0", "-count_frames", "-show_entries", "stream=width,height,nb_read_frames"]);
    const sourceStream = sourceMetadata.streams?.[0];
    assert(sourceStream?.width === 1920 && sourceStream?.height === 1080, `${scene.id}: expected 1920x1080 source video`);
    assert(Number(sourceStream?.nb_read_frames) >= scene.sourceEndFrame, `${scene.id}: source range exceeds source frame count`);
  } else {
    assert(existsSync(rawSourcePath), `${scene.id}: missing image-sequence source: ${rawSourcePath}`);
    for (let index = scene.sourceStartFrame; index <= scene.sourceEndFrame; index += 1) {
      const sourceFrame = join(rawSourcePath, `f${String(index).padStart(3, "0")}.jpg`);
      assert(existsSync(sourceFrame), `${scene.id}: missing source frame ${sourceFrame}`);
    }
  }

   const curatedPath = curatedVideoPath(repoRoot, scene.id);
   assert(existsSync(curatedPath), `${scene.id}: missing curated MP4: ${curatedPath}`);
   const curatedMetadata = probe(curatedPath, ["-select_streams", "v:0", "-count_frames", "-show_entries", "stream=codec_name,width,height,nb_read_frames", "-show_entries", "format=duration"]);
  const curatedStream = curatedMetadata.streams?.[0];
  assert(curatedStream?.codec_name === "h264", `${scene.id}: curated MP4 must be h264`);
  assert(curatedStream?.width === 1920 && curatedStream?.height === 1080, `${scene.id}: curated MP4 must be 1920x1080`);
  assert(Number(curatedStream?.nb_read_frames) === scene.frameCount, `${scene.id}: curated MP4 has ${curatedStream?.nb_read_frames ?? 0} frames, expected ${scene.frameCount}`);
  assert(Math.abs(Number(curatedMetadata.format?.duration) - scene.frameCount / manifest.fps) < 0.08, `${scene.id}: curated MP4 duration does not match frame count`);

  const frameDir = runtimeDirectory(appRoot, scene.runtimePath);
  assert(existsSync(frameDir), `${scene.id}: missing generated frame directory: ${frameDir}`);
  assert(existsSync(join(frameDir, `f${String(posterFrame).padStart(3, "0")}.jpg`)), `${scene.id}: missing generated poster frame ${posterFrame}`);
   const frameNames = readdirSync(frameDir).filter((name) => /^f\d{3}\.jpg$/.test(name)).sort();
   assert(hasExpectedFrameNames(frameDir, scene.frameCount), `${scene.id}: generated frame set is not reusable`);
  assert(frameNames.length === scene.frameCount, `${scene.id}: expected ${scene.frameCount} generated frames, found ${frameNames.length}`);
  for (let index = 1; index <= scene.frameCount; index += 1) {
    const expectedName = `f${String(index).padStart(3, "0")}.jpg`;
    assert(frameNames[index - 1] === expectedName, `${scene.id}: expected contiguous frame ${expectedName}, found ${frameNames[index - 1] ?? "missing"}`);
  }
  const frameMetadata = probe(join(frameDir, "f%03d.jpg"), [
    "-f", "image2",
    "-framerate", String(manifest.fps),
    "-start_number", "1",
    "-count_frames",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height,nb_read_frames",
  ]);
  const frameStream = frameMetadata.streams?.[0];
  assert(Number(frameStream?.nb_read_frames) === scene.frameCount, `${scene.id}: ffprobe read ${frameStream?.nb_read_frames ?? 0} generated frames, expected ${scene.frameCount}`);
  assert(frameStream?.width === manifest.frameWidth && frameStream?.height === manifest.frameHeight, `${scene.id}: expected generated frames to be 1280x720`);
}

for (const scene of scenes) {
  const derivativePath = shotDerivativePath(appRoot, scene.id);
  if (!existsSync(derivativePath)) continue;
  const metadata = probe(derivativePath, ["-select_streams", "v:0", "-count_frames", "-show_entries", "stream=codec_name,width,height,nb_read_frames"]);
  const stream = metadata.streams?.[0];
  assert(stream?.codec_name === "h264", `${scene.id}: derivative shot must be h264`);
  assert(stream?.width === 1920 && stream?.height === 1080, `${scene.id}: derivative shot must be 1920x1080`);
  assert(Number(stream?.nb_read_frames) === scene.frameCount, `${scene.id}: derivative shot frame count does not match approved range`);
}

for (let index = 1; index <= 240; index += 1) {
  const legacyFramePath = join(appRoot, "public", "assets", "frames", `f${String(index).padStart(3, "0")}.jpg`);
  assert(existsSync(legacyFramePath), `missing legacy frame: ${legacyFramePath}`);
}

console.log(`Verified ${scenes.length} curated manifest scenes (${scenes.reduce((total, scene) => total + scene.frameCount, 0)} source frames), one ${expectedMasterFrameCount}-frame master timeline with ${transitionFrames}-frame overlaps, approved posters, runtime frame sets, any present Remotion derivatives, and 240 legacy scroll frames.`);
