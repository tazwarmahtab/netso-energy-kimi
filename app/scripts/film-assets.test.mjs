import test from "node:test";
import assert from "node:assert/strict";
import {hasExpectedFrameNames, isDistinctDerivative, pathInside, assertValidSceneRange, runtimeDirectory, shotDerivativePath} from "./film-assets.mjs";
import {mkdirSync, mkdtempSync, writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";

test("accepts inclusive ranges only when count matches", () => {
  assert.equal(assertValidSceneRange({id: "shot", sourceStartFrame: 161, sourceEndFrame: 221, frameCount: 61}), 61);
  assert.throws(() => assertValidSceneRange({id: "shot", sourceStartFrame: 161, sourceEndFrame: 221, frameCount: 60}), /does not match/);
  assert.throws(() => assertValidSceneRange({id: "shot", sourceStartFrame: 0, sourceEndFrame: 1, frameCount: 2}), /1-based/);
});

test("rejects paths outside approved roots", () => {
  assert.throws(() => pathInside("/tmp/film", "../source.mp4"), /escapes root/);
  assert.throws(() => runtimeDirectory("/tmp/app", "/assets/frames/legacy"), /runtimePath/);
  assert.throws(() => runtimeDirectory("/tmp/app", "/assets/v2/frames/../../secret"), /escapes root/);
  assert.throws(() => shotDerivativePath("/tmp/app", "../source"), /unsafe scene id/);
});

test("derivative shot paths never equal source paths", () => {
  const appRoot = "/workspace/app";
  const derivative = shotDerivativePath(appRoot, "01-interior-energy");
  assert.ok(isDistinctDerivative(derivative, ["/workspace/film/curated-v2/01-interior-energy.mp4", "/workspace/app/public/assets/v2/netso-shot-01-interior-energy.mp4"]));
  assert.match(derivative, /public\/assets\/v2\/renders\/shots\/netso-shot-01-interior-energy\.mp4$/);
});

test("reuses a complete output set and rejects incomplete work", () => {
  const outputDir = mkdtempSync(join(tmpdir(), "film-output-"));
  for (let index = 1; index <= 3; index += 1) writeFileSync(join(outputDir, `f${String(index).padStart(3, "0")}.jpg`), "valid");
  assert.equal(hasExpectedFrameNames(outputDir, 3), true);
  writeFileSync(join(outputDir, "f002.jpg"), "");
  assert.equal(hasExpectedFrameNames(outputDir, 3), false);
  mkdirSync(join(outputDir, "nested"));
  assert.equal(hasExpectedFrameNames(outputDir, 3), false);
});
