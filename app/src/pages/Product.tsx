import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, PanelsTopLeft, Smartphone, Zap } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import StatChips from "../components/StatChips";
import AppMock from "../components/AppMock";
import { FadeUp, Words } from "../components/Reveal";
import panels from "../assets/panels-closeup.jpg";
import inverters from "../assets/battery-wall.jpg";
import roof from "../assets/solar-roof-dusk.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------ Hero ------------------------------ */
function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink text-cream">
      <motion.img
        src={panels}
        alt="Dual-glass TOPCon solar panels catching warm golden-hour light"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.12, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/88" />
      <StatChips />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 md:px-10 md:pb-20">
        <motion.p
          className="eyebrow mb-6 text-sun"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
        >
          solar canopy + ppa
        </motion.p>
        <h1 className="font-display max-w-4xl text-[14vw] text-cream sm:text-8xl md:text-[7rem]">
          <Words text="Your roof’s new energy system" accent={2} delay={0.3} />
        </h1>
        <motion.p
          className="mt-7 max-w-lg text-[16.5px] leading-relaxed text-cream/85 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        >
          A pergola-style solar canopy turns idle rooftop into productive energy infrastructure. Netso owns
          and operates it — you simply buy the power.
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
        >
          <a
            href="#get-started"
            className="inline-flex h-[52px] items-center gap-2 rounded-full bg-orange px-7 text-[15.5px] font-semibold text-cream transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97]"
          >
            See if you qualify <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#compare"
            className="glass-chip inline-flex h-[52px] items-center rounded-full px-7 text-[15.5px] font-medium text-cream transition-colors hover:bg-cream/10"
          >
            Get an assessment
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------- How it works 01–04 ------------------------- */
const FLOW = [
  { n: "01", t: "Your roof generates", c: "Canopy-mounted modules produce power every daylight hour, delivered straight into your facility’s electrical system." },
  { n: "02", t: "You consume first", c: "On-site consumption always comes first — systems are engineered for 75–80% daytime self-consumption, where solar is worth the most." },
  { n: "03", t: "Surplus settles monthly", c: "Excess generation flows through net metering: 90% of net exported energy is credited back on your utility account." },
  { n: "04", t: "NEOS tracks it all", c: "Generation, savings and automated PPA invoicing — metered to class 0.2s accuracy and visible in real time." },
];

