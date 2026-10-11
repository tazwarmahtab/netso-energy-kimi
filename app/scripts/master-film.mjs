import {createHash} from "node:crypto";
import {copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname, join, resolve} from "node:path";
import {spawnSync} from "node:child_process";
import ts from "typescript";

export const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const MANIFEST_SOURCE_PATH = join(APP_ROOT, "src", "film", "cinematicManifest.json");
export const MASTER_ROOT = join(APP_ROOT, "public", "assets", "v2", "master");
export const MASTER_MANIFEST_PATH = join(APP_ROOT, "src", "film", "masterManifest.json");
export const PUBLIC_MASTER_MANIFEST_PATH = join(MASTER_ROOT, "masterManifest.json");
export const MASTER_FRAMES_DIR = join(MASTER_ROOT, "frames");
export const MASTER_MP4_PATH = join(MASTER_ROOT, "master.mp4");
export const SOURCE_FRAMES_ROOT = join(APP_ROOT, "public", "assets", "v2", "frames");

const frameName = (frameNumber) => `f${String(frameNumber).padStart(3, "0")}.jpg`;
const sourcePath = (sceneId, frameNumber) => join(SOURCE_FRAMES_ROOT, sceneId, frameName(frameNumber));
const outputPath = (frameNumber, root = MASTER_FRAMES_DIR) => join(root, frameName(frameNumber));

export const sha256File = (filePath) => {
  const hash = createHash("sha256");
  hash.update(readFileSync(filePath));
  return hash.digest("hex");
};

export const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

// The full receipt is an editorial artifact, not initial page JavaScript.
export const runtimeManifestFor = (manifest) => Object.fromEntries(
  Object.entries(manifest).filter(([key]) => key !== "provenance"),
);

const loadTimeline = async () => {
  const source = readFileSync(join(APP_ROOT, "src", "film", "masterTimeline.ts"), "utf8");
  const compiled = ts.transpile(source, {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext});
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
};

