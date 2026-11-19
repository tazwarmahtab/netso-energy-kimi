import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const readJson = (relative) => JSON.parse(
  readFileSync(new URL(relative, import.meta.url), "utf8")
);

test("production Zod version is outside the vulnerable GHSA-mrhx-c7xc-m3w5 range", () => {
  const pkg = readJson("../package.json");
  const lock = readJson("../package-lock.json");
  const installed = lock.packages?.["node_modules/zod"]?.version;
  const numbers = (installed || "").split(".").map(Number);
  assert.ok(installed, "Zod must be in the reproducible lockfile");
  assert.ok(
    numbers[0] > 4 || (numbers[0] === 4 && (
      numbers[1] > 6 || (numbers[1] === 6 && numbers[2] >= 6)
    )),
    "Zod must be >= 4.6.6 (advisory GHSA-mrhx-c7xc-m3w5)"
  );
  assert.match(pkg.dependencies.zod, /4\./);
});
