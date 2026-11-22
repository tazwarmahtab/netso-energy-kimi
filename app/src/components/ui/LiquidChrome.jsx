'use client';

import { useEffect, useRef, useState } from 'react';
import { CHROME, SIM, SLOPE, VERTEX } from './liquidChromeShaders';
import './LiquidChrome.css';

// Adapted from the supplied React Bits JavaScript/CSS source.
// WebGL2 only; unsupported browsers keep the CSS fallback.
const PIXEL_BUDGET = 2.4e6;
const SIM_CELL = 4;
const SIM_STEP = 1 / 120;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const parseColor = value => {
  if (Array.isArray(value)) return [0, 1, 2].map(i => clamp(Number(value[i]) || 0, 0, 1));
  const text = String(value || '').trim();
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const full = hex[1].length === 3 ? hex[1].replace(/./g, digit => digit + digit) : hex[1];
    return [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16) / 255);
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(text);
  if (rgb) return [rgb[1], rgb[2], rgb[3]].map(channel => clamp(parseFloat(channel) / 255, 0, 1));
  return [1, 1, 1];
};

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('[LiquidChrome] shader:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const link = (gl, fragmentSource) => {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = vertex && fragment ? gl.createProgram() : null;
  if (!vertex || !fragment || !program) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('[LiquidChrome] program:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
};

export default function LiquidChrome({
  color = '#ffffff',
  speed = 0.2,
  amplitude = 0.3,
  frequencyX = 3,
  frequencyY = 3,
  detail = 4,
  thickness = 1,
  depth = 1,
  roughness = 0.3,
  exposure = 1,
  interactive = true,
  rippleStrength = 1,
  rippleSize = 1,
  tilt = 1,
  intro = true,
  lightMode = false,
  maxDevicePixelRatio = 2,
  className = '',
  style
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const wakeRef = useRef(null);
  const [generation, setGeneration] = useState(0);
  const settings = {
    tint: parseColor(color).map(channel => Math.pow(channel, 2.2)),
    speed: Math.max(0, speed),
    amplitude: clamp(amplitude, 0, 2),
    frequency: [Math.max(0.1, frequencyX), Math.max(0.1, frequencyY)],
    detail: clamp(Math.round(detail), 1, 8),
    thickness: clamp(thickness, 0.25, 4),
    depth: Math.max(0, depth),
    roughness: clamp(roughness, 0, 1),
    exposure: Math.max(0, exposure),
    interactive,
    rippleStrength: Math.max(0, rippleStrength),
    rippleSize: clamp(rippleSize, 0.2, 4),
    tilt: Math.max(0, tilt),
    intro,
    light: lightMode,
    maxRatio: clamp(maxDevicePixelRatio, 0.5, 3)
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => { wakeRef.current?.(); });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power'
    });
    const chrome = gl ? link(gl, CHROME) : null;
    if (!gl || !chrome) return;

    const fluid = Boolean(gl.getExtension('EXT_color_buffer_float'));
    const sim = fluid ? link(gl, SIM) : null;
    const slope = fluid ? link(gl, SLOPE) : null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const vao = gl.createVertexArray();
    if (!vao) {
      gl.deleteProgram(chrome.program);
      return;
    }

    const grid = { width: 1, height: 1 };
    const targets = [];
    let slopeTarget = null;
    let current = 0;
    let unit = 1;
    const pointer = { x: 0, y: 0, inside: false, ready: false, nx: 0, ny: 0 };
    const view = { yaw: 0, pitch: 0, vyaw: 0, vpitch: 0 };
    const strokes = [];
    let time = 7.6;
    let presence = settingsRef.current.intro && !reduced && generation === 0 ? 0 : 1;
    let energy = 0;
    let accumulator = 0;
    let raf = 0;
    let last = 0;
    let visible = false;
    let pageVisible = document.visibilityState !== 'hidden';
    let lost = false;

    // When float render targets are unsupported, bind a valid 1px zero-slope
    // texture. Sampling an unbound sampler is undefined on some mobile GPUs.
    const neutralSlope = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, neutralSlope);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    const makeTarget = (width, height) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, width, height, 0, gl.RG, gl.HALF_FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return { texture, framebuffer };
    };
    const dropTarget = target => {
      if (!target) return;
      gl.deleteTexture(target.texture);
      gl.deleteFramebuffer(target.framebuffer);
    };

    const resize = () => {
      const s = settingsRef.current;
      const rect = container.getBoundingClientRect();
      const cssWidth = Math.max(1, rect.width);
      const cssHeight = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, s.maxRatio, Math.sqrt(PIXEL_BUDGET / (cssWidth * cssHeight)));
      const width = Math.max(1, Math.round(cssWidth * ratio));
      const height = Math.max(1, Math.round(cssHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      unit = Math.min(width, height);
      if (!fluid || !sim || !slope) return;
      const gridWidth = clamp(Math.round(cssWidth / SIM_CELL), 16, 512);
      const gridHeight = clamp(Math.round(cssHeight / SIM_CELL), 16, 512);
      if (gridWidth === grid.width && gridHeight === grid.height && targets.length) return;
      targets.forEach(dropTarget);
      targets.length = 0;
      dropTarget(slopeTarget);
      Object.assign(grid, { width: gridWidth, height: gridHeight });
      targets.push(makeTarget(gridWidth, gridHeight), makeTarget(gridWidth, gridHeight));
      slopeTarget = makeTarget(gridWidth, gridHeight);
      current = 0;
      accumulator = 0;
      strokes.length = 0;
    };

    const simulate = steps => {
      if (!sim || !slope || !slopeTarget) return;
      gl.useProgram(sim.program);
      gl.viewport(0, 0, grid.width, grid.height);
      gl.uniform2f(sim.uniforms.uSize, grid.width, grid.height);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(sim.uniforms.uState, 0);
      for (let step = 0; step < steps; step++) {
        const stroke = step === 0 ? strokes.shift() : null;
        if (stroke) {
          gl.uniform4f(sim.uniforms.uStroke, stroke.ax, stroke.ay, stroke.bx, stroke.by);
          gl.uniform2f(sim.uniforms.uImpulse, stroke.strength, stroke.radius);
        } else {
          gl.uniform2f(sim.uniforms.uImpulse, 0, 1);
        }
        const source = targets[current];
        const destination = targets[1 - current];
        gl.bindTexture(gl.TEXTURE_2D, source.texture);
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination.framebuffer);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        current = 1 - current;
      }
      gl.useProgram(slope.program);
      gl.uniform2f(slope.uniforms.uSize, grid.width, grid.height);
      gl.uniform1i(slope.uniforms.uState, 0);
      gl.bindTexture(gl.TEXTURE_2D, targets[current].texture);
      gl.bindFramebuffer(gl.FRAMEBUFFER, slopeTarget.framebuffer);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const render = s => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const u = chrome.uniforms;
      gl.useProgram(chrome.program);
      gl.uniform2f(u.uResolution, canvas.width, canvas.height);
      gl.uniform1f(u.uUnit, unit);
      gl.uniform1f(u.uTime, time);
      gl.uniform1f(u.uAmplitude, s.amplitude);
      gl.uniform2f(u.uFrequency, s.frequency[0], s.frequency[1]);
      gl.uniform1f(u.uDepth, s.depth);
      gl.uniform1f(u.uDetail, s.detail);
      gl.uniform1f(u.uSharpness, 5 / (3 * s.thickness));
      gl.uniform1f(u.uPresence, 1 - Math.pow(1 - presence, 3));
      gl.uniform3fv(u.uTint, s.tint);
      gl.uniform2f(u.uShift, view.yaw, view.pitch);
      gl.uniform1f(u.uRoughness, s.roughness);
      gl.uniform1f(u.uExposure, s.exposure);
      gl.uniform1f(u.uLight, s.light ? 1 : 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, slopeTarget ? slopeTarget.texture : neutralSlope);
      gl.uniform1i(u.uSlope, 0);
      gl.uniform2f(u.uSlopeSize, grid.width, grid.height);
      gl.uniform1f(u.uRipple, slopeTarget && !reduced ? s.rippleStrength * 2.2 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = now => {
      raf = 0;
      if (lost || !visible || !pageVisible) return;
      const s = settingsRef.current;
      const dt = clamp((now - last) / 1000 || 0, 0, 0.05);
      last = now;
      if (!reduced) time += dt * s.speed;
      presence = reduced ? 1 : Math.min(1, presence + dt / 1.8);

      const hovering = !reduced && s.interactive && pointer.inside;
      const reach = reduced ? 0 : s.tilt;
      const targetYaw = (hovering ? pointer.nx * 0.35 : 0.22 * Math.sin(time * 1.3)) * reach;
      const targetPitch = (hovering ? -pointer.ny * 0.28 : 0.16 * Math.sin(time * 0.9 + 1.7)) * reach;
      const stiffness = 36;
      const damping = 2 * Math.sqrt(stiffness) * 0.95;
      view.vyaw += ((targetYaw - view.yaw) * stiffness - view.vyaw * damping) * dt;
      view.vpitch += ((targetPitch - view.pitch) * stiffness - view.vpitch * damping) * dt;
      view.yaw += view.vyaw * dt;
      view.pitch += view.vpitch * dt;

      gl.bindVertexArray(vao);
      if (slopeTarget && !reduced) {
        accumulator += dt;
        const steps = Math.min(4, Math.floor(accumulator / SIM_STEP));
        accumulator -= steps * SIM_STEP;
        if (steps > 0) {
          simulate(steps);
          energy = Math.max(0, energy * Math.pow(0.982, steps));
        }
      }
      render(s);
      const settling = Math.abs(view.vyaw) + Math.abs(view.vpitch) > 1e-4 ||
        Math.abs(targetYaw - view.yaw) + Math.abs(targetPitch - view.pitch) > 1e-4;
      const busy = !reduced && (s.speed > 0 || presence < 1 || settling || energy > 0.002 || strokes.length > 0);
      if (busy) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || lost || !visible || !pageVisible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    wakeRef.current = () => {
      if (!lost && visible && pageVisible) { resize(); wake(); }
    };

    const toGrid = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / Math.max(1, rect.width)) * grid.width,
        y: (1 - (clientY - rect.top) / Math.max(1, rect.height)) * grid.height,
        nx: ((clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1,
        ny: ((clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1,
        inside: clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
      };
    };
    const push = (stroke, s) => {
      if (!slopeTarget || !s.interactive || reduced) return;
      strokes.push(stroke);
      if (strokes.length > 6) strokes.shift();
      energy = 1;
    };
    const onPointerMove = event => {
      const s = settingsRef.current;
      if (!s.interactive || reduced) return;
      const spot = toGrid(event.clientX, event.clientY);
      pointer.nx = clamp(spot.nx, -1, 1);
      pointer.ny = clamp(spot.ny, -1, 1);
      pointer.inside = spot.inside;
      if (spot.inside && pointer.ready) {
        const travel = Math.hypot(spot.x - pointer.x, spot.y - pointer.y);
        if (travel > 0.25) push({
          ax: pointer.x, ay: pointer.y, bx: spot.x, by: spot.y,
          strength: -Math.min(0.45, 0.04 + travel * 0.045) * s.rippleSize,
          radius: 4 * s.rippleSize
        }, s);
      }
      pointer.x = spot.x;
      pointer.y = spot.y;
      pointer.ready = spot.inside;
      wake();
    };
    const onPointerDown = event => {
      const s = settingsRef.current;
      if (!s.interactive || reduced) return;
      const spot = toGrid(event.clientX, event.clientY);
      if (!spot.inside) return;
      push({ ax: spot.x, ay: spot.y, bx: spot.x, by: spot.y, strength: -1.6 * s.rippleSize, radius: 6 * s.rippleSize }, s);
      wake();
    };
    const onLeave = () => {
      pointer.inside = false;
      pointer.ready = false;
      wake();
    };

    // Element-scoped listeners avoid a pointermove handler on the whole site.
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    container.addEventListener('pointerleave', onLeave, { passive: true });
    const onLost = event => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onRestored = () => setGeneration(value => value + 1);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    const resizeObserver = new ResizeObserver(() => {
      if (lost || !visible || !pageVisible) return;
      resize();
      wake();
    });
    resizeObserver.observe(container);
    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (!visible) { cancelAnimationFrame(raf); raf = 0; }
      else { resize(); wake(); }
    }, { threshold: 0 });
    intersection.observe(container);
    const onVisibility = () => {
      pageVisible = document.visibilityState !== 'hidden';
      if (!pageVisible) { cancelAnimationFrame(raf); raf = 0; }
      else wake();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      if (!gl.isContextLost()) {
        targets.forEach(dropTarget);
        dropTarget(slopeTarget);
        gl.deleteTexture(neutralSlope);
        gl.deleteVertexArray(vao);
        gl.deleteProgram(chrome.program);
        if (sim) gl.deleteProgram(sim.program);
        if (slope) gl.deleteProgram(slope.program);
      }
    };
  }, [generation]);

  return (
    <div ref={containerRef} className={'liquid-chrome' + (className ? ' ' + className : '')} style={style}>
      <canvas ref={canvasRef} className="liquid-chrome__canvas" aria-hidden="true" />
    </div>
  );
}
