import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SunMark } from "../Wordmark";
import {
  CINEMATIC_MANIFEST,
  getCinematicScene,
  runtimeFrameUrlForScene,
} from "../../film/runtimeManifest";
import {
  mediaFrameRuntime,
  type FrameLease,
  type FrameRuntimeImage,
  type FrameRuntimeSnapshot,
} from "./mediaFrameRuntime";

gsap.registerPlugin(useGSAP);

const SESSION_KEY = "netso_v2_intro_seen";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 900px)";
const FALLBACK_DURATION = 2_300;
const INTRO_SCENE = getCinematicScene(CINEMATIC_MANIFEST.intro.sceneId);

const readIntroSeen = (): boolean => {
  try {
    return typeof window !== "undefined" && window.sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
};

const readReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;

const readMobile = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

export interface V2IntroProps {
  onComplete?: () => void;
}

export default function V2Intro({ onComplete }: V2IntroProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const initialReducedMotion = readReducedMotion();
  const initialSeen = readIntroSeen();
  const [reducedMotion, setReducedMotion] = useState(initialReducedMotion);
  const [mobile, setMobile] = useState(readMobile);
  const [visible, setVisible] = useState(() => !initialReducedMotion && !initialSeen);
  const [filmState, setFilmState] = useState<{ key: "film" | "poster"; status: "pending" | "ready" | "failed" }>(() => ({
    key: mobile ? "poster" : "film",
    status: "pending",
  }));
  const bypassPendingRef = useRef(initialReducedMotion && !initialSeen);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Storage can be unavailable in private or restricted browser contexts.
    }
    setVisible(false);
    onCompleteRef.current?.();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const update = () => setReducedMotion(query.matches);
    const updateMobile = () => {
      const nextMobile = mobileQuery.matches;
      setMobile(nextMobile);
      setFilmState({ key: nextMobile ? "poster" : "film", status: "pending" });
    };
    update();
    updateMobile();
    query.addEventListener("change", update);
    mobileQuery.addEventListener("change", updateMobile);
    return () => {
      query.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", updateMobile);
    };
  }, []);

  useEffect(() => {
    if (bypassPendingRef.current || (reducedMotion && visible)) {
      bypassPendingRef.current = false;
      complete();
    }
  }, [complete, reducedMotion, visible]);

  useEffect(() => {
    if (!visible || reducedMotion) return undefined;

    const skip = () => complete();
    const keydown = () => skip();
    window.addEventListener("scroll", skip, { passive: true });
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("scroll", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", keydown);
    };
  }, [complete, reducedMotion, visible]);

  useEffect(() => {
    if (!visible || reducedMotion || mobile || !canvasRef.current) return undefined;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let disposed = false;
    let raf: number | null = null;
    let drawRaf: number | null = null;
    const startedAt = performance.now();
    const currentFrameRef = { current: 0 };
    const leases = new Map<number, FrameLease>();
    const subscriptions = new Map<number, () => void>();
    const initialDrawnRef = { current: false };
    const firstFrame = Math.max(0, Math.round(CINEMATIC_MANIFEST.intro.startFrame));
    const endFrame = Math.min(
      INTRO_SCENE.frameCount - 1,
      Math.max(firstFrame, Math.round(CINEMATIC_MANIFEST.intro.endFrame)),
    );

    const draw = (image: FrameRuntimeImage): boolean => {
      if (!image.naturalWidth || !canvas.clientWidth || !canvas.clientHeight) return false;
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      const ratio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = width / height;
      let drawWidth = width;
      let drawHeight = width / ratio;
      let x = 0;
      let y = (height - drawHeight) / 2;
      if (canvasRatio < ratio) {
        drawHeight = height;
        drawWidth = height * ratio;
        x = (width - drawWidth) / 2;
        y = 0;
      }

      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const nextWidth = Math.max(1, Math.round(width * dpr));
      const nextHeight = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image as CanvasImageSource, x * dpr, y * dpr, drawWidth * dpr, drawHeight * dpr);
      return true;
    };

    const drawCurrentFrame = (frame: number) => {
      for (let candidate = frame; candidate >= firstFrame; candidate -= 1) {
        const snapshot = leases.get(candidate)?.getSnapshot();
        if (snapshot?.status === "loaded" && snapshot.image && draw(snapshot.image)) {
          if (candidate === firstFrame && !initialDrawnRef.current) {
            initialDrawnRef.current = true;
            setFilmState({ key: "film", status: "ready" });
          }
          return;
        }
      }
    };

    const scheduleDraw = () => {
      if (drawRaf !== null || disposed) return;
      drawRaf = window.requestAnimationFrame(() => {
        drawRaf = null;
        drawCurrentFrame(currentFrameRef.current);
      });
    };

    const resize = () => scheduleDraw();
    window.addEventListener("resize", resize, { passive: true });

    const onFrameChange = (frame: number, snapshot: FrameRuntimeSnapshot) => {
      if (disposed) return;
      if (snapshot.status === "error" && frame === firstFrame && !initialDrawnRef.current) {
        setFilmState({ key: "film", status: "failed" });
      }
      if (snapshot.status === "evicted") {
        const lease = leases.get(frame);
        subscriptions.get(frame)?.();
        subscriptions.delete(frame);
        leases.delete(frame);
        lease?.release();
        if (frame === currentFrameRef.current || frame === firstFrame) {
          const nextLease = mediaFrameRuntime.acquire(
            runtimeFrameUrlForScene(INTRO_SCENE, frame),
            Math.abs(frame - currentFrameRef.current),
          );
          leases.set(frame, nextLease);
          subscriptions.set(frame, nextLease.subscribe((nextSnapshot) => onFrameChange(frame, nextSnapshot)));
        }
      }
      if (snapshot.status === "loaded") scheduleDraw();
    };

    for (let frame = firstFrame; frame <= endFrame; frame += 1) {
      const lease = mediaFrameRuntime.acquire(
        runtimeFrameUrlForScene(INTRO_SCENE, frame),
        frame === firstFrame ? 0 : frame - firstFrame + 1,
      );
      leases.set(frame, lease);
      subscriptions.set(frame, lease.subscribe((snapshot) => onFrameChange(frame, snapshot)));
    }

    const tick = (now: number) => {
      if (disposed) return;
      const elapsedSeconds = Math.max(0, (now - startedAt) / 1_000);
      const frame = Math.min(endFrame, firstFrame + Math.floor(elapsedSeconds * CINEMATIC_MANIFEST.fps));
      currentFrameRef.current = frame;
      drawCurrentFrame(frame);
      if (frame < endFrame) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      if (raf !== null) window.cancelAnimationFrame(raf);
      if (drawRaf !== null) window.cancelAnimationFrame(drawRaf);
      subscriptions.forEach((unsubscribe) => unsubscribe());
      leases.forEach((lease) => lease.release());
      subscriptions.clear();
      leases.clear();
    };
  }, [mobile, reducedMotion, visible]);

  useGSAP(
    (_, contextSafe) => {
      if (!visible || reducedMotion || !introRef.current) return undefined;

      const finish = contextSafe ? contextSafe(complete) : complete;
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });
      timelineRef.current = timeline;
      timeline
        .fromTo(".v2-intro__media-film", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 0.76, scale: 1, duration: 0.28 }, 0)
        .fromTo(".v2-intro__wireframe", { autoAlpha: 0 }, { autoAlpha: 0.54, duration: 0.46 }, 0.06)
        .fromTo(".v2-intro__liquid", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 0.48, scale: 1, duration: 0.7 }, 0.12)
        .fromTo(".v2-intro__mark", { scale: 0.45, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.34 }, 0.18)
        .fromTo(".v2-intro__wordmark", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.34 }, 0.42)
        .fromTo(".v2-intro__datum", { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, 0.68)
        .fromTo(".v2-intro__content p", { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.28 }, 0.78)
        .to(".v2-intro__media-film", { autoAlpha: 0.18, duration: 0.5 }, 1.02)
        .to(".v2-intro__content", { y: -16, autoAlpha: 0, duration: 0.28 }, 1.42)
        .to(introRef.current, { yPercent: -100, duration: 0.5, ease: "power4.inOut" }, 1.68);

      const fallback = window.setTimeout(finish, FALLBACK_DURATION);
      return () => {
        window.clearTimeout(fallback);
        timeline.kill();
        if (timelineRef.current === timeline) timelineRef.current = null;
      };
    },
    { scope: introRef, dependencies: [complete, reducedMotion, visible], revertOnUpdate: true },
  );

  if (!visible || reducedMotion) return null;

  const skipIntro = () => {
    timelineRef.current?.kill();
    complete();
  };

  const filmReady = filmState.key === "film" && filmState.status === "ready" && !mobile;

  return (
    <div
      ref={introRef}
      className={`v2-intro ${filmReady ? "v2-intro--film-ready" : ""}`.trim()}
      onClick={skipIntro}
      role="dialog"
      aria-modal="true"
      aria-label="Netso Energy introduction"
      aria-busy={!mobile && filmState.key === "film" && filmState.status === "pending" ? "true" : undefined}
    >
      <div className="v2-intro__media" aria-hidden="true">
        <img className="v2-intro__media-fallback" src={INTRO_SCENE.poster} alt="" />
        <canvas ref={canvasRef} className="v2-intro__media-film" />
      </div>
      <div className="v2-intro__wash" aria-hidden="true" />
      <div className="v2-intro__grid" aria-hidden="true" />
      <div className="v2-intro__liquid" aria-hidden="true" />
      <svg className="v2-intro__wireframe" viewBox="0 0 760 760" aria-hidden="true">
        <g className="v2-intro__wireframe-orbit">
          <ellipse cx="380" cy="380" rx="286" ry="152" transform="rotate(-28 380 380)" />
          <ellipse cx="380" cy="380" rx="286" ry="152" transform="rotate(32 380 380)" />
          <ellipse cx="380" cy="380" rx="286" ry="152" transform="rotate(90 380 380)" />
          <circle cx="380" cy="380" r="92" />
          <path d="M380 64v632M64 380h632" />
        </g>
        <circle className="v2-intro__wireframe-node" cx="380" cy="64" r="5" />
        <circle className="v2-intro__wireframe-node" cx="696" cy="380" r="5" />
      </svg>
      <div className="v2-intro__topline">
        <span className="v2-intro__status"><i /> Netso Energy / v2</span>
        <button type="button" onClick={skipIntro}>Skip intro <span aria-hidden="true">[→]</span></button>
      </div>
      <div className="v2-intro__content">
        <SunMark variant="yellow" className="v2-intro__mark" />
        <div className="v2-intro__wordmark">NETSO<span>°</span>ENERGY</div>
        <div className="v2-intro__datum" aria-hidden="true" />
        <p>Architectural solar infrastructure for the buildings that power Bangladesh.</p>
      </div>
      <div className="v2-intro__footer">
        <span>Dhaka · Chattogram · Gazipur</span>
        <span>Scroll to enter</span>
      </div>
    </div>
  );
}
