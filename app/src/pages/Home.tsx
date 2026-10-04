import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import StatChips from "../components/StatChips";
import AppMock from "../components/AppMock";
import CTASection from "../components/CTASection";
import { FadeUp, Stagger, StaggerItem, Words } from "../components/Reveal";
import heroHouse from "../assets/hero-house.jpg";
import solarRoof from "../assets/solar-roof-dusk.jpg";
import batteryWall from "../assets/battery-wall.jpg";
import panels from "../assets/panels-closeup.jpg";
import aerial from "../assets/neighborhood-aerial.jpg";
import pergolaVideo from "../assets/pergola-dusk.mp4";
import pergolaPoster from "../assets/pergola-dusk-poster.jpg";
import netsoMarkCream from "../assets/netso-mark-cream.png";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------ Hero ------------------------------ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink text-cream">
      {/* Living Video Background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={pergolaPoster}
          className="h-full w-full object-cover object-center"
        >
          <source src={pergolaVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/35 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
      </motion.div>

      <div />

      {/* Hero Content Grid */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 md:px-10 md:pb-20"
        style={{ opacity: fade }}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7">
            <motion.p
              className="eyebrow mb-6 flex items-center gap-2 text-sun/90"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-sun/80" />
              Commercial & Institutional Solar Pergolas · Bangladesh
            </motion.p>

            <h1 className="font-display max-w-4xl text-[12vw] text-cream sm:text-7xl md:text-[5.5rem] lg:text-[6.25rem]">
              <Words text="Your roof. Now an energy asset." accent={0} delay={0.35} />
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-cream/85 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            >
              A stunning architectural terrace that pays for itself. Financed, engineered and maintained by
              Netso at ৳0 upfront CAPEX — cutting your electricity bills by 35% under a 20-year guaranteed PPA.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
            >
              <a
                href="#how-it-works"
                className="inline-flex h-[52px] items-center gap-2 rounded-full bg-orange px-7 text-[15.5px] font-semibold text-cream transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Request feasibility study
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#benefits"
                className="glass-chip inline-flex h-[52px] items-center rounded-full px-7 text-[15.5px] font-medium text-cream transition-colors duration-300 hover:bg-cream/10"
              >
                How it works
              </a>
            </motion.div>
          </div>

          {/* Right Column: Live Glassmorphic Telemetry Card (Mockup brought to life) */}
          <motion.div
            className="lg:col-span-5 lg:justify-self-end w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-cream/20 bg-ink/40 p-6 md:p-8 backdrop-blur-2xl shadow-2xl text-cream">
              <div className="flex items-center justify-between border-b border-cream/10 pb-4">
                <span className="eyebrow text-sun">PPA Commercial Model</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1 text-[11px] font-medium text-cream/90 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Benchmark
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="eyebrow text-cream/50">Current Grid Cost</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-semibold text-cream/40 line-through">৳ 15.36</span>
                    <span className="text-[13px] text-cream/50">/kWh peak</span>
                  </div>
                </div>

                <div className="border-t border-cream/10 pt-4">
                  <p className="eyebrow text-sun">Our Solar PPA Rate</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-bold text-cream">৳ 10.00</span>
                    <span className="text-sm text-cream/70">/kWh locked for 20 yrs</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-cream/5 p-4 border border-cream/10 flex items-center justify-between">
                  <div>
                    <p className="eyebrow text-cream/60">Savings</p>
                    <p className="font-mono text-3xl font-extrabold text-sun">35%</p>
                  </div>
                  <div className="text-right">
                    <p className="eyebrow text-cream/60">Customer CAPEX</p>
                    <p className="font-mono text-2xl font-bold text-cream">৳ 0</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-cream/10 pt-4">
                <img src={netsoMarkCream} alt="Netso Mark" className="h-6 w-auto opacity-80" />
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold text-cream">Netso Energy Ltd</p>
                  <p className="text-[11px] text-cream/60">Commercial & Institutional Solar Infrastructure</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 pb-6 text-center text-cream/40"
        style={{ opacity: fade }}
        aria-hidden="true"
      >
        <ArrowDown className="mx-auto h-4 w-4" />
      </motion.div>
    </section>
  );
}

