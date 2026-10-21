import { useState } from "react";
import { Calculator as CalcIcon, FileSpreadsheet, Lock, ShieldCheck } from "lucide-react";
import SavingsCalculator from "../components/SavingsCalculator";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageCTA, PageHero } from "../components/glass/shell";

const NOTES = [
  {
    icon: CalcIcon,
    t: "Floating discount, not a unit rate",
    d: "The model applies a percentage below the applicable grid tariff. No per-kWh price is published, here or in the agreement summary.",
  },
  {
    icon: FileSpreadsheet,
    t: "Board-ready output",
    d: "Copy a pre-formatted memo with your inputs, the modelled saving and the assumptions, ready to paste into a board pack.",
  },
  {
    icon: Lock,
    t: "Nothing leaves the browser",
    d: "The calculation runs locally. Your figures are only sent if you choose to dispatch them to the assessment desk.",
  },
];

export default function CalculatorPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        compact
        eyebrow="CFO modelling engine"
        title={
          <>
            Precision economics for industrial <em>rooftops.</em>
          </>
        }
        lede={
          <>
            Model the facility on your own numbers — monthly grid bill, roof area and
            sector — then export the result as a board memo. Every output is an estimate;
            binding terms live in the executed agreement.
          </>
        }
        actions={
          <>
            <a href="#calculator" className="g-btn">
              Open the model
            </a>
            <a href="/partners" className="g-btn g-btn--ghost">
              Financing structure
            </a>
          </>
        }
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              Runs locally
            </span>
            <span className="g-chip">No per-unit rate disclosed</span>
          </>
        }
      />

      {/* The calculator component is a self-contained instrument with its own
          dark section styling; .g-embed strips that wrapper so it inherits this
          page's canvas instead of stacking a second background. */}
      <section className="g-embed">
        <SavingsCalculator onOpenAssessment={() => setModalOpen(true)} />
      </section>

      <section className="g-section--tight g-section">
        <div className="g-wrap">
          <div className="grid gap-4 md:grid-cols-3">
            {NOTES.map((note, index) => {
              const Icon = note.icon;
              return (
                <Reveal key={note.t} delay={index * 80}>
                  <Panel className="flex h-full flex-col p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,250,240,0.12)] bg-[rgba(255,250,240,0.04)]">
                      <Icon className="h-4 w-4 text-[var(--g-gold)]" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-[15px] font-semibold tracking-[-0.012em] text-[#fffaf0]">
                      {note.t}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                      {note.d}
                    </p>
                  </Panel>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={140}>
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[rgba(255,250,240,0.08)] bg-[rgba(255,250,240,0.025)] p-5">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-[var(--g-gold)]" strokeWidth={1.8} />
              <p className="max-w-[86ch] text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.42)]">
                Assumptions: a 30% floating discount to the applicable grid tariff, a
                conservative long-run tariff escalation, and a specific yield typical for
                Bangladesh. Actual output depends on roof geometry, shading, module
                selection and the executed agreement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <PageCTA
        onAssess={() => setModalOpen(true)}
        title={
          <>
            Take the model to a real <em>roof.</em>
          </>
        }
        copy="The assessment replaces estimates with measured geometry, yield and tariff basis."
      />
    </GlassShell>
  );
}
