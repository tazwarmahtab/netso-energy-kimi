import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "./Reveal";

interface InstitutionalEconomicsProps {
  onOpenAssessment: () => void;
}

/** Typographic metric rail — Meta 01–04 craft, claims-safe copy (no absolute guarantees). */
const PRINCIPLES = [
  {
    n: "01 / 04",
    metric: "৳0",
    label: "Client CAPEX*",
    copy: "We can invest. You buy power. Roof-sensitive mounting and structural vetting are scoped per facility — financing pathway under evaluation.",
  },
  {
    n: "02 / 04",
    metric: "Below grid",
    label: "Illustrative PPA",
    copy: "Floating discount logic can index to applicable utility rates. Example shapes are illustrative; binding formula lives only in the executed PPA.",
  },
  {
    n: "03 / 04",
    metric: "Long-term",
    label: "BOO ownership",
    copy: "Build-own-operate model: Netso owns, operates, and insures. Tenure and any end-of-term transfer are set project by project.",
  },
  {
    n: "04 / 04",
    metric: "On-site",
    label: "Generation evidence",
    copy: "Avoided grid imports can support emissions accounting and buyer scorecards. Compliance claims remain method- and contract-specific — never absolute on this page.",
  },
] as const;

export default function InstitutionalEconomics({ onOpenAssessment }: InstitutionalEconomicsProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-forest-dark text-cream"
      aria-label="Commercial thesis — contracted rooftop power"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-gold/[0.035] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24 lg:pt-28">
        {/* Zone A — one-job header: display stack + right aside (balanced, not left-cramped) */}
        <FadeUp>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16 xl:gap-20">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/35 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                Rooftop solar · Long-term PPA
              </p>
              <h2 className="font-display mt-7 text-[clamp(2.15rem,4.4vw,3.85rem)] font-bold leading-[1.08] tracking-tight text-warm md:mt-8">
                We don&apos;t sell hardware.
              </h2>
              <p className="font-display-italic mt-4 text-[clamp(1.2rem,2.35vw,1.95rem)] text-gold md:mt-5">
                We sell contracted rooftop power.
              </p>
              <p className="mt-7 max-w-xl text-base leading-[1.7] text-sage/85 md:mt-8">
                Zero client CAPEX pathways, BOO ownership, and an illustrative floating discount vs grid — all subject to site survey, financing, and the executed PPA. If grid rates move, the contract can define how your solar price moves with them.
              </p>
            </div>

            <aside className="max-w-md border-t border-white/10 pt-6 lg:max-w-none lg:border-t-0 lg:border-l lg:pl-10 lg:pt-1 xl:pl-12">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/40">
                Commercial structure · 02
              </p>
              <p className="mt-4 text-sm leading-relaxed text-sage/80 md:text-[15px] md:leading-[1.7]">
                Financed, built and operated by Netso on suitable commercial roofs. You buy the electricity — plant funding stays with us, subject to assessment and the executed PPA.
              </p>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45">
                <p className="flex items-baseline gap-3">
                  <span className="text-gold/80">01</span>
                  <span>৳0 client CAPEX pathways*</span>
                </p>
                <p className="flex items-baseline gap-3">
                  <span className="text-gold/80">02</span>
                  <span>Illustrative below-grid PPA</span>
                </p>
                <p className="flex items-baseline gap-3">
                  <span className="text-gold/80">03</span>
                  <span>Terms confirmed after assessment</span>
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenAssessment}
                className="mt-7 inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold/80"
              >
                Start roof assessment
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </aside>
          </div>
        </FadeUp>

        {/* Zone B — chart as the visual anchor */}
        <FadeUp delay={0.08}>
          <div className="mt-14 md:mt-16">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
                  The Netso commercial model
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-warm sm:text-2xl">
                  How contracted rooftop power can reduce tariff exposure
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5 font-mono text-[11px]">
                <span className="inline-flex items-center gap-2 text-cream/55">
                  <span className="h-2 w-2 rounded-full bg-warm/45" />
                  Utility grid bill (100%)
                </span>
                <span className="inline-flex items-center gap-2 text-gold">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  Netso (illustrative)
                </span>
              </div>
            </div>

            <div className="relative mt-6 aspect-[16/7] w-full min-h-[220px] overflow-hidden rounded-sm bg-[#030906]">
              <svg
                viewBox="0 0 960 360"
                className="h-full w-full"
                preserveAspectRatio="none"
                role="img"
                aria-label="Illustrative utility tariff rising faster than an illustrative Netso PPA path"
              >
                <defs>
                  <linearGradient id="econSpread" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#C6A15B" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="48"
                    y1={40 + i * 56}
                    x2="920"
                    y2={40 + i * 56}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                ))}

                <polygon
                  points="60,210 200,185 340,160 480,130 620,95 760,65 900,42 900,145 760,168 620,195 480,220 340,245 200,262 60,275"
                  fill="url(#econSpread)"
                />
                <polyline
                  fill="none"
                  stroke="#E8E4D9"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="60,210 200,185 340,160 480,130 620,95 760,65 900,42"
                />
                <polyline
                  fill="none"
                  stroke="#C6A15B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="60,275 200,262 340,245 480,220 620,195 760,168 900,145"
                />
                <circle cx="900" cy="42" r="4" fill="#E8E4D9" />
                <circle cx="900" cy="145" r="4" fill="#C6A15B" />
                <text x="700" y="36" fill="rgba(232,228,217,0.75)" fontSize="12" fontFamily="monospace">
                  Utility path
                </text>
                <text x="700" y="168" fill="#C6A15B" fontSize="12" fontFamily="monospace" fontWeight="700">
                  Illustrative PPA
                </text>
              </svg>

              <div className="absolute inset-x-0 bottom-0 flex justify-between border-t border-white/5 px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-cream/35 sm:px-6">
                <span>Year 1</span>
                <span>Year 5</span>
                <span>Year 10</span>
                <span>Year 15</span>
                <span>Year 20</span>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-sage/70">
              Illustrative only. Final spread, indexation and tenure are defined in the executed PPA after site survey and financing.
            </p>
          </div>
        </FadeUp>

        {/* Zone C — Meta-style numbered metric rail (hairlines, not cards) */}
        <FadeUp delay={0.12}>
          <div className="mt-16 grid grid-cols-1 gap-0 border-t border-white/10 md:mt-20 md:grid-cols-2 xl:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.n}
                className={`group py-8 md:px-5 md:py-10 ${
                  i > 0 ? "border-t border-white/10 md:border-t-0 md:border-l xl:border-l" : ""
                } ${i === 2 ? "xl:border-l" : ""} ${i === 1 ? "md:border-l" : ""}`}
              >
                <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-gold/70">{p.n}</p>
                <p className="font-display mt-4 text-[clamp(1.75rem,3vw,2.35rem)] font-bold leading-none tracking-tight text-warm transition-colors group-hover:text-gold">
                  {p.metric}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/45">{p.label}</p>
                <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-sage/75">{p.copy}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Zone D — action strip */}
        <FadeUp delay={0.16}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-lg font-semibold text-warm sm:text-xl">
                Start with a one-page rooftop assessment.
              </p>
              <p className="mt-1 text-sm text-sage/75">
                Free shadow survey scoping · commercial terms confirmed per facility
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-xs font-bold text-forest transition-transform hover:scale-[1.02] hover:bg-gold/90"
              >
                Get roof assessment
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 rounded-full border border-warm/20 px-5 py-3 font-mono text-xs font-semibold text-warm transition-colors hover:border-warm/40 hover:bg-warm/5"
              >
                Open calculator
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