/* ---------------------------- Benefits ---------------------------- */
const TABS = [
  {
    id: "save",
    eyebrow: "save",
    title: "Cut your electricity cost by 28–35%",
    accent: 0,
    copy: "A Netso PPA rate of ৳10.00/kWh replaces grid power that now peaks at ৳18.43/kWh. One predictable monthly bill — below the utility tariff from day one.",
    img: solarRoof,
    alt: "A pergola-style solar canopy on a factory rooftop at dusk, warm sky visible between the panels",
  },
  {
    id: "protect",
    eyebrow: "protect",
    title: "Lock your tariff for 20 years",
    accent: 0,
    copy: "Grid tariffs jumped 16.7% in a single BERC order. Your PPA rate doesn't move. Budget certainty for two decades, whatever the grid does next.",
    img: batteryWall,
    alt: "Smart inverters and electrical cabinets inside a factory electrical room",
  },
  {
    id: "control",
    eyebrow: "control",
    title: "Track every kWh in NEOS",
    accent: 0,
    copy: "Generation, savings, automated PPA invoicing and I-REC certificates — metered to class 0.2s accuracy, in real time, from anywhere.",
    img: null,
    alt: "",
  },
];

function Benefits() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="benefits" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex gap-2 md:gap-3" role="tablist" aria-label="Benefits">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                tabIndex={active === i ? 0 : -1}
                aria-selected={active === i}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    setActive((i + 1) % TABS.length);
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    setActive((i - 1 + TABS.length) % TABS.length);
                  }
                }}
                className={`eyebrow h-11 rounded-full border px-5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  active === i
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink"
                }`}
              >
                {t.eyebrow}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div className="min-h-[300px] md:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h2 className="font-display max-w-xl text-5xl text-ink md:text-7xl">
                  <Words text={tab.title} accent={tab.accent} once={false} />
                </h2>
                <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-ink/70">{tab.copy}</p>
                <a
                  href="#how-it-works"
                  className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-orange link-underline"
                >
                  See how <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-3xl bg-beige md:min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
              >
                {tab.img ? (
                  <img src={tab.img} alt={tab.alt} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-ink py-10">
                    <AppMock />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- How it works -------------------------- */
const STEPS = [
  {
    n: "step 1",
    title: "Sign a PPA",
    head: "A lower bill from day one",
    copy: "A 20-year power purchase agreement at ৳0 upfront CAPEX. You pay only for the solar electricity your roof delivers — at a rate below your grid tariff.",
    cta: "Get your assessment",
    visual: "card",
  },
  {
    n: "step 2",
    title: "We build",
    head: "Netso handles everything",
    copy: "Design, engineering, SREDA net-metering filings, interconnection, procurement and installation — then full-service operations and maintenance for the life of the agreement.",
    cta: null,
    visual: "image",
  },
  {
    n: "step 3",
    title: "Power on",
    head: "Power you control",
    copy: "Your rooftop system goes live. Your energy cost drops. NEOS telemetry tracks every kilowatt-hour generated and every taka saved.",
    cta: null,
    visual: "app",
  },
];

function StepVisual({ kind }: { kind: string }) {
  if (kind === "image")
    return <img src={panels} alt="Close-up of dual-glass solar panels catching golden light" className="h-full w-full object-cover" />;
  if (kind === "app")
    return (
      <div className="flex h-full items-center justify-center bg-ink py-8">
        <AppMock className="scale-[0.86]" />
      </div>
    );
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-parchment">
      <div className="spectrum absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-80 blur-2xl" aria-hidden="true" />
      <div className="glass-chip-light relative rounded-2xl p-5 shadow-xl">
        <p className="eyebrow !text-[10px] text-ink/50">Your power rate</p>
        <div className="mt-3 space-y-2.5">
          <div className="flex items-center justify-between gap-10">
            <span className="text-[13px] font-medium text-ink/70">Grid tariff</span>
            <span className="font-mono text-[15px] font-bold text-ink/40 line-through">৳15.36</span>
          </div>
          <div className="flex items-center justify-between gap-10">
            <span className="text-[13px] font-semibold text-ink">Netso PPA</span>
            <span className="font-mono text-[15px] font-bold text-orange">৳10.00</span>
          </div>
          <div className="h-px bg-ink/10" />
          <div className="flex items-center justify-between gap-10">
            <span className="eyebrow !text-[10px] text-ink/50">You save</span>
            <span className="font-mono text-[15px] font-bold text-ink">35%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-parchment py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-orange">How Netso Works</p>
        </FadeUp>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-5xl text-ink md:text-7xl">
            <Words text="A new way to power industry" accent={0} />
          </h2>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-ink/70 lg:ml-auto">
              With Netso, your rooftop becomes a power plant we finance, build, own and operate. You simply
              buy the electricity it produces — below the grid tariff, with zero capital expenditure.
            </p>
            <a
              href="#get-started"
              className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-orange link-underline"
            >
              See if your roof qualifies <ChevronRight className="h-4 w-4" />
            </a>
          </FadeUp>
        </div>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-3" gap={0.12}>
          {STEPS.map((s) => (
            <StaggerItem key={s.n}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-cream transition-shadow duration-500 hover:shadow-2xl">
                <div className="h-64 overflow-hidden md:h-72">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <StepVisual kind={s.visual} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="eyebrow text-ink/45">{s.n}</p>
                  <h3 className="font-display mt-3 text-3xl text-ink">{s.title}</h3>
                  <p className="mt-1 text-[15px] font-semibold text-orange">{s.head}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{s.copy}</p>
                  {s.cta && (
                    <a
                      href="#get-started"
                      className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-ink link-underline"
                    >
                      {s.cta} <ChevronRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* --------------------------- Why netso --------------------------- */
const RISKS = [
  { big: "+16.7%", label: "Industrial tariffs jumped 16.7% in one BERC order", note: "June 2026 pushed industrial power to ৳15.36–18.43/kWh — with no ceiling in sight." },
  { big: "৳18.43", label: "Peak commercial power now costs up to ৳18.43 per kWh", note: "Energy has become a board-level margin risk for every factory and institution." },
  { big: "3,600 MWp", label: "Bangladesh's industrial rooftops could host 3,600 MWp", note: "A $2.1B market sitting idle above the buildings that need it most." },
];

function Why() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #F66F00 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-sun">why netso</p>
        </FadeUp>
        <h2 className="font-display mt-6 max-w-5xl text-[11.5vw] text-cream sm:text-7xl md:text-8xl">
          <Words text="The grid can’t carry Bangladesh’s ambition" accent={0} />
        </h2>

        <div className="mt-16 md:mt-24">
          <FadeUp>
            <p className="eyebrow mb-6 text-cream/45">the reality</p>
          </FadeUp>
          <Stagger className="divide-y divide-cream/10 border-y border-cream/10" gap={0.14}>
            {RISKS.map((r) => (
              <StaggerItem key={r.big}>
                <div className="group grid items-center gap-4 py-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.5fr)_minmax(0,1fr)] md:gap-8 md:py-10">
                  <p className="font-display text-5xl text-sun transition-colors duration-500 group-hover:text-orange md:text-7xl">
                    {r.big}
                  </p>
                  <p className="max-w-xl text-xl font-medium leading-snug text-cream md:text-2xl">{r.label}</p>
                  <p className="text-[14.5px] leading-relaxed text-cream/55 md:justify-self-end md:text-right">
                    {r.note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Network ----------------------------- */
function Network() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <FadeUp>
              <p className="eyebrow text-orange">One roof at a time</p>
            </FadeUp>
            <h2 className="font-display mt-6 max-w-xl text-4xl text-ink md:text-6xl">
              <Words
                text="Netso is building Bangladesh’s distributed energy network, one rooftop at a time"
                accent={0}
              />
            </h2>
          </div>
          <FadeUp delay={0.15} className="lg:pb-2">
            <p className="eyebrow text-ink/45">A growing network</p>
            <h3 className="font-display-wide mt-3 text-2xl text-ink md:text-[2rem]">
              Every roof makes the network stronger
            </h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink/70">
              Netso rooftops generate power exactly where it’s consumed. Together they form a distributed
              network of owned energy assets across Chattogram, Gazipur and Narayanganj — engineered to
              scale with every new installation.
            </p>
            <a
              href="#get-started"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-orange link-underline"
            >
              See if your roof qualifies <ChevronRight className="h-4 w-4" />
            </a>
          </FadeUp>
        </div>

        <FadeUp className="mt-14">
          <div ref={ref} className="relative h-[52vh] overflow-hidden rounded-3xl md:h-[68vh]">
            <motion.img
              src={aerial}
              alt="Aerial view of a Chattogram industrial district at golden hour with solar arrays on the factory rooftops"
              className="absolute inset-0 h-[116%] w-full object-cover"
              style={{ y }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 flex flex-wrap gap-2.5 p-5 md:p-8">
              {["Generate", "Consume", "Settle"].map((w) => (
                <span key={w} className="glass-chip eyebrow rounded-full px-4 py-2.5 text-cream">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------ Page ------------------------------ */
export default function Home() {
  return (
    <div className="bg-cream">
      <Nav theme="dark" />
      <main id="content">
        <Hero />
        <Benefits />
        <HowItWorks />
        <Why />
        <Network />
        <CTASection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
