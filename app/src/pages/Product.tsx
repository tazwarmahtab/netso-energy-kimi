import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, PanelsTopLeft, Activity, Zap, ShieldCheck, Gauge, Cpu, CloudDownload } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import FeasibilityModal from "../components/FeasibilityModal";
import { FadeUp } from "../components/Reveal";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../components/ui/WhatsAppIcon";
import panels from "../assets/panels-closeup.jpg";
import inverters from "../assets/battery-wall.jpg";
import roof from "../assets/solar-roof-dusk.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------ Hero ------------------------------ */
function Hero({ onOpenAssessment }: { onOpenAssessment: () => void }) {
  return (
    <section className="relative flex min-h-[90svh] flex-col justify-end overflow-hidden bg-forest text-warm">
      <motion.img
        src={panels}
        alt="Dual-glass TOPCon bifacial solar pergola catching warm light"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.12, opacity: 0.55 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/40" />

      {/* Floating Status Badge */}
      <div className="absolute top-28 left-6 z-20 hidden md:block lg:left-12">
        <div className="flex items-center gap-2.5 rounded-full border border-gold/30 bg-forest/85 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="font-mono text-xs font-medium tracking-wide text-gold">
             Commercial rooftop solar · project monitoring
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-36 md:px-10 md:pb-24">
        <motion.p
          className="font-mono text-xs font-semibold uppercase tracking-wider text-gold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
        >
           Rooftop solar · long-term power purchase agreement
        </motion.p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl text-warm sm:text-7xl md:text-8xl">
           Solar power designed for the way your facility runs.
        </h1>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-warm/85 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
        >
           Netso turns suitable commercial rooftops into productive energy assets. We can finance, build and maintain the system, while your facility buys the electricity it produces under agreed commercial terms that can sit below the applicable grid tariff.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        >
          <button
            type="button"
            onClick={onOpenAssessment}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-forest shadow-lg shadow-gold/25 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Request Roof Assessment <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#hardware"
            className="inline-flex h-12 items-center rounded-full border border-warm/25 bg-warm/5 px-7 text-sm font-medium text-warm backdrop-blur-sm transition-all hover:border-warm/50 hover:bg-warm/15"
          >
            Engineering Specifications
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------- How it works 01–04 ------------------------- */
const FLOW = [
  {
    n: "01",
     t: "Project funding without plant ownership upfront",
     c: "For qualifying projects, Netso can fund the engineering, equipment and installation through its project structure. Roof, credit and contract conditions are reviewed before commitment.",
     tag: "Funding option",
  },
  {
    n: "02",
    t: "Direct Daylight Consumption",
     c: "Solar power can serve the facility behind the meter first. The amount depends on your load profile, system size, utility connection and the final commercial agreement.",
     tag: "Behind-the-meter first",
  },
  {
    n: "03",
     t: "Utility export and settlement",
     c: "Where the utility approves the connection and the applicable rules allow it, surplus generation can flow through a bidirectional meter. Credit treatment is confirmed per site.",
     tag: "Subject to approval",
  },
  {
    n: "04",
     t: "Metering and project reporting",
     c: "The project can report generation, system performance and billing data through the agreed meter and monitoring setup. The final measurement standard is documented before commissioning.",
     tag: "Measured per agreement",
  },
];

function Explained() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Architecture & Operation</p>
        </FadeUp>
        <h2 className="font-display mt-4 max-w-3xl text-4xl text-ink md:text-6xl">
           Engineered for industrial reliability and clear project economics.
        </h2>

        <div className="mt-14 grid gap-6 md:mt-18 md:grid-cols-2 xl:grid-cols-4">
          {FLOW.map((f, i) => (
            <FadeUp key={f.n} delay={i * 0.08}>
              <article className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-ink/8 bg-parchment p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-forest hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-bold text-ink/25 transition-colors duration-400 group-hover:text-gold">
                    {f.n}
                  </span>
                  <span className="rounded-full border border-ink/10 bg-cream/80 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-ink/70 transition-colors duration-400 group-hover:border-gold/30 group-hover:bg-gold/15 group-hover:text-gold">
                    {f.tag}
                  </span>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold leading-snug text-ink transition-colors duration-400 group-hover:text-warm">
                    {f.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70 transition-colors duration-400 group-hover:text-warm/80">
                    {f.c}
                  </p>
                </div>

                <div className="mt-6 border-t border-ink/8 pt-4 transition-colors duration-400 group-hover:border-warm/15">
                  <span className="font-mono text-xs font-medium text-ink/40 transition-colors duration-400 group-hover:text-gold/80">
                     Stage {f.n} · Project scope
                  </span>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Hardware ----------------------------- */
function NeosTelemetryTerminal() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-warm/15 bg-forest/95 p-6 text-warm shadow-2xl backdrop-blur-xl md:p-8">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-warm/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
             <span className="font-mono text-xs font-semibold tracking-wider text-warm/70">
             Illustrative project monitoring view
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
           <span className="font-mono text-[11px] font-semibold text-emerald-400">PROJECT VIEW</span>
        </div>
      </div>

      {/* Main KPI Matrix */}
      <div className="my-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-warm/10 bg-forest/60 p-4">
          <div className="flex items-center gap-2 text-warm/60">
            <Activity className="h-3.5 w-3.5 text-gold" />
             <span className="font-mono text-[11px] uppercase tracking-wider">Illustrative output</span>
          </div>
          <p className="font-display mt-2 text-2xl font-bold text-warm md:text-3xl">64.8 kW</p>
           <span className="font-mono text-[10px] text-emerald-400 font-medium">Example only</span>
        </div>

        <div className="rounded-xl border border-warm/10 bg-forest/60 p-4">
          <div className="flex items-center gap-2 text-warm/60">
            <Gauge className="h-3.5 w-3.5 text-gold" />
             <span className="font-mono text-[11px] uppercase tracking-wider">Performance ratio</span>
          </div>
          <p className="font-display mt-2 text-2xl font-bold text-warm md:text-3xl">81.4%</p>
           <span className="font-mono text-[10px] text-gold font-medium">Defined per project</span>
        </div>

        <div className="rounded-xl border border-warm/10 bg-forest/60 p-4">
          <div className="flex items-center gap-2 text-warm/60">
            <Zap className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Today's Generation</span>
          </div>
          <p className="font-display mt-2 text-2xl font-bold text-warm md:text-3xl">394.2 kWh</p>
          <span className="font-mono text-[10px] text-warm/60">Irradiance 5.4 kWh/m²</span>
        </div>

        <div className="rounded-xl border border-warm/10 bg-forest/60 p-4">
          <div className="flex items-center gap-2 text-warm/60">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Grid Displacement</span>
          </div>
          <p className="font-display mt-2 text-2xl font-bold text-emerald-400 md:text-3xl">-30.0%</p>
           <span className="font-mono text-[10px] text-warm/60">Illustrative price target</span>
        </div>

        <div className="rounded-xl border border-warm/10 bg-forest/60 p-4">
          <div className="flex items-center gap-2 text-warm/60">
            <Cpu className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-[11px] uppercase tracking-wider">String Balance</span>
          </div>
          <p className="font-display mt-2 text-2xl font-bold text-warm md:text-3xl">10 / 10</p>
           <span className="font-mono text-[10px] text-emerald-400 font-medium">Example status</span>
        </div>

        <div className="rounded-xl border border-warm/10 bg-forest/60 p-4">
          <div className="flex items-center gap-2 text-warm/60">
            <CloudDownload className="h-3.5 w-3.5 text-gold" />
             <span className="font-mono text-[11px] uppercase tracking-wider">Environmental reporting</span>
          </div>
          <p className="font-display mt-2 text-2xl font-bold text-warm md:text-3xl">Verified</p>
           <span className="font-mono text-[10px] text-gold font-medium">Reporting subject to programme</span>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-warm/10 pt-4 font-mono text-xs text-warm/60">
         <span>Utility connection and metering: reviewed per site</span>
         <span className="text-gold font-semibold">Billing and reporting: defined in the agreement</span>
      </div>

       {/* Technical drawings and metering enquiry */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-warm/10 bg-forest/80 p-3.5">
        <div>
           <p className="text-xs font-semibold text-warm">Need technical drawings or metering specifications?</p>
           <p className="font-mono text-[11px] text-warm/60">Our engineering team can discuss the requirements for your facility.</p>
        </div>
        <a
           href={getNetsoWhatsAppUrl(
             "Hello Netso Energy team, we would like to discuss the technical drawings and metering requirements for our facility."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all hover:scale-[1.02] shadow-sm"
           title="Direct WhatsApp line to the Netso engineering team"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
           <span>Talk to an engineer</span>
        </a>
      </div>
    </div>
  );
}

const HW = [
  {
    icon: PanelsTopLeft,
    t: "Tier-1 Architectural Solar Pergola",
     c: "Module choice and mounting are selected for the roof, load profile and operating environment. Where the commercial structure calls for it, Netso can own and maintain the system under the project agreement.",
    points: [
       "Structural design checked against the roof and site conditions",
       "Mounting and waterproofing approach confirmed before construction",
       "Bifacial modules available where the roof design supports them",
       "Equipment warranties documented in the project package",
    ],
    img: roof,
    alt: "A luxury pergola-style solar canopy on a factory rooftop at dusk",
    isTerminal: false,
  },
  {
    icon: Zap,
    t: "Huawei SUN2000 Smart String Inverters",
     c: "Grid-tied inverters convert solar generation for use at the facility and coordinate with the approved utility connection. Final equipment selection follows the project design and procurement plan.",
    points: [
       "Multi-MPPT options for different roof layouts",
       "Protection and isolation equipment selected for the approved design",
       "Bidirectional interface where required and approved",
       "Environmental rating matched to the installation location",
    ],
    img: inverters,
    alt: "Huawei smart string inverters mounted in a factory electrical room",
    isTerminal: false,
  },
  {
    icon: Activity,
     t: "Project monitoring and reporting",
     c: "Project monitoring can bring generation, equipment status and agreed billing data into one operating view. Reporting, metering and environmental attributes follow the project agreement and applicable programme rules.",
    points: [
       "Metering standard and verification method agreed per site",
       "Equipment status and fault alerts for the operating team",
       "Billing reconciled against the agreed meter and contract",
       "Environmental reporting available where the project qualifies",
    ],
    img: null,
    alt: "",
    isTerminal: true,
  },
];

function Hardware() {
  return (
    <section id="hardware" className="bg-parchment py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Engineered Hardware & Intelligence</p>
        </FadeUp>
        <h2 className="font-display mt-4 max-w-3xl text-4xl text-ink md:text-6xl">
           Equipment selected for reliable industrial operation.
        </h2>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {HW.map((h, i) => (
            <div
              key={h.t}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 === 1 ? "" : ""}`}
            >
              <FadeUp className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative min-h-[380px] overflow-hidden rounded-3xl md:min-h-[440px]">
                  {h.isTerminal ? (
                    <NeosTelemetryTerminal />
                  ) : (
                    <motion.img
                      src={h.img || ""}
                      alt={h.alt}
                      className="h-full w-full object-cover"
                      initial={{ scale: 1.12 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: EASE }}
                    />
                  )}
                </div>
              </FadeUp>
              <FadeUp delay={0.12} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-gold shadow-md">
                  <h.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="font-display mt-6 text-3xl text-ink md:text-4xl">{h.t}</h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/75">{h.c}</p>
                <ul className="mt-7 space-y-3.5">
                  {h.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-ink/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15">
                        <Check className="h-3 w-3 text-gold" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Network ----------------------------- */
const NODES = [
   { name: "Solar array", spec: "Sized after site study", role: "Primary generation" },
   { name: "Inverter system", spec: "Selected for the approved design", role: "Power conversion" },
   { name: "Facility MDB", spec: "Behind-the-meter supply", role: "Direct load offset" },
   { name: "Utility meter", spec: "Standard agreed per site", role: "Export and settlement" },
];

function NetworkDiagram() {
  return (
    <div className="relative rounded-3xl bg-forest p-8 text-warm md:p-12 shadow-2xl border border-warm/10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {NODES.map((n, i) => (
          <div key={n.name} className="relative flex flex-col justify-between rounded-2xl border border-warm/15 bg-forest/70 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-gold">STAGE 0{i + 1}</span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </div>

            <div className="my-6">
              <h4 className="font-display text-xl font-bold text-warm">{n.name}</h4>
              <p className="font-mono mt-1 text-xs text-gold/90">{n.spec}</p>
              <p className="mt-2 text-xs text-warm/70">{n.role}</p>
            </div>

            <div className="border-t border-warm/10 pt-3">
              <span className="font-mono text-[11px] text-warm/50">
                {i < 3 ? "→ Feeds Stage 0" + (i + 2) : "→ 11kV/33kV Grid Feeder"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-warm/10 pt-6 text-xs text-warm/60">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gold" />
         <span>Utility export and credit treatment depend on the approved connection and current rules</span>
        </div>
         <span className="font-mono text-gold">Tariff class and settlement confirmed per facility</span>
      </div>
    </div>
  );
}

function Network() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Distributed Grid Architecture</p>
        </FadeUp>
        <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display max-w-xl text-4xl text-ink md:text-6xl">
            Bidirectional flow synchronized with your utility tariff.
          </h2>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-base leading-relaxed text-ink/75 lg:ml-auto">
               Generation first serves the facility's suitable daytime load. If export is approved, surplus treatment follows the utility connection and applicable rules, with metering and reporting defined in the project agreement.
            </p>
          </FadeUp>
        </div>
        <FadeUp className="mt-14">
          <NetworkDiagram />
        </FadeUp>
      </div>
    </section>
  );
}

/* --------------------------- Compare table --------------------------- */
const ROWS = [
  { k: "Upfront project funding", cash: "Your organisation funds the plant and owns the delivery risk", dl: "Netso can fund qualifying projects under an agreed long-term structure" },
  { k: "Power price", cash: "You carry the full grid-price exposure", dl: "A contracted below-grid price can be assessed for the site" },
  { k: "Technical and generation risk", cash: "Your organisation manages design, equipment and performance", dl: "Responsibilities and performance terms are documented in the agreement" },
  { k: "Operations and maintenance", cash: "You arrange monitoring, cleaning, repairs and replacements", dl: "Netso can coordinate ongoing operations and maintenance" },
  { k: "Utility approvals", cash: "You manage the application and interconnection process", dl: "Netso coordinates the required technical and utility work" },
  { k: "Accounting treatment", cash: "You own the asset and determine the accounting treatment", dl: "Your advisers review the treatment of the selected commercial structure" },
  { k: "Environmental reporting", cash: "You source and verify any required attributes", dl: "Project data and attributes are available where the project qualifies" },
];

function Compare() {
  return (
    <section id="compare" className="bg-parchment py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Commercial Comparison</p>
        </FadeUp>
        <h2 className="font-display mt-4 text-4xl text-ink md:text-6xl">
          Direct EPC purchase vs Netso RESCO PPA.
        </h2>

        <FadeUp className="mt-14 overflow-hidden rounded-2xl border border-ink/10 shadow-lg">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr] bg-forest text-warm md:grid-cols-[1.2fr_1fr_1.2fr]">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider hidden p-5 text-warm/60 md:block">
              Evaluation Metric
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider p-5 text-warm/80">
              Direct EPC / Cash Purchase
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider bg-gold p-5 text-forest">
              Netso 20-Year PPA (RESCO)
            </span>
          </div>

          {ROWS.map((r, i) => (
            <div
              key={r.k}
              className={`grid grid-cols-[1fr_1fr] md:grid-cols-[1.2fr_1fr_1.2fr] ${
                i % 2 ? "bg-cream" : "bg-parchment"
              }`}
            >
              <span className="font-semibold col-span-2 border-b border-ink/8 p-5 text-sm text-ink/80 md:col-span-1 md:border-b-0">
                {r.k}
              </span>
              <span className="flex items-start gap-2 p-5 text-sm leading-relaxed text-ink/70">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" />
                {r.cash}
              </span>
              <span className="flex items-start gap-2 bg-gold/10 p-5 text-sm font-semibold leading-relaxed text-forest">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={3} />
                {r.dl}
              </span>
            </div>
          ))}
        </FadeUp>

        <FadeUp className="mt-12 max-w-2xl">
          <h3 className="font-display text-2xl font-bold text-ink">Why institutional clients choose the Netso PPA</h3>
           <p className="mt-3 text-base leading-relaxed text-ink/75">
             Buying a solar plant is only one route. Netso gives commercial and industrial customers another: a project we can finance, build and operate, with the price, responsibilities, metering and performance expectations set out before the system is commissioned.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Product() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-cream">
      <Nav theme="dark" onOpenAssessment={() => setModalOpen(true)} />
      <main id="content">
        <Hero onOpenAssessment={() => setModalOpen(true)} />
        <Explained />
        <Hardware />
        <Network />
        <Compare />
        <CTASection
          title="The sky is already working"
          heading="Your roof is an institutional asset."
           copy="Ready to assess your roof, load profile and utility connection? Netso will show you whether a long-term rooftop power agreement is a fit."
           cta="Request a rooftop assessment"
        />
      </main>
      <Footer />

      <FeasibilityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
