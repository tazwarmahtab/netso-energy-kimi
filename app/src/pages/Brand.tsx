import { useEffect, useState } from "react";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FadeUp, Stagger, StaggerItem, Words } from "../components/Reveal";
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
  { t: "Dusk", g: "linear-gradient(160deg,#3D1F00 0%,#F66F00 55%,#FCCC3C 100%)" },
  { t: "Night", g: "linear-gradient(160deg,#111111 0%,#1C1C1C 60%,#4C2806 100%)" },
];

const COLORS = [
  { name: "Signal Orange", hex: "#F66F00", ink: true, note: "Primary action. Energy, decision, the last phrase." },
  { name: "Ink", hex: "#111111", ink: false, note: "Authority, dark sections, the void." },
  { name: "Cream", hex: "#FFF7E9", ink: true, note: "The page. Warm daylight paper." },
  { name: "Netso Yellow", hex: "#FCCC3C", ink: true, note: "The energy signal. Data, highlights, the mark." },
  { name: "Beige", hex: "#F0E5CF", ink: true, note: "Quiet surfaces and dividers." },
  { name: "Sand", hex: "#DACAB6", ink: true, note: "Photography where white reads too bright." },
  { name: "Taupe", hex: "#A09B93", ink: false, note: "Captions, muted meta." },
  { name: "Sky", hex: "#8ED5FF", ink: true, note: "Secondary. On Royal only." },
  { name: "Royal", hex: "#1D3E86", ink: false, note: "Secondary depth. Technical contexts." },
  { name: "Grape", hex: "#C880FF", ink: true, note: "Secondary. On Plum only." },
  { name: "Plum", hex: "#321F61", ink: false, note: "Secondary depth. Creative contexts." },
  { name: "Bark", hex: "#4C2806", ink: false, note: "Deep warm shadow." },
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
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-3.5 w-3.5" />}
        </span>
      </div>
      <div className="bg-cream p-4">
        <p className="text-[14.5px] font-semibold text-ink">{c.name}</p>
        <p className="mt-0.5 font-mono text-[12.5px] font-bold uppercase text-orange">{copied ? "Copied!" : c.hex}</p>
        <p className="mt-1.5 text-[12.5px] leading-snug text-ink/55">{c.note}</p>
      </div>
    </button>
  );
}

const TYPE_ROWS = [
  {
    role: "Hero / Display",
    sample: "The sky is already working",
    spec: "Feature Deck · 64–96px · 400 · 95% LH · -2% LS · Last phrase in orange",
    cls: "font-display text-5xl md:text-7xl text-ink",
    accent: "text-orange",
    accentFrom: 2,
  },
  {
    role: "Section Heading",
    sample: "Netso powers industry",
    spec: "Feature Deck · 40–56px · 400 · 95% LH · -2% LS",
    cls: "font-display text-4xl md:text-5xl text-ink",
    accent: "",
    accentFrom: 0,
  },
  {
    role: "Title",
    sample: "The sun belongs to all of us",
    spec: "Aeonik Pro Medium · 24–32px · 500 · 116% LH · -2% LS",
    cls: "text-2xl font-medium md:text-[2rem] text-ink",
    accent: "",
    accentFrom: 0,
  },
  {
    role: "Body / Subtitles",
    sample:
      "Netso finances, builds, owns and operates rooftop solar systems: the hardware, the software, and the capital that ties it all together.",
    spec: "Aeonik Pro Regular · 15–17px · 400 · 140% LH · -2% LS",
    cls: "max-w-xl text-[16px] leading-[1.4] text-ink/75",
    accent: "",
    accentFrom: 0,
  },
  {
    role: "Labels / Mono / Data",
    sample: "[ Netso Asset Record ] · Commissioned · 115,632 kWh/yr · Aug 2026",
    spec: "ABC Social Mono · 12px or 16px only · 400 · 135% LH · 5% LS · Always uppercase",
    cls: "font-mono text-[12px] uppercase tracking-[0.14em] text-ink/70",
    accent: "",
    accentFrom: 0,
  },
];

const TAGLINES = [
  { k: "Primary", v: "The Sky Is Already Working.", d: "The tagline. Locked 28 Sep 2026. The sun does the work — we put it on your roof." },
  { k: "Brand idea", v: "The Roof. Re-Wired.", d: "The core idea behind the brand: every idle roof re-wired into productive infrastructure." },
  { k: "Product", v: "Solar as a Service", d: "The customer pitch. Zero CAPEX, a below-grid PPA rate, full operations included." },
  { k: "Sign-off", v: "Power on", d: "A sign-off and a push forward. Used to close campaign moments." },
  { k: "Discipline", v: "Evidence over adjectives", d: "Every public claim carries a state: fact, estimate, target or future." },
];

