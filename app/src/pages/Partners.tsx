import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Handshake, Rocket, Wallet } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import StatChips from "../components/StatChips";
import { FadeUp, Stagger, StaggerItem, Words } from "../components/Reveal";
import aerial from "../assets/neighborhood-aerial.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------ Hero ------------------------------ */
function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink text-cream">
      <motion.img
        src={aerial}
        alt="Factory rooftops fitted with solar arrays across a Chattogram industrial district at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.12, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/72 via-ink/35 to-ink/88" />
      <StatChips />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 md:px-10 md:pb-20">
        <motion.p
          className="eyebrow mb-6 text-sun"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
        >
          For EPC & engineering partners
        </motion.p>
        <h1 className="font-display max-w-4xl text-[13.5vw] text-cream sm:text-8xl md:text-[6.5rem]">
          <Words text="Build the roofs that power Bangladesh" accent={3} delay={0.3} />
        </h1>
        <motion.p
          className="mt-7 max-w-lg text-[16.5px] leading-relaxed text-cream/85 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        >
          A financed pipeline of rooftop projects needs builders. Standardized canopy designs, honest
          schedules, milestone payouts.
        </motion.p>
        <motion.div
          className="mt-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
        >
          <a
            href="#partner-form"
            className="inline-flex h-[52px] items-center gap-2 rounded-full bg-orange px-7 text-[15.5px] font-semibold text-cream transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97]"
          >
            Partner with us <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- Why partners --------------------------- */
const WHY = [
  {
    n: "01",
    icon: Rocket,
    t: "Win more work",
    h: "A pipeline, not a lottery",
    c: "Netso originates, finances and contracts the projects. You build to a standardized canopy design — no sales cost, no financing risk.",
  },
  {
    n: "02",
    icon: Wallet,
    t: "Get paid on milestone",
    h: "No 120-day receivables",
    c: "Milestone-based payments against certified progress, funded by project SPV financing — not a customer’s goodwill.",
  },
  {
    n: "03",
    icon: Handshake,
    t: "Easier operations",
    h: "Back office, handled",
    c: "Procurement support, SREDA and utility filings, and as-built documentation run through Netso’s project factory. Our partner portal tracks every site in real time.",
  },
];

