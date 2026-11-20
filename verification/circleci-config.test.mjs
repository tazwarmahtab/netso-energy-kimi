import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../.circleci/config.yml", import.meta.url), "utf8");

test("CircleCI config pins runtime and is scoped to review/staging branches", () => {
  assert.match(source, /^version:\s*2\.1\s*$/m);
  assert.match(source, /cimg\/node:22\.18\.0/);
  assert.match(source, /feature\/liquid-chrome-material-bridge-preview/);
  assert.match(source, /staging\/netso-delivery-control/);
  assert.doesNotMatch(source, /(^|\n)\s*-\s*main\s*$/m);
  assert.doesNotMatch(source, /(^|\n)\s*-\s*production\s*$/m);
});

test("governance failures cannot be concealed by a passing app build", () => {
  assert.match(source, /node --test verification\/\*\.test\.mjs/);
  assert.match(source, /node verification\/claims-cli\.mjs app\/src/);
  assert.match(source, /node verification\/netso-control\.mjs verify verification\/STATE\.example\.json/);
  assert.match(source, /verification\/GAP-REGISTER\.json/);
  assert.match(source, /^\s{2}commercial-claims:/m);
  assert.match(source, /^\s{2}delivery-contracts:/m);
  assert.match(source, /^\s{2}app-quality:/m);
});

test("app CI covers reproducible install, build, tests, lint, security and source identity", () => {
  for (const cmd of ["npm ci", "npm test", "npm run lint", "npm run build", "npm audit --omit=dev --audit-level=high"]) {
    assert.ok(source.includes(cmd), cmd);
  }
  assert.match(source, /CIRCLE_SHA1/);
  assert.match(source, /sha256sum/);
  assert.match(source, /store_artifacts:/);
});

test("CI cannot secretly deploy or merge anything", () => {
  assert.doesNotMatch(source, /\bvercel deploy\b|\bwrangler deploy\b|\bgh pr merge\b|\bnetlify deploy\b/i);
  assert.doesNotMatch(source, /type:\s*approval/);
  assert.doesNotMatch(source, /CIRCLE_TOKEN|GITHUB_TOKEN|VERCEL_TOKEN/);
});
