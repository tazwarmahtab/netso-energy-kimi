import { useState } from "react";
import { ShieldCheck, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";

interface Scenario {
  id: string;
  label: string;
  badge: string;
  gridStatus: string;
  netsoStatus: string;
  offtakerBenefit: string;
  description: string;
  cashImpact: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "baseline",
    label: "Current Baseline",
    badge: "Active Utility Tariff",
    gridStatus: "100% Unhedged",
   netsoStatus: "Illustrative below-grid target",
   offtakerBenefit: "Preliminary estimate",
   description: "This scenario compares a current grid bill with an illustrative rooftop power price. Your project model replaces these assumptions with site data.",
   cashImpact: "The actual outcome depends on load, generation, tariff, settlement, financing and the final agreement.",
  },
  {
    id: "hike",
   label: "Grid price increases",
    badge: "Escalation Shock",
   gridStatus: "Higher utility cost",
   netsoStatus: "Review contracted formula",
   offtakerBenefit: "Compare the exposure",
   description: "A long-term agreement can make part of the power price easier to plan, but the indexation and settlement formula must be reviewed in the contract.",
   cashImpact: "Model the scenario using your tariff schedule and the agreed price formula.",
  },
  {
    id: "dip",
    label: "Tariff Softening Scenario",
    badge: "Downside Protection",
   gridStatus: "Lower utility cost",
   netsoStatus: "Review price floor and formula",
   offtakerBenefit: "Compare the alternatives",
   description: "If grid prices change, the project should make clear how the contracted price changes, where floors apply and how settlement works.",
   cashImpact: "The final agreement should explain the downside case rather than rely on a blanket guarantee.",
  },
];

