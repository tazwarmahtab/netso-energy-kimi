import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";

const timelineSource = readFileSync(new URL("../src/film/masterTimeline.ts", import.meta.url), "utf8");
const compiled = ts.transpile(timelineSource, {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext});
const {createMasterTimeline, getMasterFrameMapping, getMasterSegment} = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const input = JSON.parse(readFileSync(new URL("../src/film/cinematicManifest.json", import.meta.url), "utf8"));
const clone = () => structuredClone(input);
const approved = ["00-roof-transform", "03-city-to-infrastructure", "04-pergola-payoff", "05-operations-proof", "07-dusk-continues", "06-commercial-trust"];

test("approved story has contiguous, disjoint ranges and computes 1,443 frames", () => {
  const plan = createMasterTimeline(input);
  assert.equal(plan.frameCount, 1443);
  assert.equal(plan.version, 1);
  assert.equal(plan.runtimePath, "/assets/v2/master/frames");
  assert.equal(plan.poster, "/assets/v2/master/frames/f001.jpg");
  assert.equal(plan.segments.length, 16);
  let cursor = 0;
  for (const segment of plan.segments) {
    assert.equal(segment.startFrame, cursor);
    assert.equal(segment.endFrame - segment.startFrame, segment.frameCount);
    assert.match(segment.poster, /^\/assets\/v2\/master\/frames\/f\d{3,4}\.jpg$/);
    cursor = segment.endFrame;
  }
  assert.equal(cursor, plan.frameCount);
  assert.deepEqual(plan.segments.filter((s) => s.kind === "scene").map((s) => s.sceneId), approved);
  assert.deepEqual(plan.segments.filter((s) => s.kind !== "transition").map((s) => s.id), ["sky-opening", "roof-transform", "city-infrastructure", "pergola-payoff", "finance", "operations", "dusk", "decision", "assessment"]);
});

test("every approved source frame is copied once in its full scene range", () => {
  const plan = createMasterTimeline(input);
  for (const sceneId of approved) {
    const source = input.scenes.find((s) => s.id === sceneId);
    const segment = plan.segments.find((s) => s.kind === "scene" && s.sceneId === sceneId);
    assert.equal(segment.frameCount, source.frameCount);
    assert.equal(segment.sourceStartFrame, source.sourceStartFrame);
    assert.equal(segment.sourceEndFrame, source.sourceEndFrame);
    for (let offset = 0; offset < source.frameCount; offset += 1) {
      const mapping = getMasterFrameMapping(plan, segment.startFrame + offset);
      assert.equal(mapping.kind, "scene");
      assert.equal(mapping.sceneId, sceneId);
      assert.equal(mapping.runtimeFrameNumber, offset + 1);
      assert.equal(mapping.sourceFrameNumber, source.sourceStartFrame + offset);
      assert.equal(mapping.sourceUrl, `${source.runtimePath}/f${String(offset + 1).padStart(3, "0")}.jpg`);
    }
  }
  const decision = plan.segments.find((s) => s.id === "decision");
  assert.equal(getMasterFrameMapping(plan, decision.startFrame).sourceFrameNumber, 161);
  assert.equal(getMasterFrameMapping(plan, decision.endFrame - 1).sourceFrameNumber, 221);
});

test("sky hold is lossless first-frame continuity and plates contain no baked text", () => {
  const plan = createMasterTimeline(input);
  const hold = plan.segments[0];
  assert.equal(hold.id, "sky-opening");
  assert.equal(hold.frameCount, 60);
  assert.equal(plan.segments[1].id, "roof-transform");
  for (let frame = 0; frame < hold.frameCount; frame += 1) {
    assert.equal(getMasterFrameMapping(plan, frame).sourceUrl, "/assets/v2/frames/00-roof-transform/f001.jpg");
  }
  const plates = plan.segments.filter((s) => s.kind === "plate");
  assert.deepEqual(plates.map((s) => [s.id, s.frameCount, s.color]), [["finance", 120, "#f6efe2"], ["assessment", 30, "#f6efe2"]]);
  assert.ok(plates.every((s) => /text-free/i.test(s.evidenceLabel)));
});

