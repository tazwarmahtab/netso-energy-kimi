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
    t: "Zero-CAPEX construction",
    c: "An elevated structural steel pergola is installed without penetrating the roof membrane. Netso capitalises the civil works, modules and installation.",
    tag: "CAPEX ৳0",
  },
  {
    n: "02",
    t: "Direct daylight consumption",
    c: "Generation routes into the facility main distribution board and covers the daytime manufacturing load. The commercial basis is a floating discount to the grid tariff, set in the agreement.",
    tag: "30% discount basis",
  },
  {
    n: "03",
    t: "SREDA net metering (NEM 2025)",
    c: "Surplus daylight generation exports to the 11 kV / 33 kV line, with 90% of net exported kWh credited on the utility bill each cycle.",
    tag: "90% monthly credit",
  },
  {
    n: "04",
    t: "NEOS telemetry and metering",
    c: "Bidirectional revenue metering at Class 0.2s accuracy, tracking generation, performance ratio and monthly settlement reconciliation.",
    tag: "Class 0.2s metering",
  },
];

/* ------------------------------------------------------------------------- */
/*  Hardware                                                                  */
/* ------------------------------------------------------------------------- */

const HW = [
  {
    icon: PanelsTopLeft,
    t: "Tier-1 architectural solar pergola",
    c: "Elevated dual-glass TOPCon 585 Wp+ bifacial modules on an engineered steel pergola. Netso owns, insures and maintains the array; there is no capital or maintenance line on your books.",
    points: [
      "Cyclone loading engineered to BNBC 2020 — modelled to 260 km/h",
      "Non-penetrating base plates, so the roof waterproofing warranty stands",
      "Bifacial dual-glass architecture captures rear albedo gain",
      "30-year linear performance warranty backed by Netso",
    ],
    img: roof,
    alt: "Pergola-style solar canopy on a factory rooftop at dusk",
    isTerminal: false,
  },
  {
    icon: Zap,
    t: "Huawei SUN2000 smart string inverters",
    c: "Grid-tied multi-MPPT industrial string inverters synchronise generation with the incoming utility feeder, with arc-fault interruption on every string.",
    points: [
      "Multi-MPPT architecture, up to 98.8% European efficiency",
      "AFCI arc-fault interruption inside 0.5 seconds",
      "SREDA Net Metering (NEM 2025) compliant bidirectional interface",
      "IP66 cast-aluminium enclosure for subtropical humidity",
    ],
    img: inverters,
    alt: "String inverters mounted in a factory electrical room",
    isTerminal: false,
  },
  {
    icon: Activity,
    t: "NEOS industrial SCADA telemetry",
    c: "Netso's operating system watches every string, inverter and revenue meter, reconciles settlement and exports carbon attributes.",
    points: [
      "Class 0.2s utility-grade revenue metering",
      "String-level I-V tracing and fault detection",
      "Monthly settlement reconciled against the utility billing cycle",
      "Quarterly I-REC attribute certification",
    ],
    img: null,
    alt: "",
    isTerminal: true,
  },
];

const NODES = [
  { name: "Solar pergola", spec: "80 kWp DC array", role: "Primary generator" },
  { name: "Huawei inverters", spec: "SUN2000 400 V 3-phase", role: "Power conversion" },
  { name: "Facility MDB", spec: "Daytime self-consumption", role: "Direct load offset" },
  { name: "NEM Class 0.2s meter", spec: "SREDA 2025 bidirectional", role: "90% utility credit" },
];

const ROWS = [
  { k: "Upfront capital expenditure", cash: "Capital deployed from corporate reserves", dl: "৳0 — financed by Netso" },
  { k: "Contractual tariff", cash: "Return depends on execution and yield", dl: "Floating discount below the grid tariff" },
  { k: "Technical and generation risk", cash: "Borne by your facility", dl: "Netso carries performance and degradation risk" },
  { k: "Operations and maintenance", cash: "Internal staff, inverter replacement", dl: "20-year O&M, washing and spares included" },
  { k: "SREDA and interconnection", cash: "Handled in-house", dl: "Handled end-to-end by Netso" },
  { k: "Balance-sheet impact", cash: "Fixed assets and liabilities", dl: "Operating expense; you buy power, not plant" },
  { k: "Carbon and I-REC ownership", cash: "Manual certification audits", dl: "I-REC attribute certification quarterly" },
];

