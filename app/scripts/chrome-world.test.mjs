import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("preserves existing homepage and exposes an isolated Chrome World route", () => {
  const app = read("../src/App.tsx");
  assert.match(app, /path="\/" element=\{<Glass \/>\}/);
  assert.match(app, /path="\/chrome-world" element=\{<Glass chromeWorld \/>\}/);
});

test("Chrome World uses a single global shader instead of repeating LiquidChrome in sections", () => {
  const glass = read("../src/pages/Glass.tsx");
  const world = read("../src/components/glass/ChromeWorldBackdrop.tsx");
  assert.match(glass, /chromeWorld \? <ChromeWorldBackdrop \/>/);
  assert.match(glass, /chromeWorld \? <ChromeWorldInterlude/);
  assert.match(glass, /chromeWorld \? <ChromeWorldInterlude placement="opening" \/> : <LiquidChromeBridge \/>/);
  assert.equal((world.match(/<LiquidChrome\s/g) || []).length, 1);
  assert.match(world, /interactive=\{false\}/);
  assert.match(world, /maxFrameRate=\{24\}/);
});

test("global chrome uses a fixed full-viewport canvas with protected readable overlays", () => {
  const css = read("../src/components/glass/ChromeWorldBackdrop.css");
  assert.match(css, /\.g-chrome-world__background\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /pointer-events:\s*none/);
  assert.match(css, /\.g-chrome-world .*?\.g-section/s);
  assert.match(css, /\.g-chrome-world .*?\.g-wrap/s);
  assert.match(css, /\.g-chrome-world__interlude/);
  assert.match(css, /prefers-reduced-motion/);
});

test("chrome handles reduced motion and devices without WebGL2 gracefully", () => {
  const src = read("../src/components/glass/ChromeWorldBackdrop.tsx");
  assert.match(src, /prefers-reduced-motion/);
  assert.match(src, /WebGL2RenderingContext/);
  assert.match(src, /IntersectionObserver|document\.visibilityState/);
  assert.match(src, /lazy\(\(\)\s*=>\s*import/);
});

test("global shader is frame-limited and the existing liquid bridge remains untouched", () => {
  const shader = read("../src/components/ui/LiquidChrome.jsx");
  const types = read("../src/components/ui/LiquidChrome.d.ts");
  assert.match(shader, /maxFrameRate = 60/);
  assert.match(shader, /requestAnimationFrame\(frame\)/);
  assert.match(types, /maxFrameRate\?: number/);
  const glass = read("../src/pages/Glass.tsx");
  assert.match(glass, /<GlassHero/);
  assert.match(glass, /<GlassTicker/);
  assert.match(glass, /<GlassArchitecture/);
  assert.match(glass, /<GlassFooter/);
});

test("comparison link remains available on mobile only in the new variant", () => {
  const glass = read("../src/pages/Glass.tsx");
  assert.match(glass, /chromeWorld \? "fixed bottom-4 left-4 z-40" : "fixed bottom-4 left-4 z-40 hidden md:block"/);
  assert.match(glass, /chromeWorld \? "← Standard" : "← Classic view"/);
});