export function FloatingSimulationChart({
  onOpenFeasibility,
}: {
  onOpenFeasibility?: () => void;
}) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("baseline");

  const currentScenario =
    SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  return (
    <section className="relative w-full bg-[#08140F] py-20 px-6 sm:px-10 border-t border-gold/15">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                 Commercial pricing scenarios
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
               Energy prices change. <br />
               <span className="text-gold italic font-serif">Your agreement should explain what happens next.</span>
            </h2>
            <p className="mt-4 font-sans text-sm sm:text-base text-cream/70 leading-relaxed">
               Use the scenarios below to think through grid-price changes. They are illustrations, not a quote. Netso confirms the price formula, indexation, settlement, term and responsibilities after reviewing the facility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenFeasibility && (
              <button
                type="button"
                onClick={onOpenFeasibility}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.02] cursor-pointer"
              >
                <span>Audit Factory Feasibility</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Simulation Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Chart Column */}
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <span className="font-mono text-xs text-cream/50 uppercase tracking-widest">
                  25-Year Long-Term Contract Horizon
                </span>
                <div className="text-sm font-medium text-cream mt-0.5">
                   Utility power bill vs. illustrative rooftop price
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-4 rounded-full bg-white/40" />
                  <span className="text-cream/60">Utility Grid Bill (100%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-4 rounded-full bg-gold" />
                   <span className="text-gold font-bold">Netso Solar (illustrative)</span>
                </div>
              </div>
            </div>

            {/* SVG Simulation Graphic */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-xl bg-[#050D0A] border border-white/5 p-4 overflow-hidden flex flex-col justify-between">
              <svg viewBox="0 0 600 240" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#C6A15B" stopOpacity="0.03" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
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

                {/* Shaded Spread Area */}
                <polygon
                  points="50,160 140,140 230,125 320,105 410,85 500,60 570,40 570,115 500,135 410,150 320,165 230,180 140,190 50,200"
                  fill="url(#savingsFill)"
                />

                {/* Grid Billing Line (Upper) */}
                <polyline
                  fill="none"
                  stroke="#E8E4D9"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="50,160 140,140 230,125 320,105 410,85 500,60 570,40"
                />

                {/* Netso Floating Line (Lower) */}
                <polyline
                  fill="none"
                  stroke="#C6A15B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="50,200 140,190 230,180 320,165 410,150 500,135 570,115"
                />

                {/* Endpoint Pins */}
                <circle cx="570" cy="115" r="4.5" fill="#C6A15B" />
                <circle cx="570" cy="40" r="4.5" fill="#E8E4D9" />

                {/* Annotation Badges (ZERO PER-UNIT RATES) */}
                <rect x="400" y="32" width="160" height="20" rx="4" fill="#18231e" stroke="#E8E4D9" strokeWidth="0.75" />
                <text x="480" y="46" fill="#E8E4D9" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Utility Grid: 100% Unhedged
                </text>

                <rect x="385" y="107" width="175" height="20" rx="4" fill="#18231e" stroke="#C6A15B" strokeWidth="0.75" />
                <text x="472" y="121" fill="#C6A15B" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                   Illustrative below-grid target
                </text>

                {/* Center Spread Watermark */}
                <text x="280" y="145" fill="rgba(198,161,91,0.55)" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em">
                   ILLUSTRATIVE PRICE DIFFERENCE
                </text>
              </svg>

              {/* X-Axis Horizon */}
              <div className="flex justify-between font-mono text-[10px] text-cream/40 pt-2 border-t border-white/5">
                <span>Year 1 (Commissioning)</span>
                <span>Year 5</span>
                <span>Year 10</span>
                <span>Year 15</span>
                <span>Year 20</span>
                <span>Year 25</span>
              </div>
            </div>

            {/* Bottom Buffer Tag */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] text-cream/50 bg-white/[0.02] p-3 rounded-lg border border-white/5">
               <span>REGULATORY AND TARIFF TREATMENT: REVIEWED PER PROJECT</span>
               <span className="text-gold font-bold">TERMS DOCUMENTED BEFORE COMMITMENT</span>
            </div>
          </div>

          {/* Interactive Scenario Selector Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-cream/50">
               Interactive pricing scenarios
            </span>

            {SCENARIOS.map((scenario) => {
              const active = scenario.id === selectedScenarioId;

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? "border-gold bg-gold/10 shadow-lg shadow-gold/5"
                      : "border-white/10 bg-black/25 hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold ${active ? "text-gold" : "text-cream"}`}>
                      {scenario.label}
                    </span>
                    {active ? (
                      <ShieldCheck className="h-4 w-4 text-gold" />
                    ) : (
                      <span className="font-mono text-[10px] text-cream/40 uppercase tracking-wider">
                        {scenario.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-cream/60 leading-relaxed font-sans">
                    {scenario.description}
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-white/10 font-mono text-[11px]">
                    <div>
                      <div className="text-cream/40 text-[9px] uppercase">Utility Status</div>
                      <div className="font-bold text-cream text-[11px]">{scenario.gridStatus}</div>
                    </div>
                    <div>
                      <div className="text-gold/70 text-[9px] uppercase">Netso Power</div>
                      <div className="font-bold text-gold text-[11px]">{scenario.netsoStatus}</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 text-[9px] uppercase">Your Position</div>
                      <div className="font-bold text-emerald-400 text-[11px]">{scenario.offtakerBenefit}</div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Live Delta Summary Card */}
            <div className="mt-2 rounded-xl border border-gold/30 bg-gold/[0.08] p-5">
              <div className="flex items-center justify-between text-xs font-mono text-cream/70 mb-2">
                 <span>Screening assumption</span>
                <span className="text-gold font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                   Below-grid target
                </span>
              </div>
              <div className="font-display text-3xl font-bold text-cream flex items-baseline gap-2">
                 <span>Preliminary estimate</span>
                 <span className="text-xs font-mono text-gold font-normal">Subject to site review</span>
              </div>
              <p className="mt-2 text-xs text-cream/70 leading-relaxed">
                {currentScenario.cashImpact}
              </p>
              <div className="mt-3 pt-3 border-t border-gold/15 flex items-center gap-2 font-mono text-[11px] text-cream/60">
                <TrendingUp className="h-3.5 w-3.5 text-gold shrink-0" />
                 <span>Funding and O&M terms are agreed per project</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
