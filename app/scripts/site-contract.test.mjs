import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");

test("public marketing pages avoid high-risk absolute claim strings", () => {
  const files = ["Home.tsx", "Product.tsx", "Calculator.tsx", "Partners.tsx", "Insights.tsx", "About.tsx"];
  const pages = files.map((file) => read(join("src/pages", file))).join("\n");
  assert.doesNotMatch(pages, /30% Guaranteed Savings/);
  assert.doesNotMatch(pages, /EU CBAM Compliant/);
  assert.doesNotMatch(pages, /64\.8 kW/);
  assert.doesNotMatch(pages, /IDCOL CONCESSIONARY DEBT QUALIFIED/i);
  assert.doesNotMatch(pages, /35% Instant Cut/);
  assert.match(pages, /illustrative|subject to (site survey|executed PPA)|executed PPA|Under appraisal/i);
});

test("browser lead bridge never embeds Notion API secrets", () => {
  const notion = read("src/lib/notion.ts");
  const lead = read("src/lib/lead-intake.ts");
  assert.doesNotMatch(notion, /VITE_NOTION_API_KEY/);
  assert.doesNotMatch(lead, /VITE_NOTION_API_KEY/);
  assert.match(lead, /VITE_LEAD_INTAKE_ENDPOINT/);
  assert.match(notion, /submitLead/);
});

test("SPA rewrite config exists for Vercel deep links", () => {
  const cfg = read("../vercel.json");
  assert.match(cfg, /index\.html/);
  assert.match(cfg, /rewrites/);
});
