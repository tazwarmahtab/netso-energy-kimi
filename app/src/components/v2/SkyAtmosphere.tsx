import {
  getShaderColorFromString,
  meshGradientFragmentShader,
  ShaderMount,
  type ShaderMountUniforms,
} from "@paper-design/shaders";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { roofDuskFragmentShader } from "./roof-dusk-shader";

export const SKY_VARIANTS = {
  "harbor-dawn": {
    label: "Harbor dawn",
    descriptor: "navy / red / peach",
    colors: ["#0c1732", "#5d234a", "#d98d76", "#f2c6a4"],
    fallback: "linear-gradient(135deg, #0c1732 0%, #5d234a 48%, #d98d76 100%)",
    speed: 0.28,
    distortion: 0.18,
    swirl: 0.08,
    grain: 0.04,
  },
  "copper-haze": {
    label: "Copper haze",
    descriptor: "forest / copper / sand",
    colors: ["#07110d", "#1c3b33", "#a36b48", "#e1b476"],
    fallback: "linear-gradient(135deg, #07110d 0%, #1c3b33 45%, #a36b48 100%)",
    speed: 0.12,
    distortion: 0.24,
    swirl: 0.12,
    grain: 0.05,
  },
  "blue-hour": {
    label: "Blue hour",
    descriptor: "indigo / slate / solar",
    colors: ["#081828", "#1b3e5a", "#416d87", "#b3a878"],
    fallback: "linear-gradient(135deg, #081828 0%, #1b3e5a 54%, #416d87 100%)",
    speed: 0.08,
    distortion: 0.3,
    swirl: 0.18,
    grain: 0.03,
  },
  "roof-dusk": {
    label: "Roof dusk",
    descriptor: "slate / peach / amber",
    colors: ["#405565", "#c8a58c", "#d2ad88"],
    fallback:
      '#405565 url("/assets/v2/frames/00-roof-transform/f001.jpg") center / cover no-repeat',
    speed: 0.08,
    distortion: 0,
    swirl: 0,
    grain: 0,
    frame: 0,
  },
  "ember-veil": {
    label: "Ember veil",
    descriptor: "burgundy / coral / gold",
    colors: ["#220e15", "#6b2330", "#c45a48", "#f0b17d"],
    fallback: "linear-gradient(135deg, #220e15 0%, #6b2330 48%, #c45a48 100%)",
    speed: 0.22,
    distortion: 0.38,
    swirl: 0.04,
    grain: 0.08,
  },
} as const;

export type SkyVariantId = keyof typeof SKY_VARIANTS;

const isStaticEnvironment = () => {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 900px)").matches
  );
};

const getUniforms = (variant: SkyVariantId) => {
  const config = SKY_VARIANTS[variant];

  if (variant === "roof-dusk") {
    return {
      // Keep the shared Paper vertex transform finite even though this overlay
      // samples gl_FragCoord directly instead of its generated UV varyings.
      u_scale: 1,
      u_cloudColor: getShaderColorFromString("#c8a58c"),
      u_hazeColor: getShaderColorFromString("#d2ad88"),
      u_shadowColor: getShaderColorFromString("#405565"),
      u_opacity: 0.22,
    } satisfies ShaderMountUniforms;
  }

  return {
    // The shared Paper vertex shader divides its UV by u_scale; provide the
    // neutral full-viewport value instead of relying on an unset uniform.
    u_scale: 1,
    // WebGL exposes array uniforms with the active element name `u_colors[0]`.
    "u_colors[0]": config.colors.map((color) => getShaderColorFromString(color)),
    u_colorsCount: config.colors.length,
    u_distortion: config.distortion,
    u_swirl: config.swirl,
    u_grainMixer: config.grain,
    u_grainOverlay: config.grain * 0.65,
  } satisfies ShaderMountUniforms;
};

export function SkyAtmosphere({ variant, className }: { variant: SkyVariantId; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<ShaderMount | null>(null);
  const [staticMode, setStaticMode] = useState(isStaticEnvironment);
  const config = SKY_VARIANTS[variant];
  const uniforms = useMemo(() => getUniforms(variant), [variant]);
  const fragmentShader = variant === "roof-dusk" ? roofDuskFragmentShader : meshGradientFragmentShader;
  const initialFrame = "frame" in config ? config.frame : 0;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 900px)");
    const updateMode = () => setStaticMode(motionQuery.matches || widthQuery.matches);
    updateMode();
    motionQuery.addEventListener("change", updateMode);
    widthQuery.addEventListener("change", updateMode);
    return () => {
      motionQuery.removeEventListener("change", updateMode);
      widthQuery.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || staticMode) {
      mountRef.current?.dispose();
      mountRef.current = null;
      return undefined;
    }

    const existingCanvases = new Set(Array.from(host.querySelectorAll("canvas")));
    let mount: ShaderMount | null = null;
    let isInViewport = true;
    let intersectionObserver: IntersectionObserver | undefined;
    let handleVisibilityChange: (() => void) | undefined;

    const removeNewCanvases = () => {
      host.querySelectorAll("canvas").forEach((canvas) => {
        if (!existingCanvases.has(canvas)) canvas.remove();
      });
    };

    const dispose = () => {
      mount?.dispose();
      if (mountRef.current === mount) mountRef.current = null;
      intersectionObserver?.disconnect();
      if (handleVisibilityChange) {
        host.ownerDocument.removeEventListener("visibilitychange", handleVisibilityChange);
      }
      removeNewCanvases();
    };

    try {
      mount = new ShaderMount(
        host,
        fragmentShader,
        uniforms,
        undefined,
        config.speed,
        initialFrame,
        1,
        1_300_000,
      );
      mountRef.current = mount;

      const applySpeed = () => {
        if (!mount) return;
        mount.setSpeed(host.ownerDocument.hidden || !isInViewport ? 0 : config.speed);
      };

      const onVisibilityChange = () => applySpeed();
      handleVisibilityChange = onVisibilityChange;
      host.ownerDocument.addEventListener("visibilitychange", onVisibilityChange);

      const ownerWindow = host.ownerDocument.defaultView;
      if (ownerWindow?.IntersectionObserver) {
        intersectionObserver = new ownerWindow.IntersectionObserver(([entry]) => {
          isInViewport = entry?.isIntersecting ?? true;
          applySpeed();
        });
        intersectionObserver.observe(host);
      }

      applySpeed();

      return () => {
        dispose();
      };
    } catch {
      // The CSS fallback remains visible when WebGL is unavailable.
      dispose();
      return undefined;
    }

  }, [config.speed, fragmentShader, initialFrame, staticMode, uniforms]);

  return (
    <div
      ref={hostRef}
      className={className ? `v2-sky-layer ${className}` : "v2-sky-layer"}
      data-v2-sky-variant={variant}
      aria-hidden="true"
      style={{
        "--sky-fallback": config.fallback,
        ...(variant === "roof-dusk" ? { background: "var(--sky-fallback)" } : {}),
      } as CSSProperties}
    />
  );
}
