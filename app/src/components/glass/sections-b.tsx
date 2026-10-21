import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Gauge,
  Leaf,
  ShieldCheck,
  Sun,
  Wrench,
} from "lucide-react";
import { GhostLink, GoldLink, Panel, Reveal, SectionHead } from "./primitives";
import { useInView } from "../../hooks/useInView";
import panels from "../../assets/panels-closeup.jpg";
import aerial from "../../assets/neighborhood-aerial.jpg";

/* ========================================================================== */
/*  OPERATIONS — a sequence, not a feature list                               */
/* ========================================================================== */

const OPS = [
  {
    n: "01",
    t: "Survey and structural model",
    d: "Roof geometry, purlin spacing, sanctioned load and shading are measured. The pergola is modelled against local wind and monsoon loading before a single clamp is ordered.",
    meta: "Week 1–2",
  },
  {
    n: "02",
    t: "Design, finance, approve",
    d: "Layout, single-line diagram and yield model are issued together with the commercial structure. Disbursement milestones are agreed before mobilisation.",
    meta: "Week 3–5",
  },
  {
    n: "03",
    t: "Build around production",
    d: "Installation is sequenced around shift patterns. Non-penetrative attachments avoid roof works; commissioning is scheduled to avoid line stoppage.",
    meta: "Week 6–12",
  },
  {
    n: "04",
    t: "Operate and settle",
    d: "Generation, maintenance and settlement run through one operating model. Class 0.2s metering records what was produced and what it replaces.",
    meta: "Year 1–20",
  },
];

