import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollVideoProps {
  id?: string;
  label: string;
  src: string;
  poster: string;
  children: ReactNode;
  className?: string;
  sceneHeight?: string;
  concept?: boolean;
}

const isStaticEnvironment = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 900px)").matches
  );
};

export default function ScrollVideo({
  id,
  label,
  src,
  poster,
  children,
  className = "",
  sceneHeight = "180vh",
  concept = false,
}: ScrollVideoProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [staticMode, setStaticMode] = useState(isStaticEnvironment);
  const [ready, setReady] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 900px)");
    const updateMode = () => setStaticMode(motionQuery.matches || widthQuery.matches);
    motionQuery.addEventListener("change", updateMode);
    widthQuery.addEventListener("change", updateMode);
    return () => {
      motionQuery.removeEventListener("change", updateMode);
      widthQuery.removeEventListener("change", updateMode);
    };
  }, []);

  useGSAP(() => {
    const scene = sceneRef.current;
    const video = videoRef.current;
    if (!scene || !video || staticMode) return undefined;

    let disposed = false;
    let duration = 0;

    const setVideoTime = (progress: number) => {
      if (disposed || !duration || !Number.isFinite(duration)) return;
      const nextTime = Math.max(0, Math.min(duration - 0.04, progress * duration));
      if (Math.abs(video.currentTime - nextTime) > 0.02) video.currentTime = nextTime;
    };

    const onMetadata = () => {
      duration = video.duration;
      setMediaError(false);
      setVideoTime(0);
    };

    const onCanPlay = () => setReady(true);
    const onError = () => {
      setReady(false);
      setMediaError(true);
    };

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    if (video.readyState >= 1) onMetadata();
    if (video.readyState >= 3) onCanPlay();

    const trigger = ScrollTrigger.create({
      trigger: scene,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      onUpdate: (self) => {
        scene.style.setProperty("--media-progress", self.progress.toFixed(3));
        setVideoTime(self.progress);
      },
    });

    return () => {
      disposed = true;
      trigger.kill();
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, { scope: sceneRef, dependencies: [src, staticMode], revertOnUpdate: true });

  return (
    <section
      id={id}
      ref={sceneRef}
      data-v2-chapter={id ? label : undefined}
      data-media-ready={!staticMode && ready ? "true" : "false"}
      data-media-error={mediaError ? "true" : "false"}
      className={`v2-media-scene ${staticMode ? "v2-media-scene--static" : ""} ${className}`.trim()}
      aria-label={label}
      style={{ "--media-scene-height": sceneHeight } as CSSProperties}
    >
      <div className="v2-media-scene__stage">
        <img className="v2-media-scene__poster" src={poster} alt="" aria-hidden="true" />
        {!staticMode && (
          <video
            ref={videoRef}
            className="v2-media-scene__video"
            src={src}
            poster={poster}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <div className="v2-media-scene__veil" aria-hidden="true" />
        {mediaError && <div className="v2-media-scene__error" role="status">Media unavailable — showing the approved still.</div>}
        {concept && <div className="v2-media-scene__concept"><span className="v2-signal" /> Concept visualization</div>}
        {children}
      </div>
    </section>
  );
}
