import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageCTA, PageHero, PageSection } from "../components/glass/shell";
import aerial from "../assets/neighborhood-aerial.jpg";

const MEANS = [
  {
    title: "Electricity cost depends on the plant",
    desc: "Grid tariffs, operating hours, building loads and roof conditions determine which solar route may be suitable. An assessment comes before any savings estimate.",
    stat: "Site-specific economics",
  },
  {
    title: "Industrial roofs can host generating assets",
    desc: "Structural capacity, wind exposure, drainage, maintenance access and daytime demand must be assessed before a rooftop plant can be designed.",
    stat: "Factory-owned CAPEX",
  },
  {
    title: "Performance evidence matters",
    desc: "Commissioned projects can be monitored using agreed metering and O&M requirements. Environmental attribute eligibility needs separate confirmation.",
    stat: "Verified operating data",
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
    body: "Commercial rooftops can serve daytime loads when suitable engineering and interconnection conditions are satisfied. Benefits depend on actual generation and electricity use.",
  },
  {
    eyebrow: "Corporate model",
    title: (
      <>
        Site-specific models, not a blanket <em>promise.</em>
      </>
    ),
    body: "The factory borrows and owns in the CAPEX route; Netso delivers agreed development services as a subcontractor inside EPC, with no Netso debt or guarantee. A separate funding partner may own an OPEX project under an approved site-specific PPA.",
  },
  {
    eyebrow: "Bankability",
    title: (
      <>
        Evidence before <em>commitment.</em>
      </>
    ),
    body: "Lender eligibility, site engineering, funding and ownership responsibilities are evaluated separately for each project. No facility, financing term or project award is represented as secured.",
  },
];

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        eyebrow="Netso Energy · Chattogram, Bangladesh"
        title={
          <>
            Industrial rooftop infrastructure, engineered for <em>Bangladesh.</em>
          </>
        }
        lede={
          <>
            Netso develops and coordinates rooftop solar for factories in Bangladesh.
            Ownership and financing follow the assessed project: factory-owned CAPEX
            or separately partner-funded OPEX, subject to written terms.
          </>
        }
        image={aerial}
        imageAlt="Illustrative aerial view of industrial buildings"
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
              Development · engineering · delivery
            </span>
            <span className="g-chip">Commercial terms site-specific</span>
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
            Transo Ltd trading as Netso Energy · Chattogram
          </div>
        }
      >
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-start">
          <Reveal>
            <Panel className="p-6 md:p-9" variant="quiet">
              <div className="space-y-5">
                <p className="g-body">
                  I founded Netso in Chattogram to develop practical rooftop-solar projects
                  for Bangladesh's manufacturing sector. Each roof and facility has different
                  technical, commercial and operating needs.
                </p>
                <p className="g-body">
                  The opportunity is to evaluate suitable industrial roofs against building
                  loads, maintenance needs, wind conditions and daytime consumption before
                  proposing any design or financing model.
                </p>
                <p className="g-body">
                  Our factory-owned CAPEX route places borrowing and asset ownership
                  with the factory. Netso provides agreed development services within EPC.
                  A separate partner-funded OPEX route may be considered only after
                  funding-partner approval and site-specific PPA negotiations.
                </p>
                <p className="g-body">
                  Our focus is a first bankable, site-verified transaction that can
                  establish a repeatable process without overstating savings or financing.
                </p>
              </div>

              <div className="mt-8 border-t border-[rgba(255,250,240,0.09)] pt-6">
                <p className="g-display text-[24px]">Tazwar Mahtab</p>
                <p className="g-label mt-2 !text-[9px] text-[var(--g-gold)]">
                  Founder · Transo Ltd trading as Netso Energy
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="g-chip !text-[9px]">Project feasibility</span>
                  <span className="g-chip !text-[9px]">Financing subject to lender review</span>
                  <span className="g-chip !text-[9px]">Net-metering eligibility review</span>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-4">
              <Panel className="p-6">
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">Model</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[rgba(255,250,240,0.72)]">
                  Factory-owned CAPEX or separately partner-funded OPEX, depending on
                  feasibility, ownership responsibilities and written agreements.
                </p>
              </Panel>
              <Panel className="p-6">
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">Footprint</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[rgba(255,250,240,0.72)]">
                  Chattogram-based, with suitability of other Bangladesh industrial sites
                  assessed on an individual basis.
                </p>
              </Panel>
              <Panel className="p-6">
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">Standards</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[rgba(255,250,240,0.72)]">
                  BNBC 2020 structural loading, Net-metering eligibility review settlement and BERC tariff basis.
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
        copy="A roof and load assessment establishes which technical and commercial routes deserve a detailed study."
      />
    </GlassShell>
  );
}
