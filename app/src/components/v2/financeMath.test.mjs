import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateFinanceSummary,
  createIndexedPoints,
  ILLUSTRATIVE_ASSUMPTIONS,
  pointsToSvgPath,
} from "./financeMath.ts";

test("illustrative finance summary keeps the whole-bill remainder visible", () => {
  const summary = calculateFinanceSummary(ILLUSTRATIVE_ASSUMPTIONS);

  assert.equal(summary.solarPortionBaseline, 50_000);
  assert.equal(summary.solarPortionCost, 35_000);
  assert.equal(summary.monthlySaving, 15_000);
  assert.equal(summary.cumulativeSaving, 3_600_000);
});

test("indexed chart points stay flat and end at year 20", () => {
  const points = createIndexedPoints(20);

  assert.deepEqual(points, [0, 5, 10, 15, 20].map((year) => ({ year, gridIndex: 100, solarIndex: 70 })));
  assert.equal(pointsToSvgPath(points, "gridIndex", { left: 10, top: 10, width: 100, height: 100, maxIndex: 100 }), "M10.00 10.00 L35.00 10.00 L60.00 10.00 L85.00 10.00 L110.00 10.00");
});
