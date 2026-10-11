import assert from "node:assert/strict";
import test from "node:test";
import {
  getMasterFrameProgress,
  getMasterMarkerTopVh,
  getMasterScrollMap,
  getMasterSliceAtFrame,
  getScrollPositionForSegment,
  masterFrameForProgress,
  masterFrameForScroll,
  restoreMasterPlayhead,
} from "./masterStoryHelper.ts";

const manifest = {
  version: 1,
  fps: 30,
  frameWidth: 1280,
  frameHeight: 720,
  runtimePath: "/assets/v2/master/frames",
  frameCount: 1443,
  poster: "/assets/v2/master/frames/f001.jpg",
  segments: [
    { id: "sky-opening", kind: "hold", chapter: "roof", startFrame: 0, endFrame: 60, frameCount: 60, poster: "sky.jpg", evidenceLabel: "Concept visualization" },
    { id: "roof-transform", kind: "scene", chapter: "roof", startFrame: 60, endFrame: 300, frameCount: 240, sceneId: "00-roof-transform", poster: "roof.jpg", evidenceLabel: "Concept visualization" },
    { id: "city-infrastructure", kind: "scene", chapter: "architecture", startFrame: 318, endFrame: 498, frameCount: 180, sceneId: "03-city-to-infrastructure", poster: "city.jpg", evidenceLabel: "Concept visualization" },
    { id: "finance", kind: "plate", chapter: "finance", startFrame: 685, endFrame: 805, frameCount: 120, poster: "finance.jpg", evidenceLabel: "Illustrative index / no tariff or live quote" },
  ],
  excludedScenes: [{ sceneId: "01-interior-energy", reason: "Sky-first opening removes the interior prelude." }],
};

test("master map preserves zero-based inclusive/exclusive boundaries and transition gaps", () => {
  const map = getMasterScrollMap(manifest);
  const transition = getMasterSliceAtFrame(300, map, manifest);
  assert.equal(transition?.kind, "transition");
  assert.equal(transition?.startFrame, 300);
  assert.equal(transition?.endFrame, 318);
  assert.equal(getMasterSliceAtFrame(317, map, manifest)?.kind, "transition");
  assert.equal(getMasterSliceAtFrame(318, map, manifest)?.segmentId, "city-infrastructure");
});

test("progress mapping clamps, reaches the final frame, and holds finance longer", () => {
  const map = getMasterScrollMap(manifest);
  assert.equal(masterFrameForProgress(-1, map, manifest), 0);
  assert.equal(masterFrameForProgress(1, map, manifest), 804);
  assert.equal(getScrollPositionForSegment("finance", map) > getScrollPositionForSegment("city-infrastructure", map), true);
  assert.equal(getMasterMarkerTopVh("finance", map), getScrollPositionForSegment("finance", map));
  const financeStart = getScrollPositionForSegment("finance", map);
  const financeSlice = map.slices.find((slice) => slice.id === "finance-leave");
  assert.ok(financeSlice);
  assert.equal(masterFrameForScroll(financeStart, map, manifest), 685);
  assert.equal(masterFrameForScroll(financeSlice.scrollEnd - 0.001, map, manifest), 804);
});

test("segment progress clamps at both ends while reverse scrolling remains deterministic", () => {
  const segment = manifest.segments[1];
  assert.equal(getMasterFrameProgress(10, segment, manifest), 0);
  assert.equal(getMasterFrameProgress(299, segment, manifest), 1);
  assert.equal(getMasterFrameProgress(60, segment, manifest), 0);
});

test("restored deep links recover both scroll position and frame inside finance", () => {
  const map = getMasterScrollMap(manifest);
  const financeScroll = getScrollPositionForSegment("finance", map);
  const restored = restoreMasterPlayhead(financeScroll / map.totalScroll, map, manifest);

  assert.equal(restored.scrollPosition, financeScroll);
  assert.equal(restored.frame, 685);
});
