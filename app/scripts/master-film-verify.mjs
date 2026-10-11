import {existsSync, readFileSync, statSync} from "node:fs";
import {join, resolve} from "node:path";
import {
  APP_ROOT,
  MANIFEST_SOURCE_PATH,
  MASTER_FRAMES_DIR,
  MASTER_MANIFEST_PATH,
  PUBLIC_MASTER_MANIFEST_PATH,
  MASTER_MP4_PATH,
  assertContiguousOutputNames,
  loadAssembly,
  outputReceipt,
  sha256File,
  sourceReceipt,
  verifyDecodedMedia,
  verifyFileReceipt,
  verifyManifestCore,
  validateSourceSequences,
  runtimeManifestFor,
} from "./master-film.mjs";

const main = async () => {
  if (!existsSync(MASTER_MANIFEST_PATH)) throw new Error(`Missing generated master manifest: ${MASTER_MANIFEST_PATH}`);
  const runtime = JSON.parse(readFileSync(MASTER_MANIFEST_PATH, "utf8"));
  if (!existsSync(PUBLIC_MASTER_MANIFEST_PATH)) throw new Error(`Missing public generated master manifest: ${PUBLIC_MASTER_MANIFEST_PATH}`);
  const manifest = JSON.parse(readFileSync(PUBLIC_MASTER_MANIFEST_PATH, "utf8"));
  if (JSON.stringify(runtimeManifestFor(manifest)) !== JSON.stringify(runtime)) throw new Error("public receipt and runtime master manifest differ");
  const {input, plan} = await loadAssembly();
  verifyManifestCore(manifest, plan);
  if (manifest.provenance?.sourceManifestSha256 !== sha256File(MANIFEST_SOURCE_PATH)) throw new Error("cinematicManifest.json changed since master assembly");
  validateSourceSequences(input);
  const expectedSources = sourceReceipt(input);
  if (JSON.stringify(manifest.provenance.sourceFrames) !== JSON.stringify(expectedSources)) throw new Error("curated source frames are missing or changed");
  assertContiguousOutputNames(MASTER_FRAMES_DIR, manifest.frameCount);
  verifyDecodedMedia(MASTER_FRAMES_DIR, MASTER_MP4_PATH, manifest.frameCount);
  const expectedOutputs = outputReceipt(MASTER_FRAMES_DIR, manifest.frameCount);
  if (JSON.stringify(manifest.provenance.outputFrames) !== JSON.stringify(expectedOutputs)) throw new Error("master JPG output frames are stale or modified");
  verifyFileReceipt(MASTER_MP4_PATH, manifest.provenance.outputMp4, "master MP4");
  process.stdout.write(`verified master: ${manifest.frameCount} JPG frames, ${statSync(MASTER_MP4_PATH).size} bytes MP4, sources and outputs unchanged\n`);
};

if (resolve(process.argv[1] ?? "") === join(APP_ROOT, "scripts", "master-film-verify.mjs")) await main();
