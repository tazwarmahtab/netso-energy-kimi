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

test("The homepage mounts chrome after the service ticker, not in the hero or CTA", () => {
  const page = read("src/pages/Glass.tsx");
  const bridge = read("src/components/glass/LiquidChromeBridge.tsx");
  const cta = read("src/components/glass/sections-b.tsx");
  assert.match(page, /<GlassTicker\s*\/>\s*\{chromeWorld \? <ChromeWorldInterlude placement="opening" \/> : <LiquidChromeBridge \/>\}\s*<GlassArchitecture\s*\/>/);
  assert.match(bridge, /<LiquidChrome/);
  assert.match(bridge, /maxDevicePixelRatio=\{1\.25\}/);
  assert.match(bridge, /aria-hidden="true"/);
  assert.doesNotMatch(cta, /<LiquidChrome/);
});

test("The WebGL renderer includes motion/performance escape hatches", () => {
  const source = read("src/components/ui/LiquidChrome.jsx");
  assert.match(source, /document\.visibilityState/);
  assert.match(source, /reduced\s*\?/);
  assert.match(source, /cancelAnimationFrame/);
  assert.match(source, /deleteTexture/);
  assert.match(source, /deleteFramebuffer/);
});
test("shader viewport remains functional when browser observer APIs are unavailable", () => {
  const source = read("src/components/ui/LiquidChrome.jsx");
  assert.match(source, /typeof ResizeObserver/);
  assert.match(source, /typeof IntersectionObserver/);
  assert.match(source, /resizeObserver\?\.disconnect/);
  assert.match(source, /intersection\?\.disconnect/);
});
