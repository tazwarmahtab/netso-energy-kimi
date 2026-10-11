import assert from "node:assert/strict";
import test from "node:test";
import { getCanvasPixelSize, shouldRetryInitialFrame } from "./frameSequenceMath.ts";

test("canvas dimensions recover source-sized pixels after a narrow to wide resize", () => {
  assert.deepEqual(getCanvasPixelSize(360, 640, 1280, 720, 2), { width: 405, height: 720 });
  assert.deepEqual(getCanvasPixelSize(1440, 810, 1280, 720, 2), { width: 1440, height: 810 });
});

test("canvas dimensions clamp invalid resize inputs to a safe bounded surface", () => {
  assert.deepEqual(getCanvasPixelSize(0, -2, 0, 0, 0), { width: 1, height: 1 });
});

test("initial media retry is bounded after one recovery attempt", () => {
  assert.equal(shouldRetryInitialFrame(0), true);
  assert.equal(shouldRetryInitialFrame(1), false);
  assert.equal(shouldRetryInitialFrame(99), false);
});
