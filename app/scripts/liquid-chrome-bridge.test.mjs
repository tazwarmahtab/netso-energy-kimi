import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const path = (name) => new URL(name, import.meta.url);
const read = (name) => readFileSync(path(name), "utf8");

test("chrome bridge occupies exactly the services-to-architecture transition", () => {
  const page = read("../src/pages/Glass.tsx");
  assert.match(page, /<GlassTicker\s*\/>\s*\{chromeWorld \? <ChromeWorldInterlude placement="opening" \/> : <LiquidChromeBridge \/>\}\s*<GlassArchitecture\s*\/>/);
  assert.equal((page.match(/<LiquidChromeBridge\s*\/>/g) ?? []).length, 1);
});

test("one shader stage, not a second competing CTA WebGL surface", () => {
  const cta = read("../src/components/glass/sections-b.tsx");
  assert.doesNotMatch(cta, /<LiquidChrome\s/);
  assert.match(cta, /The sky is already <em>working\.<\/em>/);
});

test("renderer loads only when visible, with motion and WebGL fallback", () => {
  const bridge = read("../src/components/glass/LiquidChromeBridge.tsx");
  assert.match(bridge, /lazy\(\(\)\s*=>\s*import/);
  assert.match(bridge, /IntersectionObserver/);
  assert.match(bridge, /prefers-reduced-motion/);
  assert.match(bridge, /WebGL2RenderingContext/);
  assert.match(bridge, /canRender && inView/);
});

test("chrome surface is large on both breakpoints, without opacity masks", () => {
  const css = read("../src/components/glass/LiquidChromeBridge.css");
  assert.match(css, /max-width:\s*640px/);
  assert.match(css, /\.netso-liquid-bridge__frame/);
  assert.doesNotMatch(css, /mask-image|opacity:\s*0\./);
});

test("commercial content and five service tokens remain in place", () => {
  const sections = read("../src/components/glass/sections-a.tsx");
  for (const name of ["Industrial rooftops", "Solar canopies", "Site assessment", "Engineering design", "Installation"]) {
    assert.ok(sections.includes(name), name);
  }
});

test("static fallback does not falsely advertise pointer interaction or an invented scene count", () => {
  const bridge = read("../src/components/glass/LiquidChromeBridge.tsx");
  assert.match(bridge, /\{canRender\s*&&\s*<span className="netso-liquid-bridge__hint">/);
  assert.doesNotMatch(bridge, /01 — 03/);
  assert.match(bridge, /aria-label="Reflective material study"/);
});

test("mount lifecycle defers capability state updates and prevents stale observer callbacks", () => {
  const bridge = read("../src/components/glass/LiquidChromeBridge.tsx");
  assert.doesNotMatch(bridge, /^\s*updateCapability\(\);\s*$/m);
  assert.match(bridge, /queueMicrotask\(/);
  assert.match(bridge, /disposed/);
  assert.match(bridge, /typeof IntersectionObserver === "undefined"/);
});
