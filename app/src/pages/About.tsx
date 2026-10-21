import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageCTA, PageHero, PageSection } from "../components/glass/shell";
import aerial from "../assets/neighborhood-aerial.jpg";

const MEANS = [
  {
    title: "A factory's biggest controllable cost",
    desc: "Energy is often 20–35% of an industrial plant's operating expenditure. The agreement fixes a floating discount to the grid tariff for the full term, so the exposure has a ceiling.",
    stat: "Term-wide discount",
  },
  {
    title: "Idle roof area becomes a generating asset",
    desc: "Hundreds of thousands of square metres of reinforced industrial roof sit unused across Chattogram and Gazipur. They are already grid-connected, already secured and already maintained.",
    stat: "৳0 upfront CAPEX",
  },
  {
    title: "Power for the economy the world buys from",
    desc: "Buyers increasingly ask suppliers for evidence of decarbonisation. The operating model produces metered generation data and quarterly I-REC attribute certification.",
    stat: "Metered attributes",
  },
];

const THESIS = [
  {
    eyebrow: "Operating thesis",
    title: (
      <>
        Generation belongs where power is <em>consumed.</em>
      </>
    ),
    body: "Transmission losses, imported fuel and unpredictable tariffs throttle factory competitiveness. Generating on the plant roof removes the transmission leg, reduces diesel generator cycling and turns price uncertainty into a defined structure.",
  },
  {
    eyebrow: "Corporate model",
    title: (
      <>
        A utility partner, not a hardware <em>broker.</em>
      </>
    ),
    body: "Netso owns the assets, carries equipment and performance risk, operates the telemetry and sells power under a long-term agreement. If the system produces less, the settlement reflects it.",
  },
  {
    eyebrow: "Institutional architecture",
    title: (
      <>
        Structured for bankable <em>scale.</em>
      </>
    ),
    body: "Each site is ring-fenced in a project vehicle with lender-grade documentation. The IDCOL senior-debt facility is applied for and under appraisal; terms are set at financial close, not on this page.",
  },
];

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        eyebrow="Netso Energy · Dhaka, Bangladesh"
        title={
          <>
            Industrial rooftop infrastructure, engineered for <em>Bangladesh.</em>
          </>
        }
        lede={
          <>
            We finance, build and operate architectural solar pergolas on industrial roofs —
            and sell the power under agreements that outlast the tariff cycle.
          </>
        }
        image={aerial}
        imageAlt="Industrial rooftop solar arrays across a manufacturing district"
        actions={
          <>
            <button type="button" onClick={() => setModalOpen(true)} className="g-btn">
              Request a rooftop assessment
            </button>
            <a href="#thesis" className="g-btn g-btn--ghost">
              Read the thesis
            </a>
          </>
        }
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              Build · own · operate
            </span>
            <span className="g-chip">20-year agreements</span>
          </>
        }
      />

      {/* What this means */}
      <PageSection
        eyebrow="What this means"
        title={
          <>
            Three consequences that matter to a plant <em>board.</em>
          </>
        }
      >
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {MEANS.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <Panel className="flex h-full flex-col p-6 md:p-7">
                <span className="g-label !text-[9px] text-[rgba(198,161,91,0.75)]">{item.stat}</span>
                <h3 className="mt-4 text-[16px] font-semibold leading-snug tracking-[-0.012em] text-[#fffaf0]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                  {item.desc}
                </p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </PageSection>

      {/* Thesis */}
      <section id="thesis" className="g-section border-t border-[rgba(255,250,240,0.07)]">
        <div className="g-wrap space-y-16 md:space-y-24">
          {THESIS.map((block, index) => (
            <div key={block.eyebrow} className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <Reveal>
                  <p className="g-label flex items-center gap-2.5">
                    <span className="g-dot" aria-hidden="true" />
                    {block.eyebrow}
                  </p>
                </Reveal>
                <Reveal delay={70}>
                  <h2 className="g-display g-display--lg mt-5 max-w-[18ch]">{block.title}</h2>
                </Reveal>
              </div>
              <Reveal delay={140}>
                <p className="g-body max-w-[46ch] lg:ml-auto">{block.body}</p>
              </Reveal>
              {index < THESIS.length - 1 ? (
                <div className="g-seam lg:col-span-2" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <PageSection
        eyebrow="Executive leadership"
        title={
          <>
            The sky is already <em>working.</em>
          </>
        }
        aside={
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.45)]">
            <ShieldCheck className="h-4 w-4 text-[var(--g-gold)]" />
            Netso Energy Ltd · Dhaka
          </div>
        }
      >
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-start">
          <Reveal>
            <Panel className="p-6 md:p-9" variant="quiet">
              <div className="space-y-5">
                <p className="g-body">
                  I founded Netso in Dhaka because of an unmistakable paradox: Bangladesh&rsquo;s
                  manufacturing base drives the global supply chain, yet it is squeezed by tariff
                  steps, diesel backup costs and tightening international audits.
                </p>
                <p className="g-body">
                  At the same time, millions of square feet of prime industrial roof sit under
                  high-irradiance equatorial sun, unutilised.
                </p>
                <p className="g-body">
                  The bottleneck was never solar technology — it was financial architecture.
                  Industrialists should not lock core working capital into non-core power hardware
                  or carry electrical maintenance. Netso removes both: we provide{" "}
                  <strong>the capital</strong>, build the pergola, operate the telemetry, and sell
                  electricity at a defined discount to the grid for two decades.
                </p>
                <p className="g-body">
                  One factory roof stabilises an enterprise. A thousand roofs change a grid. The
                  sun is already shining; we are building the infrastructure to harvest it.
                </p>
              </div>

              <div className="mt-8 border-t border-[rgba(255,250,240,0.09)] pt-6">
                <p className="g-display text-[24px]">Tazwar Mahtab</p>
                <p className="g-label mt-2 !text-[9px] text-[var(--g-gold)]">
                  Founder &amp; Managing Director · Netso Energy Ltd
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="g-chip !text-[9px]">Reference site</span>
                  <span className="g-chip !text-[9px]">IDCOL application · under appraisal</span>
                  <span className="g-chip !text-[9px]">SREDA NEM 2025</span>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-4">
              <Panel className="p-6">
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">Model</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[rgba(255,250,240,0.72)]">
                  Build-own-operate rooftop solar, sold as a long-term power agreement rather than
                  a capital purchase.
                </p>
              </Panel>
              <Panel className="p-6">
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">Footprint</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[rgba(255,250,240,0.72)]">
                  Chattogram, Gazipur, Narayanganj and the Ashulia industrial corridor.
                </p>
              </Panel>
              <Panel className="p-6">
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">Standards</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[rgba(255,250,240,0.72)]">
                  BNBC 2020 structural loading, SREDA NEM 2025 settlement and BERC tariff basis.
                </p>
              </Panel>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageCTA
        onAssess={() => setModalOpen(true)}
        title={
          <>
            Start with your own <em>roof.</em>
          </>
        }
        copy="The assessment is the fastest way to see whether the building, the load and the tariff make this work."
      />
    </GlassShell>
  );
}
