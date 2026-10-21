import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageHero } from "../components/glass/shell";
import { SunMark, type MarkVariant } from "../components/Wordmark";
import { useAssessModal } from "../hooks/useAssessModal";
import heroHouse from "../assets/hero-house.jpg";
import solarRoof from "../assets/solar-roof-dusk.jpg";
import inverters from "../assets/battery-wall.jpg";
import aerial from "../assets/neighborhood-aerial.jpg";
import panels from "../assets/panels-closeup.jpg";

const SECTIONS = [
  { id: "welcome", n: "00", t: "Welcome" },
  { id: "logo", n: "01", t: "Logo" },
  { id: "color", n: "02", t: "Colour" },
  { id: "typography", n: "03", t: "Typography" },
  { id: "voice", n: "04", t: "Voice" },
  { id: "photography", n: "05", t: "Photography" },
  { id: "motion", n: "06", t: "Motion" },
  { id: "components", n: "07", t: "Components" },
];

/* ------------------------------------------------------------------------- */
/*  Colour                                                                   */
/* ------------------------------------------------------------------------- */

type Token = {
  name: string;
  hex: string;
  varName: string;
  onDark: boolean;
  note: string;
  group: "surface" | "light" | "accent";
};

/**
 * The v3 palette. These are the literal values in styles/glass.css — the
 * page reads them as documentation, so a drift here is a documentation bug.
 */
const TOKENS: Token[] = [
  { name: "Void", hex: "#040D09", varName: "--g-void", onDark: true, note: "Below abyss. Form fields, inset wells, the deepest edge of the stack.", group: "surface" },
  { name: "Abyss", hex: "#071A13", varName: "--g-abyss", onDark: true, note: "The canvas. Every page begins here.", group: "surface" },
  { name: "Kelp", hex: "#0B2419", varName: "--g-kelp", onDark: true, note: "First lift. Alternate sections and quiet panes.", group: "surface" },
  { name: "Lift", hex: "#10301F", varName: "--g-lift", onDark: true, note: "Second lift. Hover states on deep panes.", group: "surface" },
  { name: "Lift 2", hex: "#163A27", varName: "--g-lift-2", onDark: true, note: "Third lift. Reserved — used sparingly for emphasis blocks.", group: "surface" },
  { name: "Parchment", hex: "#F6EFDF", varName: "--g-parchment", onDark: false, note: "Warm paper. Light panes and the classic-view canvas.", group: "light" },
  { name: "Cream", hex: "#FFFAF0", varName: "--g-cream", onDark: false, note: "Primary text on glass, and the lightest pane.", group: "light" },
  { name: "Gold", hex: "#C6A15B", varName: "--g-gold", onDark: false, note: "The single voltage. Actions, metrics, rules, focus rings.", group: "accent" },
  { name: "Gold high", hex: "#F0D9A4", varName: "--g-gold-hi", onDark: false, note: "Lit gold. Inline links and hover on gold text.", group: "accent" },
  { name: "Gold low", hex: "#8A6B31", varName: "--g-gold-lo", onDark: true, note: "Shade gold. Gradient stops, never text on dark.", group: "accent" },
  { name: "Sage", hex: "#93A89C", varName: "--g-sage", onDark: false, note: "Muted green-grey. Secondary metadata and captions.", group: "accent" },
];

const GROUP_LABEL = { surface: "Forest stack", light: "Light surfaces", accent: "Voltage" } as const;

function Swatch({ t }: { t: Token }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t.hex);
    } catch {
      /* clipboard unavailable — still flash the affordance */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${t.name} ${t.hex}`}
      className="group overflow-hidden rounded-xl border border-[rgba(255,250,240,0.1)] text-left transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative flex h-24 items-end justify-end p-2.5 md:h-28" style={{ backgroundColor: t.hex }}>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm transition-all ${
            t.onDark ? "bg-white/10 text-white/70" : "bg-black/10 text-black/60"
          } ${copied ? "scale-110" : "opacity-50 group-hover:opacity-100"}`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3 w-3" />}
        </span>
      </div>
      <div className="bg-[rgba(4,13,9,0.6)] px-3.5 py-3">
        <p className="font-sans text-[13px] font-medium text-[#fffaf0]">{t.name}</p>
        <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--g-gold-hi)]">
          {copied ? "Copied" : t.hex}
        </p>
        <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[rgba(255,250,240,0.3)]">
          {t.varName}
        </p>
        <p className="mt-2 font-sans text-[11.5px] leading-snug text-[rgba(255,250,240,0.45)]">{t.note}</p>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------------- */
