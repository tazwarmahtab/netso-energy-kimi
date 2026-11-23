import { useState } from "react";
import {
  Activity,
  Check,
  Cpu,
  Gauge,
  Minus,
  PanelsTopLeft,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { getNetsoWhatsAppUrl, WhatsAppIcon } from "../components/ui/WhatsAppIcon";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageCTA, PageHero, PageSection, SpecList } from "../components/glass/shell";
import { useInView } from "../hooks/useInView";
import panels from "../assets/panels-closeup.jpg";
import inverters from "../assets/battery-wall.jpg";
import roof from "../assets/solar-roof-dusk.jpg";

/* ------------------------------------------------------------------------- */
/*  How it works 01–04                                                        */
/* ------------------------------------------------------------------------- */

const FLOW = [
  {
    n: "01",
    t: "Assess and choose a commercial route",
    c: "The factory borrows and owns under CAPEX. Netso provides agreed development services inside the EPC scope. A separate partner-funded OPEX route is possible only subject to funding approval and a site-specific PPA.",
    tag: "Two distinct routes",
  },
  {
    n: "02",
    t: "Design for daytime electricity demand",
    c: "Feasible generation depends on roof area, structure, electricity use, operating hours and the approved grid connection.",
    tag: "Load-led design",
  },
  {
    n: "03",
    t: "Review utility interconnection",
    c: "Net-metering eligibility, approval, settlement and export treatment depend on current rules and the facility's utility connection. No credit percentage is assumed.",
    tag: "Utility review",
  },
  {
    n: "04",
    t: "Agree monitoring and maintenance",
    c: "Metering, fault monitoring, O&M duties and any commercial reconciliation are specified in project contracts after the design and ownership route are approved.",
    tag: "Contract-led scope",
  },
];

const HW = [
  {
    icon: PanelsTopLeft,
    t: "Roof-specific solar mounting",
    c: "The mounting concept is selected after structural, wind-uplift, waterproofing, access and drainage review. A pergola or canopy is not assumed suitable for every building.",
    points: [
      "Verify roof structure, corrosion exposure and wind-load requirements",
      "Assess drainage, penetrations, waterproofing and maintenance access",
      "Select modules and suppliers during engineering and procurement",
      "Manufacturer warranties depend on the products actually contracted",
    ],
    img: roof,
    alt: "Illustrative rooftop solar-canopy arrangement",
    isTerminal: false,
  },
  {
    icon: Zap,
    t: "Project-selected grid-tied inverters",
    c: "Inverters, protection settings, isolation and any utility interface are selected through engineering and approved specifications, not guaranteed by a generic webpage.",
    points: [
      "Electrical design considers load profiles and selected system capacity",
      "Protection features must be verified against the actual datasheet",
      "Environmental ratings and warranties depend on final selection",
      "Utility interconnection and commissioning require applicable approvals",
    ],
    img: inverters,
    alt: "Illustrative electrical equipment installation",
    isTerminal: false,
  },
  {
    icon: Activity,
    t: "Monitoring and O&M design",
    c: "Monitoring can be scoped to generation, inverter health and maintenance needs where hardware and connectivity permit. No live system or certification activity is represented here.",
    points: [
      "Generation and inverter data availability depend on selected equipment",
      "Alerts, maintenance response and reporting are contract-specific",
      "Environmental attribute rights and eligibility require separate review",
      "Telemetry screen shown here is a design concept, not a commissioned asset",
    ],
    img: null,
    alt: "",
    isTerminal: true,
  },
];

const NODES = [
  { name: "Solar array", spec: "Site-sized DC array", role: "Primary generation" },
  { name: "Grid-tied inverters", spec: "Selected during engineering", role: "Power conversion" },
  { name: "Facility switchboard", spec: "Subject to electrical survey", role: "Daytime load connection" },
  { name: "Utility metering", spec: "Subject to utility approval", role: "Metering and interconnection review" },
];

const ROWS = [
  { k: "Plant ownership", cash: "Factory owns the installed asset", dl: "Funding partner may own the plant subject to approval" },
  { k: "Finance", cash: "Factory arranges borrowing or uses its own funds", dl: "Separate funding partner assesses credit and conditions" },
  { k: "Electricity costs", cash: "Grid offset depends on metered generation and self-use", dl: "PPA tariff, term and energy settlement are site-specific" },
  { k: "Engineering scope", cash: "Agreed EPC design and commissioning", dl: "Partner-approved EPC design and commissioning" },
  { k: "O&M responsibilities", cash: "Factory agrees maintenance arrangements", dl: "Owner and service obligations are specified in contracts" },
  { k: "Grid connection", cash: "Utility eligibility and approvals are assessed", dl: "Utility eligibility and approvals are assessed" },
  { k: "Environmental claims", cash: "Any attribute rights require verification", dl: "Attribute rights and reporting require written terms" },
];

/* ------------------------------------------------------------------------- */
/*  Illustrative monitoring interface — no connected asset                   */
/* ------------------------------------------------------------------------- */