/* ------------------------------------------------------------------------- */
/*  NEOS terminal                                                             */
/* ------------------------------------------------------------------------- */

const KPIS = [
  { icon: Activity, label: "Active generation", value: "64.8 kW", note: "sample read-out" },
  { icon: Gauge, label: "Performance ratio", value: "81.4%", note: "vs 78% design basis" },
  { icon: Zap, label: "Today's generation", value: "394.2 kWh", note: "irradiance 5.4 kWh/m²" },
  { icon: ShieldCheck, label: "Grid displacement", value: "−30.0%", note: "discount basis" },
  { icon: Cpu, label: "String balance", value: "10 / 10", note: "MPPTs nominal" },
  { icon: Activity, label: "I-REC tracking", value: "Active", note: "quarterly certification" },
];

function NeosTerminal() {
  return (
    <Panel variant="deep" className="flex h-full flex-col justify-between overflow-hidden p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,250,240,0.09)] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[rgba(255,250,240,0.25)]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.55)]">
            NEOS telemetry · node CGS-01
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.4)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Class 0.2s · illustrative
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
        <span>SREDA NEM 2025 sync</span>
        <span className="text-[var(--g-gold)]">Automated settlement · 24:00 UTC+6</span>
      </div>

      <a
        href={getNetsoWhatsAppUrl(
          "Hello Netso Telemetry Desk, we would like the single-line diagram (SLD) and Class 0.2s bidirectional meter interconnection specs under SREDA NEM 2025 guidelines.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-between gap-3 rounded-xl border border-[rgba(255,250,240,0.1)] bg-[rgba(255,250,240,0.03)] px-3.5 py-2.5 text-[11.5px] text-[rgba(255,250,240,0.7)] transition-colors hover:border-[rgba(198,161,91,0.45)] hover:text-[#fffaf0]"
      >
        <span>Ask the SCADA desk for the SLD and meter specification</span>
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
        eyebrow="Architectural solar pergola · 20-year agreement"
        title={
          <>
            Your roof&rsquo;s institutional <em>energy asset.</em>
          </>
        }
        lede={
          <>
            An elevated pergola canopy turns idle commercial roof area into a generating
            asset. Netso finances, builds and maintains the plant; you buy the power at a
            floating discount to the grid tariff.
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
              Engineering specifications
            </a>
          </>
        }
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              Class 0.2s telemetry
            </span>
            <span className="g-chip">Non-penetrative attachment</span>
            <span className="g-chip">SREDA NEM 2025</span>
          </>
        }
      />

      {/* Flow 01–04 */}
      <PageSection
        id="architecture"
        eyebrow="Architecture & operation"
        title={
          <>
            Engineered for industrial reliability and <em>bankable</em> yields.
          </>
        }
        aside={
          <p>
            Four stages, one agreement. Each stage is measured, metered and reconciled
            against the settlement basis in the executed document.
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
            Bankable hardware behind institutional <em>uptime.</em>
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
            Generation covers daytime machinery and lighting first. Surplus flows through
            SREDA net metering and accrues monthly bill credits, metered and reconciled by
            NEOS.
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
                      : "→ 11 kV / 33 kV feeder"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(255,250,240,0.08)] pt-4 font-mono text-[10px] text-[rgba(255,250,240,0.42)]">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--g-gold)]" />
                SREDA NEM 2025 · 90% monthly kWh credit
              </span>
              <span className="text-[var(--g-gold)]">BERC tariff class LT-D1 / HT-3</span>
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
            Direct purchase versus the Netso <em>agreement.</em>
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
                Direct EPC / cash purchase
              </span>
              <span className="g-label !text-[9px] p-5 text-[var(--g-gold-hi)]">
                Netso 20-year agreement
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
            Comparison is illustrative and describes the structure of each route. Binding
            terms, savings basis and risk allocation are set only in an executed agreement.
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
        copy="Start with the assessment: fifteen minutes of plant data is enough to say whether the roof qualifies."
      />
    </GlassShell>
  );
}
