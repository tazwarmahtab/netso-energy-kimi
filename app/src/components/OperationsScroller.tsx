import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Activity, CheckCircle2, Wrench, Eye, ArrowRight } from "lucide-react";
import { createScrollFilm, fetchFrameManifest } from "../lib/scrollFilmCanvas";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_OPS_FRAMES = 236;

interface OperationsScrollerProps {
  onOpenAssessment?: () => void;
}

export default function OperationsScroller({ onOpenAssessment }: OperationsScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  // Phase refs for synchronized storytelling
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let destroyed = false;
    let film: ReturnType<typeof createScrollFilm> | null = null;
    let ctxCleanup: gsap.Context | null = null;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    resizeObserver.observe(container);

    const boot = async () => {
      const total = await fetchFrameManifest(
        "/assets/ops-frames/manifest.json",
        DEFAULT_OPS_FRAMES,
      );
      if (destroyed) return;

      film = createScrollFilm({
        canvas,
        totalFrames: total,
        frameUrl: (i1) => `/assets/ops-frames/f${String(i1).padStart(3, "0")}.jpg`,
      });

      const wrapper = container.querySelector(".ops-canvas-wrapper");
      if (wrapper) (wrapper as HTMLElement).style.opacity = "1";

      ctxCleanup = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            film?.setProgress(self.progress);
            if (progressTrackRef.current) {
              progressTrackRef.current.style.width = `${(self.progress * 100).toFixed(1)}%`;
            }
          },
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "25% top",
              scrub: 0.5,
            },
          })
          .fromTo(phase1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
          .to(phase1Ref.current, { opacity: 0, y: -20, duration: 0.3 }, 0.7);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: "25% top",
              end: "55% top",
              scrub: 0.5,
            },
          })
          .fromTo(phase2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
          .to(phase2Ref.current, { opacity: 0, y: -20, duration: 0.3 }, 0.75);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: "55% top",
              end: "80% top",
              scrub: 0.5,
            },
          })
          .fromTo(phase3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
          .to(phase3Ref.current, { opacity: 0, y: -20, duration: 0.3 }, 0.75);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: "80% top",
              end: "bottom bottom",
              scrub: 0.5,
            },
          })
          .fromTo(phase4Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
          .to(phase4Ref.current, { opacity: 1, duration: 0.4 }, 0.6);
      }, container);
    };

    void boot();

    return () => {
      destroyed = true;
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      ctxCleanup?.revert();
      film?.destroy();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] bg-forest-dark text-cream"
      aria-label="Reference operating and engineering sequence"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-[100vh] h-[100svh] w-full overflow-hidden">
        {/* Canvas Frame Layer */}
        <div className="ops-canvas-wrapper absolute inset-0 opacity-0 transition-opacity duration-700">
          <canvas
            ref={canvasRef}
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(0.96) contrast(1.05)" }}
          />
        </div>

        {/* Cinematic Vignette Shade */}
        <div
          ref={shadeRef}
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none"
        />

        {/* Section Header Pin (Top Left) */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 max-w-xl pointer-events-none">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/60 px-3.5 py-1 backdrop-blur-xl mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              Reference Operating Sequence • O&M
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-warm">
            Build is only the beginning. <br />
            <span className="text-gold italic font-serif">Operations continue for the life of the agreement.</span>
          </h2>
        </div>

        {/* Phase 1 Narrative: Daily On-Site Audits */}
        <div
          ref={phase1Ref}
          className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 z-20 max-w-md opacity-0 pointer-events-none"
        >
          <div className="rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center gap-2 text-gold mb-2 font-mono text-xs uppercase tracking-wider font-semibold">
              <Eye className="h-4 w-4" />
              <span>Act 01 • Physical Presence</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-warm">Scheduled On-Site Inspection</h3>
            <p className="mt-2 text-xs sm:text-sm text-sage/85 leading-relaxed font-sans">
              The operating model includes structured inspection, preventive maintenance and exception handling. Site frequency is defined by the asset and service agreement.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Safety-led field operations</span>
            </div>
          </div>
        </div>

        {/* Phase 2 Narrative: Optical Precision & Dhaka Sun Reflection */}
        <div
          ref={phase2Ref}
          className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-20 max-w-md opacity-0 pointer-events-none"
        >
          <div className="rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center gap-2 text-gold mb-2 font-mono text-xs uppercase tracking-wider font-semibold">
              <Activity className="h-4 w-4" />
              <span>Act 02 • Optical Architecture</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-warm">Bifacial Generation</h3>
            <p className="mt-2 text-xs sm:text-sm text-sage/85 leading-relaxed font-sans">
              Bifacial modules can use rear-side irradiance in addition to direct light. Actual uplift depends on geometry, albedo and site conditions.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cream/60">
              <span>Specific Yield Benchmark</span>
              <span className="text-gold font-bold">Site-specific yield model</span>
            </div>
          </div>
        </div>

        {/* Phase 3 Narrative: String-Level Multimeter Testing */}
        <div
          ref={phase3Ref}
          className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 z-20 max-w-md opacity-0 pointer-events-none"
        >
          <div className="rounded-2xl border border-gold/30 bg-black/70 p-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center gap-2 text-gold mb-2 font-mono text-xs uppercase tracking-wider font-semibold">
              <Wrench className="h-4 w-4" />
              <span>Act 03 • Engineering Rigor</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-warm">String Voltage Calibration</h3>
            <p className="mt-2 text-xs sm:text-sm text-sage/85 leading-relaxed font-sans">
              DC strings, protection equipment and inverter circuits can be tested and monitored against project commissioning and performance requirements.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-emerald-400">
              <span>Performance Ratio (PR) Floor</span>
              <span className="font-bold text-gold">Project performance requirement</span>
            </div>
          </div>
        </div>

        {/* Phase 4 Narrative: 24/7 Night SCADA & City Skyline Security */}
        <div
          ref={phase4Ref}
          className="absolute bottom-16 inset-x-6 md:inset-x-12 z-20 mx-auto max-w-4xl opacity-0"
        >
          <div className="rounded-3xl border border-gold/40 bg-black/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-gold mb-2 font-mono text-xs uppercase tracking-wider font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Act 04 • Remote Monitoring Model</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-warm">
                Round-The-Clock Utility Security
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-sage/85 leading-relaxed font-sans">
                Remote monitoring and exception handling are part of the operating architecture. Emergency response times are defined in the applicable service agreement.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.02] shadow-xl shadow-gold/20 cursor-pointer"
              >
                <span>Start a facility assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Scrubber Track (Effortless Visual Progress) */}
        <div className="absolute bottom-6 inset-x-6 md:inset-x-12 z-20 flex items-center justify-between gap-4 font-mono text-[10px] text-cream/40 pointer-events-none">
          <span>01 Field Operations</span>
          <div className="h-1 flex-1 max-w-md rounded-full bg-white/10 overflow-hidden">
            <div
              ref={progressTrackRef}
              className="h-full bg-gradient-to-r from-gold to-emerald-400 rounded-full transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>
          <span>04 Remote Monitoring</span>
        </div>
      </div>
    </section>
  );
}