test("editorial bridges are additive endpoint dissolves with truthful combined evidence", () => {
  const plan = createMasterTimeline(input);
  const transitions = plan.segments.filter((s) => s.kind === "transition");
  assert.equal(transitions.length, 7);
  for (const segment of transitions) {
    assert.equal(segment.frameCount, 18);
    assert.equal(segment.style, "endpoint-dissolve");
    assert.match(segment.evidenceLabel, /Editorial bridge/);
    const from = getMasterFrameMapping(plan, segment.startFrame - 1);
    const to = getMasterFrameMapping(plan, segment.endFrame);
    const first = getMasterFrameMapping(plan, segment.startFrame);
    const last = getMasterFrameMapping(plan, segment.endFrame - 1);
    assert.equal(first.kind, "transition");
    assert.equal(first.blend, 1 / 19);
    assert.equal(last.blend, 18 / 19);
    assert.equal(first.from.sourceUrl ?? first.from.color, from.sourceUrl ?? from.color);
    assert.equal(first.to.sourceUrl ?? first.to.color, to.sourceUrl ?? to.color);
    assert.equal(getMasterSegment(plan, segment.startFrame).id, segment.id);
    assert.notEqual(getMasterSegment(plan, segment.endFrame).id, segment.id);
  }
  assert.match(transitions.find((s) => s.toSegmentId === "operations").evidenceLabel, /Text-free editorial plate.*Supplied-footage context/);
  assert.match(transitions.find((s) => s.fromSegmentId === "pergola-payoff").evidenceLabel, /Concept visualization.*Text-free editorial plate/);
  assert.equal(createMasterTimeline(input, 0).frameCount, 1317);
});

test("alternate preludes are explicitly excluded and input ordering is irrelevant", () => {
  const plan = createMasterTimeline(input);
  assert.deepEqual(plan.excludedScenes.map((s) => s.sceneId), ["01-interior-energy", "02-unused-roof"]);
  for (const exclusion of plan.excludedScenes) assert.match(exclusion.reason, /optional alternate prelude conflicts with sky-first quality bar/i);
  const reversed = clone();
  reversed.scenes.reverse();
  assert.deepEqual(createMasterTimeline(reversed), plan);
  const record = clone();
  record.scenes = Object.fromEntries(record.scenes.map((s) => [s.id, s]));
  assert.deepEqual(createMasterTimeline(record), plan);
  assert.deepEqual(input, clone(), "planner must not mutate source manifest");
});

test("invalid ranges, inputs, duplicate/unknown scenes, and playhead frames fail explicitly", () => {
  for (const value of [-1, 1.1, NaN, Infinity, "18"]) assert.throws(() => createMasterTimeline(input, value), /transition/i);
  for (const value of [null, {}, {...input, fps: 24}, {...input, frameWidth: 1920}]) assert.throws(() => createMasterTimeline(value), /manifest|30 fps|1280/i);
  const missing = clone();
  missing.scenes = missing.scenes.filter((s) => s.id !== "05-operations-proof");
  assert.throws(() => createMasterTimeline(missing), /Missing.*05-operations-proof/);
  const duplicate = clone();
  duplicate.scenes.push(duplicate.scenes[0]);
  assert.throws(() => createMasterTimeline(duplicate), /Duplicate/);
  const unknown = clone();
  unknown.scenes.push({...unknown.scenes[0], id: "09-unreviewed"});
  assert.throws(() => createMasterTimeline(unknown), /Unreviewed/);
  for (const change of [{sourceStartFrame: 0}, {frameCount: 239}, {sourceEndFrame: 239}, {runtimePath: "/assets/v2/frames/../escape"}, {evidenceLabel: ""}]) {
    const invalid = clone();
    Object.assign(invalid.scenes[0], change);
    assert.throws(() => createMasterTimeline(invalid));
  }
  const plan = createMasterTimeline(input);
  for (const frame of [-1, 0.5, NaN, Infinity, plan.frameCount]) assert.throws(() => getMasterFrameMapping(plan, frame), /frame/i);
});
