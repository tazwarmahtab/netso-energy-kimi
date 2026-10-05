import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  FileCheck2,
  Landmark,
  Coins,
  Layers,
  Scale,
  Award
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import FeasibilityModal from "../components/FeasibilityModal";
import { FadeUp, Stagger, StaggerItem, Words } from "../components/Reveal";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../components/ui/WhatsAppIcon";
import aerial from "../assets/neighborhood-aerial.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------ Hero ------------------------------ */
function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-forest text-warm">
      <motion.img
        src={aerial}
        alt="Factory rooftops fitted with solar arrays across a Chattogram industrial district at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.12, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/65 to-forest/40" />

      {/* Institutional Metric Pill */}
      <div className="absolute top-28 left-6 z-20 hidden md:block lg:left-12">
        <div className="flex items-center gap-2.5 rounded-full border border-gold/30 bg-forest/85 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="font-mono text-xs font-medium tracking-wide text-gold">
            IDCOL 80% Senior Debt · 1.25× DSCR Covenant · Non-Recourse SPVs
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 md:px-10 md:pb-20">
        <motion.p
          className="font-mono text-xs font-semibold uppercase tracking-wider text-gold mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
        >
          Senior Lenders, DFIs & Tier-1 EPC Partners
        </motion.p>
        <h1 className="font-display max-w-4xl text-[12vw] text-warm sm:text-7xl md:text-[5.75rem] leading-[0.98]">
          <Words text="The capital stack and engineering network powering industry." accent={3} />
        </h1>
        <motion.p
          className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-warm/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        >
          Netso structures bankable 20-year take-or-pay distributed rooftop solar assets. Powered by
          concessionary senior debt financing, ring-fenced project SPVs, and standardized milestone
          disbursements for top-tier EPC contractors.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
        >
          <a
            href="#partner-form"
            className="inline-flex h-[52px] items-center gap-2 rounded-full bg-gold px-8 text-[15px] font-semibold text-forest shadow-lg shadow-gold/25 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Partner With Us <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={onOpenModal}
            className="inline-flex h-[52px] items-center gap-2 rounded-full border border-warm/25 bg-forest/40 px-7 text-[15px] font-medium text-warm backdrop-blur-md transition-colors hover:border-gold hover:text-gold active:scale-[0.98]"
          >
            Request Term Sheet Overview
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------- Institutional Metrics Strip ----------------------- */
const METRICS = [
  { val: "80%", unit: "LTV", label: "Senior Debt Facility", sub: "IDCOL 5.0%–5.5% concessionary facility" },
  { val: "1.25×", unit: "Min", label: "DSCR Covenant", sub: "Ring-fenced take-or-pay cash flow coverage" },
  { val: "৳10.00", unit: "/kWh", label: "Contracted PPA Tariff", sub: "CGS benchmark vs ৳15.36 BERC peak" },
  { val: "৳60k", unit: "/kWp", label: "CAPEX Benchmark Ceiling", sub: "Strict engineering discipline under IDCOL rules" },
];

