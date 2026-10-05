import { Link } from "react-router";
import { ArrowRight, ShieldCheck, Activity, TrendingUp, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { FadeUp } from "./Reveal";

interface InstitutionalEconomicsProps {
  onOpenAssessment: () => void;
}

export default function InstitutionalEconomics({ onOpenAssessment }: InstitutionalEconomicsProps) {
  return (
    <section className="relative w-full bg-[#07130E] py-24 px-6 sm:px-12 border-t border-gold/15 overflow-hidden text-cream">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[350px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header: Instant Clarity, Zero Effort */}
        <div className="max-w-3xl mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                Zero Effort • Zero CAPEX
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-[1.08]">
              Your roof. Paying you. <br />
              <span className="text-gold italic font-serif">30% lower power bills from Day 1.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-sage/90 leading-relaxed font-sans max-w-2xl">
              We fund, engineer, construct, and operate a luxury architectural solar pergola on your idle roof. You deploy <strong className="text-cream font-semibold">৳0 capital</strong>, take zero operational risk, and simply pay <strong className="text-gold font-semibold">30% less than your utility electricity bill</strong> every month.
            </p>
          </FadeUp>
        </div>

        {/* 3 Pillars of Zero-Effort Partnership */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1 */}
          <FadeUp delay={0.15}>
            <div className="h-full rounded-2xl border border-white/10 bg-black/30 p-7 backdrop-blur-md shadow-xl flex flex-col justify-between hover:border-gold/30 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                    Zero Investment
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-cream">৳0 Customer CAPEX</h3>
                <p className="mt-2.5 text-xs text-sage/80 leading-relaxed font-sans">
                  Netso finances 100% of equipment, structural steel pergolas, and civil works through 20-year IDCOL concessionary debt. Zero loans or liabilities on your company ledger.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5 font-mono text-[11px] text-cream/50 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Zero balance sheet encumbrance</span>
              </div>
            </div>
          </FadeUp>

          {/* Pillar 2 */}
          <FadeUp delay={0.25}>
            <div className="h-full rounded-2xl border border-white/10 bg-black/30 p-7 backdrop-blur-md shadow-xl flex flex-col justify-between hover:border-gold/30 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Floating Guarantee
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-cream">30% Guaranteed Savings</h3>
                <p className="mt-2.5 text-xs text-sage/80 leading-relaxed font-sans">
                  Contractually indexed strictly below utility tariffs: <strong className="text-cream">Netso Cost = Utility Bill × 0.70</strong>. If the utility increases rates, your retained cash expands. If rates soften, Netso floats down automatically.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5 font-mono text-[11px] text-cream/50 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>100% regulatory downside protection</span>
              </div>
            </div>
          </FadeUp>

          {/* Pillar 3 */}
          <FadeUp delay={0.35}>
            <div className="h-full rounded-2xl border border-white/10 bg-black/30 p-7 backdrop-blur-md shadow-xl flex flex-col justify-between hover:border-gold/30 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
                    <Activity className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                    Turnkey Service
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-cream">We Operate Everything</h3>
                <p className="mt-2.5 text-xs text-sage/80 leading-relaxed font-sans">
                  From SREDA Net Metering approvals to 24/7 automated IoT monitoring and daily bi-facial panel washing — our certified engineers handle every detail. Zero factory downtime during installation.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5 font-mono text-[11px] text-cream/50 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Zero factory maintenance effort</span>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Self-Explanatory Visual Dashboard: Chart + Concrete Benchmark */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: The Self-Explanatory Floating Hedge Curve */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs text-cream/50 uppercase tracking-widest block">
                    The Beth Doctrine
                  </span>
                  <div className="text-sm font-semibold text-cream mt-0.5">
                    How The 30% Floating Hedge Protects Your Profit
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-3 rounded-full bg-white/40" />
                    <span className="text-cream/60">Utility Grid Bill (100%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-3 rounded-full bg-gold" />
                    <span className="text-gold font-bold">Netso (–30%)</span>
                  </div>
                </div>
              </div>

              {/* Graphic Representation */}
              <div className="relative mt-6 w-full aspect-[16/9] rounded-2xl bg-[#040B08] border border-white/5 p-4 overflow-hidden flex flex-col justify-between">
                <svg viewBox="0 0 600 240" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="floatingSavingsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#C6A15B" stopOpacity="0.04" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guideline Grids */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="40"
                      y1={30 + i * 40}
                      x2="580"
                      y2={30 + i * 40}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Shaded 30% Savings Area */}
                  <polygon
                    points="50,160 140,140 230,125 320,105 410,85 500,60 570,40 570,115 500,135 410,150 320,165 230,180 140,190 50,200"
                    fill="url(#floatingSavingsFill)"
                  />

                  {/* Upper Utility Grid Curve */}
                  <polyline
                    fill="none"
                    stroke="#E8E4D9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="50,160 140,140 230,125 320,105 410,85 500,60 570,40"
                  />

                  {/* Lower Netso Floating Discount Line */}
                  <polyline
                    fill="none"
                    stroke="#C6A15B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="50,200 140,190 230,180 320,165 410,150 500,135 570,115"
                  />

                  {/* Endpoint Dots */}
                  <circle cx="570" cy="40" r="4.5" fill="#E8E4D9" />
                  <circle cx="570" cy="115" r="4.5" fill="#C6A15B" />

                  {/* Badges */}
                  <rect x="390" y="32" width="170" height="20" rx="4" fill="#141E1A" stroke="#E8E4D9" strokeWidth="0.75" />
                  <text x="475" y="46" fill="#E8E4D9" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    Utility Grid: 100% Unhedged
                  </text>

                  <rect x="375" y="107" width="185" height="20" rx="4" fill="#141E1A" stroke="#C6A15B" strokeWidth="0.75" />
                  <text x="467" y="121" fill="#C6A15B" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    Netso Guarantee: –30% Below Grid
                  </text>

                  {/* Central Spread Callout */}
                  <text x="270" y="145" fill="rgba(198,161,91,0.65)" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em">
                    30% PERMANENT MARGIN SPREAD (CFO ALPHA)
                  </text>
                </svg>

                {/* Bottom Timeline Horizon */}
                <div className="flex justify-between font-mono text-[10px] text-cream/40 pt-2 border-t border-white/5">
                  <span>Year 1</span>
                  <span>Year 5</span>
                  <span>Year 10</span>
                  <span>Year 15</span>
                  <span>Year 20</span>
                  <span>Year 25</span>
                </div>
              </div>
            </div>

            {/* Bottom Insight Tag */}
            <div className="mt-5 flex items-center justify-between text-xs font-mono text-cream/70 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
              <span>When the utility raises tariffs:</span>
              <span className="text-gold font-bold">Your 30% discount margin is protected</span>
            </div>
          </div>

          {/* Right: The Concrete Benchmark (No Mental Calculation Needed) */}
          <div className="lg:col-span-5 rounded-3xl border border-gold/30 bg-gradient-to-br from-[#0A1A13] via-[#081510] to-[#040C08] p-7 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-warm/10 pb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-gold" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-warm/80">
                    Typical 20,000 sq ft Plant
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="h-3 w-3" />
                  <span>30% Guaranteed</span>
                </div>
              </div>

              {/* Concrete Numbers: What You Actually Get */}
              <div className="mt-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-warm/5 pb-3">
                  <span className="text-warm/60">Customer Upfront Cost:</span>
                  <span className="font-bold text-emerald-400 text-sm">৳0.00 (Zero CAPEX)</span>
                </div>
                <div className="flex items-center justify-between border-b border-warm/5 pb-3">
                  <span className="text-warm/60">Estimated Solar Capacity:</span>
                  <span className="font-bold text-warm">200 kWp (Bifacial)</span>
                </div>
                <div className="flex items-center justify-between border-b border-warm/5 pb-3">
                  <span className="text-warm/60">Estimated Monthly Savings:</span>
                  <span className="font-bold text-emerald-400 text-sm">৳4.6 Lakh / month</span>
                </div>
                <div className="flex items-center justify-between border-b border-warm/5 pb-3">
                  <span className="text-warm/60">20-Year Retained Cash Flow:</span>
                  <span className="font-bold text-gold text-base">৳13.2+ Crore</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm/60">EU CBAM Carbon Abatement:</span>
                  <span className="font-bold text-warm">~168 Tonnes CO₂ / yr</span>
                </div>
              </div>
            </div>

            {/* Direct 1-Click CTAs: Zero Friction */}
            <div className="mt-8 pt-5 border-t border-warm/10">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.02] shadow-xl shadow-gold/20 cursor-pointer mb-3"
              >
                <span>Request 1-Page Rooftop Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-warm/50 px-1">
                <span>Free shadow survey included</span>
                <Link to="/calculator" className="text-gold font-semibold hover:underline inline-flex items-center gap-1">
                  <span>Custom Calculator</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
