import { lazy, Suspense, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowRight, CheckCircle2, Pause, Play, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import solarRoof from "../../assets/solar-roof-dusk.jpg";
import batteryWall from "../../assets/battery-wall.jpg";
import panels from "../../assets/panels-closeup.jpg";
import aerial from "../../assets/neighborhood-aerial.jpg";
import pergolaPoster from "../../assets/pergola-dusk-poster.jpg";
import { ASSESSMENT_HREF } from "./v2Actions";
import "../../styles/v2-legacy-bridge.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const SolarPergola3D = lazy(() => import("../SolarPergola3D"));

const TICKER_ITEMS = [
  "ILLUSTRATIVE BELOW-GRID TARGET",
  "ASSET-OWNED STRUCTURE",
  "TURNKEY OPERATING MODEL",
  "SREDA-AWARE DESIGN",
  "SITE-SPECIFIC ENGINEERING",
  "BANGLADESH C&I ROOFTOPS",
];

const BENEFITS = [
  {
    id: "save",
    eyebrow: "Save",
    title: "Make the energy line easier to plan.",
    copy: "A rooftop PPA can be structured against the facility’s applicable grid tariff, generation profile, and executed commercial terms. The goal is a clearer operating cost—not a generic promise.",
    image: solarRoof,
    alt: "Reference image of a rooftop solar canopy at dusk with warm architectural lighting",
  },
  {
    id: "protect",
    eyebrow: "Protect",
    title: "Turn tariff uncertainty into a reviewable contract.",
    copy: "Site load, tariff treatment, financing, escalation, export settlement, and service obligations are reviewed together before a commercial structure is proposed.",
    image: batteryWall,
    alt: "Reference image of solar electrical equipment and monitoring cabinets",
  },
  {
    id: "control",
    eyebrow: "Control",
    title: "Keep the operating layer visible.",
    copy: "Generation, maintenance, and settlement data can be organized into an operating view so the customer and asset owner can review the same facts.",
    image: null,
    alt: "",
  },
] as const;

const STEPS = [
  {
    number: "01",
    title: "Sign a PPA",
    head: "Start with the roof, the load, and the contract.",
    copy: "A long-term power purchase structure can avoid upfront customer asset purchase where financing and site feasibility support it. Final terms are project-specific.",
  },
  {
    number: "02",
    title: "We build",
    head: "Netso coordinates the system around the building.",
    copy: "Design, structural review, utility coordination, procurement, installation, and commissioning are sequenced around the facility’s operating requirements.",
  },
  {
    number: "03",
    title: "Power on",
    head: "The operating layer stays close to the evidence.",
    copy: "Once commissioned, generation, maintenance, and commercial settlement can be reviewed against the project documents and measured site data.",
  },
] as const;

const DECISION_EVIDENCE = [
  {
    key: "roof",
    value: "Roof",
    title: "Is the surface usable?",
    note: "Roof area, shading, access, structural capacity, drainage, and electrical route are reviewed before a system is sized.",
  },
  {
    key: "load",
    value: "Load",
    title: "Can the power be used on site?",
    note: "Operating hours, interval demand, phase balance, critical loads, and export conditions shape the energy case.",
  },
  {
    key: "contract",
    value: "Contract",
    title: "Can the terms stand up?",
    note: "Tariff treatment, ownership, tenor, settlement, escalation, insurance, and service obligations belong in the project documents.",
  },
] as const;

const SITE_FIT_CRITERIA = [
  "Usable roof geometry",
  "Daytime load alignment",
  "Safe access and installation windows",
  "Electrical interconnection path",
  "Recent bills and site documents",
] as const;

function readSaveDataPreference(): boolean {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Ticker() {
  const reducedMotion = useReducedMotion() ?? false;
  const [userPaused, setUserPaused] = useState(false);

  const paused = reducedMotion || userPaused;

  return (
    <section className="v2-bridge__ticker" aria-label="Netso operating principles">
      <div className="v2-bridge__ticker-shell">
        <div className={`v2-bridge__ticker-track${paused ? " is-paused" : ""}`}>
          <div className="v2-bridge__ticker-group">
            {TICKER_ITEMS.map((item) => (
              <span key={item} className="v2-bridge__ticker-item">
                <i aria-hidden="true" /> {item}
              </span>
            ))}
          </div>
          <div className="v2-bridge__ticker-group" aria-hidden="true">
            {TICKER_ITEMS.map((item) => (
              <span key={`duplicate-${item}`} className="v2-bridge__ticker-item">
                <i aria-hidden="true" /> {item}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="v2-bridge__ticker-control"
          aria-label={reducedMotion ? "Ticker motion disabled" : paused ? "Play ticker" : "Pause ticker"}
          aria-pressed={!reducedMotion && !paused}
          disabled={reducedMotion}
          onClick={() => setUserPaused((current) => !current)}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          <span>{reducedMotion ? "Still" : paused ? "Play" : "Pause"}</span>
        </button>
      </div>
    </section>
  );
}

function ValueCards() {
  const cards = [
    {
      icon: ShieldCheck,
      tag: "OWNERSHIP PATH",
      title: "Put the asset and obligations in one view.",
      copy: "Ownership, financing, insurance, security, and decision rights can be structured around the project rather than left as separate questions.",
      foot: "Qualified by: executed commercial terms",
    },
    {
      icon: TrendingUp,
      tag: "SITE-SPECIFIC ECONOMICS",
      title: "Model the rate against the facility.",
      copy: "A below-grid target is only useful when tested against tariff treatment, load shape, financing, export settlement, and the contractual scope.",
      foot: "Qualified by: site model and PPA",
    },
    {
      icon: Activity,
      tag: "TURNKEY SERVICE",
      title: "Keep the operating layer accountable.",
      copy: "Inspection, monitoring, preventive maintenance, and exception handling can be coordinated for the life of the agreement, subject to the service scope.",
      foot: "Qualified by: service-level schedule",
    },
  ];

  return (
    <section className="v2-bridge__value-section" aria-labelledby="v2-value-title">
      <div className="v2-bridge__container">
        <Reveal>
          <p className="v2-bridge__eyebrow">The commercial layer</p>
          <h2 id="v2-value-title" className="v2-bridge__display v2-bridge__display--light">Make the rooftop decision legible.</h2>
        </Reveal>
        <div className="v2-bridge__value-grid">
          {cards.map(({ icon: Icon, tag, title, copy, foot }, index) => (
            <Reveal key={tag} className={`v2-bridge__value-card${index === 0 ? " is-featured" : ""}`}>
              <div className="v2-bridge__value-card-top">
                <span className="v2-bridge__icon"><Icon size={19} aria-hidden="true" /></span>
                <span className="v2-bridge__badge">{tag}</span>
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <div className="v2-bridge__card-foot"><CheckCircle2 size={15} aria-hidden="true" /> {foot}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFitSection() {
  return (
    <section className="v2-bridge__site-fit-section" aria-labelledby="v2-site-fit-title">
      <div className="v2-bridge__container">
        <div className="v2-bridge__site-fit-copy">
          <Reveal>
            <p className="v2-bridge__eyebrow">RMG / C&amp;I site fit</p>
            <h2 id="v2-site-fit-title" className="v2-bridge__display">A proposal starts where the facts line up.</h2>
          </Reveal>
          <Reveal className="v2-bridge__section-copy">
            <p>These are screening questions, not deployment promises. A facility moves forward when the roof, load, access, electrical path, and document set can be reviewed together.</p>
            <Link className="v2-bridge__text-link" to="/partners">Review partner pathways <ArrowRight size={15} aria-hidden="true" /></Link>
          </Reveal>
        </div>
        <div className="v2-bridge__fit-list" aria-label="Initial site-fit criteria">
          {SITE_FIT_CRITERIA.map((criterion, index) => (
            <div key={criterion} className="v2-bridge__fit-item">
              <span>0{index + 1}</span>
              <strong>{criterion}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InterfaceConcept({ className = "" }: { className?: string }) {
  return (
    <div className={`v2-bridge__interface-concept ${className}`.trim()} role="img" aria-label="Interface concept with sample data, not live telemetry">
      <div className="v2-bridge__interface-topline">
        <span>NEOS interface concept</span>
        <span className="v2-bridge__interface-dot" aria-hidden="true" />
      </div>
      <div className="v2-bridge__interface-heading">
        <p>Operating view</p>
        <strong>Sample data</strong>
      </div>
      <p className="v2-bridge__interface-disclaimer">Interface concept — sample data, not live telemetry</p>
      <div className="v2-bridge__interface-chart" aria-hidden="true">
        <span style={{ height: "28%" }} />
        <span style={{ height: "46%" }} />
        <span style={{ height: "36%" }} />
        <span style={{ height: "72%" }} />
        <span style={{ height: "58%" }} />
        <span style={{ height: "82%" }} />
        <span style={{ height: "64%" }} />
        <i />
      </div>
      <div className="v2-bridge__interface-rows">
        <div><span>Generation</span><b>Site data</b></div>
        <div><span>Maintenance</span><b>Review</b></div>
        <div><span>Settlement</span><b>Pending</b></div>
      </div>
    </div>
  );
}

function ModelSection() {
  return (
    <section className="v2-bridge__model-section" aria-labelledby="v2-model-title">
      <div className="v2-bridge__container">
        <div className="v2-bridge__section-intro">
          <Reveal>
            <p className="v2-bridge__eyebrow v2-bridge__eyebrow--gold">How Netso works</p>
            <h2 id="v2-model-title" className="v2-bridge__display">A new way to power industry.</h2>
          </Reveal>
          <Reveal className="v2-bridge__section-copy">
            <p>With Netso, a rooftop can become a power asset that is financed, designed, built, and operated around the facility. The sequence is simple; the feasibility work is not.</p>
            {/* The bridge carries one assessment ask, at the point the visitor has
                just read how the model works. */}
            <a className="v2-bridge__text-link" href={ASSESSMENT_HREF}>See if your roof qualifies <ArrowRight size={15} aria-hidden="true" /></a>
          </Reveal>
        </div>
        <div className="v2-bridge__steps">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} className="v2-bridge__step">
              <div className="v2-bridge__step-art">
                <span className="v2-bridge__step-number" aria-hidden="true">{step.number}</span>
                {index === 0 && (
                  <div className="v2-bridge__rate-card">
                    <small>Commercial review</small>
                    <b>Rate and terms</b>
                    <span>Subject to site model</span>
                  </div>
                )}
                {index === 1 && (
                  <>
                    <img src={panels} alt="Reference image of close-up solar panels catching golden light" loading="lazy" />
                    <span className="v2-bridge__media-label">Reference image · concept</span>
                  </>
                )}
                {index === 2 && <InterfaceConcept className="v2-bridge__app-mock" />}
              </div>
              <div className="v2-bridge__step-copy">
                <p className="v2-bridge__step-label">Step {index + 1}</p>
                <h3>{step.title}</h3>
                <strong>{step.head}</strong>
                <p>{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const benefit = BENEFITS[active];

  const selectBenefit = (index: number, moveFocus = false) => {
    setActive(index);
    if (moveFocus) window.requestAnimationFrame(() => tabRefs.current[index]?.focus());
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % BENEFITS.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + BENEFITS.length) % BENEFITS.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = BENEFITS.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectBenefit(nextIndex, true);
  };

  return (
    <section className="v2-bridge__benefits-section" aria-labelledby="v2-benefits-title">
      <div className="v2-bridge__container">
        <div className="v2-bridge__benefit-tabs" role="tablist" aria-label="Commercial benefits" aria-orientation="horizontal">
          {BENEFITS.map((item, index) => {
            const tabId = `v2-benefit-tab-${item.id}`;
            const panelId = `v2-benefit-panel-${item.id}`;
            return (
              <button
                key={item.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls={panelId}
                tabIndex={active === index ? 0 : -1}
                className={active === index ? "is-active" : ""}
                onClick={() => selectBenefit(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {item.eyebrow}
              </button>
            );
          })}
        </div>
        <div
          id={`v2-benefit-panel-${benefit.id}`}
          className="v2-bridge__benefit-grid"
          role="tabpanel"
          aria-labelledby={`v2-benefit-tab-${benefit.id}`}
          tabIndex={0}
        >
          <div>
            <Reveal>
              <p className="v2-bridge__eyebrow">{benefit.eyebrow}</p>
              <h2 id="v2-benefits-title" className="v2-bridge__display">{benefit.title}</h2>
              <p className="v2-bridge__large-copy">{benefit.copy}</p>
            </Reveal>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={benefit.id}
              className="v2-bridge__benefit-visual"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: EASE }}
            >
              {benefit.image ? (
                <>
                  <img src={benefit.image} alt={benefit.alt} loading="lazy" />
                  <span className="v2-bridge__media-label">Reference image · concept</span>
                </>
              ) : <InterfaceConcept />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CanopyReference() {
  const reducedMotion = useReducedMotion() ?? false;
  const [saveData] = useState(readSaveDataPreference);
  const [isActive, setIsActive] = useState(false);
  const staticPoster = reducedMotion || saveData;

  return (
    <section className="v2-bridge__canopy-section" aria-labelledby="v2-canopy-title">
      <div className="v2-bridge__container">
        <div className="v2-bridge__section-intro">
          <Reveal>
            <p className="v2-bridge__eyebrow v2-bridge__eyebrow--gold">Reference canopy</p>
            <h2 id="v2-canopy-title" className="v2-bridge__display v2-bridge__display--light">Infrastructure with presence.</h2>
          </Reveal>
          <Reveal className="v2-bridge__section-copy v2-bridge__section-copy--light">
            <p>A proposed solar pergola brings structure, shade, glass, and operating access into the same design conversation. Explore the reference only when it helps the decision.</p>
          </Reveal>
        </div>

        {!isActive || staticPoster ? (
          <div className="v2-bridge__canopy-poster">
            <img src={pergolaPoster} alt="Reference concept rendering of a solar pergola canopy; not a real deployment" loading="lazy" />
            <div className="v2-bridge__canopy-poster-wash" aria-hidden="true" />
            <div className="v2-bridge__canopy-caption">
              <span>Reference concept · not a deployment image</span>
              {staticPoster ? (
                <p>Static view shown to respect your motion or data preference.</p>
              ) : (
                <button type="button" onClick={() => setIsActive(true)}>Inspect the interactive reference <ArrowRight size={15} aria-hidden="true" /></button>
              )}
            </div>
          </div>
        ) : (
          <div className="v2-bridge__canopy-live">
            <div className="v2-bridge__canopy-live-bar">
              <span>Interactive reference · concept model</span>
              <button type="button" onClick={() => setIsActive(false)}>Close 3D view</button>
            </div>
            <Suspense fallback={<div className="v2-bridge__canopy-loading" role="status">Loading the reference model…</div>}>
              <SolarPergola3D />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}

function RealitySection() {
  return (
    <section className="v2-bridge__reality-section" aria-labelledby="v2-reality-title">
      <div className="v2-bridge__container">
        <Reveal>
          <p className="v2-bridge__eyebrow v2-bridge__eyebrow--gold">Decision evidence</p>
          <h2 id="v2-reality-title" className="v2-bridge__display v2-bridge__display--light">Distributed energy starts with what the site can prove.</h2>
        </Reveal>
        <div className="v2-bridge__reality-list">
          {DECISION_EVIDENCE.map((item, index) => (
            <Reveal key={item.key} className="v2-bridge__reality-row">
              <b>{item.value}</b>
              <div>
                <span className="v2-bridge__reality-index">0{index + 1}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NetworkSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section className="v2-bridge__network-section" aria-labelledby="v2-network-title">
      <div className="v2-bridge__container">
        <div className="v2-bridge__section-intro">
          <Reveal>
            <p className="v2-bridge__eyebrow v2-bridge__eyebrow--gold">One roof at a time</p>
            <h2 id="v2-network-title" className="v2-bridge__display">Build the distributed energy network where power is used.</h2>
          </Reveal>
          <Reveal className="v2-bridge__section-copy">
            <p>Every roof adds a local generation asset to the network. The opportunity is broad; every individual project still starts with usable roof area, interval demand, electrical topology, structural capacity, and the contract.</p>
          </Reveal>
        </div>
        <Reveal>
          <div ref={ref} className="v2-bridge__network-image">
            <motion.img src={aerial} alt="Reference image of an industrial district at golden hour; concept context, not a Netso deployment" loading="lazy" style={reducedMotion ? undefined : { y }} />
            <div className="v2-bridge__network-overlay" aria-hidden="true">
              <svg viewBox="0 0 900 420" preserveAspectRatio="none">
                <path d="M82 286 C220 142 294 310 438 206 S692 94 818 172" />
                <path d="M438 206 C455 246 518 286 620 298" />
                <circle cx="82" cy="286" r="8" />
                <circle cx="438" cy="206" r="8" />
                <circle cx="818" cy="172" r="8" />
                <circle cx="620" cy="298" r="8" />
              </svg>
            </div>
            <span className="v2-bridge__media-label">Reference image · concept context</span>
            <div className="v2-bridge__network-tags"><span>Generate</span><span>Consume</span><span>Settle</span></div>
          </div>
        </Reveal>
        <nav className="v2-bridge__reading" aria-label="Further reading">
          <span>Continue the review</span>
          <Link to="/product">Product <ArrowRight size={14} aria-hidden="true" /></Link>
          <Link to="/calculator">Calculator <ArrowRight size={14} aria-hidden="true" /></Link>
          <Link to="/partners">Partners <ArrowRight size={14} aria-hidden="true" /></Link>
          <Link to="/about">About <ArrowRight size={14} aria-hidden="true" /></Link>
        </nav>
      </div>
    </section>
  );
}

export default function V2LegacyBridge() {
  return (
    <div id="v2-commercial-model" className="v2-bridge" aria-label="Netso commercial model">
      <Ticker />
      <ValueCards />
      <SiteFitSection />
      <ModelSection />
      <BenefitsSection />
      <CanopyReference />
      <RealitySection />
      <NetworkSection />
    </div>
  );
}
