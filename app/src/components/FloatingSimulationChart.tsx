import { useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";

interface Scenario {
  id: string;
  label: string;
  gridTariff: number;
  description: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "baseline",
    label: "Current Baseline",
    gridTariff: 11.50,
    description: "Standard BERC industrial MT-2 tariff across Dhaka and Gazipur feeders.",
  },
  {
    id: "hike",
    label: "Tariff Escalation (+35%)",
    gridTariff: 15.50,
    description: "Projected 2027–2029 escalation as LNG import subsidies phase out.",
  },
  {
    id: "dip",
    label: "Tariff Dip Scenario",
    gridTariff: 9.50,
    description: "BERC rate softening scenario. Netso tariff automatically floats down to protect your P&L.",
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
  const gridRate = currentScenario.gridTariff;
  const netsoRate = +(gridRate * 0.70).toFixed(2);
  const spreadSavings = +(gridRate - netsoRate).toFixed(2);

  return (
    <section className="relative w-full bg-[#08140F] py-20 px-6 sm:px-10 border-t border-gold/15">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                The Beth Doctrine • Floating Tariff Index
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
              Fixed tariffs die. <br />
              <span className="text-gold italic font-serif">Floating discounts don't.</span>
            </h2>
            <p className="mt-4 font-sans text-sm sm:text-base text-cream/70 leading-relaxed">
              Conventional solar developers lock factories into rigid, 20-year fixed tariffs. When grid prices shift or currency fluctuates, fixed PPAs create balance sheet tension. Netso indexes strictly:{" "}
              <strong className="text-cream">Netso Rate = PDB Rate × 0.70</strong>. You are guaranteed a 30% discount forever.
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
                  25-Year Projection Simulation
                </span>
                <div className="text-sm font-medium text-cream mt-0.5">
                  PDB MT-2 Utility Curve vs. Netso ×0.70 Index
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-4 rounded-full bg-white/40" />
                  <span className="text-cream/60">PDB Grid Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-4 rounded-full bg-gold" />
                  <span className="text-gold font-bold">Netso Rate (–30%)</span>
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

                {/* PDB Grid Line (Upper) */}
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

                {/* Endpoint Pin for Netso */}
                <circle cx="570" cy="115" r="4.5" fill="#C6A15B" />
                <circle cx="570" cy="40" r="4.5" fill="#E8E4D9" />

                {/* Annotation Badges */}
                <rect x="420" y="32" width="130" height="20" rx="4" fill="#18231e" stroke="#E8E4D9" strokeWidth="0.75" />
                <text x="485" y="46" fill="#E8E4D9" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  PDB 2050: ৳24.80
                </text>

                <rect x="420" y="107" width="130" height="20" rx="4" fill="#18231e" stroke="#C6A15B" strokeWidth="0.75" />
                <text x="485" y="121" fill="#C6A15B" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  NETSO 2050: ৳17.36
                </text>

                {/* Center Spread Watermark */}
                <text x="280" y="145" fill="rgba(198,161,91,0.55)" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em">
                  30% PERMANENT SPREAD (CFO ALPHA)
                </text>
              </svg>

              {/* X-Axis Years */}
              <div className="flex justify-between font-mono text-[10px] text-cream/40 pt-2 border-t border-white/5">
                <span>2026 (Y1)</span>
                <span>2030 (Y5)</span>
                <span>2035 (Y10)</span>
                <span>2040 (Y15)</span>
                <span>2045 (Y20)</span>
                <span>2050 (Y25)</span>
              </div>
            </div>

            {/* Bottom Buffer Tag */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] text-cream/50 bg-white/[0.02] p-3 rounded-lg border border-white/5">
              <span>BERC TARIFF RISK: 0% ABSORBED BY OFFTAKER</span>
              <span className="text-gold font-bold">100% REGULATORY DOWNSIDE HEDGE</span>
            </div>
          </div>

          {/* Interactive Scenario Selector Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-cream/50">
              Interactive BERC Stress Test
            </span>

            {SCENARIOS.map((scenario) => {
              const active = scenario.id === selectedScenarioId;
              const sGrid = scenario.gridTariff;
              const sNetso = +(sGrid * 0.70).toFixed(2);
              const sSavings = +(sGrid - sNetso).toFixed(2);

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
                    {active && <ShieldCheck className="h-4 w-4 text-gold" />}
                  </div>

                  <p className="mt-1 text-xs text-cream/60 leading-relaxed font-sans">
                    {scenario.description}
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-white/10 font-mono text-[11px]">
                    <div>
                      <div className="text-cream/40 text-[9px] uppercase">Grid</div>
                      <div className="font-bold text-cream">৳{sGrid.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gold/70 text-[9px] uppercase">Netso</div>
                      <div className="font-bold text-gold">৳{sNetso.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 text-[9px] uppercase">You Save</div>
                      <div className="font-bold text-emerald-400">৳{sSavings.toFixed(2)}/u</div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Live Delta Summary Card */}
            <div className="mt-2 rounded-xl border border-gold/30 bg-gold/[0.08] p-5">
              <div className="flex items-center justify-between text-xs font-mono text-cream/70 mb-2">
                <span>Monthly Tariff Spread</span>
                <span className="text-gold font-bold">30.0% Guaranteed</span>
              </div>
              <div className="font-display text-3xl font-bold text-cream">
                ৳{spreadSavings.toFixed(2)}{" "}
                <span className="text-xs font-mono text-cream/60 font-normal">BDT saved / kWh</span>
              </div>
              <p className="mt-2 text-xs text-cream/60 leading-relaxed">
                For a 1 MWp installation generating 110,000 kWh/month, this yields{" "}
                <strong className="text-gold font-mono">
                  BDT {(110000 * spreadSavings).toLocaleString()} / month
                </strong>{" "}
                direct P&L expansion from Month 1 with zero capital deployed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
