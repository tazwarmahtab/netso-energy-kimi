import { Link } from "react-router";
import { Calculator as CalcIcon, ArrowRight, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";
import { FadeUp } from "./Reveal";

interface CalculatorTeaserProps {
  onOpenAssessment: () => void;
}

export default function CalculatorTeaser({ onOpenAssessment }: CalculatorTeaserProps) {
  return (
    <section className="relative bg-forest-dark py-20 px-6 sm:px-12 border-y border-warm/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Context & Positioning */}
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 mb-4">
                <CalcIcon className="h-4 w-4 text-gold" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                  Institutional Economics
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
                See what your roof saves. <br />
                <span className="text-gold italic font-serif">Zero capital required.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-4 text-base text-sage leading-relaxed max-w-xl">
                A typical 20,000 sq ft industrial facility in Gazipur or Narayanganj recovers over{" "}
                <strong className="text-warm font-semibold">৳4.6 Lakh / month</strong> directly to EBITDA. Use our institutional calculator to model custom sector savings, 20-year cumulative cash flow, and export a pre-formatted board memo directly to WhatsApp.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/calculator"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.02] shadow-lg shadow-gold/20"
                >
                  <span>Launch Financial Calculator</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-full border border-warm/20 bg-forest/80 px-5 py-3.5 font-mono text-xs font-semibold text-warm transition-all hover:border-warm/40 hover:bg-forest cursor-pointer"
                >
                  <span>Request Feasibility Study</span>
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Key Financial Stat Pill Card */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.2}>
              <div className="relative rounded-3xl border border-gold/30 bg-gradient-to-br from-forest via-forest to-forest-dark p-7 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-warm/10 pb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-warm/70">
                      Sample 20,000 sq ft Plant
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
                    <Sparkles className="h-3 w-3" />
                    <span>30% Guaranteed</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-warm/5 pb-2.5">
                    <span className="text-warm/60">Estimated Solar Capacity:</span>
                    <span className="font-bold text-warm">200 kWp (Bifacial)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-warm/5 pb-2.5">
                    <span className="text-warm/60">Customer Capital Expenditure:</span>
                    <span className="font-bold text-emerald-400">৳0.00 (Zero CAPEX)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-warm/5 pb-2.5">
                    <span className="text-warm/60">Estimated Monthly Savings:</span>
                    <span className="font-bold text-emerald-400">৳4.6 Lakh / mo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-warm/60">20-Year Hedged Savings:</span>
                    <span className="font-bold text-gold text-sm">৳13.2+ Crore</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-warm/10 flex items-center justify-between text-[11px] font-mono text-warm/50">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span>IDCOL Senior Debt Backed</span>
                  </span>
                  <Link to="/calculator" className="text-gold font-semibold hover:underline">
                    Customize Facility →
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
