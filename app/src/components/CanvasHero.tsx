import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck, Activity, TrendingUp } from "lucide-react";
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

    // Retina & high-DPR adaptive canvas sizing
    const updateCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    updateCanvasDimensions();

    // Preload with chunked priority queue to prevent network starvation
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

    // Aspect-ratio cover drawing to maintain pristine aspect ratio with zero distortion
    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const nw = img.naturalWidth || 1280;
      const nh = img.naturalHeight || 720;

      const imgRatio = nw / nh;
      const canvasRatio = cw / ch;

      let dw = cw;
      let dh = ch;
      let ox = 0;
      let oy = 0;

      if (canvasRatio > imgRatio) {
        dw = cw;
        dh = cw / imgRatio;
        oy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * imgRatio;
        ox = (cw - dw) / 2;
      }

      ctx.drawImage(img, ox, oy, dw, dh);
    };

    // 1. Eagerly load first frame and initial sequence (1-30) for instant interactive response
    const firstImg = loadFrame(1);
    firstImg.onload = () => {
      updateCanvasDimensions();
      drawCover(firstImg);
      const wrapper = containerRef.current?.querySelector(".hero-canvas-wrapper");
      if (wrapper) (wrapper as HTMLElement).style.opacity = "1";
    };

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
      const targetImg = loadFrame(safeIndex + 1);
      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        drawCover(targetImg);
        lastRenderedIndex = safeIndex;
      } else {
        const fallback = frames[lastRenderedIndex];
        if (fallback && fallback.complete && fallback.naturalWidth > 0) {
          drawCover(fallback);
        }
      }
    };

    // Responsive canvas aspect ratio sizing via ResizeObserver
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCanvasDimensions();
        renderFrame(lastRenderedIndex);
        ScrollTrigger.refresh();
      }, 150);
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // GSAP ScrollTrigger Timeline
    const ctxCleanup = gsap.context(() => {
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
      // Keep shade overlay subtle (max 0.35) so twilight colors and pergola lights stay vibrant
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      })
        .to(shadeRef.current, { opacity: 0.35, duration: 1 }, 0)
        .to(scrollCueRef.current, { opacity: 0, duration: 0.12 }, 0)
        .to(headlineRef.current, { y: -80, opacity: 0, duration: 0.25, ease: "power1.in" }, 0.18)
        .set(phase2Ref.current, { visibility: "visible" }, 0.72)
        .fromTo(phase2Ref.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.15 }, 0.75)
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
      aria-label="Roof to energy asset introduction"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-[100vh] h-[100svh] w-full overflow-hidden">
        {/* Canvas Background Layer */}
        <div className="hero-canvas-wrapper absolute inset-0 opacity-0 transition-opacity duration-700">
          <canvas
            ref={canvasRef}
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(0.98) contrast(1.04)" }}
          />
        </div>

        {/* Ambient Gradient Shade (Subtle to preserve dusk lighting and crisp details) */}
        <div
          ref={shadeRef}
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 opacity-25 transition-opacity"
        />

        {/* Phase 1: Opening Kinetic Headline */}
        <div
          ref={headlineRef}
          className="absolute inset-x-0 bottom-14 z-10 max-w-[1240px] px-6 md:px-12 md:bottom-20 lg:px-16"
        >
          <div className="hero-meta-elem mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Netso Energy · Rooftop Energy Infrastructure
            </p>
          </div>

          <h1
            className="font-display font-bold leading-[1.05] tracking-[-0.035em] text-warm text-[clamp(34px,4.8vw,68px)]"
            aria-label="your roof, now an energy asset."
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
            We finance, design, and operate rooftop solar assets for commercial and industrial facilities. Customers buy the power produced under a long-term PPA, with final commercial terms set for each site.
          </p>

          <div className="hero-meta-elem mt-6 flex flex-wrap items-center gap-4">
            <LiquidMetalButton
              label="Request Roof Assessment"
              onClick={onOpenAssessment}
            />
            <a
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-full border border-warm/25 bg-warm/5 px-6 py-3.5 text-sm font-semibold text-warm backdrop-blur-sm transition-all hover:border-warm/50 hover:bg-warm/15 hover:-translate-y-0.5"
            >
              <span>Estimate Institutional ROI</span>
              <ArrowRight className="h-4 w-4 text-gold" />
            </a>
          </div>
        </div>

        {/* Phase 2: Sleek Low-Profile Architectural Glass Dock (Unobstructed Executive View) */}
        <div
          ref={phase2Ref}
          aria-label="Institutional Value Propositions"
          className="invisible absolute inset-x-0 bottom-6 z-10 mx-auto w-full max-w-5xl px-4 opacity-0 md:bottom-8"
        >
          <div className="rounded-2xl md:rounded-full border border-white/15 bg-black/40 p-3 md:px-8 md:py-3.5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Pillar 1 */}
              <div className="flex items-center gap-3.5 md:flex-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 border border-gold/30 text-gold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-bold text-warm">৳0 Upfront</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gold/90 font-semibold bg-gold/10 px-1.5 py-0.5 rounded">CAPEX Free</span>
                  </div>
                  <p className="text-xs text-sage/80 line-clamp-1">
                    Financing pathway under evaluation
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="pt-3 md:pt-0 md:pl-6 flex items-center gap-3.5 md:flex-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 border border-gold/30 text-gold">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-bold text-warm">We Operate It</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">Turnkey O&M</span>
                  </div>
                  <p className="text-xs text-sage/80 line-clamp-1">
                    Monitoring and scheduled operating service
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="pt-3 md:pt-0 md:pl-6 flex items-center gap-3.5 md:flex-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 border border-gold/30 text-gold">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-bold text-warm">Below-grid target</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gold/90 font-semibold bg-gold/10 px-1.5 py-0.5 rounded">Illustrative</span>
                  </div>
                  <p className="text-xs text-sage/80 line-clamp-1">
                    Commercial terms defined per executed PPA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Telemetry Glass Card (Anchored top-right during Phase 2) */}
        <div
          ref={telemetryRef}
          className="pointer-events-none invisible absolute top-20 right-6 z-20 hidden opacity-0 lg:block lg:right-12"
        >
          <div className="w-80 rounded-2xl border border-gold/30 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-warm/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-warm/90">
                  Example Asset View
                </span>
              </div>
              <span className="rounded bg-gold/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-gold">
                REFERENCE
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="font-mono text-[11px] text-warm/60">Example Output</p>
                <p className="font-display text-2xl font-bold tabular-nums text-warm">
                  <span className="text-sm font-normal text-warm/60">Reference</span>
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-warm/60">Commercial Structure</p>
                <p className="font-display text-2xl font-bold tabular-nums text-emerald-400">
                  <span className="text-sm font-normal text-warm/60">Illustrative</span>
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-black/40 p-2.5">
              <div className="flex items-center justify-between text-xs text-warm/75">
                <span>Example Performance Ratio</span>
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
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm/60">
            Scroll to Explore
          </span>
          <div className="w-5 h-8 rounded-full border border-warm/30 flex justify-center p-1">
            <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