function Why() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-orange">The Netso Difference</p>
        </FadeUp>
        <h2 className="font-display mt-6 text-5xl text-ink md:text-7xl">
          <Words text="Why partners choose Netso" accent={1} />
        </h2>
        <FadeUp delay={0.15}>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink/70">
            Build from a financed pipeline, get paid on certified milestones, and let us handle the
            paperwork.
          </p>
        </FadeUp>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" gap={0.12}>
          {WHY.map((w) => (
            <StaggerItem key={w.n}>
              <article className="flex h-full flex-col rounded-3xl border border-ink/8 bg-parchment p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl md:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl text-orange">{w.n}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-sun">
                    <w.icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                </div>
                <h3 className="font-display mt-8 text-3xl text-ink">{w.t}</h3>
                <p className="mt-1 text-[15px] font-semibold text-orange">{w.h}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{w.c}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Compare ----------------------------- */
const CMP = [
  { k: "Project Origination", old: "You chase and price every lead", dl: "A financed pipeline handed to you" },
  { k: "Payment Risk", old: "Client credit decides when you're paid", dl: "Milestone payouts from the project SPV" },
  { k: "Design", old: "Every project engineered from scratch", dl: "Standardized 7-frame canopy system" },
  { k: "Compliance", old: "SREDA / NEM paperwork on you", dl: "Filed by Netso, end to end" },
];

function Compare() {
  return (
    <section className="bg-ink py-24 text-cream md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-orange">How we compare</p>
        </FadeUp>
        <h2 className="font-display mt-6 max-w-3xl text-5xl md:text-7xl">
          <Words text="Not all EPC contracts are built the same" accent={3} />
        </h2>
        <FadeUp delay={0.15}>
          <p className="mt-5 text-[16px] text-cream/65">Same roof, different deal.</p>
        </FadeUp>

        <FadeUp className="mt-14 overflow-hidden rounded-3xl border border-cream/12">
          <div className="grid grid-cols-2 bg-coal">
            <div className="p-5 md:p-7">
              <p className="eyebrow text-cream/45">The Old Way</p>
              <p className="font-display mt-2 text-xl text-cream/70 md:text-2xl">Typical subcontract</p>
            </div>
            <div className="bg-orange p-5 md:p-7">
              <p className="eyebrow text-cream/75">The Netso Way</p>
              <p className="font-display mt-2 text-xl md:text-2xl">Built different</p>
            </div>
          </div>
          {CMP.map((r, i) => (
            <div key={r.k} className={`grid grid-cols-2 ${i % 2 ? "bg-ink" : "bg-[#151515]"}`}>
              <div className="border-r border-cream/10 p-5 md:p-7">
                <p className="eyebrow mb-2 !text-[10px] text-cream/40">{r.k}</p>
                <p className="text-[14.5px] leading-snug text-cream/55 md:text-[15.5px]">{r.old}</p>
              </div>
              <div className="bg-orange/10 p-5 md:p-7">
                <p className="eyebrow mb-2 !text-[10px] text-orange">{r.k}</p>
                <p className="text-[14.5px] font-medium leading-snug text-cream md:text-[15.5px]">{r.dl}</p>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 border-t border-cream/12 bg-coal p-5 md:p-7">
            <p className="eyebrow text-cream/50">Total Advantage</p>
            <p className="font-display text-2xl text-sun md:text-3xl">Netso wins.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------ Offer ------------------------------ */
const OFFER = ["Financed pipeline", "Standardized designs", "Milestone payments", "20-year O&M share"];

function Offer() {
  return (
    <section className="spectrum grain relative overflow-hidden py-24 text-cream md:py-36">
      <div className="absolute inset-0 bg-ink/25" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-cream/85">The Offer</p>
        </FadeUp>
        <h2 className="font-display mt-6 max-w-4xl text-[11vw] sm:text-7xl md:text-8xl">
          <Words text="A financed pipeline. Standard designs. Milestone payouts." accent={2} accentClassName="text-ink" />
        </h2>
        <FadeUp delay={0.2}>
          <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-cream/90">
            That’s the Netso pitch. That’s why it scales.
          </p>
        </FadeUp>
        <Stagger className="mt-10 flex flex-wrap gap-3" gap={0.08}>
          {OFFER.map((o) => (
            <StaggerItem key={o}>
              <span className="glass-chip eyebrow inline-flex items-center gap-2 rounded-full px-5 py-3 text-cream">
                <span className="h-1.5 w-1.5 rounded-full bg-sun" />
                {o}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeUp delay={0.25}>
          <a
            href="#partner-form"
            className="mt-12 inline-flex h-14 items-center gap-2 rounded-full bg-ink px-9 text-[16px] font-semibold text-cream shadow-xl transition-transform duration-300 hover:scale-[1.05] active:scale-[0.97]"
          >
            Partner with us <ArrowRight className="h-4 w-4" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

/* --------------------------- Partner form --------------------------- */
const inputCls =
  "h-12 w-full rounded-xl border border-ink/15 bg-cream px-4 text-[15px] text-ink placeholder:text-ink/35 transition-colors focus:border-orange focus:outline-none";
const labelCls = "eyebrow mb-2 block !text-[10.5px] text-ink/55";

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className={labelCls}>
        {label} {props.required && <span className="text-orange">*</span>}
      </label>
      <input className={inputCls} {...props} />
    </div>
  );
}

function PartnerForm() {
  const [sent, setSent] = useState(false);
  const [regions, setRegions] = useState<string[]>(["Chattogram"]);

  const toggle = (s: string) =>
    setRegions((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  return (
    <section id="partner-form" className="bg-parchment py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-orange">Build with Netso</p>
        </FadeUp>
        <h2 className="font-display mt-6 max-w-2xl text-4xl text-ink md:text-6xl">
          <Words
            text="Join the partner network building Bangladesh’s distributed energy infrastructure"
            accent={3}
          />
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
                <CheckCircle2 className="h-14 w-14 text-orange" strokeWidth={1.6} />
                <h3 className="font-display mt-6 text-4xl text-ink">Power on.</h3>
                <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink/70">
                  Your application is in. Our partnerships team will reach out within two business days to
                  schedule an intro call.
                </p>
                <p className="eyebrow mt-6 text-ink/40">netso</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="rounded-3xl border border-ink/10 bg-cream p-6 md:p-10"
                exit={{ opacity: 0, y: -14 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <fieldset>
                  <legend className="font-display-wide text-xl text-ink">Contact Information</legend>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Field label="First Name" required placeholder="Arif" />
                    <Field label="Last Name" required placeholder="Rahman" />
                    <Field label="Email" required type="email" placeholder="arif@yourfirm.com.bd" />
                    <Field label="Your Phone #" required type="tel" placeholder="+880 1XXX-XXXXXX" />
                    <Field label="Job Title" required placeholder="Managing Partner / Projects Director" />
                  </div>
                </fieldset>

                <fieldset className="mt-10">
                  <legend className="font-display-wide text-xl text-ink">Company Information</legend>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Field label="Company Name" required placeholder="Crescent Engineering Ltd." />
                    <div>
                      <label className={labelCls}>
                        Company Type <span className="text-orange">*</span>
                      </label>
                      <select className={inputCls} required defaultValue="">
                        <option value="" disabled>
                          Select…
                        </option>
                        <option>EPC Contractor</option>
                        <option>Electrical Engineering Firm</option>
                        <option>Sales / Referral Partner</option>
                      </select>
                    </div>
                    <Field label="Company Website" required type="url" placeholder="https://" />
                    <Field label="Company Address" required placeholder="Plot 12, CEPZ, Chattogram" />
                    <Field label="Company Phone #" required type="tel" placeholder="+880 2-XXXXXXX" />
                    <div className="sm:col-span-2">
                      <span className={labelCls}>Regions Serviced</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {["Chattogram", "Gazipur", "Narayanganj", "Dhaka", "Other Regions?"].map(
                          (s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => toggle(s)}
                              aria-pressed={regions.includes(s)}
                              className={`h-11 rounded-full border px-5 text-[13.5px] font-medium transition-all ${
                                regions.includes(s)
                                  ? "border-ink bg-ink text-cream"
                                  : "border-ink/20 text-ink/60 hover:border-ink/50"
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

                <button
                  type="submit"
                  className="mt-10 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-orange text-[16px] font-semibold text-cream transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:px-12"
                >
                  Become a Partner <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-4 text-[12.5px] text-ink/45">
                  Demo form — submissions stay in your browser and aren’t sent anywhere.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Partners() {
  return (
    <div className="bg-cream">
      <Nav theme="dark" />
      <main id="content">
        <Hero />
        <Why />
        <Compare />
        <Offer />
        <PartnerForm />
        <CTASection
          title="The sky is already working"
          heading="Your roof is an asset"
          copy="Join the partners building Bangladesh’s distributed energy network, one roof at a time."
          cta="Partner with us"
        />
      </main>
      <Footer />
    </div>
  );
}
