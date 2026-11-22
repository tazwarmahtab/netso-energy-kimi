import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { resolve } from "node:path";

const read = (path) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

test("LiquidChrome ships a self-contained WebGL2 implementation and stylesheet", () => {
  const source = read("src/components/ui/LiquidChrome.jsx");
  const shaders = read("src/components/ui/liquidChromeShaders.js");
  const css = read("src/components/ui/LiquidChrome.css");
  assert.match(source, /getContext\(['"]webgl2['"]/);
  assert.match(source, /webglcontextlost/);
  assert.match(source, /ResizeObserver/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /prefers-reduced-motion/);
  assert.match(shaders, /#version 300 es/);
  assert.match(css, /\.liquid-chrome__canvas/);
});

test("The homepage mounts chrome only as decorative CTA art, not over the hero", () => {
  const source = read("src/components/glass/sections-b.tsx");
  assert.match(source, /LiquidChrome/);
  const cta = source.slice(source.indexOf("export function GlassCTA"));
  assert.match(cta, /<LiquidChrome/);
  assert.match(cta, /maxDevicePixelRatio=\{1\.5\}/);
  assert.match(cta, /aria-hidden="true"/);
});

test("The WebGL renderer includes motion/performance escape hatches", () => {
  const source = read("src/components/ui/LiquidChrome.jsx");
  assert.match(source, /document\.visibilityState/);
  assert.match(source, /reduced\s*\?/);
  assert.match(source, /cancelAnimationFrame/);
  assert.match(source, /deleteTexture/);
  assert.match(source, /deleteFramebuffer/);
});