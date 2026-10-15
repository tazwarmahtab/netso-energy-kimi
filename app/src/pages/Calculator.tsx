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
                   Illustrative project calculator
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl">
                 See the commercial potential of your roof. <br className="hidden sm:inline" />
                 <span className="text-gold italic font-serif">Then verify it with a site study.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-5 text-base sm:text-lg text-sage max-w-3xl mx-auto leading-relaxed">
                 Use your monthly bill and usable roof area to create a preliminary estimate. The model is illustrative: actual system size, savings, tariff treatment and commercial terms depend on the site, utility connection and definitive agreement.
              </p>
            </FadeUp>

            {/* Quick Financial Trust Badges */}
            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-warm/75">
                <div className="flex items-center gap-2 rounded-full border border-warm/15 bg-black/30 px-3.5 py-1.5 backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                   <span>Project funding assessed per site</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-warm/15 bg-black/30 px-3.5 py-1.5 backdrop-blur-sm">
                  <FileSpreadsheet className="h-4 w-4 text-gold" />
                  <span>One-Click Board Memo Export</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-warm/15 bg-black/30 px-3.5 py-1.5 backdrop-blur-sm">
                  <Lock className="h-4 w-4 text-gold" />
                   <span>Below-grid pricing assessed per site</span>
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
                 Commercial model FAQ
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold text-cream sm:text-4xl">
                 How Netso assesses rooftop power economics.
              </h2>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-warm/10 bg-forest/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-bold text-warm">
                   How is the power price set?
                </h3>
                <p className="mt-2 text-sm text-sage leading-relaxed font-sans">
                   Netso reviews the applicable tariff, load profile, system design, utility connection and project costs before proposing commercial terms. Any discount, indexation or settlement formula is written into the definitive agreement rather than assumed from this calculator.
                </p>
              </div>

              <div className="rounded-2xl border border-warm/10 bg-forest/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-bold text-warm">
                   Can Netso fund the project?
                </h3>
                <p className="mt-2 text-sm text-sage leading-relaxed font-sans">
                   For qualifying projects, Netso can fund the equipment, engineering and installation through its project structure. The final ownership, accounting, security and payment terms are confirmed during due diligence and documented in the agreement.
                </p>
              </div>

              <div className="rounded-2xl border border-warm/10 bg-forest/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-bold text-warm">
                   What happens after installation?
                </h3>
                <p className="mt-2 text-sm text-sage leading-relaxed font-sans">
                   Netso can coordinate monitoring, planned maintenance, cleaning, repairs and warranty administration. The service scope, measurement method and any performance commitments are set out in the project agreement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Turn your non-performing roof into an asset"
          heading="Ready to inspect your facility's 3D solar model?"
           copy="Request a preliminary review of your roof, load profile and utility connection. There is no commitment to proceed."
           cta="Request a rooftop assessment"
        />
      </main>

      <Footer />
      <FeasibilityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