const KPIS = [
  { icon: Activity, label: "Generation output", value: "—", note: "concept only" },
  { icon: Gauge, label: "Performance ratio", value: "—", note: "concept only" },
  { icon: Zap, label: "Daily generation", value: "—", note: "concept only" },
  { icon: ShieldCheck, label: "Grid self-use", value: "—", note: "concept only" },
  { icon: Cpu, label: "Equipment state", value: "—", note: "concept only" },
  { icon: Activity, label: "Maintenance log", value: "—", note: "concept only" },
];

function NeosTerminal() {
  return (
    <Panel variant="deep" className="flex h-full flex-col justify-between overflow-hidden p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,250,240,0.09)] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[rgba(255,250,240,0.25)]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.55)]">
            Monitoring Concept UI · No live data
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.4)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[rgba(255,250,240,0.4)]" />
          Design illustration
        </span>
      </div>

      <div className="my-5 grid grid-cols-2 gap-2.5 md:grid-cols-3">
        {KPIS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-[rgba(255,250,240,0.07)] bg-[rgba(255,250,240,0.025)] p-3.5"
            >
              <div className="flex items-center gap-1.5 text-[rgba(255,250,240,0.42)]">
                <Icon className="h-3 w-3 text-[var(--g-gold)]" strokeWidth={1.8} />
                <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.1em]">
                  {kpi.label}
                </span>
              </div>
              <p className="g-num mt-2 text-[19px] leading-none">{kpi.value}</p>
              <span className="mt-1 block font-mono text-[9px] text-[rgba(255,250,240,0.34)]">
                {kpi.note}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(255,250,240,0.09)] pt-4 font-mono text-[10px] text-[rgba(255,250,240,0.4)]">
        <span>Utility assessment pending</span>
        <span className="text-[var(--g-gold)]">Not connected to a live plant</span>
      </div>

      <a
        href={getNetsoWhatsAppUrl(
          "Hello Netso, please share proposed monitoring, metering and O&M options after a site-specific roof assessment.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-between gap-3 rounded-xl border border-[rgba(255,250,240,0.1)] bg-[rgba(255,250,240,0.03)] px-3.5 py-2.5 text-[11.5px] text-[rgba(255,250,240,0.7)] transition-colors hover:border-[rgba(198,161,91,0.45)] hover:text-[#fffaf0]"
      >
        <span>Ask about monitoring and metering design</span>
        <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
      </a>
    </Panel>
  );
}

/* ------------------------------------------------------------------------- */
/*  Page                                                                      */
/* ------------------------------------------------------------------------- */

