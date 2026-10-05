import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";
import { LiquidMetalButton } from "./ui/liquid-metal-button";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

export interface CanvasHeroProps {
  onOpenAssessment?: () => void;
}

export default function CanvasHero({ onOpenAssessment }: CanvasHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 1280;
    canvas.height = 720;

    // Preload with chunked priority queue to prevent mobile network starvation
    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let lastRenderedIndex = 0;

    const loadFrame = (i: number): HTMLImageElement => {
      if (frames[i - 1]) return frames[i - 1];
      const img = new Image();
      const numStr = String(i).padStart(3, "0");
      img.src = `/assets/frames/f${numStr}.jpg`;
      img.decoding = "async";
      frames[i - 1] = img;
      return img;
    };

    // 1. Eagerly load first frame and initial sequence (1-30) for instant interactive response
    const firstImg = loadFrame(1);
    firstImg.onload = () => {
      ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      const wrapper = containerRef.current?.querySelector(".hero-canvas-wrapper");
      if (wrapper) (wrapper as HTMLElement).style.opacity = "1";
    };

    for (let i = 2; i <= 30; i++) {
      loadFrame(i);
    }

    // 2. Progressively stream remaining frames (31-240) in chunks during browser idle time
    let nextChunkStart = 31;
    const CHUNK_SIZE = 20;

    const scheduleNextChunk = () => {
      if (nextChunkStart > TOTAL_FRAMES) return;
      const end = Math.min(TOTAL_FRAMES, nextChunkStart + CHUNK_SIZE);
      for (let i = nextChunkStart; i <= end; i++) {
        loadFrame(i);
      }
      nextChunkStart = end + 1;
      if (nextChunkStart <= TOTAL_FRAMES) {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(scheduleNextChunk, { timeout: 1000 });
        } else {
          setTimeout(scheduleNextChunk, 80);
        }
      }
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(scheduleNextChunk, { timeout: 500 });
    } else {
      setTimeout(scheduleNextChunk, 100);
    }

    const renderFrame = (index: number) => {
      const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      // Ensure target frame is initiated if user scrolls faster than idle queue
      const targetImg = loadFrame(safeIndex + 1);
      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        ctx.drawImage(targetImg, 0, 0, canvas.width, canvas.height);
        lastRenderedIndex = safeIndex;
      } else {
        // Fallback to nearest rendered frame to eliminate black frame flicker
        const fallback = frames[lastRenderedIndex];
        if (fallback && fallback.complete && fallback.naturalWidth > 0) {
          ctx.drawImage(fallback, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    // Responsive canvas aspect ratio sizing via ResizeObserver
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // GSAP ScrollTrigger Timeline
    const ctxCleanup = gsap.context(() => {
      // Set initial positions cleanly with GSAP
      gsap.set(".line-reveal-inner", { yPercent: 110 });
      gsap.set(".hero-meta-elem", { opacity: 0, y: 20 });
      gsap.set(scrollCueRef.current, { opacity: 0 });

      // 1. Initial entrance timeline (staggered line reveal)
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(".hero-canvas-wrapper", { opacity: 1, duration: 1.0 }, 0)
        .to(".line-reveal-inner", { yPercent: 0, duration: 1.0, stagger: 0.1 }, 0.15)
        .to(".hero-meta-elem", { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.45)
        .to(scrollCueRef.current, { opacity: 1, duration: 0.6 }, 0.75);

      // 2. Scroll-driven timeline
      const scrubObj = { frame: 0 };
      
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          // Progress 0.0 to 0.80 maps to frames 0 to 239; 0.80 to 1.00 holds on frame 239
          const scrubProgress = Math.min(1, self.progress / 0.80);
          const targetFrame = Math.round(scrubProgress * (TOTAL_FRAMES - 1));
          if (targetFrame !== scrubObj.frame) {
            scrubObj.frame = targetFrame;
            renderFrame(targetFrame);
          }
        },
      });

      // Synchronized typographic overlay timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      })
        .to(shadeRef.current, { opacity: 0.65, duration: 1 }, 0)
        .to(scrollCueRef.current, { opacity: 0, duration: 0.12 }, 0)
        .to(headlineRef.current, { y: -80, opacity: 0, duration: 0.25, ease: "power1.in" }, 0.18)
        .set(phase2Ref.current, { visibility: "visible" }, 0.72)
        .fromTo(phase2Ref.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.12 }, 0.75)
        .to(phase2Ref.current, { opacity: 1, duration: 0.18 }, 0.85)
        .fromTo(telemetryRef.current, { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.12 }, 0.76);

      return () => {
        st.kill();
      };
    }, containerRef);

    return () => {
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      ctxCleanup.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[380vh] bg-forest text-warm"
      aria-label="Introduction"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-[100vh] h-[100svh] w-full overflow-hidden">
        {/* Canvas Background Layer */}
        <div className="hero-canvas-wrapper absolute inset-0 opacity-0 transition-opacity duration-700">
          <canvas
            ref={canvasRef}
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(0.95) contrast(1.05)" }}
          />
        </div>

        {/* Ambient Gradient Shade */}
        <div
          ref={shadeRef}
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-forest/40 opacity-50"
        />

        {/* Phase 1: Opening Kinetic Headline */}
        <div
          ref={headlineRef}
          className="absolute inset-x-0 bottom-14 z-10 max-w-[1240px] px-6 md:px-12 md:bottom-20 lg:px-16"
        >
          <div className="hero-meta-elem mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Netso Energy · Architectural Solar, Zero CAPEX
            </p>
          </div>

          <h1
            className="font-display font-bold leading-[1.05] tracking-[-0.035em] text-warm text-[clamp(34px,4.8vw,68px)]"
            aria-label="your roof, generating revenue."
          >
            <span className="block overflow-hidden pt-1 pb-3">
              <span className="line-reveal-inner block">
                your roof,
              </span>
            </span>
            <span className="block overflow-hidden pt-1 pb-3">
              <span className="line-reveal-inner block">
                generating
              </span>
            </span>
            <span className="block overflow-hidden pt-1 pb-3">
              <span className="line-reveal-inner block">
                revenue<em className="not-italic text-gold">.</em>
              </span>
            </span>
          </h1>

          <p className="hero-meta-elem mt-4 max-w-xl text-sm leading-relaxed text-warm/85 md:text-base">
            We finance, design, and construct luxury architectural solar pergolas for institutional buildings. You pay zero upfront and buy clean power at a fixed rate <span className="font-semibold text-warm">35% below the grid peak</span>.
          </p>

          <div className="hero-meta-elem mt-6 flex flex-wrap items-center gap-4">
            <LiquidMetalButton
              label="Request Roof Assessment"
              onClick={onOpenAssessment}
            />
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full border border-warm/25 bg-warm/5 px-6 py-3.5 text-sm font-semibold text-warm backdrop-blur-sm transition-all hover:border-warm/50 hover:bg-warm/15 hover:-translate-y-0.5"
            >
              <span>Estimate Institutional ROI</span>
              <ArrowRight className="h-4 w-4 text-gold" />
            </a>
          </div>
        </div>

        {/* Phase 2: 3 Institutional Value Pillars */}
        <div
          ref={phase2Ref}
          aria-label="Institutional Value Propositions"
          className="invisible absolute inset-x-0 bottom-0 z-10 max-w-[1240px] px-6 pb-20 opacity-0 md:px-12 md:pb-28 lg:px-16"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="rounded-2xl border-t-2 border-gold/70 bg-forest/85 p-6 backdrop-blur-md shadow-2xl transition-all">
              <div className="flex items-center gap-2 text-gold mb-2">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold/80">Capital Cost</span>
              </div>
              <p className="font-display text-3xl font-bold tracking-tight text-warm md:text-4xl">
                ৳0 Upfront
              </p>
              <p className="mt-2 text-sm leading-relaxed text-sage">
                100% financed and insured by Netso under a 20-year IDCOL-backed RESCO agreement. Zero balance-sheet liability.
              </p>
            </div>

            <div className="rounded-2xl border-t-2 border-gold/70 bg-forest/85 p-6 backdrop-blur-md shadow-2xl transition-all">
              <div className="flex items-center gap-2 text-gold mb-2">
                <Activity className="h-5 w-5" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold/80">Turnkey Operations</span>
              </div>
              <p className="font-display text-3xl font-bold tracking-tight text-warm md:text-4xl">
                We Operate It
              </p>
              <p className="mt-2 text-sm leading-relaxed text-sage">
                24/7 automated IoT monitoring, daily cleaning, and tier-1 maintenance handled end-to-end by our engineering team.
              </p>
            </div>

            <div className="rounded-2xl border-t-2 border-gold/70 bg-forest/85 p-6 backdrop-blur-md shadow-2xl transition-all">
              <div className="flex items-center gap-2 text-gold mb-2">
                <Zap className="h-5 w-5" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold/80">Tariff Hedge</span>
              </div>
              <p className="font-display text-3xl font-bold tracking-tight text-warm md:text-4xl">
                ৳10.00 / kWh
              </p>
              <p className="mt-2 text-sm leading-relaxed text-sage">
                Contracted flat rate vs. ৳15.36 BERC grid peak — locking in immediate 35% operational savings for your institution.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Telemetry Glass Card (Anchored top-right during Phase 2) */}
        <div
          ref={telemetryRef}
          className="pointer-events-none invisible absolute top-20 right-6 z-20 hidden opacity-0 lg:block lg:right-12"
        >
          <div className="w-80 rounded-2xl border border-gold/30 bg-forest/85 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-warm/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-warm/90">
                  Pergola Telemetry
                </span>
              </div>
              <span className="rounded bg-gold/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-gold">
                LIVE
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="font-mono text-[11px] text-warm/60">Live Output</p>
                <p className="font-display text-2xl font-bold tabular-nums text-warm">
                  64.2 <span className="text-sm font-normal text-gold">kW</span>
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-warm/60">Hourly Savings</p>
                <p className="font-display text-2xl font-bold tabular-nums text-emerald-400">
                  ৳1,420 <span className="text-xs font-normal text-warm/60">/hr</span>
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-black/40 p-2.5">
              <div className="flex items-center justify-between text-xs text-warm/75">
                <span>Performance Ratio</span>
                <span className="font-mono font-bold text-gold">81.4% (PR)</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-warm/15">
                <div className="h-full rounded-full bg-gradient-to-r from-gold to-emerald-400" style={{ width: "81.4%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div
          ref={scrollCueRef}
          aria-hidden="true"
          className="absolute right-6 bottom-8 z-20 flex flex-col items-center gap-3 opacity-0 md:right-12"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-warm/70 [writing-mode:vertical-rl]">
            Scroll to descend
          </span>
          <div className="relative h-14 w-[1.5px] overflow-hidden bg-warm/20">
            <div className="absolute top-0 left-0 h-1/2 w-full animate-scroll-beam bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
