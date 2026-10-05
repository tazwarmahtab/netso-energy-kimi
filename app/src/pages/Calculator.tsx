import { useState } from "react";
import { Calculator as CalcIcon, ShieldCheck, FileSpreadsheet, Lock, ArrowDown } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SavingsCalculator from "../components/SavingsCalculator";
import FeasibilityModal from "../components/FeasibilityModal";
import CTASection from "../components/CTASection";
import { FadeUp } from "../components/Reveal";

export default function CalculatorPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#08140F] min-h-screen text-warm">
      <Nav theme="dark" onOpenAssessment={() => setModalOpen(true)} />

      <main id="content">
        {/* Dedicated Calculator Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden border-b border-warm/10">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
                <CalcIcon className="h-4 w-4 text-gold" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                  CFO Financial Modeling Engine
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl">
                Precision Economics for <br className="hidden sm:inline" />
                <span className="text-gold italic font-serif">Industrial Rooftops.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-5 text-base sm:text-lg text-sage max-w-3xl mx-auto leading-relaxed">
                Calibrate your facility’s 20-year cash flow. Powered by the Beth Doctrine:{" "}
                <strong className="text-warm font-medium">zero capital expenditure</strong>, zero technical risk, and a contractually guaranteed{" "}
                <strong className="text-emerald-400 font-medium">30% discount below the utility grid peak tariff</strong>.
              </p>
            </FadeUp>

            {/* Quick Financial Trust Badges */}
            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-warm/75">
                <div className="flex items-center gap-2 rounded-full border border-warm/15 bg-black/30 px-3.5 py-1.5 backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>IDCOL 80% Senior Debt Structured</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-warm/15 bg-black/30 px-3.5 py-1.5 backdrop-blur-sm">
                  <FileSpreadsheet className="h-4 w-4 text-gold" />
                  <span>One-Click Board Memo Export</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-warm/15 bg-black/30 px-3.5 py-1.5 backdrop-blur-sm">
                  <Lock className="h-4 w-4 text-gold" />
                  <span>Floating 30% Margin Hedge</span>
                </div>
              </div>
            </FadeUp>

            <div className="mt-10 flex justify-center">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-warm/50 hover:text-gold transition-colors"
              >
                <span>Jump to Interactive Sliders</span>
                <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
              </a>
            </div>
          </div>
        </section>

        {/* Embedded Full Interactive Calculator Tool */}
        <SavingsCalculator onOpenAssessment={() => setModalOpen(true)} />

        {/* CFO & Board FAQ Section */}
        <section className="relative bg-[#050C0A] py-20 px-6 sm:px-12 border-t border-warm/10">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                Investment Committee FAQ
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold text-cream sm:text-4xl">
                How Netso Structures 30% Savings.
              </h2>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-warm/10 bg-forest/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-bold text-warm">
                  How is the 30% savings contractually protected against grid tariff changes?
                </h3>
                <p className="mt-2 text-sm text-sage leading-relaxed font-sans">
                  Under the Beth Doctrine, Netso indexes your PPA rate directly to the approved Bangladesh Energy Regulatory Commission (BERC) industrial tariff schedule: <strong className="text-warm">Netso PPA Tariff = Grid Tariff × 0.70</strong>. When the utility raises power rates (such as the recent 16.7% BERC tariff hike), your 30% discount margin is preserved and your absolute cash savings expand automatically.
                </p>
              </div>

              <div className="rounded-2xl border border-warm/10 bg-forest/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-bold text-warm">
                  Why does Netso require zero customer CAPEX?
                </h3>
                <p className="mt-2 text-sm text-sage leading-relaxed font-sans">
                  Netso functions as an Independent Power Producer (IPP). We fund 100% of equipment procurement, structural pergola engineering, dual-glass TOPCon bifacial modules, smart inverters, and SREDA grid synchronization through our balance sheet and senior concessionary debt from IDCOL. You simply purchase the clean electricity generated on your roof.
                </p>
              </div>

              <div className="rounded-2xl border border-warm/10 bg-forest/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-bold text-warm">
                  What happens to operational maintenance and weather degradation?
                </h3>
                <p className="mt-2 text-sm text-sage leading-relaxed font-sans">
                  Netso assumes 100% of generation and degradation risk. Our engineering team conducts automated IoT string-level telemetry, bi-weekly robotic or high-pressure washing, and handles warranty replacements. If the array underperforms, you are never billed for phantom kilowatt-hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Turn your non-performing roof into an asset"
          heading="Ready to inspect your facility's 3D solar model?"
          copy="Request a 48-hour preliminary feasibility dossier. Zero cost, zero commitment."
          cta="Request Rooftop Assessment"
        />
      </main>

      <Footer />
      <FeasibilityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
