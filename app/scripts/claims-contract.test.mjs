/**
 * Claims contract — guards the commercial language this repository is allowed
 * to ship.
 *
 * Netso's standing rules (ROADMAP.md → "Company Ground Truth"):
 *   1. Never publish a per-unit / per-kWh electricity rate.
 *   2. IDCOL financing is *applied for / under appraisal* — never "qualified",
 *      "approved", or "secured".
 *   3. Performance, telemetry and savings visuals are illustrative unless an
 *      executed agreement is cited. Savings are never described as
 *      "guaranteed" or "locked" in marketing copy — an executed agreement
 *      may contain a guarantee, a page may not promise one.
 *   4. Performance, telemetry and savings visuals are illustrative unless an
 *      executed agreement is cited.
 *   5. Documentation must not link to developer-machine absolute paths.

 * Why this file is stricter than it looks: the "30% Guaranteed" string had
 * been live in SavingsCalculator (embedded at /calculator) and
 * FeasibilityModal (opened from every glass page's CTA) for months while
 * every rule above passed, because none of them looked for guarantee
 * language. Tests are cheap; a credit committee finding is not.
 *
 * Run with: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url)); // app/scripts
const appRoot = path.resolve(here, ".."); // app/
const repoRoot = path.resolve(appRoot, ".."); // repo root

const DOCS = ["README.md", "ROADMAP.md", "VISUAL-CONTINUITY.md"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx"]);

/** Files under app/src, recursively. */
function collectSources(dir = path.join(appRoot, "src")) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...collectSources(absolute));
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      found.push(absolute);
    }
  }
  return found;
}

function readDoc(name) {
  return readFileSync(path.join(repoRoot, name), "utf8");
}

/**
 * Returns `{ file, line, text }` for every line that matches `pattern` and is
 * not explicitly opted out with a `claims-guard: allow` marker.
 */
function findViolations(files, pattern) {
  const violations = [];
  for (const file of files) {
    const contents = readFileSync(file, "utf8");
    contents.split("\n").forEach((text, index) => {
      if (!pattern.test(text)) return;
      if (text.includes("claims-guard: allow")) return;
      violations.push({
        file: path.relative(repoRoot, file),
        line: index + 1,
        text: text.trim(),
      });
    });
    pattern.lastIndex = 0;
  }
  return violations;
}

function format(violations) {
  return violations
    .map((v) => `  ${v.file}:${v.line}\n    ${v.text}`)
    .join("\n");
}

const docsAndSources = [
  ...DOCS.map((name) => path.join(repoRoot, name)),
  ...collectSources(),
];

test("no per-unit / per-kWh electricity rate is published", () => {
  const violations = findViolations(
    docsAndSources,
    /(?:৳|Tk\.?|BDT)?\s*\d[\d,]*(?:\.\d+)?\s*(?:\/|per\s+)\s*kWh/gi,
  );
  assert.equal(
    violations.length,
    0,
    `Banned per-kWh rate found — express the discount as a percentage of the applicable grid tariff instead:\n${format(violations)}`,
  );
});

test("IDCOL financing is described as applied / under appraisal, never as secured", () => {
  const unhedged = [
    /qualified (?:for|under)\s+(?:the\s+)?IDCOL/i,
    /IDCOL[^.\n]{0,40}\bqualified\b/i,
    /IDCOL-backed agreement/i,
    /IDCOL[^.\n]{0,30}\b(?:approved|secured|committed)\b/i,
  ];

  for (const pattern of unhedged) {
    const violations = findViolations(docsAndSources, pattern);
    assert.equal(
      violations.length,
      0,
      `Unhedged IDCOL financing claim — use "applied for / under appraisal":\n${format(violations)}`,
    );
  }

  // Documentation is the canonical statement of record, so every IDCOL
  // mention that carries a facility figure must sit next to a hedge word on
  // the same line. (App copy is de-risked separately in the claims pass; it
  // is still covered by the hard bans above and the per-kWh rule.)
  const hedge =
    /appl(?:ied|ication)|apprais|awaiting|indicative|under review|pending|not (?:a )?committed|no rates? (?:are )?disclosed/i;
  const facilityClaim = /IDCOL[^.\n]{0,60}(?:80%|senior[- ]debt|senior[- ]debt facility|\d\.\d%[^.\n]{0,10}\d\.\d%)/i;

  const violations = [];
  for (const name of DOCS) {
    const contents = readFileSync(path.join(repoRoot, name), "utf8");
    contents.split("\n").forEach((text, index) => {
      if (!facilityClaim.test(text)) return;
      if (hedge.test(text)) return;
      if (text.includes("claims-guard: allow")) return;
      violations.push({ file: name, line: index + 1, text: text.trim() });
    });
  }

  assert.equal(
    violations.length,
    0,
    `IDCOL facility figure without an appraisal hedge on the same line:\n${format(violations)}`,
  );
});