/*  Typography                                                               */
/* ------------------------------------------------------------------------- */

const TYPE_ROWS = [
  {
    role: "Display",
    sample: "Your roof. Now an energy asset.",
    spec: "Archivo · variable width 78 · weight 520 · tracking −0.032em · leading 0.92",
    cls: "g-display text-[clamp(2rem,4.6vw,3.4rem)]",
  },
  {
    role: "Display accent",
    sample: "Working.",
    spec: "Instrument Serif italic · inherits display size · always gold · one phrase per heading",
    cls: "g-display text-[clamp(2rem,4.6vw,3.4rem)]",
  },
  {
    role: "Section head",
    sample: "Utility-scale power on industrial roofs",
    spec: "Archivo · 78 width · 520 · clamp(1.6rem, 3vw, 2.35rem)",
    cls: "g-display text-[clamp(1.5rem,2.6vw,2rem)]",
  },
  {
    role: "Body",
    sample:
      "Netso finances, builds, owns and operates distributed solar systems: bifacial hardware, metered telemetry, and a discount to the grid tariff set in the agreement.",
    spec: "General Sans · 400 · 15–15.5px · 1.7–1.78 leading · cream at 55–66%",
    cls: "max-w-[60ch] font-sans text-[15px] leading-[1.72] text-[rgba(255,250,240,0.6)]",
  },
  {
    role: "Label / data",
    sample: "[ CGS 80 kWp reference ] · 30% grid tariff basis · Class 0.2s bidirectional · SREDA NEM 2025",
    spec: "Space Mono · 9–10.5px · uppercase · 0.14–0.19em tracking · never for sentences",
    cls: "max-w-[62ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[rgba(255,250,240,0.45)]",
  },
];

/* ------------------------------------------------------------------------- */
/*  Voice                                                                    */
/* ------------------------------------------------------------------------- */

const TAGLINES = [
  { k: "Manifesto", v: "The sky is already working.", d: "The sun delivers irradiance continuously and for free. Netso builds the asset that harvests it. The line is about the resource, not about us." },
  { k: "Asset framing", v: "Your roof. Now an energy asset.", d: "The commercial proposition stated as a change of state: a non-performing slab becomes a metered revenue line." },
  { k: "Sign-off", v: "Power on.", d: "The executive close. Two words, no exclamation mark, no gradient." },
  { k: "Discipline", v: "Evidence over adjectives.", d: "Every claim on the site is a regulator's figure, a contract term, or a number we will defend in a credit committee. Modelled output is labelled modelled." },
];

const PRINCIPLES = [
  { n: "01", t: "Direct and grounded", d: "We write for industrial CFOs and plant engineers. Short sentences. No superlatives that a lender could strike out." },
  { n: "02", t: "Contractually precise", d: "Discounts are expressed as a percentage of the applicable grid tariff, because that is how the agreement is drafted. We do not quote a flat rate that a tariff change would invalidate." },
  { n: "03", t: "Institutional authority", d: "Calm, architectural, legally sound. Written to survive scrutiny from senior lenders, credit committees and international buyers." },
  { n: "04", t: "Engineering truth", d: "Wind load, module class and meter class are engineering facts we state plainly. Uptime and yield are outcomes of an individual site — so they are described per site, not as a headline." },
];

/* ------------------------------------------------------------------------- */
/*  Photography                                                              */
/* ------------------------------------------------------------------------- */

const PHOTOS = [
  { img: heroHouse, t: "Rooftops at dusk", d: "Industrial facilities in Chattogram, under-canopy LEDs glowing after golden hour." },
  { img: solarRoof, t: "Architectural pergolas", d: "Structural steel canopies that preserve roof usability while generating." },
  { img: inverters, t: "Telemetry hardware", d: "Utility-grade string inverters with bidirectional metering." },
  { img: aerial, t: "The distributed grid", d: "Industrial corridors in Gazipur and Narayanganj read as localised micro-utilities." },
  { img: panels, t: "Bifacial architecture", d: "Dual-glass cells capturing sky irradiance and rooftop albedo reflection." },
];

