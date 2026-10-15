import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = (path) => readFileSync(join("src", path), "utf8");

test("V2 chapter contract exists and covers every master-story chapter", () => {
  const chapters = source("components/v2/v2Chapters.ts");
  for (const chapter of ["roof", "architecture", "finance", "operations", "assessment"]) {
    assert.match(chapters, new RegExp(`id: \\"${chapter}\\"`));
  }
  assert.match(chapters, /isV2ChapterId/);
});

test("asset URLs resolve against the configured CDN without double slashes", () => {
  const helper = source("lib/mediaUrl.ts");
  assert.match(helper, /VITE_NETSO_ASSET_BASE_URL/);
  assert.match(helper, /normalizedPath/);
  assert.match(helper, /return `\$\{base\}\$\{normalizedPath\}`/);
});

test("public claims use qualified language for modeled commercial outcomes", () => {
  const files = ["Home.tsx", "Product.tsx", "Calculator.tsx", "Partners.tsx", "Insights.tsx"];
  const pages = files.map((file) => readFileSync(join("src/pages", file), "utf8")).join("\n");
  assert.doesNotMatch(pages, /30% Guaranteed Savings/);
  assert.doesNotMatch(pages, /EU CBAM Compliant/);
  assert.doesNotMatch(pages, /64\.8 kW/);
  assert.match(pages, /illustrative|subject to site survey|executed PPA/i);
});
