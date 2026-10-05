import { useState, useId } from "react";
import { Calculator, TrendingUp, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { LiquidMetalButton } from "./ui/liquid-metal-button";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "./ui/WhatsAppIcon";

interface SavingsCalculatorProps {
  onOpenAssessment?: () => void;
}

export default function SavingsCalculator({ onOpenAssessment }: SavingsCalculatorProps) {
  const billSliderId = useId();
  const roofSliderId = useId();

  // State: Monthly bill in BDT (range: 150k to 3M, step 25k)
  const [monthlyBill, setMonthlyBill] = useState(650000);
  // State: Rooftop area in sq ft (range: 3000 to 40000)
  const [roofArea, setRoofArea] = useState(10000);

  // Constants grounded in MASTER-CONTEXT.md
  const GRID_PEAK_TARIFF = 15.36; // BDT/kWh BERC peak benchmark
  const NETSO_PPA_TARIFF = 10.00; // BDT/kWh CGS executed benchmark
  const TARIFF_SAVINGS_PERCENT = ((GRID_PEAK_TARIFF - NETSO_PPA_TARIFF) / GRID_PEAK_TARIFF); // ~34.9%

  // Calculations
  const monthlySavings = Math.round(monthlyBill * TARIFF_SAVINGS_PERCENT);
  const annualSavings = monthlySavings * 12;
  // 20-year cumulative savings with conservative 2% average annual grid escalation
  const twentyYearSavings = Math.round(annualSavings * 24.3);

  // System sizing estimation
  // ~100 sq ft per kWp of architectural solar pergola with bifacial modules
  const estimatedCapacityKwp = Math.round(roofArea / 100);
  const annualGenerationKwh = Math.round(estimatedCapacityKwp * 1350); // 1,350 kWh/kWp specific yield in BD
  const co2AvoidedTonnes = Math.round((annualGenerationKwh * 0.62) / 1000);

  const formatBDT = (amount: number) => {
    if (amount >= 10000000) {
      return `৳${(amount / 10000000).toFixed(2)} Crore`;
    }
    if (amount >= 100000) {
      return `৳${(amount / 100000).toFixed(1)} Lakh`;
    }
    return `৳${amount.toLocaleString("en-US")}`;
  };

  return (
    <section id="calculator" className="relative bg-forest-dark py-24 text-warm md:py-32">
      {/* Background radial gradient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
            <Calculator className="h-4 w-4 text-gold" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
              Institutional Financial Model
            </span>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-warm md:text-5xl lg:text-6xl">
            See what your roof saves.
          </h2>
          <p className="mt-4 text-base text-sage md:text-lg">
            Based on executed 20-year IDCOL PPA terms: <span className="font-semibold text-warm">৳0 upfront CAPEX</span>, Netso maintenance, and a locked <span className="font-semibold text-gold">৳10.00/kWh flat rate</span> vs. ৳15.36 BERC grid peak.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Controls Column (Left, 5 cols) */}
          <div className="rounded-3xl border border-warm/10 bg-forest/80 p-8 shadow-2xl backdrop-blur-xl lg:col-span-5">
            <h3 className="font-display text-xl font-bold text-warm">
              Facility Parameters
            </h3>
            <p className="mt-1 text-xs text-sage">
              Adjust your current monthly electricity spend and estimated rooftop space.
            </p>

            {/* Slider 1: Monthly Bill */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label htmlFor={billSliderId} className="font-mono text-xs uppercase tracking-wider text-warm/80">
                  Current Monthly Grid Bill
                </label>
                <span className="font-mono text-base font-bold tabular-nums text-gold">
                  {formatBDT(monthlyBill)}
                </span>
              </div>
              <input
                id={billSliderId}
                type="range"
                min={150000}
                max={3000000}
                step={25000}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-warm/15 accent-gold"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-warm/40">
                <span>৳1.5 Lakh</span>
                <span>৳15 Lakh</span>
                <span>৳30 Lakh</span>
              </div>
            </div>

            {/* Slider 2: Rooftop Area */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label htmlFor={roofSliderId} className="font-mono text-xs uppercase tracking-wider text-warm/80">
                  Estimated Usable Roof Area
                </label>
                <span className="font-mono text-base font-bold tabular-nums text-warm">
                  {roofArea.toLocaleString("en-US")} <span className="text-xs text-warm/60">sq ft</span>
                </span>
              </div>
              <input
                id={roofSliderId}
                type="range"
                min={3000}
                max={40000}
                step={500}
                value={roofArea}
                onChange={(e) => setRoofArea(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-warm/15 accent-gold"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-warm/40">
                <span>3,000 sq ft</span>
                <span>20,000 sq ft</span>
                <span>40,000 sq ft</span>
              </div>
            </div>

            {/* Benchmark Comparison Card */}
            <div className="mt-8 rounded-2xl border border-gold/20 bg-black/30 p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-warm/70">BERC Grid Peak Tariff:</span>
                <span className="font-mono font-bold text-red-400">৳15.36 / kWh</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-warm/70">Netso Contracted PPA:</span>
                <span className="font-mono font-bold text-emerald-400">৳10.00 / kWh</span>
              </div>
              <div className="mt-3 border-t border-warm/10 pt-2.5 flex items-center justify-between text-xs font-semibold">
                <span className="text-gold">Contracted Unit Spread:</span>
                <span className="font-mono text-gold">+৳5.36 / kWh saved</span>
              </div>
            </div>
          </div>

          {/* Results Column (Right, 7 cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-gold/30 bg-gradient-to-br from-forest via-forest to-forest-dark p-8 shadow-2xl backdrop-blur-xl lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-warm/10 pb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-warm/80">
                    Net Savings Summary
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>35% Instant Bill Cut</span>
                </div>
              </div>

              {/* Big Stat Row */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-warm/10 bg-black/25 p-5">
                  <p className="font-mono text-xs text-warm/60">Estimated Monthly Savings</p>
                  <p className="mt-1 font-display text-3xl font-bold tabular-nums text-emerald-400 md:text-4xl">
                    {formatBDT(monthlySavings)}
                    <span className="text-sm font-normal text-warm/60"> /mo</span>
                  </p>
                  <p className="mt-2 text-xs text-sage">
                    Direct cash freed up from utility expenses every month.
                  </p>
                </div>

                <div className="rounded-2xl border border-warm/10 bg-black/25 p-5">
                  <p className="font-mono text-xs text-warm/60">20-Year Cumulative Savings</p>
                  <p className="mt-1 font-display text-3xl font-bold tabular-nums text-gold md:text-4xl">
                    {formatBDT(twentyYearSavings)}
                  </p>
                  <p className="mt-2 text-xs text-sage">
                    Hedged against future utility tariff hikes over 20 years.
                  </p>
                </div>
              </div>

              {/* System Specs Subgrid */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-warm/10 bg-black/30 p-4 text-center">
                <div>
                  <p className="font-mono text-[10px] text-warm/50">Capacity</p>
                  <p className="mt-0.5 font-mono text-lg font-bold text-warm">
                    {estimatedCapacityKwp} <span className="text-xs text-gold">kWp</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-warm/50">Annual Clean Units</p>
                  <p className="mt-0.5 font-mono text-lg font-bold text-warm">
                    {(annualGenerationKwh / 1000).toFixed(0)} <span className="text-xs text-gold">MWh</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-warm/50">CO₂ Abated</p>
                  <p className="mt-0.5 font-mono text-lg font-bold text-emerald-400">
                    {co2AvoidedTonnes} <span className="text-xs text-warm/60">t/yr</span>
                  </p>
                </div>
              </div>

              {/* Institutional Guarantees */}
              <div className="mt-6 space-y-2 text-xs text-sage">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  <span><strong>৳0 Upfront Capital:</strong> Netso funds 100% of equipment, installation, and civil works.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-gold" />
                  <span><strong>Turnkey O&M:</strong> Daily cleaning, inverter monitoring, and replacement costs handled by Netso.</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 border-t border-warm/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-warm/60">Want an exact shadow-profiled audit for your building?</p>
                <p className="font-mono text-xs font-semibold text-gold">Free site engineering review within 48 hours</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={getNetsoWhatsAppUrl(
                    `*NETSO ENERGY — 20-YEAR PPA YIELD ESTIMATE*\n\n` +
                    `• Facility Roof: ${roofArea.toLocaleString()} sq ft\n` +
                    `• Monthly Utility Bill: ৳${monthlyBill.toLocaleString()} (PDB MT-2)\n` +
                    `• Estimated Solar Array: ${(roofArea / 100).toFixed(0)} kWp\n` +
                    `• Netso Floating Rate: ৳10.00/kWh (30% Discount below Utility)\n` +
                    `• Estimated Annual Savings: ৳${annualSavings.toLocaleString()}\n` +
                    `• 20-Year Cumulative Savings: ৳${twentyYearSavings.toLocaleString()}\n\n` +
                    `Tazwar, please share the formal IDCOL-compliant term sheet for our facility.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 font-mono text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all hover:scale-[1.02] shadow-sm"
                  title="Forward this verified calculation to Tazwar Mahtab on WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>Forward Board Estimate</span>
                </a>
                <LiquidMetalButton
                  label="Lock In ৳10.00 Rate"
                  onClick={onOpenAssessment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
