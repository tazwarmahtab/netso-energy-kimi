import { useEffect, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FeasibilityModal from "../components/FeasibilityModal";
import { FadeUp, Words } from "../components/Reveal";
import { SunMark, type MarkVariant } from "../components/Wordmark";
import heroHouse from "../assets/hero-house.jpg";
import solarRoof from "../assets/solar-roof-dusk.jpg";
import inverters from "../assets/battery-wall.jpg";
import aerial from "../assets/neighborhood-aerial.jpg";
import panels from "../assets/panels-closeup.jpg";

const SECTIONS = [
  { id: "welcome", n: "00", t: "Welcome" },
  { id: "logo", n: "01", t: "Logo" },
  { id: "color", n: "02", t: "Color" },
  { id: "typography", n: "03", t: "Typography" },
  { id: "voice", n: "04", t: "Voice" },
  { id: "photography", n: "05", t: "Photography" },
  { id: "motion", n: "06", t: "Motion" },
  { id: "components", n: "07", t: "Components" },
];

const MOMENTS = [
  { t: "Dawn", g: "linear-gradient(160deg,#321F61 0%,#C880FF 55%,#FCCC3C 100%)" },
  { t: "Day", g: "linear-gradient(160deg,#1D3E86 0%,#8ED5FF 60%,#FFF7E9 100%)" },
  { t: "Dusk", g: "linear-gradient(160deg,#08140F 0%,#C6A15B 55%,#FCCC3C 100%)" },
  { t: "Night", g: "linear-gradient(160deg,#08140F 0%,#111111 60%,#1C1C1C 100%)" },
];

const COLORS = [
  { name: "Netso Gold", hex: "#C6A15B", ink: true, note: "Primary action & metric signal. The CGS benchmark, institutional certainty." },
  { name: "Deep Forest", hex: "#08140F", ink: false, note: "The utility foundation. Deep glass, industrial authority, grounding." },
  { name: "Cream", hex: "#FFF7E9", ink: true, note: "The page. Warm architectural paper." },
  { name: "Netso Yellow", hex: "#FCCC3C", ink: true, note: "The energy signal. Telemetry, irradiance highlights, the sun mark." },
  { name: "Ink", hex: "#111111", ink: false, note: "Authority, primary text, high-contrast headings." },
  { name: "Beige", hex: "#F0E5CF", ink: true, note: "Quiet structural surfaces, card backgrounds, and dividers." },
  { name: "Sand", hex: "#DACAB6", ink: true, note: "Photography overlays and muted architectural containers." },
  { name: "Taupe", hex: "#A09B93", ink: false, note: "Captions, legal metadata, and secondary telemetry." },
  { name: "Sky", hex: "#8ED5FF", ink: true, note: "Secondary electrical indicator. SREDA net-metering grid sync." },
  { name: "Royal", hex: "#1D3E86", ink: false, note: "Technical SCADA depth. High-voltage utility telemetry." },
  { name: "Parchment", hex: "#F8F3EA", ink: true, note: "Elevated card substrates and interactive panels." },
  { name: "Charcoal", hex: "#1E1E1E", ink: false, note: "Structural steel and anodized pergola framing." },
];

function Swatch({ c }: { c: (typeof COLORS)[number] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.hex);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <button
      onClick={copy}
      className="group overflow-hidden rounded-2xl border border-ink/10 text-left transition-transform duration-300 hover:-translate-y-1"
      aria-label={`Copy ${c.name} ${c.hex}`}
    >
      <div
        className="relative flex h-28 items-end justify-end p-3 md:h-32"
        style={{ backgroundColor: c.hex }}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
            c.ink ? "bg-ink/10 text-ink" : "bg-cream/15 text-cream"
          } ${copied ? "scale-110" : "opacity-60 group-hover:opacity-100"}`}
        >
          {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-3.5 w-3.5" />}
        </span>
      </div>
      <div className="bg-cream p-4">
        <p className="text-[14.5px] font-semibold text-ink">{c.name}</p>
        <p className="mt-0.5 font-mono text-[12.5px] font-bold uppercase text-gold">{copied ? "Copied!" : c.hex}</p>
        <p className="mt-1.5 text-[12.5px] leading-snug text-ink/55">{c.note}</p>
      </div>
    </button>
  );
}

const TYPE_ROWS = [
  {
    role: "Hero / Display",
    sample: "Your roof. Now an energy asset.",
    spec: "Feature Deck · 64–96px · 400 · 95% LH · -2% LS · Restrained institutional tone",
    cls: "font-display text-5xl md:text-7xl text-forest",
    accent: "text-gold",
    accentFrom: 2,
  },
  {
    role: "Section Heading",
    sample: "Utility-scale power on industrial roofs",
    spec: "Feature Deck · 40–56px · 400 · 95% LH · -2% LS",
    cls: "font-display text-4xl md:text-5xl text-forest",
    accent: "",
    accentFrom: 0,
  },
  {
    role: "Title",
    sample: "Take-or-pay kilowatt-hours below grid peak",
    spec: "General Sans Medium · 24–32px · 500 · 116% LH · -1% LS",
    cls: "text-2xl font-medium md:text-[2rem] text-forest",
    accent: "",
    accentFrom: 0,
  },
  {
    role: "Body / Subtitles",
    sample:
      "Netso finances, builds, owns and operates distributed solar systems: high-yield bifacial hardware, real-time SCADA telemetry, and non-recourse senior debt capital.",
    spec: "General Sans Regular · 15–17px · 400 · 140% LH · -1% LS",
    cls: "max-w-xl text-[16px] leading-[1.5] text-ink/75",
    accent: "",
    accentFrom: 0,
  },
  {
    role: "Labels / Mono / Data",
    sample: "[ CGS 80kWp Reference ] · 30% Grid Tariff Discount · Class 0.2s Bidirectional · SREDA NEM 2025",
    spec: "Space Mono · 12px or 14px only · 400 · 135% LH · 4% LS · Uppercase only when contextual",
    cls: "font-mono text-[12px] uppercase tracking-[0.1em] text-forest font-medium",
    accent: "",
    accentFrom: 0,
  },
];

const TAGLINES = [
  { k: "Primary", v: "The Sky Is Already Working.", d: "The core manifesto. The sun generates irradiance continuously — Netso builds the asset infrastructure to harvest it." },
  { k: "Asset framing", v: "Your roof. Now an energy asset.", d: "The core commercial proposition: converting non-performing factory roof slabs into long-term cash flow and tariff reduction." },
  { k: "Product", v: "Solar as a Service (RESCO / BOO)", d: "The customer model: ৳0 customer CAPEX, 20-year take-or-pay PPA with 30% guaranteed savings vs grid peak, full turnkey utility operation included." },
  { k: "Institutional sign-off", v: "Power on", d: "The executive sign-off. Grounded, determined, forward-moving." },
  { k: "Discipline", v: "Evidence over adjectives", d: "Every commercial claim distinguishes audited fact from estimate. Zero phantom savings, zero killed tariff numbers." },
];

const PRINCIPLES = [
  { n: "01", t: "Direct & Grounded", d: "We write for C-suite industrial executives and plant engineers. Short sentences, bankable numbers, zero marketing fluff." },
  { n: "02", t: "Contractually Precise", d: "All figures cite exact benchmarks: 30% guaranteed grid discount, ৳15.36 BERC peak tariff, 80% IDCOL debt, 1.25× DSCR." },
  { n: "03", t: "Institutional Authority", d: "Calm, architectural, and legally sound. Designed to withstand scrutiny from senior lenders, credit committees, and international buyers." },
  { n: "04", t: "Engineering Truth", d: "Dual-glass bifacial TOPCon modules, certified 160 km/h wind load pergolas, and Class 0.2s utility meters with daily billing settlement." },
];

const PHOTOS = [
  { img: heroHouse, t: "Rooftops at dusk", d: "Industrial facilities in Chattogram, under-canopy LEDs glowing softly after golden hour." },
  { img: solarRoof, t: "Architectural Pergolas", d: "Structural steel canopies that preserve 100% roof usability while generating clean energy." },
  { img: inverters, t: "Telemetry Hardware", d: "Utility-grade string inverters with Class 0.2s bidirectional metering." },
  { img: aerial, t: "The Distributed Grid", d: "Industrial corridors in Gazipur and Narayanganj transforming into localized micro-utilities." },
  { img: panels, t: "Bifacial Architecture", d: "Dual-glass TOPCon cells capturing direct sky irradiance and rooftop albedo reflection." },
];

const LOGO_TILES: { bg: string; variant: MarkVariant; label: string }[] = [
  { bg: "#08140F", variant: "yellow", label: "Yellow on Deep Forest — canonical" },
  { bg: "#111111", variant: "yellow", label: "Yellow on Ink" },
  { bg: "#FFFFFF", variant: "ink", label: "Ink on White" },
  { bg: "#FFF7E9", variant: "ink", label: "Ink on Cream" },
  { bg: "#FCCC3C", variant: "ink", label: "Ink on Yellow" },
  { bg: "#08140F", variant: "cream", label: "Cream on Deep Forest" },
  { bg: "#DACAB6", variant: "ink", label: "Ink on Sand" },
  { bg: "#1D3E86", variant: "yellow", label: "Yellow on Royal Technical" },
];

export default function Brand() {
  const [active, setActive] = useState("welcome");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-cream text-ink">
      <Nav theme="light" onOpenAssessment={() => setIsModalOpen(true)} />
      <main id="content" className="mx-auto max-w-[1440px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-ink/10 pb-12">
          <div>
            <FadeUp>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Design System & Brand Standards</p>
            </FadeUp>
            <h1 className="font-display mt-4 text-5xl text-forest md:text-7xl">
              <Words text="This is Netso" accent={1} />
            </h1>
            <FadeUp delay={0.15}>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
                The institutional identity of Bangladesh's C&I rooftop solar utility. Engineered for boardrooms,
                senior lenders, industrial factory owners, and top-tier EPC contractors.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-forest shadow-md transition-transform hover:scale-[1.03]"
            >
              Assess Facility Feasibility
            </button>
            <span className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-ink/20 px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5">
              <Download className="h-4 w-4" /> Brand Assets
            </span>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
          {/* Sticky section nav */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1.5" aria-label="Brand sections">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group flex items-baseline gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
                    active === s.id
                      ? "bg-forest text-warm font-semibold shadow-sm"
                      : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <span className={`font-mono text-xs ${active === s.id ? "text-gold" : "text-ink/40"}`}>
                    {s.n}
                  </span>
                  <span className="text-sm">{s.t}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="min-w-0 space-y-28 md:space-y-36">
            {/* 00 Welcome */}
            <section id="welcome" className="scroll-mt-28">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">00 — Welcome</p>
                <h2 className="font-display mt-4 text-3xl sm:text-5xl text-forest">
                  Energy infrastructure that reads like a utility
                </h2>
                <div className="mt-6 space-y-4 max-w-3xl text-[16px] leading-relaxed text-ink/75">
                  <p>
                    Netso does not market residential gadgets or consumer novelty. We build 20-year infrastructure
                    assets for heavy textile mills, garment exporters, and manufacturing facilities across Bangladesh.
                  </p>
                  <p>
                    Our visual and verbal system reflects that mandate: institutional authority, architectural quietude,
                    contractual precision, and mathematical honesty.
                  </p>
                </div>
              </FadeUp>
            </section>

            {/* 01 Logo */}
            <section id="logo" className="scroll-mt-28">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">01 — The Mark</p>
                <h2 className="font-display mt-4 text-3xl sm:text-5xl text-forest">The Netso Sun Mark</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
                  A high-precision geometric radiating mark symbolizing equatorial solar irradiance, architectural
                  steel pergola symmetry, and continuous energy transmission.
                </p>
              </FadeUp>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {LOGO_TILES.map((t) => (
                  <FadeUp key={t.label}>
                    <div
                      className="flex h-36 flex-col items-center justify-center rounded-2xl border border-ink/10 p-4 transition-transform hover:-translate-y-1"
                      style={{ backgroundColor: t.bg }}
                    >
                      <SunMark variant={t.variant} className="h-10 w-10" />
                      <span className="font-mono mt-3 text-[10px] text-center text-ink/50 leading-tight">
                        {t.label}
                      </span>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* 02 Color */}
            <section id="color" className="scroll-mt-28">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">02 — Color Palette</p>
                <h2 className="font-display mt-4 text-3xl sm:text-5xl text-forest">
                  Anchored in Netso Gold & Deep Utility Forest
                </h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
                  Tap any swatch to copy its hex value. Netso Gold highlights key financial metrics; Deep Forest
                  provides utility gravity; Netso Yellow indicates live telemetry; Cream provides an editorial paper ground.
                </p>
              </FadeUp>
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {COLORS.map((c) => (
                  <FadeUp key={c.hex}>
                    <Swatch c={c} />
                  </FadeUp>
                ))}
              </div>

              <div className="mt-12 border-t border-ink/10 pt-8">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60 mb-4">
                  Diurnal Light Gradients · Sun Path Solar Palettes
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {MOMENTS.map((m) => (
                    <FadeUp key={m.t}>
                      <div className="rounded-2xl border border-ink/10 p-3 bg-parchment">
                        <div className="h-16 w-full rounded-xl shadow-inner" style={{ background: m.g }} />
                        <span className="font-mono text-xs font-semibold text-forest mt-3 block">{m.t}</span>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </section>

            {/* 03 Typography */}
            <section id="typography" className="scroll-mt-28">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">03 — Typography</p>
                <h2 className="font-display mt-4 text-3xl sm:text-5xl text-forest">Three Typefaces, Three Strict Disciplines</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
                  Archivo Condensed Grotesque for monumental statements, General Sans for high-legibility legal and
                  technical copy, and Space Mono for tabular telemetry and contract constants.
                </p>
              </FadeUp>
              <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {TYPE_ROWS.map((r, i) => (
                  <FadeUp key={r.role} delay={i * 0.05}>
                    <div className="grid gap-4 py-8 md:grid-cols-[200px_1fr] md:gap-10">
                      <div>
                        <p className="font-mono text-xs font-semibold uppercase text-gold">{r.role}</p>
                        <p className="mt-2 max-w-[200px] font-mono text-[11px] leading-relaxed text-ink/50">{r.spec}</p>
                      </div>
                      <p className={r.cls}>
                        {r.accentFrom > 0 ? (
                          <>
                            {r.sample.split(" ").slice(0, -r.accentFrom).join(" ")}{" "}
                            <span className={r.accent}>{r.sample.split(" ").slice(-r.accentFrom).join(" ")}</span>
                          </>
                        ) : (
                          r.sample
                        )}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* 04 Voice & Tone */}
            <section id="voice" className="scroll-mt-28">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">04 — Verbal Architecture</p>
                <h2 className="font-display mt-4 text-3xl sm:text-5xl text-forest">Evidenced, Calm, Institutional</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
                  Netso speaks with the authority of an asset owner. We never speak in generic green platitudes; we speak
                  in tariffs, coverage ratios, bankable covenants, and audited kilowatt-hours.
                </p>
              </FadeUp>
              <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {TAGLINES.map((t, i) => (
                  <FadeUp key={t.k} delay={i * 0.04}>
                    <div className="grid items-baseline gap-2 py-6 md:grid-cols-[160px_1.2fr_1.5fr] md:gap-8">
                      <span className="font-mono text-xs font-semibold uppercase text-gold">{t.k}</span>
                      <span className="font-display text-2xl text-forest md:text-3xl">{t.v}</span>
                      <span className="text-sm leading-relaxed text-ink/65">{t.d}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {PRINCIPLES.map((p, i) => (
                  <FadeUp key={p.n} delay={i * 0.06}>
                    <div className="h-full rounded-2xl border border-ink/10 bg-parchment p-6">
                      <p className="font-mono text-xs font-bold text-gold">{p.n} /</p>
                      <h3 className="font-display mt-3 text-xl text-forest">{p.t}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-ink/65">{p.d}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* 05 Photography */}
            <section id="photography" className="scroll-mt-28">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">05 — Photography</p>
                <h2 className="font-display mt-4 text-3xl sm:text-5xl text-forest">Authentic Industrial Reality</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
                  Captured across real factory rooftops in Bangladesh. Golden hour sun on dual-glass TOPCon bifacial modules,
                  heavy structural steel pergola joints, and digital Class 0.2s utility meters.
                </p>
              </FadeUp>
              <div className="mt-10 columns-1 gap-4 sm:columns-2 xl:columns-3 [&>*]:mb-4">
                {PHOTOS.map((p, i) => (
                  <FadeUp key={p.t} delay={i * 0.05} className="break-inside-avoid">
                    <figure className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream">
                      <img
                        src={p.img}
                        alt={p.d}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <figcaption className="p-4 bg-cream">
                        <span className="font-display text-base font-semibold text-forest">{p.t}</span>
                        <p className="mt-1 text-xs leading-relaxed text-ink/60">{p.d}</p>
                      </figcaption>
                    </figure>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* 06 Motion */}
            <section id="motion" className="scroll-mt-28">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">06 — Motion & Physics</p>
                <h2 className="font-display mt-4 text-3xl sm:text-5xl text-forest">Natural Solar Kinematics</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
                  Editorial at rest, cinematic when navigated. Every animation mimics the slow, certain arc of the sun:
                  fluid spring settling, zero abrupt pop-ups, and smooth scrubbed WebGL canvas scrubbers.
                </p>
              </FadeUp>
              <FadeUp className="mt-10 overflow-hidden rounded-3xl bg-forest p-8 text-warm md:p-12 border border-warm/15">
                <p className="font-mono text-xs uppercase tracking-wider text-gold">Live Specimen — Smooth Spring Settling</p>
                <p className="font-display mt-6 text-3xl sm:text-5xl text-warm">
                  <Words text="Every kilowatt-hour arrives in its own time" accent={3} once={false} />
                </p>
                <div className="mt-10 grid gap-4 border-t border-warm/15 pt-6 sm:grid-cols-3">
                  {[
                    { k: "Kinematic Easing", v: "cubic-bezier(0.16, 1, 0.3, 1)" },
                    { k: "Headline Stagger", v: "55ms sequential reveal" },
                    { k: "Spring Dampening", v: "Mass 1.0 · Stiffness 120 · Damping 14" },
                  ].map((s) => (
                    <div key={s.k}>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-warm/40">{s.k}</p>
                      <p className="mt-1 font-mono text-xs font-bold text-gold">{s.v}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </section>

            {/* 07 Components */}
            <section id="components" className="scroll-mt-28">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">07 — UI Primitives</p>
                <h2 className="font-display mt-4 text-3xl sm:text-5xl text-forest">Institutional Component Library</h2>
              </FadeUp>
              <FadeUp className="mt-10 space-y-10 rounded-3xl border border-ink/10 bg-parchment p-8 md:p-12">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/50 mb-4">Button Variants</p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex h-12 items-center rounded-full bg-gold px-7 text-sm font-semibold text-forest shadow-md transition-transform hover:scale-[1.02]"
                    >
                      Assess Facility Feasibility
                    </button>
                    <span className="inline-flex h-12 cursor-pointer items-center rounded-full bg-forest px-7 text-sm font-semibold text-warm">
                      CGS 80kWp Reference
                    </span>
                    <span className="inline-flex h-12 cursor-pointer items-center rounded-full border border-ink/25 px-7 text-sm font-semibold text-forest hover:bg-ink/5">
                      Review Capital Stack
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/50 mb-4">Institutional Status Badges</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-forest px-4 py-2 font-mono text-xs font-medium text-gold">
                      SREDA NEM 2025 Synchronized
                    </span>
                    <span className="rounded-full border border-ink/20 px-4 py-2 font-mono text-xs font-medium text-forest">
                      IDCOL Senior Debt 80% LTV
                    </span>
                    <span className="rounded-full bg-gold/20 border border-gold/40 px-4 py-2 font-mono text-xs font-semibold text-forest">
                      1.25× DSCR Floor
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/50 mb-4">Verified Financial Constants</p>
                  <div className="flex flex-wrap gap-4">
                    <span className="rounded-2xl border border-ink/10 bg-cream p-4">
                      <span className="font-mono text-[10px] text-ink/50 uppercase block">PPA Savings Guarantee</span>
                      <span className="font-mono text-base font-bold text-forest">30% Below Grid</span>
                    </span>
                    <span className="rounded-2xl border border-ink/10 bg-cream p-4">
                      <span className="font-mono text-[10px] text-ink/50 uppercase block">BERC Industrial Peak</span>
                      <span className="font-mono text-base font-bold text-forest">৳15.36 / kWh</span>
                    </span>
                    <span className="rounded-2xl border border-ink/10 bg-cream p-4">
                      <span className="font-mono text-[10px] text-ink/50 uppercase block">Customer CAPEX</span>
                      <span className="font-mono text-base font-bold text-gold">৳0.00 (Zero)</span>
                    </span>
                  </div>
                </div>
              </FadeUp>
            </section>
          </div>
        </div>
      </main>
      <Footer />

      <FeasibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
