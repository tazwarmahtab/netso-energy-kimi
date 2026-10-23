import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import {
  GhostLink,
  GoldLink,
  Marquee,
  Panel,
  Reveal,
  SectionHead,
} from "./primitives";
import pergola from "../../assets/solar-roof-dusk.jpg";
import hqDay from "../../assets/bangladeshi-solar-hq-day.jpg";
import hqDusk from "../../assets/bangladeshi-solar-hq-dusk.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ========================================================================== */
/*  NAV                                                                       */
/* ========================================================================== */

const NAV_LINKS = [
  { label: "Product", href: "#architecture" },
  { label: "Economics", href: "#economics" },
  { label: "Operations", href: "#operations" },
  { label: "Proof", href: "#proof" },
  { label: "Network", href: "#network" },
];

export function GlassNav({
  onAssess,
  onHome = true,
}: {
  onAssess: () => void;
  /** False on sub-pages, where the section anchors live on the homepage. */
  onHome?: boolean;
}) {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex w-full max-w-[1180px] items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 md:px-5 ${
          condensed
            ? "border-[rgba(255,250,240,0.14)] bg-[rgba(4,13,9,0.72)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link
          to={onHome ? "#top" : "/"}
          className="flex items-center gap-2.5 pl-1 pr-2 text-[15px] font-semibold tracking-[-0.02em] text-[#fffaf0]"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-[var(--g-gold)] shadow-[0_0_14px_rgba(198,161,91,0.9)]"
          />
          NETSO<span className="text-[var(--g-gold)]">°</span>
          <span className="hidden text-[10px] font-normal uppercase tracking-[0.24em] text-[rgba(255,250,240,0.45)] sm:inline">
            ENERGY
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {onHome ? (
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[13.5px] text-[rgba(255,250,240,0.62)] transition-colors hover:bg-[rgba(255,250,240,0.06)] hover:text-[#fffaf0]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={`/${link.href}`}
                  className="rounded-full px-3.5 py-2 text-[13.5px] text-[rgba(255,250,240,0.62)] transition-colors hover:bg-[rgba(255,250,240,0.06)] hover:text-[#fffaf0]"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAssess}
            className="hidden h-9 items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#f2ddaa,#c6a15b_55%,#b8913f)] px-4 text-[13px] font-semibold text-[#071a13] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition-transform hover:-translate-y-px sm:inline-flex"
          >
            Assess my roof
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,250,240,0.16)] text-[#fffaf0] lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="pointer-events-auto fixed inset-x-4 top-[76px] z-50 rounded-3xl border border-[rgba(255,250,240,0.12)] bg-[rgba(4,13,9,0.9)] p-3 backdrop-blur-2xl lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={onHome ? link.href : `/${link.href}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] text-[rgba(255,250,240,0.8)] hover:bg-[rgba(255,250,240,0.06)]"
            >
              {link.label}
              <ArrowRight className="h-4 w-4 text-[var(--g-gold)]" />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

/* ========================================================================== */
/*  HERO — three planes: photograph, glass instrument, typographic plate       */
/* ========================================================================== */

export function GlassHero({ onAssess }: { onAssess: () => void }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const cacheRect = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    rectRef.current = event.currentTarget.getBoundingClientRect();
  };

  const moveLight = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = lightRef.current;
    const rect = rectRef.current ?? event.currentTarget.getBoundingClientRect();
    if (!el || !rect) return;
    el.style.setProperty("--hx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--hy", `${event.clientY - rect.top}px`);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 8,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(plateRef.current, {
        y: -70,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="g-hero" onPointerEnter={cacheRect} onPointerMove={moveLight}>
      <div className="g-hero__media" ref={mediaRef}>
        <img
          src={pergola}
          alt="Architectural solar pergola over an industrial rooftop at dusk, warm sky between the panels"
          fetchPriority="high"
        />
      </div>

      <div ref={lightRef} className="g-hero__light" aria-hidden="true" />

      <div className="g-hero__plate" ref={plateRef}>
        <div className="g-wrap">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="g-chip">
                <span className="g-dot" aria-hidden="true" />
                Chattogram · Gazipur · Narayanganj
              </span>
              <span className="g-chip hidden sm:inline-flex">Build-Own-Operate</span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="g-display g-display--xl mt-8 max-w-[16ch]">
              Your roof.
              <br />
              Now an <em>energy asset.</em>
            </h1>
          </Reveal>

          <div className="mt-9 grid items-end gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <Reveal delay={170}>
                <p className="g-body max-w-[42ch]">
                  Netso finances, builds and operates architectural solar pergolas on
                  industrial roofs across Bangladesh. You buy the power, not the plant —
                  <strong> zero client CAPEX</strong>, under a long-term agreement.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <GoldLink onClick={onAssess}>
                    Request a rooftop assessment
                    <ArrowUpRight className="h-4 w-4" />
                  </GoldLink>
                  <GhostLink href="#economics">
                    Model the economics
                    <ArrowRight className="h-4 w-4" />
                  </GhostLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <Panel className="overflow-hidden" variant="deep">
                <div className="flex items-center justify-between border-b border-[rgba(255,250,240,0.08)] px-5 py-3.5">
                  <span className="g-label !text-[9.5px] !tracking-[0.22em] text-[rgba(255,250,240,0.55)]">
                    Commercial shape
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.4)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Reference model
                  </span>
                </div>

                <dl className="g-telemetry rounded-none border-0">
                  <div>
                    <dt className="g-label !text-[9px] !tracking-[0.18em] text-[rgba(255,250,240,0.45)]">
                      Tariff basis
                    </dt>
                    <dd className="g-num mt-2 text-[clamp(1.5rem,2.4vw,2rem)] leading-none">
                      30<span className="text-[0.55em] text-[var(--g-gold)]">%</span>
                    </dd>
                    <p className="mt-1.5 text-[11px] leading-snug text-[rgba(255,250,240,0.42)]">
                      below the applicable grid tariff
                    </p>
                  </div>
                  <div>
                    <dt className="g-label !text-[9px] !tracking-[0.18em] text-[rgba(255,250,240,0.45)]">
                      Client CAPEX
                    </dt>
                    <dd className="g-num mt-2 text-[clamp(1.5rem,2.4vw,2rem)] leading-none">
                      ৳0
                    </dd>
                    <p className="mt-1.5 text-[11px] leading-snug text-[rgba(255,250,240,0.42)]">
                      financed and operated by Netso
                    </p>
                  </div>
                  <div>
                    <dt className="g-label !text-[9px] !tracking-[0.18em] text-[rgba(255,250,240,0.45)]">
                      Term
                    </dt>
                    <dd className="g-num mt-2 text-[clamp(1.5rem,2.4vw,2rem)] leading-none">
                      20<span className="text-[0.55em] text-[var(--g-gold)]">yr</span>
                    </dd>
                    <p className="mt-1.5 text-[11px] leading-snug text-[rgba(255,250,240,0.42)]">
                      floating discount, set in the PPA
                    </p>
                  </div>
                </dl>

                <p className="border-t border-[rgba(255,250,240,0.08)] px-5 py-3 text-[10.5px] leading-relaxed text-[rgba(255,250,240,0.34)]">
                  Illustrative structure. Binding rate, savings basis and term live only
                  in an executed agreement.
                </p>
              </Panel>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  MARQUEE STRIP                                                             */
/* ========================================================================== */

export function GlassTicker() {
  return (
    <Marquee
      items={[
        "Zero client CAPEX",
        "Build · Own · Operate",
        "Non-penetrative roof attachment",
        "SREDA net metering 2025",
        "Class 0.2s bidirectional metering",
        "30% floating discount",
        "I-REC carbon tracking",
      ]}
    />
  );
}

/* ========================================================================== */
/*  ARCHITECTURE — the day/dusk transformation                                */
/* ========================================================================== */

const BUILDING_FACTS = [
  {
    k: "01",
    t: "Roof, not roof damage",
    d: "Standing-seam clamps and ballasted frames carry the array without puncturing the sheet. The waterproofing warranty stays intact.",
  },
  {
    k: "02",
    t: "Structure you can see",
    d: "Hot-dip galvanised steel pergolas are engineered for local wind and monsoon loading, then finished as architecture rather than plant.",
  },
  {
    k: "03",
    t: "Shade where the heat was",
    d: "The canopy intercepts irradiance before it reaches the sheet, reducing the solar gain that pushes sewing floors into HVAC overload.",
  },
];

export function GlassArchitecture() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section id="architecture" className="g-section">
      <div className="g-wrap">
        <SectionHead
          eyebrow="Architecture"
          title={
            <>
              Designed to work <em>with</em> the building.
            </>
          }
          aside={
            <p className="g-body max-w-[40ch] lg:ml-auto">
              A rooftop is a structural, thermal and operational system before it is an
              energy site. The pergola is detailed around the building it sits on.
            </p>
          }
        />

        <Reveal delay={120} className="mt-14">
          <Panel className="overflow-hidden p-2 md:p-3" variant="deep">
            <div className="grid gap-2 md:grid-cols-2 md:gap-3">
              <figure className="relative overflow-hidden rounded-[18px]">
                <img
                  src={hqDay}
                  alt="Industrial facility with a solar pergola in daylight"
                  className="g-img aspect-[4/3]"
                  loading="lazy"
                />
                <figcaption className="absolute left-4 top-4">
                  <span className="g-chip !bg-[rgba(4,13,9,0.55)] !text-[9px]">
                    Day · reference site
                  </span>
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-[18px]">
                <img
                  src={hqDusk}
                  alt="The same facility at dusk with the pergola lit from below"
                  className="g-img aspect-[4/3]"
                  loading="lazy"
                />
                <figcaption className="absolute left-4 top-4">
                  <span className="g-chip !bg-[rgba(4,13,9,0.55)] !text-[9px]">
                    Dusk · canopy lighting
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-5">
              <p className="max-w-[52ch] text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.42)]">
                Reference visualisation of the Netso pergola system. Site geometry,
                structure and output are confirmed by survey.
              </p>
              <button
                type="button"
                onClick={() => setRevealed((value) => !value)}
                aria-expanded={revealed}
                className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-[var(--g-gold)] transition-opacity hover:opacity-80"
              >
                {revealed ? "Hide engineering notes" : "Read the engineering notes"}
                <ArrowRight
                  className={`h-3.5 w-3.5 transition-transform duration-500 ${
                    revealed ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>

            <div
              className={`grid gap-3 overflow-hidden px-2 transition-all duration-700 md:grid-cols-3 ${
                revealed ? "max-h-[640px] pb-2 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {BUILDING_FACTS.map((fact) => (
                <div
                  key={fact.k}
                  className="rounded-2xl border border-[rgba(255,250,240,0.08)] bg-[rgba(255,250,240,0.03)] p-5"
                >
                  <span className="g-label !text-[9px] text-[rgba(198,161,91,0.7)]">
                    {fact.k}
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-[#fffaf0]">
                    {fact.t}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                    {fact.d}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  ECONOMICS — the Beth Doctrine instrument                                  */
/* ========================================================================== */

const BILL_MIN = 5;
const BILL_MAX = 60;
const DISCOUNT = 0.3;

function lakh(value: number, digits = 1) {
  return `৳${value.toFixed(digits)} Lakh`;
}

/** 100 lakh = 1 crore. Used only for the long-horizon figure. */
function crore(lakhValue: number, digits = 1) {
  return `৳${(lakhValue / 100).toFixed(digits)} Cr`;
}

export function GlassEconomics({ onAssess }: { onAssess: () => void }) {
  const [billLakh, setBillLakh] = useState(18);
  const [hike, setHike] = useState(35);
  const instrumentRef = useRef<HTMLDivElement>(null);

  const savings = billLakh * DISCOUNT;
  const hedgedSaving = billLakh * (1 + hike / 100) - billLakh * (1 - DISCOUNT);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        instrumentRef.current,
        { y: 60, opacity: 0.4 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: instrumentRef.current,
            start: "top 88%",
            end: "top 45%",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="economics" className="g-section relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.14),transparent_65%)] blur-[90px]"
      />

      <div className="g-wrap relative">
        <SectionHead
          eyebrow="The Beth Doctrine"
          title={
            <>
              A discount that <em>floats</em>, not a rate that is quoted.
            </>
          }
          aside={
            <p className="g-body max-w-[42ch] lg:ml-auto">
              Netso prices power as a fixed percentage below whatever the grid charges,
              so the saving survives tariff changes in either direction. The percentage
              is the contract; the unit rate is never published.
            </p>
          }
        />

        <div ref={instrumentRef} className="mt-14">
          <Panel className="g-instrument" variant="gold">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              {/* controls */}
              <div>
                <span className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">
                  Your current monthly grid bill
                </span>

                <div className="mt-4 flex items-end gap-3">
                  <span className="g-num text-[clamp(2.6rem,5vw,3.6rem)] leading-none">
                    {lakh(billLakh, 0)}
                  </span>
                  <span className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.35)]">
                    per month
                  </span>
                </div>

                <label className="sr-only" htmlFor="bill-range">
                  Monthly grid bill in lakh taka
                </label>
                <input
                  id="bill-range"
                  type="range"
                  min={BILL_MIN}
                  max={BILL_MAX}
                  step={1}
                  value={billLakh}
                  onChange={(event) => setBillLakh(Number(event.target.value))}
                  className="g-slider mt-7"
                  style={
                    {
                      "--fill": `${((billLakh - BILL_MIN) / (BILL_MAX - BILL_MIN)) * 100}%`,
                    } as React.CSSProperties
                  }
                />

                <div className="mt-2.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.3)]">
                  <span>৳5 Lakh</span>
                  <span>৳60 Lakh</span>
                </div>

                <div className="mt-9">
                  <span className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">
                    Tariff stress test
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { label: "Flat", value: 0 },
                      { label: "+35% hike", value: 35 },
                      { label: "−10% softening", value: -10 },
                    ].map((scenario) => (
                      <button
                        key={scenario.label}
                        type="button"
                        onClick={() => setHike(scenario.value)}
                        aria-pressed={hike === scenario.value}
                        className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                          hike === scenario.value
                            ? "border-[rgba(198,161,91,0.6)] bg-[rgba(198,161,91,0.14)] text-[var(--g-gold-hi)]"
                            : "border-[rgba(255,250,240,0.12)] text-[rgba(255,250,240,0.5)] hover:border-[rgba(255,250,240,0.25)]"
                        }`}
                      >
                        {scenario.label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="mt-8 max-w-[46ch] text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.36)]">
                  Illustrative model only. It assumes a 30% floating discount against the
                  applicable grid tariff and does not include taxes, demand charges or
                  site-specific losses. Binding terms live in the executed PPA.
                </p>
              </div>

              {/* result */}
              <div className="flex flex-col justify-between gap-8 rounded-[20px] border border-[rgba(255,250,240,0.09)] bg-[rgba(4,13,9,0.42)] p-6">
                <div>
                  <span className="g-label !text-[9px] text-[rgba(255,250,240,0.45)]">
                    Modelled monthly saving
                  </span>
                  <p className="g-num mt-3 text-[clamp(2.4rem,4.4vw,3.2rem)] leading-none text-[var(--g-gold-hi)]">
                    {lakh(savings)}
                  </p>
                  <p className="mt-2 text-[12px] text-[rgba(255,250,240,0.42)]">
                    {hike === 0
                      ? "at today’s grid tariff"
                      : hike > 0
                        ? `if grid tariffs rise ${hike}% — the saving grows with them`
                        : `if grid tariffs soften ${Math.abs(hike)}% — the discount tracks down`}
                  </p>
                </div>

                <div className="space-y-3">
                  <Bar label="Grid bill today" value={1} tone="muted" />
                  <Bar
                    label="Netso contract"
                    value={1 - DISCOUNT}
                    tone="gold"
                  />
                  <Bar
                    label={`Grid at ${hike >= 0 ? "+" : ""}${hike}%`}
                    value={1 + hike / 100}
                    tone="outline"
                  />
                </div>

                <div className="border-t border-[rgba(255,250,240,0.08)] pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.4)]">
                      20-year exposure delta
                    </span>
                    <span className="g-num text-[19px] text-[#fffaf0]">
                      {crore(hedgedSaving * 12 * 20, 0)}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-[rgba(255,250,240,0.34)]">
                    Cumulative difference between the stressed grid bill and the Netso
                    contract, before escalation and discount-rate assumptions.
                  </p>
                </div>

                <GoldLink onClick={onAssess} className="w-full">
                  Run this against my facility
                  <ArrowUpRight className="h-4 w-4" />
                </GoldLink>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Bar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "muted" | "gold" | "outline";
}) {
  const width = Math.max(6, Math.min(100, value * 62));

  const fill =
    tone === "gold"
      ? "linear-gradient(90deg,#8a6b31,#c6a15b 58%,#f0d9a4)"
      : tone === "muted"
        ? "rgba(255,250,240,0.2)"
        : "transparent";

  return (
    <div>
      <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.38)]">
        <span>{label}</span>
        <span>{value.toFixed(2)}× bill</span>
      </div>
      <div className="mt-1.5 h-[6px] overflow-hidden rounded-full bg-[rgba(255,250,240,0.06)]">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ${
            tone === "outline" ? "border border-dashed border-[rgba(198,161,91,0.55)]" : ""
          }`}
          style={{ width: `${width}%`, background: fill }}
        />
      </div>
    </div>
  );
}


/* ========================================================================== */
/*  SCROLL PROGRESS                                                           */
/* ========================================================================== */

export function GlassProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: 0.4,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return <div ref={barRef} className="g-progress" aria-hidden="true" />;
}
