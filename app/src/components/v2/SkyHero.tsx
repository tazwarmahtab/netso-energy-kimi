import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import FrameSequence from "./FrameSequence";
import { SkyAtmosphere } from "./SkyAtmosphere";
import { getCinematicScene } from "../../film/runtimeManifest";

const SKY_OPENING_PROGRESS = 0.3;
const ROOF_COPY_PROGRESS = 0.34;
const STATIC_ROOF_FADE_START = 0.94;
const STATIC_ROOF_FADE_END = 0.16;
const STATIC_ROOF_CUE_HIDE_PROGRESS = 0.76;

const isStaticViewport = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 900px)").matches
  );
};

export default function SkyHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const staticRoofRef = useRef<HTMLElement>(null);
  const [staticRoofVisible, setStaticRoofVisible] = useState(false);
  const scene = getCinematicScene("00-roof-transform");

  const syncInteractiveState = useCallback((progress: number) => {
    const hero = heroRef.current;
    if (!hero) return;

    const staticMode = isStaticViewport();
    const heroCopyIsActive = staticMode || progress < SKY_OPENING_PROGRESS;
    const roofCopyIsActive = staticMode || progress >= ROOF_COPY_PROGRESS;

    hero.querySelectorAll<HTMLElement>("[data-opening-interactive]").forEach((element) => {
      const phase = element.dataset.openingInteractive;
      const isActive = phase === "hero" ? heroCopyIsActive : roofCopyIsActive;
      element.setAttribute("aria-hidden", String(!isActive));
      element.inert = !isActive;
    });
  }, []);

  const discoverRoof = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (!isStaticViewport()) return;
    const target = heroRef.current?.querySelector<HTMLElement>(".v2-sky-hero__static-roof");
    if (!target) return;
    event.preventDefault();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }, []);

  useEffect(() => {
    syncInteractiveState(0);
  }, [syncInteractiveState]);

  useEffect(() => {
    const hero = heroRef.current;
    const target = staticRoofRef.current;
    if (!hero || !target) return undefined;

    let frame: number | null = null;

    const syncStaticRoof = () => {
      frame = null;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const roofTop = target.getBoundingClientRect().top;
      const fadeStart = viewportHeight * STATIC_ROOF_FADE_START;
      const fadeDistance = Math.max(viewportHeight * (STATIC_ROOF_FADE_START - STATIC_ROOF_FADE_END), 1);
      const progress = Math.max(0, Math.min(1, (fadeStart - roofTop) / fadeDistance));
      const progressValue = progress.toFixed(3);

      hero.style.setProperty("--static-roof-progress", progressValue);
      const roofHasTakenOver = progress >= STATIC_ROOF_CUE_HIDE_PROGRESS;
      setStaticRoofVisible((current) => current === roofHasTakenOver ? current : roofHasTakenOver);
    };

    const requestSync = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(syncStaticRoof);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const sequenceStyle = {
    "--sky-opening-progress": SKY_OPENING_PROGRESS,
    "--roof-copy-progress": ROOF_COPY_PROGRESS,
  } as CSSProperties;

  return (
    <div
      ref={heroRef}
      className={`v2-sky-hero-shell${staticRoofVisible ? " v2-sky-hero-shell--roof-visible" : ""}`}
      style={sequenceStyle}
    >
      <FrameSequence
        className="v2-sky-hero v2-opening-scene v2-opening-scene--roof-transform"
        label={scene.label}
        path={scene.runtimePath}
        totalFrames={scene.frameCount}
        poster={scene.poster}
        posterAlt={scene.label}
        concept={scene.concept}
        evidenceLabel={scene.evidenceLabel}
        holdEndProgress={scene.endHoldProgress}
        sceneHeight="420vh"
        playbackStartProgress={SKY_OPENING_PROGRESS}
        onSceneProgress={syncInteractiveState}
      >
        <SkyAtmosphere variant="roof-dusk" className="v2-sky-layer--hero" />

        <div className="v2-sky-hero__hero-copy v2-chapter-copy" data-opening-interactive="hero">
          <p className="v2-kicker"><span>01</span> / Solar transformation</p>
          <h1>The sky is<br /><span>already working.</span></h1>
          <p className="v2-lede">A building surface becomes a working energy asset—financed, designed, and operated by Netso.</p>
        </div>

        <span id="roof-transform" className="v2-sky-hero__roof-anchor" aria-hidden="true" />

        <div className="v2-sky-hero__roof-copy v2-chapter-copy" data-opening-interactive="roof" aria-hidden="true" inert>
          <p className="v2-kicker"><span>01</span> / Roof transformation</p>
          <h2>Your roof.<br /><span>Paying you.</span></h2>
          <p className="v2-lede">A building surface becomes a working energy asset—financed, designed, and operated by Netso.</p>
          <a className="v2-button v2-button--gold" href="#v2-assessment">Request a feasibility assessment <ArrowRight size={16} /></a>
        </div>

        <a className="v2-scroll-cue v2-sky-hero__scroll-cue" href="#roof-transform" onClick={discoverRoof} data-opening-interactive="hero">
          <span>Discover the roof</span><ArrowDown size={16} />
        </a>
      </FrameSequence>

      <section ref={staticRoofRef} className="v2-sky-hero__static-roof" aria-labelledby="v2-static-roof-heading">
        <img className="v2-sky-hero__static-roof-handoff" src={`${scene.runtimePath}/f001.jpg`} alt="" aria-hidden="true" />
        <img className="v2-sky-hero__static-roof-image" src={`${scene.runtimePath}/f120.jpg`} alt="Rooftop solar structure at sunset" />
        <div className="v2-sky-hero__static-roof-copy" data-opening-interactive="roof">
          <p className="v2-kicker"><span>01</span> / Roof transformation</p>
          <h2 id="v2-static-roof-heading">Your roof.<br /><span>Paying you.</span></h2>
          <p className="v2-lede">A building surface becomes a working energy asset—financed, designed, and operated by Netso.</p>
          <a className="v2-button v2-button--gold" href="#v2-assessment">Request a feasibility assessment <ArrowRight size={16} /></a>
        </div>
      </section>
    </div>
  );
}