function MetricsStrip() {
  return (
    <section className="border-y border-ink/8 bg-cream py-12">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-ink/10">
          {METRICS.map((m, i) => (
            <div key={m.label} className={i !== 0 ? "md:pl-8" : ""}>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="font-display text-4xl font-bold tracking-tight text-forest md:text-5xl">
                  {m.val}
                </span>
                <span className="text-sm font-semibold text-gold">{m.unit}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-ink">{m.label}</p>
              <p className="mt-1 text-xs text-ink/55 leading-relaxed">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Capital Stack & Senior Debt ----------------------- */
function CapitalStack() {
  return (
    <section className="bg-forest py-24 text-warm md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                Institutional Finance Structure
              </p>
            </FadeUp>
            <h2 className="font-display mt-4 max-w-3xl text-4xl sm:text-6xl text-warm">
              <Words text="Bankable SPV architecture designed for senior lenders." accent={1} />
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-sm text-warm/70 leading-relaxed">
              Every rooftop asset is ring-fenced in a special purpose bankruptcy-remote vehicle, backed by
              tri-partite escrow accounts, bank guarantees, and creditworthy Tier-1 industrial offtakers.
            </p>
          </FadeUp>
        </div>

        {/* Stack diagram & pillars */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* Left: Interactive Capital Stack visual */}
          <div className="flex flex-col justify-between rounded-3xl border border-warm/15 bg-forest-light/60 p-8 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-warm/10 pb-4">
                <span className="font-mono text-xs font-semibold tracking-wider text-warm/60 uppercase">
                  Project Financing Stack
                </span>
                <span className="rounded-full bg-gold/15 px-3 py-1 font-mono text-[11px] font-medium text-gold">
                  100% Fully Financed
                </span>
              </div>

              {/* Stack Bars */}
              <div className="mt-8 space-y-4">
                {/* Senior Debt */}
                <div className="rounded-2xl border border-gold/40 bg-gold/10 p-5 transition-colors hover:border-gold">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-gold uppercase tracking-wider">
                      Senior Concessionary Debt
                    </span>
                    <span className="font-display text-2xl font-bold text-warm">80%</span>
                  </div>
                  <p className="mt-2 text-xs text-warm/75 leading-relaxed">
                    IDCOL Renewable Energy Credit Facility @ <strong>5.0%–5.5%</strong> interest rate. 10-year
                    tenure including 1-year construction grace period.
                  </p>
                </div>

                {/* Sponsor Equity */}
                <div className="rounded-2xl border border-warm/20 bg-warm/5 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-warm/70 uppercase tracking-wider">
                      Netso Sponsor Equity
                    </span>
                    <span className="font-display text-2xl font-bold text-warm">20%</span>
                  </div>
                  <p className="mt-2 text-xs text-warm/65 leading-relaxed">
                    First-loss capital contributed by Netso Energy Ltd. 100% performance alignment and
                    subordinated cash flows.
                  </p>
                </div>

                {/* Client CAPEX */}
                <div className="rounded-2xl border border-warm/10 bg-forest p-4 text-center">
                  <p className="font-mono text-xs text-warm/50">
                    Industrial Offtaker CAPEX: <span className="font-bold text-gold">৳0.00</span> (Zero balance sheet encumbrance)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-warm/10 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-gold">
                <ShieldCheck className="h-4 w-4" />
                <span>Audited Escrow Waterfall (Monthly PPA Collections → Debt Service Reserve → O&M)</span>
              </div>
            </div>
          </div>

          {/* Right: Key Lending Covenants & Risk Protections */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-3xl border border-warm/15 bg-forest-light/40 p-7 transition-all hover:border-gold/30">
              <Landmark className="h-8 w-8 text-gold" />
              <h3 className="font-display mt-5 text-2xl text-warm">IDCOL Senior Facility</h3>
              <p className="mt-2 text-sm text-warm/70 leading-relaxed">
                Eligible under IDCOL’s concessionary green fund. Structured with 50%–75% bank guarantee backing to
                unlock the lowest 5.0% rate tiers, capped well below commercial lending benchmarks.
              </p>
            </div>

            <div className="rounded-3xl border border-warm/15 bg-forest-light/40 p-7 transition-all hover:border-gold/30">
              <Scale className="h-8 w-8 text-gold" />
              <h3 className="font-display mt-5 text-2xl text-warm">1.25× DSCR Floor</h3>
              <p className="mt-2 text-sm text-warm/70 leading-relaxed">
                Debt service is tested across conservative P90 insolation modeling. Net generation cash flows
                provide substantial buffer over debt service requirements across all economic seasons.
              </p>
            </div>

            <div className="rounded-3xl border border-warm/15 bg-forest-light/40 p-7 transition-all hover:border-gold/30">
              <FileCheck2 className="h-8 w-8 text-gold" />
              <h3 className="font-display mt-5 text-2xl text-warm">Take-or-Pay PPAs</h3>
              <p className="mt-2 text-sm text-warm/70 leading-relaxed">
                20-year binding agreements with creditworthy export garment, textile, and FMCG manufacturing
                conglomerates with confirmed foreign currency earnings.
              </p>
            </div>

            <div className="rounded-3xl border border-warm/15 bg-forest-light/40 p-7 transition-all hover:border-gold/30">
              <Coins className="h-8 w-8 text-gold" />
              <h3 className="font-display mt-5 text-2xl text-warm">SREDA NEM 2025</h3>
              <p className="mt-2 text-sm text-warm/70 leading-relaxed">
                Full regulatory compliance with Bangladesh’s 2025 Net Energy Metering framework: 90% monthly
                export credit settlement and Class 0.2s bidirectional meter verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- EPC Partnership Model --------------------------- */
const EPC_WHY = [
  {
    n: "01",
    icon: Building2,
    t: "Financed Pipeline",
    h: "No chasing unvetted client leads",
    c: "Netso originates, conducts structural audits, finances the SPV, and executes the PPA. You receive shovel-ready projects with secured capital.",
  },
  {
    n: "02",
    icon: Layers,
    t: "Standardized Engineering",
    h: "Modular 7-frame solar pergola system",
    c: "Pre-engineered structural steel drawings, wind-load ratings certified for 160 km/h coastal gusts, and standardized bill of materials.",
  },
  {
    n: "03",
    icon: Award,
    t: "Certified Milestone Escrow",
    h: "No 120-day client receivables",
    c: "Disbursements occur in escrow against certified progress: 30% mobilization, 40% mechanical completion, and 30% COD grid sync.",
  },
];

function EpcSection() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
            For General Contractors & Engineers
          </p>
        </FadeUp>
        <h2 className="font-display mt-4 text-4xl text-forest sm:text-6xl md:text-7xl">
          <Words text="Why top EPC contractors build with Netso" accent={1} />
        </h2>
        <FadeUp delay={0.15}>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink/75">
            Focus purely on what you do best: precision electrical and structural construction. Leave origination,
            legal PPA structuring, and capital financing to Netso.
          </p>
        </FadeUp>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" gap={0.12}>
          {EPC_WHY.map((w) => (
            <StaggerItem key={w.n}>
              <article className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-parchment p-8 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-bold text-gold">{w.n}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-gold shadow-md">
                      <w.icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                  </div>
                  <h3 className="font-display mt-8 text-2xl text-forest">{w.t}</h3>
                  <p className="mt-1 font-mono text-xs font-semibold text-gold uppercase tracking-wider">{w.h}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{w.c}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Compare Matrix ----------------------------- */
const CMP = [
  { k: "Origination Cost", old: "You spend months chasing and pitching factory owners", dl: "Shovel-ready financed projects handed to you" },
  { k: "Payment Security", old: "Factory cash flows dictate if & when invoices clear", dl: "Certified milestone payouts from ring-fenced bank escrow" },
  { k: "Engineering Complexity", old: "One-off designs from scratch for every building", dl: "Standardized 7-frame canopy engineering with approved BOM" },
  { k: "Regulatory Filings", old: "SREDA, BERC & utility net-metering approvals on contractor", dl: "Executed entirely by Netso's in-house regulatory desk" },
  { k: "Long-term Upside", old: "Handover ends relationship at commissioning", dl: "Recurring multi-year O&M service agreement options" },
];

function Compare() {
  return (
    <section className="bg-forest py-24 text-warm md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Commercial Comparison</p>
        </FadeUp>
        <h2 className="font-display mt-4 max-w-3xl text-4xl text-warm sm:text-6xl md:text-7xl">
          <Words text="Not all EPC contracts are built the same" accent={3} />
        </h2>
        <FadeUp delay={0.15}>
          <p className="mt-4 text-[16px] text-warm/65">Compare standard subcontracting against the Netso Project Factory.</p>
        </FadeUp>

        <FadeUp className="mt-14 overflow-hidden rounded-3xl border border-warm/15">
          <div className="grid grid-cols-2 bg-forest-light">
            <div className="p-5 md:p-7">
              <p className="font-mono text-xs uppercase tracking-wider text-warm/40">The Legacy Way</p>
              <p className="font-display mt-2 text-xl text-warm/70 md:text-2xl">Typical Subcontract</p>
            </div>
            <div className="bg-gold p-5 text-forest md:p-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-forest/70">The Netso Partnership</p>
              <p className="font-display mt-2 text-xl font-bold md:text-2xl">Project SPV Partner</p>
            </div>
          </div>
          {CMP.map((r, i) => (
            <div key={r.k} className={`grid grid-cols-2 ${i % 2 ? "bg-forest" : "bg-forest-light/40"}`}>
              <div className="border-r border-warm/10 p-5 md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-wider text-warm/40 mb-2">{r.k}</p>
                <p className="text-sm leading-relaxed text-warm/60 md:text-[15px]">{r.old}</p>
              </div>
              <div className="bg-gold/10 p-5 md:p-7">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gold mb-2">{r.k}</p>
                <p className="text-sm font-semibold leading-relaxed text-warm md:text-[15px]">{r.dl}</p>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 border-t border-warm/15 bg-forest-light p-5 md:p-7">
            <p className="font-mono text-xs uppercase tracking-wider text-warm/50">Partner Outcome</p>
            <p className="font-display text-2xl text-gold md:text-3xl">Guaranteed cash flow & zero sales drag.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* --------------------------- Partner Form --------------------------- */
const inputCls =
  "h-12 w-full rounded-xl border border-ink/15 bg-cream px-4 text-[15px] text-forest placeholder:text-ink/35 transition-colors focus:border-gold focus:outline-none";
const labelCls = "font-mono mb-2 block text-xs font-medium uppercase tracking-wider text-ink/65";

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className={labelCls}>
        {label} {props.required && <span className="text-gold">*</span>}
      </label>
      <input className={inputCls} {...props} />
    </div>
  );
}

function PartnerForm() {
  const [sent, setSent] = useState(false);
  const [partnerType, setPartnerType] = useState("epc");
  const [regions, setRegions] = useState<string[]>(["Chattogram", "Gazipur"]);

  const toggle = (s: string) =>
    setRegions((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  return (
    <section id="partner-form" className="bg-parchment py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Institutional Intake</p>
        </FadeUp>
        <h2 className="font-display mt-4 max-w-2xl text-4xl text-forest md:text-6xl">
          <Words text="Join the network scaling Bangladesh's clean utility infrastructure" accent={2} />
        </h2>

        <FadeUp className="mt-12">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-cream p-10 text-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={2} />
                </div>
                <h3 className="font-display mt-6 text-4xl text-forest">Partnership Intake Received.</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70">
                  Our structured finance & project procurement desk will review your credentials and contact you
                  within 2 business days to discuss upcoming pipeline tranches.
                </p>
                <p className="font-mono text-xs text-gold mt-6 uppercase tracking-wider">Netso Energy Ltd · Partner Desk</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="rounded-3xl border border-ink/10 bg-cream p-6 md:p-10 shadow-lg"
                exit={{ opacity: 0, y: -14 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                {/* Partner Category Selector */}
                <fieldset>
                  <legend className="font-mono text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                    Partnership Category
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { id: "lender", label: "Senior Lender / DFI", desc: "IDCOL facility, commercial co-financing, or green debt" },
                      { id: "epc", label: "Tier-1 EPC Contractor", desc: "Turnkey electrical & solar pergola installation" },
                      { id: "origination", label: "Commercial Origination", desc: "Industrial park or factory roof portfolio sourcing" },
                    ].map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setPartnerType(t.id)}
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          partnerType === t.id
                            ? "border-gold bg-gold/10 text-forest shadow-sm"
                            : "border-ink/15 bg-cream hover:border-ink/30 text-ink/75"
                        }`}
                      >
                        <p className="font-display text-base font-semibold">{t.label}</p>
                        <p className="mt-1 text-xs text-ink/55 leading-relaxed">{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-8">
                  <legend className="font-mono text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                    Primary Contact
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="First Name" required placeholder="Arif" />
                    <Field label="Last Name" required placeholder="Rahman" />
                    <Field label="Work Email" required type="email" placeholder="a.rahman@firm.com.bd" />
                    <Field label="Direct Phone" required type="tel" placeholder="+880 1711-XXXXXX" />
                    <Field label="Title / Function" required placeholder="Head of Structured Finance / Projects Director" />
                  </div>
                </fieldset>

                <fieldset className="mt-8">
                  <legend className="font-mono text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                    Organization Details
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company / Entity Name" required placeholder="Crescent Infrastructure Ltd." />
                    <div>
                      <label className={labelCls}>
                        Track Record / Capacity <span className="text-gold">*</span>
                      </label>
                      <select className={inputCls} required defaultValue="">
                        <option value="" disabled>Select track record…</option>
                        <option>10MWp+ Installed / Financed</option>
                        <option>2MWp to 10MWp C&I Experience</option>
                        <option>Under 2MWp / Emerging Partner</option>
                        <option>Financial Institution / Asset Manager</option>
                      </select>
                    </div>
                    <Field label="Company Website" required type="url" placeholder="https://" />
                    <Field label="Registered Office Address" required placeholder="Plot 14, CEPZ, Chattogram" />
                    <div className="sm:col-span-2">
                      <span className={labelCls}>Operational Districts</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {["Chattogram", "Gazipur", "Narayanganj", "Dhaka EPZ", "Mymensingh", "Nationwide"].map(
                          (s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => toggle(s)}
                              aria-pressed={regions.includes(s)}
                              className={`h-10 rounded-full border px-4 text-xs font-medium transition-all ${
                                regions.includes(s)
                                  ? "border-forest bg-forest text-warm"
                                  : "border-ink/20 text-ink/65 hover:border-ink/40"
                              }`}
                            >
                              {s}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-base font-semibold text-forest shadow-md transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:px-10"
                  >
                    Submit Partner Credentials <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={getNetsoWhatsAppUrl(
                      "Hello Tazwar, reaching out from [Bank/Investment Institution] regarding Netso's IDCOL concessionary debt co-financing facility and 20-year PPA portfolio financial models."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-forest/20 bg-forest/5 px-8 text-sm font-semibold text-forest hover:bg-forest/10 transition-colors sm:w-auto"
                    title="Direct line to Tazwar Mahtab on WhatsApp for Capital Partners"
                  >
                    <WhatsAppIcon className="h-4.5 w-4.5 shrink-0" />
                    <span>Direct Finance Desk on WhatsApp</span>
                  </a>
                </div>
                <p className="mt-4 text-xs text-ink/50">
                  Submissions are reviewed under strict NDA protocols. Our finance desk responds within 48 hours.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  );
}

/* --------------------------- Page Main --------------------------- */
export default function Partners() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-cream">
      <Nav theme="dark" onOpenAssessment={() => setIsModalOpen(true)} />
      <main id="content">
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <MetricsStrip />
        <CapitalStack />
        <EpcSection />
        <Compare />
        <PartnerForm />
        <CTASection
          title="Institutional Infrastructure"
          heading="Partner with Bangladesh's C&I Solar Utility"
          copy="Whether providing senior debt facilities, co-sponsoring project equity, or building turnkey solar canopies, Netso provides long-term bankable certainty."
          cta="Initiate Partnership"
        />
      </main>
      <Footer />

      <FeasibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
