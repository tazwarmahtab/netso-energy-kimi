import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync, mkdirSync, writeFileSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {assertContiguousOutputNames, assertJpeg, expectedOutputFrameNames, sha256File, stableJson, verifyFileReceipt, runtimeManifestFor} from "./master-film.mjs";

const inTemp = (callback) => {
  const root = mkdtempSync(join(tmpdir(), "master-test-"));
  try { callback(root); } finally { rmSync(root, {recursive: true, force: true}); }
};

test("master filenames remain numeric-contiguous across the 999/1000 boundary", () => {
  const names = expectedOutputFrameNames(1443);
  assert.equal(names[0], "f001.jpg");
  assert.equal(names[998], "f999.jpg");
  assert.equal(names[999], "f1000.jpg");
  assert.equal(names.at(-1), "f1443.jpg");
  assert.equal(new Set(names).size, 1443);
});

test("frame inventory rejects a missing frame, extra frame, directory, and a decode gap", () => inTemp((root) => {
  assert.throws(() => assertContiguousOutputNames(join(root, "missing"), 1), /Missing/);
  writeFileSync(join(root, "f001.jpg"), "not an image");
  assert.throws(() => assertContiguousOutputNames(root, 2), /contiguous/);
  assert.throws(() => assertContiguousOutputNames(root, 1), /JPG/);
  writeFileSync(join(root, "f003.jpg"), "not an image");
  assert.throws(() => assertContiguousOutputNames(root, 2), /contiguous/);
  rmSync(join(root, "f001.jpg"));
  rmSync(join(root, "f003.jpg"));
  mkdirSync(join(root, "f001.jpg"));
  assert.throws(() => assertContiguousOutputNames(root, 1), /JPG/);
}));

test("provenance verification rejects missing, changed, and empty files, including same-size mutations", () => inTemp((root) => {
  const path = join(root, "receipt.jpg");
  writeFileSync(path, "source-one");
  const receipt = {size: 10, sha256: sha256File(path)};
  assert.doesNotThrow(() => verifyFileReceipt(path, receipt, "source"));
  writeFileSync(path, "source-two");
  assert.throws(() => verifyFileReceipt(path, receipt, "source"), /changed/);
  writeFileSync(path, "");
  assert.throws(() => verifyFileReceipt(path, receipt, "source"), /changed/);
  rmSync(path);
  assert.throws(() => verifyFileReceipt(path, receipt, "source"), /Missing/);
}));

test("JPEG header validation rejects truncated and non-JPEG bytes before decode", () => inTemp((root) => {
  const path = join(root, "f001.jpg");
  writeFileSync(path, Buffer.from([0xff, 0xd8, 0xff, 0xc0, 0x00]));
  assert.throws(() => assertJpeg(path), /JPG/);
  writeFileSync(path, "");
  assert.throws(() => assertJpeg(path), /JPG/);
}));

test("generated JSON is deterministic and timestamp-free", () => {
  const receipt = {version: 1, hashes: ["one", "two"]};
  assert.equal(stableJson(receipt), stableJson(structuredClone(receipt)));
  assert.ok(stableJson(receipt).endsWith("\n"));
  assert.doesNotMatch(stableJson(receipt), /timestamp|createdAt/);
});

test("runtime metadata excludes per-frame receipts without losing playback ranges", () => {
  const receipt = {version: 1, frameCount: 1443, segments: [{id: "sky-opening"}], provenance: {outputFrames: {"f001.jpg": {sha256: "hash"}}}};
  const runtime = runtimeManifestFor(receipt);
  assert.equal(runtime.frameCount, receipt.frameCount);
  assert.deepEqual(runtime.segments, receipt.segments);
  assert.equal("provenance" in runtime, false);
  assert.ok(receipt.provenance);
});
