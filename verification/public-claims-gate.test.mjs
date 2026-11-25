import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
test("active application source contains no unsupported commercial claims", () => {
  const result = spawnSync(process.execPath, ["verification/claims-cli.mjs", "app/src"], {
    cwd: root,
    encoding: "utf8",
    timeout: 30000,
  });
  assert.equal(result.status, 0, (result.stdout || "") + (result.stderr || ""));
});