const PRINCIPLES = [
  { n: "01", t: "Direct", d: "We get to the point. Short sentences, plain language, no jargon. If a word doesn’t help the reader, it goes." },
  { n: "02", t: "Precise", d: "Every claim distinguishes fact from estimate from target. If a number isn’t evidenced, it says so." },
  { n: "03", t: "Institutional", d: "We write for boards, lenders and engineers — calm, exact, and always respectful of the reader’s time." },
  { n: "04", t: "Confident", d: "We know the engineering. We know the numbers. The copy sounds like it. Real tariffs, real assets, real results." },
];

const PHOTOS = [
  { img: heroHouse, t: "Rooftops at dusk", d: "Factory roofs in Chattogram, canopies working quietly overhead." },
  { img: solarRoof, t: "Architecture", d: "Pergola canopies that look like they were always meant to be there." },
  { img: inverters, t: "Hardware", d: "Premium, quiet, considered industrial engineering." },
  { img: aerial, t: "The network", d: "Industrial districts becoming power plants, together." },
  { img: panels, t: "Texture", d: "Golden hour on dual-glass TOPCon modules." },
];

const LOGO_TILES: { bg: string; variant: MarkVariant; label: string }[] = [
  { bg: "#111111", variant: "yellow", label: "Yellow on black — canonical" },
  { bg: "#FFFFFF", variant: "ink", label: "Black on white" },
  { bg: "#FFF7E9", variant: "ink", label: "Ink on cream" },
  { bg: "#FCCC3C", variant: "ink", label: "Ink on yellow" },
  { bg: "#F66F00", variant: "cream", label: "Cream on orange" },
  { bg: "#DACAB6", variant: "ink", label: "Ink on sand" },
  { bg: "#1D3E86", variant: "yellow", label: "Yellow on royal" },
  { bg: "#F0E5CF", variant: "yellow", label: "Yellow — needs approval" },
];

