import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { buildAssetUrl } from "../../lib/mediaUrl";

const POSTER_SKY = buildAssetUrl("/assets/v2/frames/00-roof-transform/f001.jpg");
const POSTER_ROOF = buildAssetUrl("/assets/v2/frames/00-roof-transform/f120.jpg");
const VIDEO_SRC = buildAssetUrl("/assets/v2/hero-sky-roof.mp4");

const HERO_COPY_END = 0.3;
const ROOF_COPY_START = 0.34;

function isStaticViewport(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 900px)").matches
  );
}

export default function SkyVideoHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return undefined;

    if (isStaticViewport()) return undefined;

    let raf: number | null = null;
    let duration = 0;

    const onLoaded = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      requestSync();
    };
    const requestSync = () => {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(sync);
    };
    const sync = () => {
      raf = null;
      const rect = wrap.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      wrap.style.setProperty("--hero-video-progress", progress.toFixed(4));
      const heroActive = progress < HERO_COPY_END;
      const roofActive = progress >= ROOF_COPY_START;
      wrap.dataset.heroHeroActive = String(heroActive);
      wrap.dataset.heroRoofActive = String(roofActive);
      const cue = wrap.querySelector<HTMLElement>("[data-hero-cue]");
      if (cue) {
        cue.setAttribute("aria-hidden", String(roofActive));
        cue.inert = roofActive;
      }
      wrap.querySelectorAll<HTMLElement>("[data-hero-copy]").forEach((element) => {
        const isActive = element.dataset.heroCopy === "hero" ? heroActive : roofActive;
        element.setAttribute("aria-hidden", String(!isActive));
        element.inert = !isActive;
      });
      if (duration > 0) {
        const target = progress * duration;
        try {
          if (Math.abs((video.currentTime || 0) - target) > 0.04) video.currentTime = target;
        } catch {
          /* seek while loading — ignore, next frame retries */
        }
      }
    };

    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();
    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync, { passive: true });
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      if (raf !== null) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="v2-hero-video" data-hero-hero-active="true" data-hero-roof-active="false">
      <div className="v2-hero-video__sticky">
        <video
          ref={videoRef}
          className="v2-hero-video__media"
          src={VIDEO_SRC}
          poster={POSTER_SKY}
          muted
          playsInline
          preload="auto"
          aria-label="Camera tilts down from the sky to reveal the rooftop solar structure"
        />
        <img className="v2-hero-video__static" src={POSTER_SKY} alt="" aria-hidden="true" />
        <div className="v2-hero-video__veil" aria-hidden="true" />

        <div className="v2-hero-video__copy v2-hero-video__copy--hero" data-hero-copy="hero">
          <p className="v2-kicker"><span>01</span> / Solar transformation</p>
          <h1>The sky is<br /><span>already working.</span></h1>
          <p className="v2-lede">A building surface becomes a working energy asset—financed, designed, and operated by Netso.</p>
        </div>

        <div className="v2-hero-video__copy v2-hero-video__copy--roof" data-hero-copy="roof" aria-hidden="true" inert>
          <p className="v2-kicker"><span>01</span> / Roof transformation</p>
          <h2>Your roof.<br /><span>Paying you.</span></h2>
          <p className="v2-lede">A building surface becomes a working energy asset—financed, designed, and operated by Netso.</p>
          <a className="v2-button v2-button--gold" href="#v2-assessment">Request a feasibility assessment <ArrowRight size={16} /></a>
        </div>

        <a className="v2-scroll-cue v2-hero-video__cue" href="#roof" data-hero-cue>
          <span>Discover the roof</span><ArrowDown size={16} />
        </a>

        <img className="v2-hero-video__handoff" src={POSTER_ROOF} alt="" aria-hidden="true" />
      </div>
    </div>
  );
}