/* ------------------------------------------------------------------------- */
/*  Motion                                                                   */
/* ------------------------------------------------------------------------- */

const MOTION = [
  { k: "Reveal", v: "26px lift · 6px blur → 0 · 900ms · cubic-bezier(.22,1,.36,1)", d: "The only entrance. It happens once per element, on first intersection, and never repeats on scroll-back." },
  { k: "Stagger", v: "70ms between siblings", d: "Enough to read as a sequence, short enough that the last card is not waiting a second for its turn." },
  { k: "Hover", v: "180–240ms · transform only", d: "Panes lift 2px and gold sweeps the sheen. No colour flashing, no shadow inflation." },
  { k: "Reduced motion", v: "prefers-reduced-motion: reduce", d: "Every transform, blur and stagger collapses to none. Content is fully present without motion — motion is never the delivery mechanism." },
];

const LOGO_TILES: { bg: string; variant: MarkVariant; label: string; dark: boolean }[] = [
  { bg: "#071A13", variant: "yellow", label: "Yellow on Abyss — canonical", dark: true },
  { bg: "#111111", variant: "yellow", label: "Yellow on Ink", dark: true },
  { bg: "#1D3E86", variant: "yellow", label: "Yellow on Royal", dark: true },
  { bg: "#FFFFFF", variant: "ink", label: "Ink on White", dark: false },
  { bg: "#FFF7E9", variant: "ink", label: "Ink on Cream", dark: false },
  { bg: "#FCCC3C", variant: "ink", label: "Ink on Yellow", dark: false },
  { bg: "#DACAB6", variant: "ink", label: "Ink on Sand", dark: false },
  { bg: "#F6EFDF", variant: "ink", label: "Ink on Parchment", dark: false },
];

/* ------------------------------------------------------------------------- */

function SectionHead({ n, t, note }: { n: string; t: string; note: string }) {
  return (
    <div className="grid gap-3 border-b border-[rgba(255,250,240,0.12)] pb-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
      <div>
        <p className="g-label">
          <span className="text-[rgba(198,161,91,0.65)]">{n}</span> {t}
        </p>
        <h2 className="g-display mt-3 text-[clamp(1.5rem,2.8vw,2.1rem)]">{t}</h2>
      </div>
      <p className="max-w-[56ch] font-sans text-[13px] leading-relaxed text-[rgba(255,250,240,0.45)]">{note}</p>
    </div>
  );
}

