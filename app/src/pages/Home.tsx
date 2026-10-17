import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import AppMock from "../components/AppMock";
import CTASection from "../components/CTASection";
import { FadeUp, Stagger, StaggerItem, Words } from "../components/Reveal";
import CanvasHero from "../components/CanvasHero";
import InstitutionalEconomics from "../components/InstitutionalEconomics";
import ArchitecturalTransformation from "../components/ArchitecturalTransformation";
import OperationsScroller from "../components/OperationsScroller";
import SolarPergola3D from "../components/SolarPergola3D";
import SiteStudyPoster from "../components/SiteStudyPoster";
import FeasibilityModal from "../components/FeasibilityModal";
import { MarqueeTicker } from "../components/MarqueeTicker";
import { RMGEdgeSection } from "../components/RMGEdgeSection";
import solarRoof from "../assets/solar-roof-dusk.jpg";
import batteryWall from "../assets/battery-wall.jpg";
import panels from "../assets/panels-closeup.jpg";
import aerial from "../assets/neighborhood-aerial.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;



/* ---------------------------- Benefits ---------------------------- */
const TABS = [
  {
    id: "save",
    eyebrow: "save",
    title: "A lower-cost power option for your facility",
    accent: 0,
    copy: "Netso can structure a contracted rooftop power price below the applicable grid tariff. The final rate, indexation and settlement terms are confirmed after the site and load review.",
    img: solarRoof,
    alt: "A pergola-style solar canopy on a factory rooftop at dusk, warm sky visible between the panels",
  },
  {
    id: "protect",
    eyebrow: "protect",
    title: "Plan around a long-term power agreement",
    accent: 0,
    copy: "A long-term PPA can make a portion of your energy cost easier to plan. Netso documents the price formula, term, metering and settlement mechanics before you commit.",
    img: batteryWall,
    alt: "Smart inverters and electrical cabinets inside a factory electrical room",
  },
  {
    id: "control",
    eyebrow: "control",
    title: "See what the system is producing",
    accent: 0,
    copy: "Project reporting can bring generation, performance and billing data into one view, with the meter and reporting standard agreed for the project.",
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
                  className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-forest hover:text-gold transition-colors link-underline"
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
    copy: "A long-term power purchase agreement can remove the need to fund the solar plant upfront. You pay for the electricity delivered under the agreed project terms.",
    cta: "Get your assessment",
    visual: "card",
  },
  {
    n: "step 2",
    title: "We build",
    head: "Netso handles everything",
    copy: "Netso coordinates design, engineering, utility approvals, procurement, installation and ongoing operations, with responsibilities documented before construction.",
    cta: null,
    visual: "image",
  },
  {
    n: "step 3",
    title: "Power on",
    head: "Power you control",
    copy: "Once commissioned, the system supplies on-site power and the agreed reporting shows generation, performance and billing data over time.",
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
            <span className="text-[13px] font-medium text-ink/70">Grid power</span>
            <span className="font-mono text-[13px] font-bold text-red-600/70">Unhedged Peak</span>
          </div>
          <div className="flex items-center justify-between gap-10">
            <span className="text-[13px] font-semibold text-ink">Netso PPA</span>
            <span className="font-mono text-[13px] font-bold text-forest">30% Below Grid</span>
          </div>
          <div className="h-px bg-ink/10" />
          <div className="flex items-center justify-between gap-10">
                            <span className="eyebrow !text-[10px] text-ink/50">Illustrative</span>
                            <span className="font-mono text-[15px] font-bold text-forest">Below-grid target</span>
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
          <p className="eyebrow text-gold">How Netso Works</p>
        </FadeUp>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-5xl text-ink md:text-7xl">
            <Words text="A new way to power industry" accent={0} />
          </h2>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-ink/70 lg:ml-auto">
              With Netso, a suitable rooftop can become a solar asset that we finance, build and operate. You buy the electricity it produces under a long-term agreement, with the commercial structure confirmed for your facility.
            </p>
            <a
              href="#get-started"
              className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-forest hover:text-gold transition-colors link-underline"
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
                  <p className="mt-1 text-[15px] font-semibold text-forest">{s.head}</p>
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
  { big: "Rising", label: "Grid prices can make daytime power harder to plan", note: "A rooftop system can reduce exposure to a portion of the grid bill, subject to design and contracted terms." },
  { big: "One", label: "One accountable partner from assessment through operations", note: "Netso coordinates the commercial, engineering and operating work required to put a project into service." },
  { big: "Idle", label: "Industrial roof area is an underused energy resource", note: "A site review shows whether structure, load, access and utility conditions support a viable project." },
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
           <Words text="Industrial power should be easier to plan" accent={0} />
        </h2>

        <div className="mt-16 md:mt-24">
          <FadeUp>
            <p className="eyebrow mb-6 text-cream/45">the reality</p>
          </FadeUp>
          <Stagger className="divide-y divide-cream/10 border-y border-cream/10" gap={0.14}>
            {RISKS.map((r) => (
              <StaggerItem key={r.big}>
                <div className="group grid items-center gap-4 py-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.5fr)_minmax(0,1fr)] md:gap-8 md:py-10">
                  <p className="font-display text-5xl text-sun transition-colors duration-500 group-hover:text-gold md:text-7xl">
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
              <p className="eyebrow text-gold">One roof at a time</p>
            </FadeUp>
            <h2 className="font-display mt-6 max-w-xl text-4xl text-ink md:text-6xl">
              <Words
                 text="Netso is building a distributed energy platform for Bangladesh's industry"
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
              Rooftop systems generate power close to the facilities that use it. Each project is assessed on its own roof, load profile, connection and commercial fit, with a model designed to scale across Bangladesh's industrial corridors.
            </p>
            <a
              href="#get-started"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-forest hover:text-gold transition-colors link-underline"
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  const isV2 = pathname === "/v2";

  return (
    <div className="overflow-x-clip bg-cream">
      <Nav theme="dark" onOpenAssessment={() => setIsModalOpen(true)} />
      <main id="content">
        <CanvasHero onOpenAssessment={() => setIsModalOpen(true)} />
        <MarqueeTicker />
        <InstitutionalEconomics onOpenAssessment={() => setIsModalOpen(true)} />
        <ArchitecturalTransformation onOpenAssessment={() => setIsModalOpen(true)} />
        <OperationsScroller onOpenAssessment={() => setIsModalOpen(true)} />
        <RMGEdgeSection onOpenFeasibility={() => setIsModalOpen(true)} />
        {isV2 ? (
          <SiteStudyPoster onOpenAssessment={() => setIsModalOpen(true)} />
        ) : (
          <section id="pergola-twin" className="relative bg-forest-dark py-24 md:py-36 text-warm border-t border-warm/10">
            <div className="mx-auto max-w-[1440px] px-5 md:px-10">
              <div className="mb-12 max-w-3xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                   Architectural solar design
                </p>
                <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-warm sm:text-5xl md:text-6xl">
                   A solar structure designed for the roof beneath it.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-sage md:text-lg">
                   Netso can design elevated solar structures around the roof, access requirements and building use. Materials, module choice, structural loads and any lighting are confirmed in the project design rather than assumed from a standard template.
                </p>
              </div>
              <SolarPergola3D />
            </div>
          </section>
        )}
        <Benefits />
        <HowItWorks />
        <Why />
        <Network />
        <CTASection />
      </main>
      <Footer />
      <CookieBanner />
      <FeasibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
