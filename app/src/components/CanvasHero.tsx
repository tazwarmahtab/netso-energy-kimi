import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const FRAME_CONCURRENCY = 6;
const FRAME_WINDOW = 18;
const STATIC_POSTER = "/assets/v2/opening-roof-poster.jpg";

type HeroMode = "loading" | "motion" | "static";
type FrameSurface = ImageBitmap | HTMLImageElement;

export interface CanvasHeroProps {
  onOpenAssessment?: () => void;
}

function prefersStaticHero() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const saveData = "connection" in navigator && Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
  );
  return reducedMotion || reducedData || saveData || window.innerWidth <= 768;
}

function surfaceSize(surface: FrameSurface) {
  if (surface instanceof ImageBitmap) return { width: surface.width, height: surface.height };
  return { width: surface.naturalWidth || 1280, height: surface.naturalHeight || 720 };
}

function closeSurface(surface: FrameSurface) {
  if (surface instanceof ImageBitmap) surface.close();
}

export default function CanvasHero({ onOpenAssessment }: CanvasHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const resolvedRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const targetFrameRef = useRef(0);
  const renderedFrameRef = useRef(0);
  const heroReadyRef = useRef(false);
  const resolvedShownRef = useRef(false);
  const [mode, setMode] = useState<HeroMode>(() => (
    typeof window !== "undefined" && prefersStaticHero() ? "static" : "motion"
  ));
  const [heroReady, setHeroReady] = useState(false);
  const [resolvedVisible, setResolvedVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    if (prefersStaticHero()) {
      window.setTimeout(() => setResolvedVisible(true), 0);
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      window.setTimeout(() => {
        setMode("static");
        setResolvedVisible(true);
      }, 0);
      return;
    }

    setMode("motion");
    let disposed = false;
    let activeRequests = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const queue: number[] = [];
    const queued = new Set<number>();
    const pending = new Map<number, AbortController>();
    const surfaces = new Map<number, FrameSurface>();

    const updateCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    const drawSurface = (surface: FrameSurface) => {
      const { width: sourceWidth, height: sourceHeight } = surfaceSize(surface);
      const canvasRatio = canvas.width / canvas.height;
      const sourceRatio = sourceWidth / sourceHeight;
      let drawWidth = canvas.width;
      let drawHeight = canvas.width / sourceRatio;
      let offsetX = 0;
      let offsetY = (canvas.height - drawHeight) / 2;

      if (canvasRatio < sourceRatio) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * sourceRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(surface, offsetX, offsetY, drawWidth, drawHeight);
    };

    const nearestLoadedSurface = (index: number) => {
      let nearest: FrameSurface | undefined;
      let nearestDistance = Number.POSITIVE_INFINITY;
      for (const [loadedIndex, surface] of surfaces) {
        const distance = Math.abs(loadedIndex - index);
        if (distance < nearestDistance) {
          nearest = surface;
          nearestDistance = distance;
        }
      }
      return nearest;
    };

    const renderFrame = (index: number) => {
      const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      targetFrameRef.current = safeIndex;
      const surface = surfaces.get(safeIndex) ?? nearestLoadedSurface(safeIndex);
      if (surface) {
        drawSurface(surface);
        renderedFrameRef.current = safeIndex;
      }
    };

    const loadSurface = async (index: number, signal: AbortSignal): Promise<FrameSurface> => {
      const response = await fetch(`/assets/frames/f${String(index + 1).padStart(3, "0")}.jpg`, {
        signal,
        cache: "force-cache",
      });
      if (!response.ok) throw new Error(`Frame ${index + 1} returned ${response.status}`);

      const blob = await response.blob();
      if ("createImageBitmap" in window) return createImageBitmap(blob);

      return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(blob);
        image.onload = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(image);
        };
        image.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error(`Frame ${index + 1} could not decode`));
        };
        image.src = objectUrl;
      });
    };

    const evictOutsideWindow = (center: number) => {
      for (const [index, surface] of surfaces) {
        if (Math.abs(index - center) > FRAME_WINDOW) {
          closeSurface(surface);
          surfaces.delete(index);
        }
      }
    };

    const pump = () => {
      if (disposed) return;
      while (activeRequests < FRAME_CONCURRENCY && queue.length > 0) {
        const index = queue.shift();
        if (index === undefined) break;
        queued.delete(index);
        activeRequests += 1;
        const controller = new AbortController();
        pending.set(index, controller);
        loadSurface(index, controller.signal)
          .then((surface) => {
            if (disposed) {
              closeSurface(surface);
              return;
            }
            surfaces.set(index, surface);
            if (index === targetFrameRef.current || !heroReadyRef.current) {
              renderFrame(index);
            }
            if (!heroReadyRef.current && index === 0) {
              heroReadyRef.current = true;
              setHeroReady(true);
            }
            evictOutsideWindow(targetFrameRef.current);
          })
          .catch(() => undefined)
          .finally(() => {
            activeRequests -= 1;
            pending.delete(index);
            pump();
          });
      }
    };

    const requestFrame = (index: number, priority = false) => {
      const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      if (surfaces.has(safeIndex) || pending.has(safeIndex) || queued.has(safeIndex)) return;
      queued.add(safeIndex);
      if (priority) queue.unshift(safeIndex);
      else queue.push(safeIndex);
      pump();
    };

    const warmWindow = (center: number) => {
      requestFrame(center, true);
      for (let offset = 1; offset <= 12; offset += 1) {
        requestFrame(center + offset);
        requestFrame(center - offset);
      }
    };

    updateCanvasDimensions();
    warmWindow(0);

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCanvasDimensions();
        renderFrame(renderedFrameRef.current);
        ScrollTrigger.refresh();
      }, 120);
    });
    resizeObserver.observe(container);

    const setResolvedState = (visible: boolean) => {
      if (resolvedShownRef.current === visible) return;
      resolvedShownRef.current = visible;
      setResolvedVisible(visible);
    };

    const gsapContext = gsap.context(() => {
      gsap.set(headlineRef.current, { opacity: 1, y: 0 });
      gsap.set(resolvedRef.current, { opacity: 0, y: 28 });

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(headlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(".hero-meta-elem", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, "-=0.35");

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: (self) => {
          const progress = self.progress;
          const nextFrame = Math.round(progress * (TOTAL_FRAMES - 1));
          renderFrame(nextFrame);
          warmWindow(nextFrame);
          evictOutsideWindow(nextFrame);
          setResolvedState(progress >= 0.68);
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
        },
      })
        .to(shadeRef.current, { opacity: 0.42, duration: 1 }, 0)
        .to(headlineRef.current, { opacity: 0, y: -52, duration: 0.22, ease: "power1.in" }, 0.18)
        .to(resolvedRef.current, { opacity: 1, y: 0, duration: 0.18 }, 0.68);
    }, container);

    return () => {
      disposed = true;
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      gsapContext.revert();
      for (const controller of pending.values()) controller.abort();
      for (const surface of surfaces.values()) closeSurface(surface);
      surfaces.clear();
      queue.length = 0;
      queued.clear();
    };
  }, []);

  const staticMode = mode !== "motion";

  return (
    <section
      ref={containerRef}
      className={staticMode ? "relative min-h-[100svh] bg-forest text-warm" : "relative h-[240vh] bg-forest text-warm"}
      aria-label="Netso rooftop solar introduction"
      data-hero-mode={mode}
    >
      <div className={staticMode ? "relative min-h-[100svh] overflow-hidden" : "sticky top-0 h-[100svh] w-full overflow-hidden"}>
        <img
          src={STATIC_POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
          fetchPriority="high"
        />

        <div className={`hero-canvas-wrapper absolute inset-0 transition-opacity duration-700 ${heroReady && !staticMode ? "opacity-100" : "opacity-0"}`}>
          <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
        </div>

        <div ref={shadeRef} aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25 opacity-30" />

        <div ref={headlineRef} className={staticMode ? "relative z-10 px-5 pt-[34svh] pb-8 md:px-10 lg:px-16" : "absolute inset-x-0 bottom-10 z-10 px-5 md:bottom-16 md:px-10 lg:px-16"}>
          <div className="hero-meta-elem mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gold md:text-xs">
              Rooftop solar for Bangladesh&apos;s industry
            </p>
          </div>

          <h1 className="max-w-4xl font-display text-[clamp(48px,7vw,104px)] font-bold leading-[0.92] tracking-[-0.055em] text-warm" style={{ textWrap: "balance" }}>
            Your roof.<br />
            Now an energy <span className="text-gold">asset.</span>
          </h1>

          <p className="hero-meta-elem mt-5 max-w-[44ch] text-sm leading-relaxed text-warm/85 md:text-base">
            Netso can finance, design, build and operate a suitable rooftop system. Site fit, commercial terms and responsibilities are confirmed after review.
          </p>

          <div className="hero-meta-elem mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-[0_12px_30px_rgba(198,157,61,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
            >
              Discuss rooftop feasibility
            </button>
            <a href="#calculator" className="inline-flex min-h-12 items-center gap-2 px-2 py-3 text-sm font-semibold text-warm/85 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              See the economics <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
            </a>
          </div>

          <p className="hero-meta-elem mt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-warm/60">
            Concept visualization · illustrative rooftop system · not a verified Netso installation
          </p>
        </div>

        <div
          ref={resolvedRef}
          aria-hidden={!resolvedVisible}
          className={staticMode ? "relative z-10 px-5 pb-10 md:px-10 lg:px-16" : "pointer-events-none absolute inset-x-0 bottom-10 z-10 px-5 md:bottom-16 md:px-10 lg:px-16"}
        >
          <div className="max-w-xl border-l border-gold pl-4 md:pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">01 / Roof fit</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-warm md:text-5xl">Designed around the facility.</h2>
            <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-warm/75 md:text-base">
              Roof fit, access and electrical context come before a project proposal.
            </p>
          </div>
        </div>
      </div>

      {staticMode && (
        <div className="border-t border-warm/10 bg-forest-dark px-5 py-6 font-mono text-[10px] uppercase tracking-[0.14em] text-warm/60 md:px-10">
          Motion is paused for this device or preference. The rooftop proposition remains fully available.
        </div>
      )}
    </section>
  );
}
