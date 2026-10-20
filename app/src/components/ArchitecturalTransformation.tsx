import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Moon, Shield, Award, Sparkles, ArrowRight } from "lucide-react";
import { FadeUp } from "./Reveal";
import dayHq from "../assets/bangladeshi-solar-hq-day.jpg";
import duskHq from "../assets/bangladeshi-solar-hq-dusk.jpg";
import {
  createGapCompressedMapper,
  createScrollFilm,
  fetchFrameManifest,
} from "../lib/scrollFilmCanvas";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ARCH_FRAMES = 240;
/** Near-black cinematic breath in pergola-dusk extract (1-based). */
const BLACK_GAP_START = 149;
const BLACK_GAP_END = 188;

interface ArchitecturalTransformationProps {
  onOpenAssessment: () => void;
}

export default function ArchitecturalTransformation({ onOpenAssessment }: ArchitecturalTransformationProps) {
  const filmRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const phaseSkyRef = useRef<HTMLDivElement>(null);
  const phaseStructureRef = useRef<HTMLDivElement>(null);
  const phaseOccupiedRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"day" | "dusk">("dusk");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = filmRef.current;
    if (!canvas || !container) return;

    let destroyed = false;
    let film: ReturnType<typeof createScrollFilm> | null = null;
    let ctxCleanup: gsap.Context | null = null;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });
    resizeObserver.observe(container);

    const boot = async () => {
      const total = await fetchFrameManifest(
        "/assets/architecture-frames/manifest.json",
        DEFAULT_ARCH_FRAMES,
      );
      if (destroyed) return;

      film = createScrollFilm({
        canvas,
        totalFrames: total,
        frameUrl: (i1) => `/assets/architecture-frames/f${String(i1).padStart(3, "0")}.jpg`,
        mapProgress: createGapCompressedMapper(BLACK_GAP_START, BLACK_GAP_END, 0.05),
      });

      const wrapper = container.querySelector(".arch-canvas-wrapper");
      if (wrapper) (wrapper as HTMLElement).style.opacity = "1";

      ctxCleanup = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            film?.setProgress(Math.min(1, self.progress / 0.92));
            if (progressRef.current) {
              progressRef.current.style.width = `${(self.progress * 100).toFixed(1)}%`;
            }
          },
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.45,
            },
          })
          .fromTo(phaseSkyRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0.02)
          .to(phaseSkyRef.current, { opacity: 0, y: -16, duration: 0.1 }, 0.22)
          .fromTo(phaseStructureRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0.28)
          .to(phaseStructureRef.current, { opacity: 0, y: -16, duration: 0.1 }, 0.55)
          .fromTo(phaseOccupiedRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.14 }, 0.62)
          .to(phaseOccupiedRef.current, { opacity: 1, duration: 0.2 }, 0.85);
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
    <>
      {/* Scroll-film: unused pergola-dusk master → sky → structure → occupied terrace */}
      <section
        ref={filmRef}
        className="relative h-[240vh] bg-forest-dark text-cream"
        aria-label="Reference architecture dusk film"
      >
        <div className="sticky top-0 h-[100vh] h-[100svh] w-full overflow-hidden">
          <div className="arch-canvas-wrapper absolute inset-0 opacity-0 transition-opacity duration-700">
            <canvas
              ref={canvasRef}
              className="h-full w-full object-cover object-center"
              style={{ filter: "brightness(0.97) contrast(1.04)" }}
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/45"
          />

          <div className="absolute top-8 left-6 z-20 max-w-xl md:top-12 md:left-12 pointer-events-none">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/55 px-3.5 py-1 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Reference Architecture • Dusk Film
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-warm sm:text-3xl md:text-4xl">
              Rooftop energy infrastructure.{" "}
              <span className="font-serif italic text-gold">Designed to work with the building.</span>
            </h2>
          </div>

          <div
            ref={phaseSkyRef}
            className="pointer-events-none absolute bottom-28 left-6 z-20 max-w-sm opacity-0 md:left-12"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/90">Act 01 · Possibility</p>
            <p className="mt-1 font-display text-xl font-bold text-warm md:text-2xl">Open sky before the asset.</p>
            <p className="mt-2 text-sm leading-relaxed text-sage/85">
              The sequence begins in atmosphere — the roof as latent capacity, not yet infrastructure.
            </p>
          </div>

          <div
            ref={phaseStructureRef}
            className="pointer-events-none absolute bottom-28 right-6 z-20 max-w-sm opacity-0 md:right-12"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/90">Act 02 · Structure</p>
            <p className="mt-1 font-display text-xl font-bold text-warm md:text-2xl">Elevated canopy, lived geometry.</p>
            <p className="mt-2 text-sm leading-relaxed text-sage/85">
              Steel, bifacial modules, and integrated lighting read as architecture — site geometry stays specific.
            </p>
          </div>

          <div
            ref={phaseOccupiedRef}
            className="pointer-events-none absolute inset-x-6 bottom-20 z-20 mx-auto max-w-3xl opacity-0 md:inset-x-12"
          >
            <div className="rounded-2xl border border-white/15 bg-black/65 p-5 backdrop-blur-2xl md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/90">Act 03 · Occupation</p>
              <p className="mt-1 font-display text-xl font-bold text-warm md:text-2xl">
                The asset as usable terrace amenity.
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sage/85">
                Reference dusk occupation — not a commissioned Netso site. Final structure, lighting, and finishes are engineered per facility.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-6 bottom-6 z-20 flex items-center gap-4 font-mono text-[10px] text-cream/40 md:inset-x-12">
            <span>Sky</span>
            <div className="h-1 max-w-md flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                ref={progressRef}
                className="h-full rounded-full bg-gradient-to-r from-gold to-emerald-400"
                style={{ width: "0%" }}
              />
            </div>
            <span>Occupied</span>
          </div>
        </div>
      </section>

      {/* Day / dusk same-viewpoint evidence pair (static HQ stills) */}
      <section className="relative w-full overflow-hidden border-t border-white/10 bg-forest-dark px-6 py-24 text-cream sm:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/4 top-1/2 h-[500px] w-[700px] -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <FadeUp>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Same Viewpoint • Day ↔ Dusk
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl md:text-5xl">
                  Generation by day.{" "}
                  <span className="font-serif italic text-gold">Occupation by dusk.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="mt-4 font-sans text-base leading-relaxed text-sage/85">
                  Identical camera on a Bangladesh C&amp;I reference configuration — elevated steel, bifacial modules, optional under-canopy lighting. Not a deployed Netso asset.
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.25} className="shrink-0">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-black/50 p-1.5 shadow-2xl backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setMode("day")}
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-semibold transition-all ${
                    mode === "day" ? "bg-gold text-forest shadow-md" : "text-cream/70 hover:text-cream"
                  }`}
                >
                  <Sun className="h-3.5 w-3.5" />
                  <span>12:00 PM • Peak Irradiance</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("dusk")}
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-semibold transition-all ${
                    mode === "dusk" ? "bg-gold text-forest shadow-md" : "text-cream/70 hover:text-cream"
                  }`}
                >
                  <Moon className="h-3.5 w-3.5" />
                  <span>6:30 PM • Dusk Illumination</span>
                </button>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.3}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.8)] md:aspect-[21/10]">
              <img
                src={dayHq}
                alt="Netso Architectural Solar Pergola - Daylight View"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                  mode === "day" ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                }`}
              />
              <img
                src={duskHq}
                alt="Netso Architectural Solar Pergola - Dusk Illumination View"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                  mode === "dusk" ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                }`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="absolute left-5 top-5 z-10 hidden items-center gap-2.5 rounded-full border border-white/15 bg-black/60 px-4 py-2 font-mono text-[11px] text-warm/90 backdrop-blur-xl sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span>REFERENCE CONFIGURATION • NOT A DEPLOYED ASSET</span>
              </div>

              <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-8 sm:bottom-6">
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-black/60 p-4 shadow-2xl backdrop-blur-2xl sm:flex-row sm:items-center sm:px-6 sm:py-4">
                  <div className="flex flex-wrap items-center gap-6 font-mono text-xs sm:gap-8">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-warm/50">Pergola Structure</span>
                      <span className="font-bold text-warm">High-Tensile Galvanized Steel</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-warm/50">Wind Load Rating</span>
                      <span className="font-bold text-emerald-400">Site-specific wind design</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-warm/50">Module Technology</span>
                      <span className="font-bold text-gold">Bifacial module configuration</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-warm/50">Architectural Lighting</span>
                      <span className="font-bold text-warm">Optional 3000K lighting</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenAssessment}
                    className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-bold text-forest shadow-lg shadow-gold/20 transition-all hover:scale-[1.02] hover:bg-gold/90"
                  >
                    <span>Inquire for Your Facility</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 font-sans text-xs md:grid-cols-3">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-cream">Non-Penetrative Rooftop Clamping</p>
                <p className="mt-1 leading-relaxed text-sage/75">
                  Standing-seam attachment can use non-penetrative systems where permitted by the roof and clamp design. Concrete-roof anchoring is engineered site by site.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-cream">Usable Rooftop Terrace Amenity</p>
                <p className="mt-1 leading-relaxed text-sage/75">
                  Elevated layouts can preserve access corridors and create covered space where the structural design permits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-cream">Long-life module architecture</p>
                <p className="mt-1 leading-relaxed text-sage/75">
                  Bifacial modules can capture rear-side irradiance. Actual yield depends on geometry, albedo, shading, module characteristics and site conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