export default function Brand() {
  const [active, setActive] = useState("welcome");

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
      <Nav theme="light" />
      <main id="content" className="mx-auto max-w-[1440px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <FadeUp>
              <p className="eyebrow text-orange">Brand Kit</p>
            </FadeUp>
            <h1 className="font-display mt-5 text-6xl md:text-8xl">
              <Words text="This is Netso" accent={1} />
            </h1>
            <FadeUp delay={0.15}>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink/70">
                A premium energy infrastructure company — and the system that keeps it recognizable
                everywhere it shows up.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex gap-2">
            <span className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-semibold text-cream transition-transform hover:scale-[1.04]">
              <Download className="h-4 w-4" /> Download
            </span>
            <span className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-ink/20 px-5 text-[14px] font-semibold transition-colors hover:bg-ink/5">
              <ExternalLink className="h-4 w-4" /> Figma
            </span>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-20">
          {/* sticky section nav */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1" aria-label="Brand sections">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group flex items-baseline gap-3 rounded-lg px-3 py-2 transition-colors ${
                    active === s.id ? "bg-ink text-cream" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <span className={`font-mono text-[11px] font-bold ${active === s.id ? "text-sun" : "text-orange"}`}>
                    {s.n}
                  </span>
                  <span className="text-[14px] font-medium">{s.t}</span>
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-28 md:space-y-36">
            {/* 00 welcome */}
            <section id="welcome" className="scroll-mt-28">
              <FadeUp>
                <p className="eyebrow text-ink/45">00 — Welcome</p>
                <h2 className="font-display mt-4 text-4xl md:text-6xl">The Energy Signal</h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">
                  Welcome to Netso. Physical infrastructure rendered through a computational lens: real
                  Bangladeshi places, engineered systems, and a yellow signal that means energy is moving.
                </p>
              </FadeUp>
              <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4" gap={0.1}>
                {MOMENTS.map((m) => (
                  <StaggerItem key={m.t}>
                    <div className="group relative h-44 overflow-hidden rounded-2xl md:h-56" style={{ background: m.g }}>
                      <span className="eyebrow absolute bottom-3 left-3 rounded-full bg-ink/35 px-3 py-1.5 !text-[10px] text-cream backdrop-blur">
                        {m.t}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>

            {/* 01 logo */}
            <section id="logo" className="scroll-mt-28">
              <FadeUp>
                <p className="eyebrow text-ink/45">01 — Logo</p>
                <h2 className="font-display mt-4 text-4xl md:text-6xl">Logo</h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">
                  Use the full lockup wherever space allows. The mark works at any scale, from a brand
                  signature to a compositional element. Never redraw or recreate it.
                </p>
              </FadeUp>
              <div className="mt-10 grid gap-3 md:grid-cols-3">
                <FadeUp className="flex h-52 flex-col items-center justify-center gap-3 rounded-2xl border border-ink/10 bg-cream md:col-span-2">
                  <span className="flex items-center gap-4">
                    <SunMark variant="ink" className="h-9 w-9" />
                    <span className="font-display text-4xl" style={{ fontWeight: 620 }}>Netso Energy</span>
                  </span>
                  <span className="eyebrow !text-[10px] text-ink/40">Full Logo</span>
                </FadeUp>
                <FadeUp delay={0.08} className="flex h-52 flex-col items-center justify-center gap-3 rounded-2xl bg-ink text-cream">
                  <SunMark variant="yellow" className="h-12 w-12" />
                  <span className="eyebrow !text-[10px] text-cream/40">Mark</span>
                </FadeUp>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {LOGO_TILES.map((v, i) => (
                  <FadeUp key={v.label} delay={i * 0.04}>
                    <div
                      className="flex h-32 flex-col items-center justify-center gap-2 rounded-2xl border border-ink/8"
                      style={{ backgroundColor: v.bg }}
                    >
                      <SunMark variant={v.variant} className="h-7 w-7" />
                      <span
                        className="eyebrow !text-[9px] opacity-60"
                        style={{ color: v.variant === "ink" ? "#111111" : "#FFF7E9" }}
                      >
                        {v.label}
                      </span>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* 02 color */}
            <section id="color" className="scroll-mt-28">
              <FadeUp>
                <p className="eyebrow text-ink/45">02 — Color</p>
                <h2 className="font-display mt-4 text-4xl md:text-6xl">
                  A full spectrum, <span className="text-orange">found in one ray</span>
                </h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">
                  Tap any swatch to copy its hex. Yellow signals; orange acts; ink grounds; cream carries.
                  Secondary pairs never mix with the primary system.
                </p>
              </FadeUp>
              <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {COLORS.map((c) => (
                  <FadeUp key={c.hex}>
                    <Swatch c={c} />
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* 03 typography */}
            <section id="typography" className="scroll-mt-28">
              <FadeUp>
                <p className="eyebrow text-ink/45">03 — Typography</p>
                <h2 className="font-display mt-4 text-4xl md:text-6xl">Three typefaces, three jobs</h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">
                  Display for heroes, a grotesque for everything else, mono for labels and data. Each with a
                  fixed role — misuse dilutes the brand.
                </p>
              </FadeUp>
              <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {TYPE_ROWS.map((r, i) => (
                  <FadeUp key={r.role} delay={i * 0.05}>
                    <div className="grid gap-4 py-8 md:grid-cols-[180px_1fr] md:gap-10">
                      <div>
                        <p className="eyebrow !text-[10.5px] text-orange">{r.role}</p>
                        <p className="mt-2 max-w-[180px] font-mono text-[10.5px] leading-relaxed text-ink/45">{r.spec}</p>
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

            {/* 04 voice */}
            <section id="voice" className="scroll-mt-28">
              <FadeUp>
                <p className="eyebrow text-ink/45">04 — Voice & Tone</p>
                <h2 className="font-display mt-4 text-4xl md:text-6xl">Confidence, with receipts</h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">
                  Netso speaks with an institutional voice — precise, evidenced, calm. Every word should
                  earn its place. Be specific and grounded. Write to be understood.
                </p>
              </FadeUp>
              <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {TAGLINES.map((t, i) => (
                  <FadeUp key={t.k} delay={i * 0.04}>
                    <div className="grid items-baseline gap-2 py-5 md:grid-cols-[140px_1fr_1.4fr] md:gap-8">
                      <span className="eyebrow !text-[10.5px] text-orange">{t.k}</span>
                      <span className="font-display text-3xl text-ink md:text-4xl">{t.v}</span>
                      <span className="text-[14.5px] leading-relaxed text-ink/60">{t.d}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {PRINCIPLES.map((p, i) => (
                  <FadeUp key={p.n} delay={i * 0.06}>
                    <div className="h-full rounded-2xl border border-ink/10 bg-parchment p-6">
                      <p className="font-mono text-[12px] font-bold text-orange">{p.n} /</p>
                      <p className="font-display mt-3 text-2xl text-ink">{p.t}</p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">{p.d}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* 05 photography */}
            <section id="photography" className="scroll-mt-28">
              <FadeUp>
                <p className="eyebrow text-ink/45">05 — Photography</p>
                <h2 className="font-display mt-4 text-4xl md:text-6xl">Shot in Bangladesh</h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">
                  Five categories of imagery, each capturing a different side of the Netso network. Real
                  places, humid air, golden light — never generic, never sterile.
                </p>
              </FadeUp>
              <div className="mt-10 columns-1 gap-3 sm:columns-2 xl:columns-3 [&>*]:mb-3">
                {PHOTOS.map((p, i) => (
                  <FadeUp key={p.t} delay={i * 0.05} className="break-inside-avoid">
                    <figure className="group overflow-hidden rounded-2xl">
                      <img
                        src={p.img}
                        alt={p.d}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <figcaption className="flex items-baseline justify-between gap-4 bg-cream pt-3">
                        <span className="text-[14.5px] font-semibold">{p.t}</span>
                        <span className="text-right text-[12px] leading-snug text-ink/50">{p.d}</span>
                      </figcaption>
                    </figure>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* 06 motion */}
            <section id="motion" className="scroll-mt-28">
              <FadeUp>
                <p className="eyebrow text-ink/45">06 — Motion</p>
                <h2 className="font-display mt-4 text-4xl md:text-6xl">Like a sunrise, not a strobe</h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">
                  Editorial at rest, cinematic in transformation. Everything eases out on a long, soft
                  curve. Headlines rise word by word. Imagery drifts slower than the scroll. Nothing snaps;
                  everything settles.
                </p>
              </FadeUp>
              <FadeUp className="mt-10 overflow-hidden rounded-3xl bg-ink p-8 text-cream md:p-12">
                <p className="eyebrow !text-[10px] text-cream/40">Live specimen — scroll away and back</p>
                <p className="font-display mt-6 text-4xl md:text-6xl">
                  <Words text="Every word arrives in its own time" accent={3} once={false} />
                </p>
                <div className="mt-10 grid gap-4 border-t border-cream/10 pt-6 sm:grid-cols-3">
                  {[
                    { k: "Easing", v: "cubic-bezier(0.16, 1, 0.3, 1)" },
                    { k: "Headline stagger", v: "55ms per word" },
                    { k: "Settle", v: "0.6 – 1.1s, never linear" },
                  ].map((s) => (
                    <div key={s.k}>
                      <p className="eyebrow !text-[9.5px] text-cream/40">{s.k}</p>
                      <p className="mt-1 font-mono text-[13px] font-bold text-sun">{s.v}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </section>

            {/* 07 components */}
            <section id="components" className="scroll-mt-28">
              <FadeUp>
                <p className="eyebrow text-ink/45">07 — Components</p>
                <h2 className="font-display mt-4 text-4xl md:text-6xl">Built from light</h2>
              </FadeUp>
              <FadeUp className="mt-10 space-y-10 rounded-3xl border border-ink/10 bg-parchment p-8 md:p-12">
                <div>
                  <p className="eyebrow mb-4 !text-[10px] text-ink/45">Buttons</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex h-12 cursor-pointer items-center rounded-full bg-orange px-6 text-[14.5px] font-semibold text-cream">
                      Get started
                    </span>
                    <span className="inline-flex h-12 cursor-pointer items-center rounded-full bg-ink px-6 text-[14.5px] font-semibold text-cream">
                      See if your roof qualifies
                    </span>
                    <span className="inline-flex h-12 cursor-pointer items-center rounded-full border border-ink/25 px-6 text-[14.5px] font-semibold text-ink">
                      Learn more
                    </span>
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-4 !text-[10px] text-ink/45">Pills & labels</p>
                  <div className="flex flex-wrap gap-2.5">
                    <span className="eyebrow rounded-full bg-ink px-4 py-2 text-cream">save</span>
                    <span className="eyebrow rounded-full border border-ink/20 px-4 py-2 text-ink/60">protect</span>
                    <span className="eyebrow rounded-full border border-ink/20 px-4 py-2 text-ink/60">control</span>
                    <span className="eyebrow rounded-full bg-orange px-4 py-2 text-cream">step 1</span>
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-4 !text-[10px] text-ink/45">Data chips</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="glass-chip rounded-2xl bg-ink px-4 py-3 text-cream">
                      <span className="eyebrow !text-[9.5px] block text-cream/50">Solar yield</span>
                      <span className="font-mono text-[15px] font-bold">1,445 kWh/kWp/yr</span>
                    </span>
                    <span className="glass-chip rounded-2xl bg-ink px-4 py-3 text-cream">
                      <span className="eyebrow !text-[9.5px] block text-cream/50">PPA rate</span>
                      <span className="font-mono text-[15px] font-bold text-sun">৳10.00/kWh</span>
                    </span>
                  </div>
                </div>
              </FadeUp>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