test("performance and telemetry figures are labelled illustrative", () => {
  // A doc line may cite a headline performance number only if that same line
  // qualifies it. Keeps "98% load match" from reading as a measured result.
  const figure = /(?:^|[^a-z\d])(?:98%|104%|81\.4%|64\.8 kW)/i;
  const qualifier =
    /illustrative|modelled|modeled|target|indicative|concept|assum(?:ed|ption)|site-dependent|sample|example/i;

  const violations = [];
  for (const name of DOCS) {
    const absolute = path.join(repoRoot, name);
    readFileSync(absolute, "utf8")
      .split("\n")
      .forEach((text, index) => {
        if (!figure.test(text)) return;
        if (qualifier.test(text)) return;
        if (text.includes("claims-guard: allow")) return;
        violations.push({ file: name, line: index + 1, text: text.trim() });
      });
  }

  assert.equal(
    violations.length,
    0,
    `Unqualified performance figure in docs — label it illustrative or modelled:\n${format(violations)}`,
  );
});


test("savings and returns are never described as guaranteed", () => {
  // Applies to source and docs. An executed PPA may contain a guarantee; a
  // marketing page may not promise one, and "guaranteed" next to a savings
  // percentage is the specific failure this rule exists for.
  const patterns = [
    /\bguarantee(?:d|s)?\b[^.\n]{0,40}?\b(?:savings?|discounts?|reductions?|returns?|yields?|uptime|generation|tariff)\b/i,
    /\b(?:savings?|discounts?|reductions?)\b[^.\n]{0,40}?\bguarantee(?:d)?\b/i,
    /\b(?:savings?|discount|return)\s+guarantee\b/i,
    /\bguaranteed\s+(?:reduction|discount|savings|hedge)\b/i,
    /\bcontractually[- ]guaranteed\b/i,
    /\b30%\s*guaranteed\b/i,
  ];

  for (const pattern of patterns) {
    const violations = findViolations(docsAndSources, pattern);
    assert.equal(
      violations.length,
      0,
      `Guarantee language attached to a savings claim — say "discount basis" or "modelled" instead:\n${format(violations)}`,
    );
  }
});

test("IDCOL is never described as compliant, executed or in place", () => {
  // The facility is applied for and under appraisal. Anything that reads as
  // a settled IDCOL pillar — "IDCOL-compliant", "executed IDCOL terms" — is
  // a claim we cannot support today.
  const patterns = [
    /IDCOL[- ]compliant/i,
    /executed[^.\n]{0,25}IDCOL/i,
    /IDCOL[^.\n]{0,25}executed/i,
    /IDCOL[^.\n]{0,25}\bin place\b/i,
  ];

  for (const pattern of patterns) {
    const violations = findViolations(docsAndSources, pattern);
    assert.equal(
      violations.length,
      0,
      `IDCOL described as concluded — use "applied for / under appraisal":\n${format(violations)}`,
    );
  }
});

test("documentation does not link to developer-machine absolute paths", () => {
  const violations = findViolations(
    DOCS.map((name) => path.join(repoRoot, name)),
    /file:\/\/\/|\/Users\/[^/\s]+\//,
  );
  assert.equal(
    violations.length,
    0,
    `Absolute local path in docs — use a repository-relative link:\n${format(violations)}`,
  );
});

test("no oversized media is committed to app/public", () => {
  const LIMIT_BYTES = 10 * 1024 * 1024; // 10 MB
  const root = path.join(appRoot, "public");
  const oversized = [];

  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(absolute);
      } else {
        const { size } = statSync(absolute);
        if (size > LIMIT_BYTES) {
          oversized.push(
            `  ${path.relative(repoRoot, absolute)} — ${(size / 1024 / 1024).toFixed(1)} MB`,
          );
        }
      }
    }
  };

  walk(root);

  assert.equal(
    oversized.length,
    0,
    `Media over 10 MB must be served from object storage (VITE_NETSO_ASSET_BASE_URL), not committed:\n${oversized.join("\n")}`,
  );
});