export default function Product() {
  const [modalOpen, setModalOpen] = useState(false);
  const { ref: flowRef, inView: flowIn } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        eyebrow="Architectural rooftop solar · site-assessed"
        title={
          <>
            Your roof&rsquo;s institutional <em>energy asset.</em>
          </>
        }
        lede={
          <>
            Rooftop solar can support daytime factory demand where the roof and
            grid connection are suitable. The factory owns the CAPEX asset;
            partner-funded OPEX depends on third-party approval and a site-specific PPA.
          </>
        }
        image={panels}
        imageAlt="Dual-glass bifacial solar pergola catching warm light"
        actions={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="g-btn"
            >
              Request roof assessment
            </button>
            <a href="#hardware" className="g-btn g-btn--ghost">
              Engineering approach
            </a>
          </>
        }
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              Proposed monitoring
            </span>
            <span className="g-chip">Mounting subject to survey</span>
            <span className="g-chip">Net-metering eligibility review</span>
          </>
        }
      />

      {/* Flow 01–04 */}
      <PageSection
        id="architecture"
        eyebrow="Architecture & operation"
        title={
          <>
            Engineering and responsibilities defined <em>site by site.</em>
          </>
        }
        aside={
          <p>
            Engineering, ownership and payment arrangements depend on the
            chosen route and written agreements. No system performance is assumed.
          </p>
        }
      >
        <div ref={flowRef} className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {FLOW.map((step, index) => (
            <div
              key={step.n}
              className="transition-all duration-700"
              style={{
                opacity: flowIn ? 1 : 0,
                transform: flowIn ? "none" : "translateY(24px)",
                transitionDelay: `${index * 70}ms`,
              }}
            >
              <Panel className="flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="g-num text-[30px] leading-none text-[rgba(255,250,240,0.18)]">
                    {step.n}
                  </span>
                  <span className="g-chip !text-[9px] !tracking-[0.12em]">{step.tag}</span>
                </div>
                <div className="mt-8">
                  <h3 className="text-[15.5px] font-semibold leading-snug tracking-[-0.012em] text-[#fffaf0]">
                    {step.t}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                    {step.c}
                  </p>
                </div>
              </Panel>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Hardware */}
      <PageSection
        id="hardware"
        eyebrow="Engineered hardware & intelligence"
        title={
          <>
            Hardware selected for site-specific <em>reliability.</em>
          </>
        }
        tight
      >
        <div className="mt-14 space-y-16 md:space-y-24">
          {HW.map((item, index) => {
            const Icon = item.icon;
            const reversed = index % 2 === 1;
            return (
              <div key={item.t} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <Reveal className={reversed ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden rounded-[20px] border border-[rgba(255,250,240,0.09)]">
                    {item.isTerminal ? (
                      <NeosTerminal />
                    ) : (
                      <img
                        src={item.img ?? ""}
                        alt={item.alt}
                        className="g-img aspect-[4/3]"
                        loading="lazy"
                      />
                    )}
                  </div>
                </Reveal>

                <Reveal delay={90} className={reversed ? "lg:order-1" : ""}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(198,161,91,0.3)] bg-[rgba(198,161,91,0.1)]">
                    <Icon className="h-[18px] w-[18px] text-[var(--g-gold)]" strokeWidth={1.7} />
                  </span>
                  <h3 className="g-display g-display--md mt-5 max-w-[22ch]">{item.t}</h3>
                  <p className="g-body mt-3 max-w-[46ch]">{item.c}</p>
                  <SpecList items={item.points} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </PageSection>

      {/* Network */}
      <PageSection
        id="network"
        eyebrow="Distributed grid architecture"
        title={
          <>
            Bidirectional flow, synchronised with your <em>tariff.</em>
          </>
        }
        aside={
          <p>
            Generation can offset daytime demand where the system design allows it.
            Any export, net-metering credit or settlement requires utility approval and
            a site-specific evaluation; no universal credit is promised.
          </p>
        }
      >
        <Reveal delay={100} className="mt-12">
          <Panel className="p-5 md:p-8" variant="deep">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {NODES.map((node, index) => (
                <div
                  key={node.name}
                  className="flex flex-col justify-between rounded-2xl border border-[rgba(255,250,240,0.08)] bg-[rgba(255,250,240,0.025)] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="g-label !text-[9px] text-[rgba(198,161,91,0.75)]">
                      Stage 0{index + 1}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="my-5">
                    <h4 className="text-[15px] font-semibold text-[#fffaf0]">{node.name}</h4>
                    <p className="mt-1 font-mono text-[10.5px] text-[rgba(198,161,91,0.85)]">
                      {node.spec}
                    </p>
                    <p className="mt-2 text-[12px] text-[rgba(255,250,240,0.5)]">{node.role}</p>
                  </div>
                  <span className="border-t border-[rgba(255,250,240,0.07)] pt-2.5 font-mono text-[9.5px] text-[rgba(255,250,240,0.32)]">
                    {index < NODES.length - 1
                      ? `→ feeds stage 0${index + 2}`
                      : "→ site interconnection review"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(255,250,240,0.08)] pt-4 font-mono text-[10px] text-[rgba(255,250,240,0.42)]">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--g-gold)]" />
                Net-metering and exports require utility approval
              </span>
              <span className="text-[var(--g-gold)]">Actual utility class requires bill verification</span>
            </div>
          </Panel>
        </Reveal>
      </PageSection>

      {/* Compare */}
      <PageSection
        id="compare"
        eyebrow="Commercial comparison"
        title={
          <>
            Factory-owned CAPEX versus <em>partner-funded OPEX.</em>
          </>
        }
      >
        <Reveal delay={100} className="mt-12">
          <div className="overflow-hidden rounded-[20px] border border-[rgba(255,250,240,0.1)]">
            <div className="hidden bg-[rgba(255,250,240,0.05)] md:grid md:grid-cols-[1.15fr_1fr_1.1fr]">
              <span className="g-label !text-[9px] p-5 text-[rgba(255,250,240,0.45)]">
                Evaluation metric
              </span>
              <span className="g-label !text-[9px] p-5 text-[rgba(255,250,240,0.55)]">
                Factory-owned CAPEX
              </span>
              <span className="g-label !text-[9px] p-5 text-[var(--g-gold-hi)]">
                Partner-funded OPEX (if approved)
              </span>
            </div>

            {ROWS.map((row) => (
              <div
                key={row.k}
                className="grid border-t border-[rgba(255,250,240,0.07)] md:grid-cols-[1.15fr_1fr_1.1fr]"
              >
                <span className="border-b border-[rgba(255,250,240,0.05)] p-4 text-[13.5px] font-medium text-[#fffaf0] md:border-b-0 md:p-5">
                  {row.k}
                </span>
                <span className="flex items-start gap-2 p-4 text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.45)] md:p-5">
                  <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[rgba(255,250,240,0.3)]" />
                  {row.cash}
                </span>
                <span className="flex items-start gap-2 bg-[rgba(198,161,91,0.07)] p-4 text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.8)] md:p-5">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--g-gold)]" strokeWidth={2.6} />
                  {row.dl}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 max-w-[76ch] text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.32)]">
            The factory borrows and owns under CAPEX; a separate financing partner may
            own the OPEX system under a negotiated PPA. No tariff, finance or saving is
            promised without site-specific written agreements.
          </p>
        </Reveal>
      </PageSection>

      <PageCTA
        onAssess={() => setModalOpen(true)}
        title={
          <>
            Your roof is an institutional <em>asset.</em>
          </>
        }
        copy="Start with a roof and load assessment. A site survey and applicable utility approvals determine project suitability."
      />
    </GlassShell>
  );
}
