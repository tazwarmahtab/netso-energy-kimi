import { useState } from "react";
import { Sun, Moon, Shield, Award, Sparkles, ArrowRight } from "lucide-react";
import { FadeUp } from "./Reveal";
import dayHq from "../assets/bangladeshi-solar-hq-day.jpg";
import duskHq from "../assets/bangladeshi-solar-hq-dusk.jpg";

interface ArchitecturalTransformationProps {
  onOpenAssessment: () => void;
}

export default function ArchitecturalTransformation({ onOpenAssessment }: ArchitecturalTransformationProps) {
  const [mode, setMode] = useState<"day" | "dusk">("dusk");

  return (
    <section className="relative w-full bg-[#050E0A] py-24 px-6 sm:px-12 border-t border-white/10 overflow-hidden text-cream">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[700px] -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Architectural Solar Pergola • Dhaka Benchmark
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
                Utility infrastructure. <br />
                <span className="text-gold italic font-serif">Engineered to elevate your architecture.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-4 text-base text-sage/85 leading-relaxed font-sans">
                Conventional developers mount ugly blue industrial racks on tin sheds. Netso constructs permanent architectural pergolas with high-tensile steel, dual-glass bifacial modules, and integrated 3000K warm LED lighting — turning non-performing roofs into executive landmarks.
              </p>
            </FadeUp>
          </div>

          {/* Effortless State Toggle Pill */}
          <FadeUp delay={0.25} className="shrink-0">
            <div className="inline-flex items-center p-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-xl shadow-2xl">
              <button
                type="button"
                onClick={() => setMode("day")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                  mode === "day"
                    ? "bg-gold text-forest shadow-md"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                <span>12:00 PM • Peak Irradiance</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("dusk")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                  mode === "dusk"
                    ? "bg-gold text-forest shadow-md"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>6:30 PM • Dusk Illumination</span>
              </button>
            </div>
          </FadeUp>
        </div>

        {/* Visual Showcase Stage */}
        <FadeUp delay={0.3}>
          <div className="relative w-full aspect-[16/9] md:aspect-[21/10] rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
            {/* Daytime Layer */}
            <img
              src={dayHq}
              alt="Netso Architectural Solar Pergola - Daylight View"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                mode === "day" ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
              }`}
            />

            {/* Dusk Illuminated Layer */}
            <img
              src={duskHq}
              alt="Netso Architectural Solar Pergola - Dusk Illumination View"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                mode === "dusk" ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
              }`}
            />

            {/* Subtle Gradient Shadow at bottom for telemetry */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Top Left Floating Spec Capsule */}
            <div className="absolute top-5 left-5 z-10 hidden sm:flex items-center gap-2.5 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-xl font-mono text-[11px] text-warm/90">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dhaka Industrialist Corporate HQ Prototype</span>
            </div>

            {/* Bottom HUD Bar */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-6 z-10">
              <div className="rounded-2xl border border-white/15 bg-black/60 p-4 sm:px-6 sm:py-4 backdrop-blur-2xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs">
                  <div>
                    <span className="text-warm/50 text-[10px] uppercase block tracking-wider">Pergola Structure</span>
                    <span className="font-bold text-warm">High-Tensile Galvanized Steel</span>
                  </div>
                  <div>
                    <span className="text-warm/50 text-[10px] uppercase block tracking-wider">Wind Load Rating</span>
                    <span className="font-bold text-emerald-400">160 km/h Cyclone Certified</span>
                  </div>
                  <div>
                    <span className="text-warm/50 text-[10px] uppercase block tracking-wider">Module Technology</span>
                    <span className="font-bold text-gold">Dual-Glass Bifacial TOPCon</span>
                  </div>
                  <div>
                    <span className="text-warm/50 text-[10px] uppercase block tracking-wider">Architectural Lighting</span>
                    <span className="font-bold text-warm">Integrated 3000K Linear LED</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.02] shadow-lg shadow-gold/20 cursor-pointer shrink-0"
                >
                  <span>Inquire for Your Facility</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* 3 Engineering Standards Strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 font-sans text-xs">
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/25 text-gold">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-cream text-sm">Non-Penetrative Rooftop Clamping</p>
              <p className="mt-1 text-sage/75 leading-relaxed">
                Zero roof punctures on standing-seam roofs. Certified watertight civil anchoring for concrete slabs with 25-year structural warranties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/25 text-gold">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-cream text-sm">Usable Rooftop Terrace Amenity</p>
              <p className="mt-1 text-sage/75 leading-relaxed">
                Unlike ground-mount or low-profile racking that ruins roof access, Netso pergolas preserve full walking height for executive lounges and greenery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/25 text-gold">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-cream text-sm">30-Year Bifacial Generation</p>
              <p className="mt-1 text-sage/75 leading-relaxed">
                Dual-glass bifacial architecture harvests reflected albedo sunlight from the terrace floor, generating up to 25% higher yield per square foot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