function Explained() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-orange">Netso Explained</p>
        </FadeUp>
        <h2 className="font-display mt-6 max-w-3xl text-5xl text-ink md:text-7xl">
          <Words text="How Netso works for you" accent={1} />
        </h2>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {FLOW.map((f, i) => (
            <FadeUp key={f.n} delay={i * 0.08}>
              <article className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-ink/8 bg-parchment p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-ink hover:shadow-2xl">
                <span className="font-display text-5xl text-ink/15 transition-colors duration-500 group-hover:text-orange">
                  {f.n}
                </span>
                <div className="mt-10">
                  <h3 className="text-[19px] font-semibold leading-snug text-ink transition-colors duration-500 group-hover:text-cream">
                    {f.t}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-cream/65">
                    {f.c}
                  </p>
                </div>
                <span className="eyebrow mt-6 text-ink/35 transition-colors duration-500 group-hover:text-cream/40">
                  {f.n} <span className="text-orange">.</span> {f.t.split(" ")[0]}
                </span>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Hardware ----------------------------- */
const HW = [
  {
    icon: PanelsTopLeft,
    t: "Tier-1 solar canopy",
    c: "Jinko/JA TOPCon 580Wp dual-glass modules on a pergola-style steel canopy. Netso owns and maintains everything — you never pay for upkeep.",
    points: [
      "BNBC cyclone-rated to 260 km/h wind loads",
      "Non-penetrating chemical roof anchors",
      "Sized to your sanctioned load and roof structure",
      "20-year equipment warranty",
    ],
    img: roof,
    alt: "A pergola-style solar canopy on a factory rooftop at dusk",
  },
  {
    icon: Zap,
    t: "Huawei smart inverters",
    c: "Grid-tied Huawei inverters synchronize solar generation with your utility supply, with utility-grade protection and round-the-clock monitoring.",
    points: [
      "SREDA net-metering compliant interconnection",
      "Class 0.2s metering for PPA settlement",
      "20-year extended warranty",
    ],
    img: inverters,
    alt: "Huawei smart inverters mounted on a factory electrical-room wall",
  },
  {
    icon: Smartphone,
    t: "NEOS monitoring",
    c: "Netso’s operating system watches every asset: real-time telemetry, automated PPA invoicing, and quarterly I-REC certificate exports.",
    points: [
      "Real-time production and consumption data",
      "Automated monthly PPA invoices",
      "I-REC green-attribute certification",
    ],
    img: null,
    alt: "",
  },
];

function Hardware() {
  return (
    <section className="bg-parchment py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-orange">Your Netso System</p>
        </FadeUp>
        <h2 className="font-display mt-6 max-w-3xl text-5xl text-ink md:text-7xl">
          <Words text="The hardware behind your lower power bill" accent={2} />
        </h2>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {HW.map((h, i) => (
            <div
              key={h.t}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 === 1 ? "" : ""}`}
            >
              <FadeUp className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative h-72 overflow-hidden rounded-3xl md:h-[420px]">
                  {h.img ? (
                    <motion.img
                      src={h.img}
                      alt={h.alt}
                      className="h-full w-full object-cover"
                      initial={{ scale: 1.12 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: EASE }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-ink">
                      <AppMock className="scale-[0.82] md:scale-90" />
                    </div>
                  )}
                </div>
              </FadeUp>
              <FadeUp delay={0.12} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-sun">
                  <h.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="font-display mt-6 text-4xl text-ink md:text-5xl">{h.t}</h3>
                <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink/70">{h.c}</p>
                <ul className="mt-7 space-y-3.5">
                  {h.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[15px] text-ink/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15">
                        <Check className="h-3 w-3 text-orange" strokeWidth={3} />
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
const NODES = ["Canopy", "Factory", "Grid", "NEM"];

function NetworkDiagram() {
  return (
    <div className="relative rounded-3xl bg-ink p-8 text-cream md:p-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        {NODES.map((n, i) => (
          <div key={n} className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <motion.span
                className={`flex h-16 w-16 items-center justify-center rounded-full border md:h-20 md:w-20 ${
                  i === 0 ? "border-sun bg-sun/10" : "border-cream/20 bg-cream/5"
                }`}
                animate={{ boxShadow: ["0 0 0 0 rgba(252,204,60,0.35)", "0 0 0 14px rgba(252,204,60,0)"] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sun">{n[0]}</span>
              </motion.span>
              <span className="eyebrow !text-[10px] text-cream/60">{n}</span>
            </div>
            {i < NODES.length - 1 && (
              <div className="relative hidden h-px w-16 bg-cream/15 sm:block md:w-24">
                <motion.span
                  className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-sun"
                  animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.45, ease: "linear" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="eyebrow mt-10 border-t border-cream/10 pt-6 text-cream/45">
        Class 0.2s metering · 24/7 telemetry · Automated PPA invoicing
      </p>
    </div>
  );
}

function Network() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-orange">The Netso Network</p>
        </FadeUp>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display max-w-xl text-5xl text-ink md:text-6xl">
            <Words text="Your roof joins a distributed power network" accent={2} />
          </h2>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-[16px] leading-relaxed text-ink/70 lg:ml-auto">
              Every Netso system feeds your facility first, then settles surplus through net metering —
              coordinated, metered and invoiced automatically.
            </p>
            <a
              href="#compare"
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-orange link-underline"
            >
              Let’s break it down <ArrowRight className="h-4 w-4" />
            </a>
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
  { k: "Upfront Cost", cash: "Full CAPEX out of working capital", dl: "৳0 — Netso finances the system" },
  { k: "Asset Ownership", cash: "You own it — and all its risks", dl: "Netso owns, insures and operates" },
  { k: "Maintenance", cash: "Your team, your cost", dl: "20-year full-service O&M included" },
  { k: "Energy Price", cash: "Savings depend on your execution", dl: "Locked PPA rate below the grid tariff" },
  { k: "Regulatory Filings", cash: "SREDA, NEM and utility paperwork on you", dl: "Handled end-to-end by Netso" },
  { k: "Balance Sheet", cash: "Asset and debt on your books", dl: "Off balance sheet — you just buy power" },
];

function Compare() {
  return (
    <section id="compare" className="bg-parchment py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-orange">Cash purchase or Netso</p>
        </FadeUp>
        <h2 className="font-display mt-6 text-5xl text-ink md:text-7xl">
          <Words text="Which is right for you?" accent={2} />
        </h2>

        <FadeUp className="mt-14 overflow-hidden rounded-3xl border border-ink/10">
          {/* header */}
          <div className="grid grid-cols-[1fr_1fr] bg-ink text-cream md:grid-cols-[1.2fr_1fr_1.2fr]">
            <span className="eyebrow hidden p-5 text-cream/45 md:block" />
            <span className="eyebrow p-5 text-cream/60">Cash / EPC</span>
            <span className="eyebrow bg-orange p-5 text-cream">Netso RESCO</span>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.k}
              className={`grid grid-cols-[1fr_1fr] md:grid-cols-[1.2fr_1fr_1.2fr] ${
                i % 2 ? "bg-cream" : "bg-parchment"
              }`}
            >
              <span className="eyebrow col-span-2 border-b border-ink/8 p-5 text-ink/50 md:col-span-1 md:border-b-0">
                {r.k}
              </span>
              <span className="flex items-start gap-2 p-5 text-[14px] leading-snug text-ink/60">
                <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/30" />
                {r.cash}
              </span>
              <span className="flex items-start gap-2 bg-orange/8 p-5 text-[14px] font-medium leading-snug text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" strokeWidth={2.6} />
                {r.dl}
              </span>
            </div>
          ))}
        </FadeUp>

        <FadeUp className="mt-12 max-w-2xl">
          <h3 className="font-display-wide text-2xl text-ink">When a cash purchase makes sense</h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink/70">
            If you have idle capital, in-house engineering capacity, and want the asset on your own balance
            sheet, buying a system outright can be the right call. For everyone else, Netso delivers the
            same roof and the same sun — ৳0 down, a lower cost per kWh, and zero operational burden.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Product() {
  return (
    <div className="bg-cream">
      <Nav theme="dark" />
      <main id="content">
        <Hero />
        <Explained />
        <Hardware />
        <Network />
        <Compare />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