export function GlassOperations() {
  return (
    <section id="operations" className="g-section">
      <div className="g-wrap">
        <SectionHead
          eyebrow="Operations"
          title={
            <>
              One accountable party from survey to <em>settlement.</em>
            </>
          }
          aside={
            <p className="g-body max-w-[40ch] lg:ml-auto">
              Netso owns the asset and the operating risk. There is no EPC hand-off and no
              separate O&amp;M contract to reconcile.
            </p>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <Panel className="overflow-hidden p-2" variant="deep">
              <div className="relative overflow-hidden rounded-[16px]">
                <img
                  src={panels}
                  alt="Close detail of bifacial solar modules and the galvanised pergola frame"
                  className="g-img aspect-[4/5]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(4,13,9,0.92))] p-5">
                  <span className="g-label !text-[9px]">Reference detail</span>
                  <p className="mt-2 max-w-[32ch] text-[13px] leading-relaxed text-[rgba(255,250,240,0.7)]">
                    Dual-glass bifacial modules on a hot-dip galvanised steel frame,
                    detailed for standing-seam roofs.
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>

          <div className="g-rail">
            <div className="g-rail__line" aria-hidden="true" />
            {OPS.map((step, index) => (
              <Reveal key={step.n} delay={index * 80}>
                <Panel className="group relative p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[rgba(198,161,91,0.28)] bg-[rgba(198,161,91,0.08)] font-mono text-[10.5px] tracking-[0.1em] text-[var(--g-gold)]">
                      {step.n}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-[#fffaf0]">
                          {step.t}
                        </h3>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.34)]">
                          {step.meta}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-[rgba(255,250,240,0.58)]">
                        {step.d}
                      </p>
                    </div>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  PROOF — six objection themes                                              */
/* ========================================================================== */

const PROOF = [
  {
    icon: Sun,
    t: "Daytime load matching",
    d: "Sewing and processing lines run through the solar window. Generation is consumed behind the meter, so storage is not required to make the economics work.",
  },
  {
    icon: ShieldCheck,
    t: "Roof attachment",
    d: "Standing-seam clamps and ballasted frames. No penetration, no reliance on the waterproofing warranty being reissued.",
  },
  {
    icon: Wrench,
    t: "Installation around operations",
    d: "Mobilisation is sequenced against shift patterns and material flow. Roof access and crane positions are agreed with plant management.",
  },
  {
    icon: Leaf,
    t: "Buyer reporting",
    d: "Generation and avoided-emissions data can support EU CBAM and buyer audit requests. Reporting readiness, not a certification claim.",
  },
  {
    icon: Gauge,
    t: "Grid and net metering",
    d: "Designed against SREDA NEM 2025 settlement rules, with bidirectional metering and a documented import/export boundary.",
  },
  {
    icon: Building2,
    t: "Local O&M",
    d: "Regional technicians, spares held in-country, and a defined response window. Performance risk stays with Netso.",
  },
];

export function GlassProof() {
  return (
    <section id="proof" className="g-section g-section--tight">
      <div className="g-wrap">
        <SectionHead
          eyebrow="Operational proof"
          title={
            <>
              The objections are <em>engineering</em> questions.
            </>
          }
          aside={
            <p className="g-body max-w-[40ch] lg:ml-auto">
              Every objection a plant head raises is answered by a detail, not a brochure
              line. These are the six that decide whether a roof moves forward.
            </p>
          }
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal stagger className="contents">
            {PROOF.map((item) => {
              const Icon = item.icon;
              return (
                <Panel key={item.t} className="flex flex-col p-6 md:p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,250,240,0.12)] bg-[rgba(255,250,240,0.04)]">
                    <Icon className="h-4 w-4 text-[var(--g-gold)]" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-[15.5px] font-semibold tracking-[-0.012em] text-[#fffaf0]">
                    {item.t}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                    {item.d}
                  </p>
                </Panel>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  BENEFITS — three lenses on the same asset                                 */
/* ========================================================================== */

const LENSES = [
  {
    id: "cost",
    label: "Cost",
    title: "Lower the cost of power without buying the asset",
    body: "Netso structures a rooftop PPA priced below the applicable grid tariff. Final savings depend on the facility, tariff structure, system output and the executed agreement — not on a headline rate.",
    points: ["No client CAPEX", "Off-balance-sheet power purchase", "Floating discount, not a fixed unit rate"],
  },
  {
    id: "risk",
    label: "Risk",
    title: "Replace an unhedged exposure with a defined one",
    body: "A long-term agreement converts part of your grid-price exposure into a contractually defined structure. Netso carries construction, performance and maintenance risk for the term.",
    points: ["Performance risk with Netso", "O&M inside the agreement", "Insured and monitored asset"],
  },
  {
    id: "control",
    label: "Control",
    title: "See generation and settlement as one record",
    body: "The operating model connects generation data, maintenance activity and commercial settlement, so the invoice can be reconciled against what the roof actually produced.",
    points: ["Class 0.2s metering", "Settlement-grade data", "Live telemetry once commissioned"],
  },
];

export function GlassBenefits() {
  const [active, setActive] = useState(0);
  const lens = LENSES[active];

  return (
    <section id="benefits" className="g-section">
      <div className="g-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Why industrial offtakers sign"
            title={
              <>
                Three lenses on the <em>same asset.</em>
              </>
            }
          />
          <Reveal delay={120}>
            <div
              role="tablist"
              aria-label="Benefits"
              className="flex gap-1 rounded-full border border-[rgba(255,250,240,0.1)] bg-[rgba(255,250,240,0.03)] p-1"
            >
              {LENSES.map((item, index) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") setActive((index + 1) % LENSES.length);
                    if (event.key === "ArrowLeft")
                      setActive((index - 1 + LENSES.length) % LENSES.length);
                  }}
                  className={`rounded-full px-5 py-2 text-[13px] font-medium transition-colors ${
                    active === index
                      ? "bg-[rgba(198,161,91,0.16)] text-[var(--g-gold-hi)]"
                      : "text-[rgba(255,250,240,0.5)] hover:text-[rgba(255,250,240,0.8)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-12">
          <Panel className="overflow-hidden" variant="deep">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="p-8 md:p-10 lg:p-12">
                <h3 className="g-display g-display--md max-w-[22ch]">{lens.title}</h3>
                <p className="g-body mt-5 max-w-[48ch]">{lens.body}</p>

                <ul className="mt-8 space-y-3">
                  {lens.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[13.5px] text-[rgba(255,250,240,0.66)]">
                      <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-[var(--g-gold)]" />
                      {point}
                    </li>
                  ))}
                </ul>

                <GoldLink href="#cta" className="mt-9">
                  See if the roof qualifies
                  <ArrowUpRight className="h-4 w-4" />
                </GoldLink>
              </div>

              <div className="relative min-h-[280px] border-t border-[rgba(255,250,240,0.08)] lg:border-l lg:border-t-0">
                <img
                  src={panels}
                  alt="Bifacial solar modules above an industrial roof"
                  className="g-img absolute inset-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,13,9,0.15),rgba(4,13,9,0.75))]" />
                <div className="absolute inset-x-5 bottom-5">
                  <Panel variant="deep" className="p-4">
                    <p className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">
                      {lens.label} lens
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.66)]">
                      Model outputs are illustrative until a site survey fixes geometry,
                      yield and tariff basis.
                    </p>
                  </Panel>
                </div>
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  PROCESS                                                                   */
/* ========================================================================== */

const PROCESS = [
  {
    n: "01",
    t: "Assess",
    d: "Share twelve months of bills and a roof plan. We return a feasibility view with the tariff basis, roof constraints and a provisional structure.",
  },
  {
    n: "02",
    t: "Structure",
    d: "Netso finances and builds. The commercial terms, milestones and settlement basis are fixed in the agreement before mobilisation.",
  },
  {
    n: "03",
    t: "Operate",
    d: "Netso runs the asset for the term — monitoring, maintenance, insurance and settlement — against a published performance basis.",
  },
];

export function GlassProcess() {
  return (
    <section id="process" className="g-section g-section--tight">
      <div className="g-wrap">
        <SectionHead
          eyebrow="How it proceeds"
          title={
            <>
              Three decisions, then <em>execution.</em>
            </>
          }
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PROCESS.map((step, index) => (
            <Reveal key={step.n} delay={index * 90}>
              <Panel className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="g-label !text-[9px] text-[rgba(198,161,91,0.7)]">
                    Step {step.n}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[rgba(255,250,240,0.22)]" />
                </div>
                <h3 className="g-display g-display--md mt-6">{step.t}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[rgba(255,250,240,0.56)]">
                  {step.d}
                </p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  WHY — the market argument, as three numbers                              */
/* ========================================================================== */

const MARKET = [
  {
    big: "16.7%",
    label: "Industrial tariff step in a single BERC order",
    note: "An operating budget with no ceiling and no hedge.",
  },
  {
    big: "30%",
    label: "Floating discount below the applicable grid tariff",
    note: "The percentage is the contract; the unit rate is never published.",
  },
  {
    big: "3,600 MWp",
    label: "Estimated industrial rooftop hosting capacity",
    note: "A market sitting above the buildings that need it most.",
  },
];

export function GlassWhy() {
  return (
    <section id="why" className="g-section relative overflow-clip">
      <div className="g-wrap">
        <SectionHead
          eyebrow="Why now"
          title={
            <>
              The grid cannot carry the <em>ambition.</em>
            </>
          }
          aside={
            <p className="g-body max-w-[38ch] lg:ml-auto">
              Tariffs move, demand grows, and the land available for utility-scale plant
              does not. The roof is the only site already connected.
            </p>
          }
        />

        <div className="mt-14 border-t border-[rgba(255,250,240,0.09)]">
          {MARKET.map((item, index) => (
            <Reveal key={item.big} delay={index * 70}>
              <div className="group grid items-center gap-4 border-b border-[rgba(255,250,240,0.07)] py-8 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)_minmax(0,0.75fr)] md:gap-8 md:py-10">
                <p className="g-num text-[clamp(2.4rem,5vw,4rem)] leading-none text-[var(--g-gold-hi)] transition-colors duration-500 group-hover:text-[#fffaf0]">
                  {item.big}
                </p>
                <p className="max-w-[38ch] text-[19px] font-medium leading-snug tracking-[-0.015em] text-[#fffaf0] md:text-[22px]">
                  {item.label}
                </p>
                <p className="max-w-[34ch] text-[13px] leading-relaxed text-[rgba(255,250,240,0.45)] md:justify-self-end">
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 max-w-[70ch] text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.32)]">
            Market sizing is an estimate and varies by source. Tariff figures reference
            published BERC orders; the discount is a commercial structure, not a quoted
            unit rate.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  NETWORK — the aerial plate                                               */
/* ========================================================================== */

export function GlassNetwork() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section id="network" className="g-section">
      <div className="g-wrap">
        <SectionHead
          eyebrow="The network"
          title={
            <>
              One roof at a time, a <em>distributed</em> utility.
            </>
          }
        />

        <Reveal delay={120} className="mt-12">
          <div ref={ref} className="relative overflow-hidden rounded-[26px] border border-[rgba(255,250,240,0.1)]">
            <img
              src={aerial}
              alt="Aerial view of an industrial district at golden hour with solar arrays on factory roofs"
              className={`g-img aspect-[4/5] sm:aspect-[16/9] transition-transform [transition-duration:1400ms] ease-out ${
                inView ? "scale-100" : "scale-[1.06]"
              }`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,13,9,0.55),transparent_38%,rgba(4,13,9,0.86))]" />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-7">
              <span className="g-chip">
                <span className="g-dot" aria-hidden="true" />
                Chattogram corridor
              </span>
              <span className="g-chip hidden sm:inline-flex">Reference geography</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <p className="max-w-[52ch] text-[14px] leading-relaxed text-[rgba(255,250,240,0.72)]">
                  Rooftops generate where the load is. Each asset settles locally and
                  joins a portfolio that grows with every commissioning.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Generate", "Consume", "Settle"].map((word) => (
                    <span key={word} className="g-chip">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  CTA                                                                       */
/* ========================================================================== */

export function GlassCTA({ onAssess }: { onAssess: () => void }) {
  return (
    <section id="cta" className="g-section">
      <div className="g-wrap">
        <Reveal>
          <Panel className="relative overflow-hidden px-6 py-16 text-center md:px-16 md:py-24" variant="gold">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(198,161,91,0.22),transparent_70%)]"
            />
            <p className="g-label relative justify-center">Rooftop assessment</p>
            <h2 className="g-display g-display--lg relative mx-auto mt-6 max-w-[18ch]">
              The sky is already <em>working.</em>
            </h2>
            <p className="g-body relative mx-auto mt-6 max-w-[46ch]">
              Send twelve months of bills and a roof plan. We will tell you what the roof
              can carry, what it can generate, and what the structure would look like.
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
              <GoldLink onClick={onAssess}>
                Request the assessment
                <ArrowUpRight className="h-4 w-4" />
              </GoldLink>
              <GhostLink href="#economics">
                Model it first
                <ArrowRight className="h-4 w-4" />
              </GhostLink>
            </div>
            <p className="relative mx-auto mt-8 max-w-[54ch] text-[11px] leading-relaxed text-[rgba(255,250,240,0.32)]">
              No obligation. Assessment outputs are indicative until a site survey is
              completed.
            </p>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  FOOTER                                                                    */
/* ========================================================================== */

export function GlassFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[rgba(255,250,240,0.08)] bg-[rgba(4,13,9,0.6)]">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none pt-10"
        style={{ color: "rgba(255,250,240,0.03)" }}
      >
        <div className="g-display whitespace-nowrap text-center text-[21vw] leading-[0.78]">
          NETSO°
        </div>
      </div>

      <div className="g-wrap pb-14 pt-2">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.6fr))]">
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.02em] text-[#fffaf0]">
              NETSO<span className="text-[var(--g-gold)]">°</span>
              <span className="ml-2 text-[9.5px] font-normal uppercase tracking-[0.24em] text-[rgba(255,250,240,0.4)]">
                Energy
              </span>
            </p>
            <p className="mt-4 max-w-[34ch] text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.42)]">
              Institutional rooftop solar infrastructure for Bangladesh's industrial
              corridors. Financed, built and operated by Netso Energy Ltd.
            </p>
          </div>

          {[
            {
              h: "Company",
              links: [
                { label: "About", to: "/about" },
                { label: "Partners", to: "/partners" },
                { label: "Careers", to: "/careers" },
                { label: "Insights", to: "/insights" },
              ],
            },
            {
              h: "Platform",
              links: [
                { label: "Product", to: "/product" },
                { label: "Calculator", to: "/calculator" },
                { label: "Brand", to: "/brand" },
                { label: "Support", to: "/support" },
              ],
            },
            {
              h: "Legal",
              links: [
                { label: "Privacy policy", to: "/legal/privacy-policy" },
                { label: "Terms of service", to: "/legal/terms-of-service" },
                { label: "Licences", to: "/licenses" },
              ],
            },
          ].map((column) => (
            <div key={column.h}>
              <p className="g-label !text-[9px] text-[rgba(255,250,240,0.4)]">{column.h}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[13px] text-[rgba(255,250,240,0.55)] transition-colors hover:text-[var(--g-gold-hi)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,250,240,0.07)] pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.3)]">
            © 2026 Netso Energy Ltd · Dhaka · Chattogram
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.3)]">
            SREDA NEM 2025 aligned · BERC tariff basis
          </p>
        </div>
      </div>
    </footer>
  );
}
