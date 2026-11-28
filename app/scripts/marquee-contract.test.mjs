import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const component = readFileSync(fileURLToPath(new URL('../src/components/ui/infinite-marquee.tsx', import.meta.url)), 'utf8');
const styles = readFileSync(fileURLToPath(new URL('../src/styles/glass.css', import.meta.url)), 'utf8');

test('marquee loop distance includes the rendered copy width and inter-copy gap', () => {
  assert.match(component, /group\.getBoundingClientRect\(\)\.width\s*\+\s*gapSize/);
  assert.match(component, /--marquee-loop-distance/);
  assert.match(styles, /calc\(0px - var\(--marquee-loop-distance/);
  assert.match(styles, /@keyframes wensity-marquee-x-reverse/);
});

test('marquee exposes a keyboard-operable pause/resume control', () => {
  assert.match(component, /<button[\s\S]*?aria-pressed=\{paused\}[\s\S]*?onClick=\{\(\) => setPaused/);
  assert.match(component, /Pause motion/);
  assert.match(component, /Resume motion/);
});

test('reduced-motion mode removes clipping and exposes a scrollable static list', () => {
  assert.match(styles, /\.wensity-marquee\s*\{[\s\S]*?overflow-x:\s*auto !important/);
  assert.match(styles, /\.wensity-marquee-track\s*\{[\s\S]*?animation:\s*none !important/);
  assert.match(styles, /mask-image:\s*none !important/);
});