export const loadAssembly = async () => {
  const input = JSON.parse(readFileSync(MANIFEST_SOURCE_PATH, "utf8"));
  const timeline = await loadTimeline();
  return {input, plan: timeline.createMasterTimeline(input), timeline};
};

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {encoding: "utf8", ...options});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed (${result.status})\n${result.stderr || result.stdout}`);
  return result.stdout || "";
};

export const ffprobe = (filePath, extraArgs = []) => JSON.parse(run("ffprobe", ["-v", "error", "-of", "json", ...extraArgs, filePath]));

export const assertJpeg = (filePath) => {
  if (!existsSync(filePath) || statSync(filePath).size === 0) throw new Error(`Missing or empty JPG: ${filePath}`);
  const probe = ffprobe(filePath, ["-select_streams", "v:0", "-show_entries", "stream=width,height,codec_name"]);
  const stream = probe.streams?.[0];
  if (!stream || stream.codec_name !== "mjpeg" || stream.width !== 1280 || stream.height !== 720) throw new Error(`Invalid 1280x720 JPG: ${filePath}`);
};

const assertJpegHeader = (filePath) => {
  if (!existsSync(filePath) || !statSync(filePath).isFile() || statSync(filePath).size < 4) throw new Error(`Missing or invalid JPG: ${filePath}`);
  const bytes = readFileSync(filePath);
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) throw new Error(`Missing or invalid JPG: ${filePath}`);
};

export const verifyFileReceipt = (filePath, receipt, label) => {
  if (!existsSync(filePath)) throw new Error(`Missing ${label}: ${filePath}`);
  const metadata = statSync(filePath);
  if (!metadata.isFile() || metadata.size !== receipt.size || sha256File(filePath) !== receipt.sha256) throw new Error(`${label} changed: ${filePath}`);
};

export const sourceReceipt = (input) => {
  const scenes = Array.isArray(input.scenes) ? input.scenes : Object.values(input.scenes);
  const selected = ["00-roof-transform", "03-city-to-infrastructure", "04-pergola-payoff", "05-operations-proof", "07-dusk-continues", "06-commercial-trust"];
  const receipt = {};
  for (const sceneId of selected) {
    const scene = scenes.find((candidate) => candidate.id === sceneId);
    const files = [];
    for (let frame = 1; frame <= scene.frameCount; frame += 1) {
      const path = sourcePath(sceneId, frame);
      assertJpegHeader(path);
      files.push({name: frameName(frame), size: statSync(path).size, sha256: sha256File(path)});
    }
    receipt[sceneId] = {runtimePath: scene.runtimePath, sourceStartFrame: scene.sourceStartFrame, sourceEndFrame: scene.sourceEndFrame, frameCount: scene.frameCount, files};
  }
  return receipt;
};

export const expectedOutputFrameNames = (frameCount) => Array.from({length: frameCount}, (_, index) => frameName(index + 1));

const concatListPath = (framesDir) => join(framesDir, ".master-concat.txt");

const writeConcatList = (framesDir, frameCount) => {
  const lines = [];
  for (const name of expectedOutputFrameNames(frameCount)) {
    const path = join(resolve(framesDir), name).replaceAll("'", "'\\''");
    lines.push(`file '${path}'`, "duration 0.0333333333333333");
  }
  const last = join(resolve(framesDir), frameName(frameCount)).replaceAll("'", "'\\''");
  lines.push(`file '${last}'`);
  const path = concatListPath(framesDir);
  writeFileSync(path, `${lines.join("\n")}\n`);
  return path;
};

export const assertContiguousOutputNames = (framesDir, frameCount) => {
  if (!existsSync(framesDir)) throw new Error(`Missing master frames directory: ${framesDir}`);
  const actual = readdirSync(framesDir).filter((name) => /^f\d+\.jpg$/.test(name)).sort((left, right) => Number(left.slice(1, -4)) - Number(right.slice(1, -4)));
  const expected = expectedOutputFrameNames(frameCount);
  if (actual.length !== expected.length || actual.some((name, index) => name !== expected[index])) throw new Error(`Master frame names are not contiguous f001.jpg..f${String(frameCount).padStart(3, "0")}.jpg`);
  for (const name of expected) assertJpegHeader(join(framesDir, name));
};

export const validateSourceSequences = (input) => {
  const scenes = Array.isArray(input.scenes) ? input.scenes : Object.values(input.scenes);
  for (const sceneId of ["00-roof-transform", "03-city-to-infrastructure", "04-pergola-payoff", "05-operations-proof", "07-dusk-continues", "06-commercial-trust"]) {
    const scene = scenes.find((candidate) => candidate.id === sceneId);
    run("ffmpeg", ["-v", "error", "-framerate", "30", "-start_number", "1", "-i", join(SOURCE_FRAMES_ROOT, sceneId, "f%03d.jpg"), "-frames:v", String(scene.frameCount), "-f", "null", "-"]);
    const first = ffprobe(sourcePath(sceneId, 1), ["-select_streams", "v:0", "-show_entries", "stream=width,height,codec_name"]);
    const stream = first.streams?.[0];
    if (!stream || stream.codec_name !== "mjpeg" || stream.width !== 1280 || stream.height !== 720) throw new Error(`Source ${sceneId} is not a decodable 1280x720 JPG sequence`);
  }
};

const endpointPath = (segment, atEnd, plan, tmpDir) => {
  if (segment.kind === "plate") {
    const path = join(tmpDir, `plate-${segment.id}.jpg`);
    if (!existsSync(path)) run("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", `color=c=${segment.color}:s=1280x720`, "-frames:v", "1", "-q:v", "2", path]);
    return path;
  }
  if (segment.kind === "hold") return sourcePath(segment.sceneId, 1);
  const runtimeFrame = atEnd ? segment.frameCount : 1;
  return sourcePath(segment.sceneId, runtimeFrame);
};

const generatePlate = (segment, root) => {
  const temporary = join(root, `.plate-${segment.id}-%03d.jpg`);
  run("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", `color=c=${segment.color}:s=1280x720:r=30`, "-frames:v", String(segment.frameCount), "-q:v", "2", temporary]);
  for (let index = 1; index <= segment.frameCount; index += 1) renameSync(join(root, `.plate-${segment.id}-${String(index).padStart(3, "0")}.jpg`), outputPath(segment.startFrame + index, root));
};

const generateTransition = (segment, plan, root, tmpDir) => {
  const from = plan.segments.find((candidate) => candidate.id === segment.fromSegmentId);
  const to = plan.segments.find((candidate) => candidate.id === segment.toSegmentId);
  if (!from || !to) throw new Error(`Transition ${segment.id} has missing endpoints`);
  const fromPath = outputPath(from.endFrame, root);
  const toPath = endpointPath(to, false, plan, tmpDir);
  const temporary = join(root, `.${segment.id}-%03d.jpg`);
  run("ffmpeg", ["-y", "-loglevel", "error", "-loop", "1", "-i", fromPath, "-loop", "1", "-i", toPath, "-filter_complex", "[0:v][1:v]blend=all_expr='A*(18-N)/19+B*(N+1)/19'", "-frames:v", String(segment.frameCount), "-q:v", "2", temporary]);
  for (let index = 1; index <= segment.frameCount; index += 1) renameSync(join(root, `.${segment.id}-${String(index).padStart(3, "0")}.jpg`), outputPath(segment.startFrame + index, root));
};

export const assembleFrames = (plan, stageFrames, tmpDir) => {
  mkdirSync(stageFrames, {recursive: true});
  mkdirSync(tmpDir, {recursive: true});
  for (const segment of plan.segments) {
    if (segment.kind === "scene") {
      for (let index = 1; index <= segment.frameCount; index += 1) copyFileSync(sourcePath(segment.sceneId, index), outputPath(segment.startFrame + index, stageFrames));
    } else if (segment.kind === "hold") {
      for (let index = 1; index <= segment.frameCount; index += 1) copyFileSync(sourcePath(segment.sceneId, 1), outputPath(segment.startFrame + index, stageFrames));
    } else if (segment.kind === "plate") {
      generatePlate(segment, stageFrames);
    } else {
      generateTransition(segment, plan, stageFrames, tmpDir);
    }
  }
  assertContiguousOutputNames(stageFrames, plan.frameCount);
};

export const encodeMaster = (framesDir, outputPathname, frameCount) => {
  const listPath = writeConcatList(framesDir, frameCount);
  try {
    run("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listPath, "-fps_mode", "cfr", "-r", "30", "-frames:v", String(frameCount), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", outputPathname]);
  } finally {
    rmSync(listPath, {force: true});
  }
};

export const outputReceipt = (framesDir, frameCount) => {
  const frames = {};
  for (const name of expectedOutputFrameNames(frameCount)) {
    const filePath = join(framesDir, name);
    frames[name] = {size: statSync(filePath).size, sha256: sha256File(filePath)};
  }
  return frames;
};

export const verifyDecodedMedia = (framesDir, mp4Path, frameCount) => {
  assertContiguousOutputNames(framesDir, frameCount);
  const listPath = writeConcatList(framesDir, frameCount);
  try {
    run("ffmpeg", ["-v", "error", "-f", "concat", "-safe", "0", "-i", listPath, "-fps_mode", "cfr", "-r", "30", "-frames:v", String(frameCount), "-f", "null", "-"]);
  } finally {
    rmSync(listPath, {force: true});
  }
  const probe = ffprobe(mp4Path, ["-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,nb_read_frames,r_frame_rate"]);
  const stream = probe.streams?.[0];
  if (!stream || stream.codec_name !== "h264" || stream.width !== 1280 || stream.height !== 720 || Number(stream.nb_read_frames) !== frameCount || stream.r_frame_rate !== "30/1") throw new Error(`Master MP4 failed 1280x720@30 decode/count validation: ${JSON.stringify(stream)}`);
  run("ffmpeg", ["-v", "error", "-i", mp4Path, "-f", "null", "-"]);
};

export const corePlan = (manifest) => ({version: manifest.version, fps: manifest.fps, frameWidth: manifest.frameWidth, frameHeight: manifest.frameHeight, runtimePath: manifest.runtimePath, frameCount: manifest.frameCount, poster: manifest.poster, segments: manifest.segments, excludedScenes: manifest.excludedScenes, transitionFrames: manifest.transitionFrames, sourceOrder: manifest.sourceOrder});

export const promote = (stageRoot) => {
  mkdirSync(join(MASTER_ROOT, ".."), {recursive: true});
  const backup = `${MASTER_ROOT}.backup-${process.pid}`;
  if (existsSync(MASTER_ROOT)) renameSync(MASTER_ROOT, backup);
  try {
    renameSync(stageRoot, MASTER_ROOT);
    if (existsSync(backup)) rmSync(backup, {recursive: true, force: true});
  } catch (error) {
    if (!existsSync(MASTER_ROOT) && existsSync(backup)) renameSync(backup, MASTER_ROOT);
    throw error;
  }
};

export const cleanupStage = (stageRoot) => {
  if (stageRoot.includes(".master-staging-")) rmSync(stageRoot, {recursive: true, force: true});
};

export const verifyManifestCore = (manifest, plan) => {
  if (JSON.stringify(corePlan(manifest)) !== JSON.stringify(corePlan(plan))) throw new Error("masterManifest.json plan is stale or has been edited");
};

const main = async () => {
  const {input, plan} = await loadAssembly();
  if (existsSync(MASTER_MANIFEST_PATH)) {
    const reused = spawnSync(process.execPath, [join(APP_ROOT, "scripts", "master-film-verify.mjs")], {cwd: APP_ROOT, encoding: "utf8"});
    if (reused.status === 0) {
      process.stdout.write("master film is unchanged; reused verified output\n");
      return;
    }
  }
  validateSourceSequences(input);
  const stageRoot = `${MASTER_ROOT}.master-staging-${process.pid}`;
  const stageFrames = join(stageRoot, "frames");
  const stageTmp = join(stageRoot, "tmp");
  try {
    if (existsSync(stageRoot)) cleanupStage(stageRoot);
    mkdirSync(stageRoot, {recursive: true});
    assembleFrames(plan, stageFrames, stageTmp);
    const stageMp4 = join(stageRoot, "master.mp4");
    encodeMaster(stageFrames, stageMp4, plan.frameCount);
    verifyDecodedMedia(stageFrames, stageMp4, plan.frameCount);
    const manifest = {
      ...plan,
      provenance: {
        sourceManifestSha256: sha256File(MANIFEST_SOURCE_PATH),
        sourceFrames: sourceReceipt(input),
        outputFrames: outputReceipt(stageFrames, plan.frameCount),
        outputMp4: {size: statSync(stageMp4).size, sha256: sha256File(stageMp4)},
      },
    };
    writeFileSync(join(stageRoot, "masterManifest.json"), stableJson(manifest));
    promote(stageRoot);
    writeFileSync(MASTER_MANIFEST_PATH, stableJson(runtimeManifestFor(manifest)));
    process.stdout.write(`assembled ${plan.frameCount} frames and ${MASTER_MP4_PATH}\n`);
  } catch (error) {
    cleanupStage(stageRoot);
    throw error;
  }
};

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) await main();
