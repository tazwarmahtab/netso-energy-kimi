import { existsSync, mkdirSync, readFileSync, renameSync, rmSync } from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { curatedVideoPath, isDistinctDerivative, resolveManifestSourcePath, shotDerivativePath, sortScenes } from "./film-assets.mjs";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(appRoot, "..");
const manifest = JSON.parse(readFileSync(join(appRoot, "src", "film", "cinematicManifest.json"), "utf8"));

const probeOutput = (output, scene) => {
  try {
    const metadata = JSON.parse(execFileSync("ffprobe", [
      "-v", "error", "-select_streams", "v:0", "-count_frames",
      "-show_entries", "stream=codec_name,width,height,nb_read_frames",
      "-of", "json", output,
    ], {encoding: "utf8"}));
    const stream = metadata.streams?.[0];
    return stream?.codec_name === "h264" && stream.width === 1920 && stream.height === 1080 && Number(stream.nb_read_frames) === scene.frameCount;
  } catch {
    return false;
  }
};

const scenes = sortScenes(manifest.scenes);
const derivativeRoot = join(appRoot, "public", "assets", "v2", "renders", "shots");
mkdirSync(derivativeRoot, {recursive: true});

for (const scene of scenes) {
  const output = shotDerivativePath(appRoot, scene.id);
  const source = curatedVideoPath(repoRoot, scene.id);
  if (!isDistinctDerivative(output, [source, resolveManifestSourcePath(appRoot, repoRoot, scene.source)])) {
    throw new Error(`${scene.id}: derivative output collides with a source path`);
  }
  if (probeOutput(output, scene)) {
    console.log(`${scene.id}: reusing validated derivative ${output}`);
    continue;
  }

  const stagedOutput = `${output}.stage-${process.pid}-${scene.id}.mp4`;
  rmSync(stagedOutput, {force: true});
  const result = spawnSync(
    "npx",
    ["remotion", "render", "src/film/index.ts", `Shot-${scene.id}`, stagedOutput, "--overwrite"],
    {stdio: "inherit", cwd: appRoot},
  );

  if (result.status !== 0 || !existsSync(stagedOutput) || !probeOutput(stagedOutput, scene)) {
    rmSync(stagedOutput, {force: true});
    process.exit(result.status && result.status !== 0 ? result.status : 1);
  }
  // The staged derivative is validated before it can replace an existing one.
  renameSync(stagedOutput, output);
  console.log(`${scene.id}: rendered derivative ${output}`);
}