export default function Brand() {
  const [active, setActive] = useState("welcome");
  const assess = useAssessModal();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <GlassShell {...assess}>
      <PageHero
        eyebrow="Brand system · v3"
        title={
          <>
            Forest glass, gold <em>light.</em>
          </>
        }
        lede="The working specification for Netso's visual and verbal identity: a deep-forest surface stack where depth is water rather than shadow, a single rationed voltage, and a voice that leads with evidence. This page documents the system the site actually runs on."
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              v3 · October 2026
            </span>
            <span className="g-chip">Archivo · Instrument Serif · Space Mono</span>
            <span className="g-chip">{TOKENS.length} colour tokens</span>
          </>
        }
      />

      <div className="g-wrap py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-14">
          {/* Contents rail */}
          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-28">
              <p className="g-label">Contents</p>
              <nav aria-label="Brand sections" className="mt-4">
                <ul>
                  {SECTIONS.map((s) => {
                    const on = active === s.id;
                    return (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="group flex items-baseline gap-2.5 border-l pl-3 py-1.5 transition-colors"
                          style={{
                            borderColor: on ? "var(--g-gold)" : "rgba(255,250,240,0.1)",
                          }}
                        >
                          <span
                            className="font-mono text-[9.5px] tracking-[0.1em]"
                            style={{ color: on ? "var(--g-gold)" : "rgba(255,250,240,0.3)" }}
                          >
                            {s.n}
                          </span>
                          <span
                            className="font-sans text-[12.5px] transition-colors"
                            style={{ color: on ? "#fffaf0" : "rgba(255,250,240,0.45)" }}
                          >
                            {s.t}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="space-y-16 md:space-y-24">
            {/* 00 — Welcome */}
            <section id="welcome" className="scroll-mt-24">
              <SectionHead
                n="00"
                t="Welcome"
                note="What the system is for, and the three rules that decide any ambiguous call."
              />

              <Reveal>
                <Panel className="mt-6 px-6 py-8 md:px-10 md:py-10">
                  <p className="g-display max-w-[24ch] text-[clamp(1.5rem,3vw,2.2rem)]">
                    Depth is water, not <em>shadow.</em>
                  </p>
                  <p className="mt-5 max-w-[68ch] font-sans text-[14.5px] leading-[1.72] text-[rgba(255,250,240,0.62)]">
                    Netso sells twenty-year infrastructure to people who will read the contract.
                    The interface should feel like the asset: engineered, cool, lit from within, and
                    quiet under pressure. Glass is not a decoration here — it is the metaphor. A
                    pane of glass is transparent about what is behind it.
                  </p>

                  <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-[rgba(255,250,240,0.09)] bg-[rgba(255,250,240,0.09)] sm:grid-cols-3">
                    {[
                      { h: "No drop shadows", b: "Depth comes from a surface shifting half a tone and a 1px specular edge. A shadow implies a light source that does not exist." },
                      { h: "One voltage", b: "Gold is light, never paint. It marks action, metric and rule — nothing else competes for it." },
                      { h: "If in doubt, remove", b: "The system fails toward restraint. A pane that needs three effects to read is a pane that has not been designed." },
                    ].map((r) => (
                      <div key={r.h} className="bg-[rgba(4,13,9,0.5)] px-4 py-4">
                        <p className="font-sans text-[13px] font-medium text-[#fffaf0]">{r.h}</p>
                        <p className="mt-1.5 font-sans text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.45)]">
                          {r.b}
                        </p>
                      </div>
                    ))}
                  </div>
                </Panel>
              </Reveal>
            </section>

            {/* 01 — Logo */}
            <section id="logo" className="scroll-mt-24">
              <SectionHead
                n="01"
                t="Logo"
                note="The sun mark carries the colour; the wordmark carries the name. They are placed, never locked into new shapes."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {LOGO_TILES.map((tile, i) => (
                  <Reveal key={tile.label} delay={i * 0.04}>
                    <div
                      className="flex aspect-[4/3] items-center justify-center rounded-xl border border-[rgba(255,250,240,0.1)]"
                      style={{ backgroundColor: tile.bg }}
                    >
                      <SunMark variant={tile.variant} className="h-9" />
                      <span
                        className="ml-2 font-sans text-[15px] font-semibold tracking-tight"
                        style={{ color: tile.dark ? "#FFF7E9" : "#111111" }}
                      >
                        NETSO<span className="align-super text-[9px]">°</span>ENERGY
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-[rgba(255,250,240,0.34)]">
                      {tile.label}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.08}>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Panel className="px-5 py-5" variant="quiet" sheen={false}>
                    <p className="g-label !text-[9px] text-[var(--g-gold-hi)]">Clear space</p>
                    <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.5)]">
                      Minimum clear space equals the height of the sun mark on all sides. Never
                      place the mark on a mid-tone photograph without a scrim.
                    </p>
                  </Panel>
                  <Panel className="px-5 py-5" variant="quiet" sheen={false}>
                    <p className="g-label !text-[9px] text-[var(--g-gold-hi)]">Never</p>
                    <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.5)]">
                      No recolouring the mark outside the three supplied variants, no outlines, no
                      gradients, no rotation, no enclosing badges.
                    </p>
                  </Panel>
                </div>
              </Reveal>
            </section>

            {/* 02 — Colour */}
            <section id="color" className="scroll-mt-24">
              <SectionHead
                n="02"
                t="Colour"
                note="Click any swatch to copy its hex. Every step of the forest stack is a half-tone — adjacent surfaces are 3–6% apart, which is what produces glass depth without borders."
              />

              {(["surface", "light", "accent"] as const).map((g) => (
                <div key={g} className="mt-7">
                  <p className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.32)]">
                    {GROUP_LABEL[g]}
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                    {TOKENS.filter((t) => t.group === g).map((t, i) => (
                      <Reveal key={t.varName} delay={i * 0.03}>
                        <Swatch t={t} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}

              <Reveal>
                <p className="mt-6 max-w-[70ch] font-sans text-[12px] leading-relaxed text-[rgba(255,250,240,0.38)]">
                  The warm cream, ink, beige and sand tones documented in earlier revisions of
                  this page remain in the classic stylesheet and still render at{" "}
                  <span className="font-mono text-[11px] text-[rgba(255,250,240,0.6)]">/classic</span>.
                  They are legacy, not canonical — new work uses the forest stack above.
                </p>
              </Reveal>
            </section>

            {/* 03 — Typography */}
            <section id="typography" className="scroll-mt-24">
              <SectionHead
                n="03"
                t="Typography"
                note="Three families, strict roles. Archivo carries the display voice, Instrument Serif italic supplies exactly one accent phrase, Space Mono is data, never prose."
              />

              <div className="mt-6 space-y-2">
                {TYPE_ROWS.map((row, i) => (
                  <Reveal key={row.role} delay={i * 0.04}>
                    <Panel className="px-5 py-6 md:px-8 md:py-7" sheen={false}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--g-gold-hi)]">
                          {row.role}
                        </p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[rgba(255,250,240,0.28)]">
                          {row.spec}
                        </p>
                      </div>
                      <p className={`mt-4 ${row.cls}`}>
                        {row.role === "Display accent" ? <em>{row.sample}</em> : row.sample}
                      </p>
                    </Panel>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* 04 — Voice */}
            <section id="voice" className="scroll-mt-24">
              <SectionHead
                n="04"
                t="Voice"
                note="How Netso speaks: what we say, and the four rules that decide whether a sentence ships."
              />

              <div className="mt-6 grid gap-2.5 md:grid-cols-2">
                {TAGLINES.map((tag, i) => (
                  <Reveal key={tag.k} delay={i * 0.04}>
                    <Panel className="flex h-full flex-col px-5 py-5" variant="quiet" sheen={false}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.32)]">
                        {tag.k}
                      </p>
                      <p className="g-display mt-2.5 text-[20px] leading-[1.1]">{tag.v}</p>
                      <p className="mt-2 font-sans text-[12px] leading-relaxed text-[rgba(255,250,240,0.45)]">
                        {tag.d}
                      </p>
                    </Panel>
                  </Reveal>
                ))}
              </div>

              <div className="mt-3 space-y-2">
                {PRINCIPLES.map((p, i) => (
                  <Reveal key={p.n} delay={i * 0.04}>
                    <div className="grid gap-2 border-b border-[rgba(255,250,240,0.08)] py-4 md:grid-cols-[52px_minmax(0,0.8fr)_minmax(0,1.6fr)] md:items-baseline md:gap-6">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-[rgba(198,161,91,0.7)]">
                        {p.n}
                      </span>
                      <h3 className="font-sans text-[14.5px] font-medium text-[#fffaf0]">{p.t}</h3>
                      <p className="max-w-[64ch] font-sans text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.5)]">
                        {p.d}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* 05 — Photography */}
            <section id="photography" className="scroll-mt-24">
              <SectionHead
                n="05"
                t="Photography"
                note="Real roofs, real light, no stock optimism. Photograph the asset at the hour it is most honest — dawn and dusk."
              />

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {PHOTOS.map((p, i) => (
                  <Reveal key={p.t} delay={i * 0.04}>
                    <figure className="group overflow-hidden rounded-xl border border-[rgba(255,250,240,0.1)]">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={p.img}
                          alt={p.t}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,13,9,0.7),transparent_55%)]"
                        />
                      </div>
                      <figcaption className="bg-[rgba(4,13,9,0.5)] px-3.5 py-3">
                        <p className="font-sans text-[12.5px] font-medium text-[#fffaf0]">{p.t}</p>
                        <p className="mt-1 font-sans text-[11px] leading-relaxed text-[rgba(255,250,240,0.42)]">
                          {p.d}
                        </p>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* 06 — Motion */}
            <section id="motion" className="scroll-mt-24">
              <SectionHead
                n="06"
                t="Motion"
                note="Motion reveals; it never performs. Every rule below collapses to nothing under prefers-reduced-motion."
              />

              <div className="mt-6 grid gap-2.5 md:grid-cols-2">
                {MOTION.map((m, i) => (
                  <Reveal key={m.k} delay={i * 0.04}>
                    <Panel className="h-full px-5 py-5" variant="quiet" sheen={false}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--g-gold-hi)]">
                        {m.k}
                      </p>
                      <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-[rgba(255,250,240,0.7)]">
                        {m.v}
                      </p>
                      <p className="mt-2.5 font-sans text-[12px] leading-relaxed text-[rgba(255,250,240,0.45)]">
                        {m.d}
                      </p>
                    </Panel>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* 07 — Components */}
            <section id="components" className="scroll-mt-24">
              <SectionHead
                n="07"
                t="Components"
                note="The primitives every page is built from. If a page needs a new one, it is added here first."
              />

              <div className="mt-6 space-y-3">
                <Reveal>
                  <Panel className="px-5 py-6 md:px-8">
                    <p className="g-label !text-[9px] text-[rgba(255,250,240,0.4)]">Buttons</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button type="button" className="g-btn" onClick={assess.onAssess}>
                        Request an assessment
                      </button>
                      <button type="button" className="g-btn g-btn--ghost">
                        Secondary action
                      </button>
                      <button type="button" className="g-btn g-btn--sm">
                        Compact
                      </button>
                    </div>
                    <p className="mt-4 max-w-[62ch] font-sans text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.4)]">
                      Gold fill is the page&rsquo;s single primary action. Everything else is a ghost
                      button — a glass pane with a lit hairline. Never two gold buttons side by side.
                    </p>
                  </Panel>
                </Reveal>

                <Reveal delay={0.04}>
                  <Panel className="px-5 py-6 md:px-8">
                    <p className="g-label !text-[9px] text-[rgba(255,250,240,0.4)]">Chips &amp; labels</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="g-chip">
                        <span className="g-dot" aria-hidden="true" />
                        Live indicator
                      </span>
                      <span className="g-chip">SREDA NEM 2025</span>
                      <span className="g-chip border-[rgba(198,161,91,0.42)] text-[var(--g-gold-hi)]">
                        Settled
                      </span>
                      <span className="g-chip border-[rgba(255,250,240,0.18)]">Under appraisal</span>
                    </div>
                    <p className="mt-4 max-w-[62ch] font-sans text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.4)]">
                      Pills are metadata only: status, class, date, category. Gold-bordered chips mark
                      something concluded; neutral chips mark something conditional. That distinction is
                      load-bearing — it is how a pending filing stays visibly pending.
                    </p>
                  </Panel>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="grid gap-2.5 md:grid-cols-2">
                    {(
                      [
                        ["default", "Default pane"],
                        ["quiet", "Quiet pane"],
                        ["deep", "Deep pane"],
                        ["light", "Light pane"],
                      ] as const
                    ).map(([variant, label]) => (
                      <Panel key={variant} variant={variant} className="px-5 py-6">
                        <p
                          className={`g-label !text-[9px] ${
                            variant === "light" ? "text-[rgba(4,13,9,0.5)]" : "text-[rgba(255,250,240,0.4)]"
                          }`}
                        >
                          {variant}
                        </p>
                        <p
                          className={`mt-2 font-sans text-[12px] leading-relaxed ${
                            variant === "light" ? "text-[rgba(4,13,9,0.62)]" : "text-[rgba(255,250,240,0.45)]"
                          }`}
                        >
                          {label} — top-lighter fill, 1px inner specular, gold sweep on pointer.
                        </p>
                      </Panel>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <Panel className="px-5 py-6 md:px-8">
                    <p className="g-label !text-[9px] text-[rgba(255,250,240,0.4)]">Shape &amp; rhythm</p>
                    <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {[
                        ["Radii", "6 small · 12 controls · 16 cards · 22 large · 30 hero · 999 pill"],
                        ["Canvas", "1320px max width · gutter clamp(20px, 4.2vw, 56px)"],
                        ["Section rhythm", "clamp(88px, 11vw, 168px) — tight halves it"],
                        ["Grid gap", "clamp(14px, 1.6vw, 22px)"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[rgba(255,250,240,0.07)] py-1.5">
                          <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.32)]">
                            {k}
                          </dt>
                          <dd className="font-sans text-[11.5px] text-[rgba(255,250,240,0.6)]">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </Panel>
                </Reveal>
              </div>
            </section>
          </div>
        </div>
      </div>
    </GlassShell>
  );
}
