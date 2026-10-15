import { useEffect, useRef, useState } from "react";
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
import { createLeadIdempotencyKey, submitLead, type LeadIntakeResult } from "../lib/lead-intake";
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
             Project finance and EPC partnerships for rooftop solar
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
           <Words text="The partners who make industrial rooftop solar possible." accent={3} />
        </h1>
        <motion.p
          className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-warm/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        >
           Netso works with lenders, EPC contractors, industrial owners and originators to move suitable rooftop solar projects from assessment to operation. The structure, security, scope and payment terms are agreed for each project.
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
  { val: "Site", unit: "by site", label: "Project finance review", sub: "Security, tenor and leverage depend on the project" },
  { val: "Clear", unit: "terms", label: "Commercial structure", sub: "Price and settlement are documented before commitment" },
  { val: "One", unit: "team", label: "Coordinated delivery", sub: "Commercial, technical and utility work under one process" },
  { val: "Long", unit: "term", label: "Operating relationships", sub: "Projects can include long-term service and maintenance" },
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
               <Words text="A clear project structure for every capital partner." accent={1} />
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-sm text-warm/70 leading-relaxed">
               Netso prepares the project information lenders and delivery partners need: site evidence, load data, technical design, contracts, approvals, security and operating assumptions.
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
                   Structure confirmed per project
                </span>
              </div>

              {/* Stack Bars */}
              <div className="mt-8 space-y-4">
                {/* Senior Debt */}
                <div className="rounded-2xl border border-gold/40 bg-gold/10 p-5 transition-colors hover:border-gold">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-gold uppercase tracking-wider">
                       Senior debt or project finance
                    </span>
                    <span className="font-display text-2xl font-bold text-warm">80%</span>
                  </div>
                  <p className="mt-2 text-xs text-warm/75 leading-relaxed">
                     Potential debt sources, pricing, tenor and security are assessed with the relevant financing partner.
                  </p>
                </div>

                {/* Sponsor Equity */}
                <div className="rounded-2xl border border-warm/20 bg-warm/5 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-warm/70 uppercase tracking-wider">
                       Sponsor and project equity
                    </span>
                    <span className="font-display text-2xl font-bold text-warm">20%</span>
                  </div>
                  <p className="mt-2 text-xs text-warm/65 leading-relaxed">
                     Equity requirements and priority of cash flows are documented in the approved project structure.
                  </p>
                </div>

                {/* Client CAPEX */}
                <div className="rounded-2xl border border-warm/10 bg-forest p-4 text-center">
                  <p className="font-mono text-xs text-warm/50">
                     Industrial customer funding: <span className="font-bold text-gold">assessed per structure</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-warm/10 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-gold">
                <ShieldCheck className="h-4 w-4" />
                 <span>Cash flow waterfall, security and payment controls agreed with the financing parties</span>
              </div>
            </div>
          </div>

          {/* Right: Key Lending Covenants & Risk Protections */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-3xl border border-warm/15 bg-forest-light/40 p-7 transition-all hover:border-gold/30">
              <Landmark className="h-8 w-8 text-gold" />
               <h3 className="font-display mt-5 text-2xl text-warm">Project finance partners</h3>
              <p className="mt-2 text-sm text-warm/70 leading-relaxed">
                 Netso can prepare project materials for lenders and development-finance discussions. Eligibility, pricing, guarantees and approval remain subject to the financing partner's review.
              </p>
            </div>

            <div className="rounded-3xl border border-warm/15 bg-forest-light/40 p-7 transition-all hover:border-gold/30">
              <Scale className="h-8 w-8 text-gold" />
               <h3 className="font-display mt-5 text-2xl text-warm">Underwritten cash flow</h3>
              <p className="mt-2 text-sm text-warm/70 leading-relaxed">
                 Net generation, customer credit, tariff treatment, operating costs and downside cases are tested before a project is presented for financing.
              </p>
            </div>

            <div className="rounded-3xl border border-warm/15 bg-forest-light/40 p-7 transition-all hover:border-gold/30">
              <FileCheck2 className="h-8 w-8 text-gold" />
               <h3 className="font-display mt-5 text-2xl text-warm">Long-term customer contracts</h3>
              <p className="mt-2 text-sm text-warm/70 leading-relaxed">
                 Netso works toward long-term power agreements with customers that meet the project's credit and operating requirements.
              </p>
            </div>

            <div className="rounded-3xl border border-warm/15 bg-forest-light/40 p-7 transition-all hover:border-gold/30">
              <Coins className="h-8 w-8 text-gold" />
               <h3 className="font-display mt-5 text-2xl text-warm">Utility and regulatory work</h3>
              <p className="mt-2 text-sm text-warm/70 leading-relaxed">
                 The team coordinates the technical and regulatory work required for the approved connection. Requirements and settlement depend on the site and current rules.
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
     t: "Qualified project pipeline",
     h: "Spend more time building",
     c: "Netso can originate the customer relationship, coordinate the site review and develop the commercial structure before the EPC scope is agreed.",
  },
  {
    n: "02",
    icon: Layers,
     t: "Clear engineering scope",
     h: "Design around the actual roof",
     c: "Netso coordinates the structural, electrical and utility requirements so the EPC team receives a defined scope rather than an untested concept.",
  },
  {
    n: "03",
    icon: Award,
     t: "Agreed payment controls",
     h: "Milestones defined before mobilisation",
     c: "The project agreement can link payment to approved milestones, documentation and acceptance, with the schedule agreed with the delivery and finance parties.",
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
            Focus on precision electrical and structural delivery while Netso coordinates the customer, commercial and project workstreams.
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
  { k: "Origination", old: "You source and qualify the customer relationship", dl: "Netso can originate and qualify the opportunity with you" },
  { k: "Payment security", old: "Milestones and payment terms vary by customer", dl: "Milestones and acceptance criteria are agreed before work starts" },
  { k: "Engineering scope", old: "You develop the design from an incomplete brief", dl: "The scope reflects the assessed roof, load and utility requirements" },
  { k: "Regulatory work", old: "You manage approvals as part of the delivery burden", dl: "Netso coordinates the customer and utility workstreams" },
  { k: "Long-term role", old: "The relationship may end at commissioning", dl: "Eligible projects can include ongoing service and maintenance" },
];

function Compare() {
  return (
    <section className="bg-forest py-24 text-warm md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Commercial Comparison</p>
        </FadeUp>
        <h2 className="font-display mt-4 max-w-3xl text-4xl text-warm sm:text-6xl md:text-7xl">
           <Words text="A better-defined EPC relationship" accent={3} />
        </h2>
        <FadeUp delay={0.15}>
           <p className="mt-4 text-[16px] text-warm/65">Compare a conventional subcontract with a project relationship built around clear scope, funding and milestones.</p>
        </FadeUp>

        <FadeUp className="mt-14 overflow-hidden rounded-3xl border border-warm/15">
          <div className="grid grid-cols-2 bg-forest-light">
            <div className="p-5 md:p-7">
             <p className="font-mono text-xs uppercase tracking-wider text-warm/40">Typical arrangement</p>
             <p className="font-display mt-2 text-xl text-warm/70 md:text-2xl">Subcontract</p>
            </div>
            <div className="bg-gold p-5 text-forest md:p-7">
             <p className="font-mono text-xs font-semibold uppercase tracking-wider text-forest/70">Netso partnership</p>
             <p className="font-display mt-2 text-xl font-bold md:text-2xl">Defined project partner</p>
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
            <p className="font-display text-2xl text-gold md:text-3xl">Clearer scope, better alignment and a repeatable pipeline.</p>
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
      <label htmlFor={props.id ?? props.name} className={labelCls}>
        {label} {props.required && <span className="text-gold">*</span>}
      </label>
      <input id={props.id ?? props.name} className={inputCls} {...props} />
    </div>
  );
}

function PartnerForm() {
  const [submissionResult, setSubmissionResult] = useState<LeadIntakeResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partnerType, setPartnerType] = useState("epc");
  const [regions, setRegions] = useState<string[]>(["Chattogram", "Gazipur"]);
  const submissionKeyRef = useRef<{ signature: string; key: string } | null>(null);
  const submitInFlightRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestVersionRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      requestVersionRef.current += 1;
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, []);

  const toggle = (s: string) =>
    setRegions((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitInFlightRef.current) return;

    const formData = new FormData(e.currentTarget);
    const read = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value : "";
    };
    const input = {
      source: "partner" as const,
      contactName: `${read("firstName")} ${read("lastName")}`,
      organization: read("organization"),
      email: read("email"),
      phone: read("phone"),
      partnerType,
      role: read("role"),
      trackRecord: read("trackRecord"),
      website: read("website"),
      officeAddress: read("officeAddress"),
      operationalDistricts: regions,
    };
    const signature = JSON.stringify(input);
    const keyState =
      submissionKeyRef.current?.signature === signature
        ? submissionKeyRef.current
        : { signature, key: createLeadIdempotencyKey() };
    submissionKeyRef.current = keyState;

    const requestVersion = ++requestVersionRef.current;
    const controller = new AbortController();
    submitInFlightRef.current = true;
    abortControllerRef.current = controller;
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await submitLead({ ...input, idempotencyKey: keyState.key }, { signal: controller.signal });
      if (!mountedRef.current || controller.signal.aborted || requestVersion !== requestVersionRef.current) return;
      setSubmissionResult(result);
    } catch {
      if (!mountedRef.current || controller.signal.aborted || requestVersion !== requestVersionRef.current) return;
      setSubmissionResult({
        status: "error",
        message: "We could not confirm whether the request was received. Please try again or contact Netso directly.",
      });
    } finally {
      if (requestVersion === requestVersionRef.current) {
        submitInFlightRef.current = false;
        abortControllerRef.current = null;
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="partner-form" className="bg-parchment py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Institutional Intake</p>
        </FadeUp>
        <h2 className="font-display mt-4 max-w-2xl text-4xl text-forest md:text-6xl">
           <Words text="Build the next generation of Bangladesh's rooftop energy supply" accent={2} />
        </h2>

        <FadeUp className="mt-12">
          <AnimatePresence mode="wait">
            {submissionResult?.status === "accepted" ? (
              <motion.div
                key="done"
                className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-cream p-10 text-center"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={2} />
                </div>
                <h3 className="font-display mt-6 text-4xl text-forest">Partnership Intake Accepted.</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70">
                   {submissionResult.message} The Netso team can review your capabilities and follow up about relevant projects.
                </p>
                {submissionResult.requestId && (
                  <p className="mt-3 font-mono text-xs text-gold">Request ID: {submissionResult.requestId}</p>
                )}
                <p className="font-mono text-xs text-gold mt-6 uppercase tracking-wider">Netso Energy Ltd · Partner Desk</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="rounded-3xl border border-ink/10 bg-cream p-6 md:p-10 shadow-lg"
                exit={{ opacity: 0, y: -14 }}
                aria-busy={isSubmitting}
                onSubmit={handleSubmit}
              >
                {submissionResult && (
                  <div
                    role="alert"
                    className={`mb-8 rounded-2xl border p-4 text-sm ${
                      submissionResult.status === "unavailable"
                        ? "border-gold/30 bg-gold/10 text-forest"
                        : "border-red-700/20 bg-red-100/60 text-red-900"
                    }`}
                  >
                    <p className="font-semibold">
                      {submissionResult.status === "unavailable"
                        ? "Partner intake unavailable"
                        : "Submission status"}
                    </p>
                    <p className="mt-1 text-xs opacity-85">{submissionResult.message}</p>
                  </div>
                )}
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
                        aria-pressed={partnerType === t.id}
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
                    <Field name="firstName" autoComplete="given-name" label="First Name" required placeholder="Arif" />
                    <Field name="lastName" autoComplete="family-name" label="Last Name" required placeholder="Rahman" />
                    <Field name="email" autoComplete="email" label="Work Email" required type="email" placeholder="a.rahman@firm.com.bd" />
                    <Field name="phone" autoComplete="tel" label="Direct Phone" required type="tel" placeholder="+880 1711-XXXXXX" />
                    <Field name="role" autoComplete="organization-title" label="Title / Function" required placeholder="Head of Structured Finance / Projects Director" />
                  </div>
                </fieldset>

                <fieldset className="mt-8">
                  <legend className="font-mono text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                    Organization Details
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field name="organization" autoComplete="organization" label="Company / Entity Name" required placeholder="Crescent Infrastructure Ltd." />
                    <div>
                      <label htmlFor="partner-track-record" className={labelCls}>
                        Track Record / Capacity <span className="text-gold">*</span>
                      </label>
                      <select id="partner-track-record" name="trackRecord" autoComplete="off" className={inputCls} required defaultValue="">
                        <option value="" disabled>Select track record…</option>
                        <option>10MWp+ Installed / Financed</option>
                        <option>2MWp to 10MWp C&I Experience</option>
                        <option>Under 2MWp / Emerging Partner</option>
                        <option>Financial Institution / Asset Manager</option>
                      </select>
                    </div>
                    <Field name="website" autoComplete="url" label="Company Website" required type="url" placeholder="https://" />
                    <Field name="officeAddress" autoComplete="street-address" label="Registered Office Address" required placeholder="Plot 14, CEPZ, Chattogram" />
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
                    disabled={isSubmitting}
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-base font-semibold text-forest shadow-md transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                  >
                    {isSubmitting ? "Submitting Partner Credentials..." : "Submit Partner Credentials"} <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={getNetsoWhatsAppUrl(
                       "Hello Netso Energy team, reaching out from [Bank/Investment Institution] to discuss project finance and rooftop solar opportunities."
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
                   Share only information needed for an initial conversation. Confidentiality terms can be agreed separately for a live opportunity.
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
           title="Rooftop energy partnerships"
           heading="Bring your expertise to the project"
           copy="We work with capital providers, EPC teams, industrial owners and originators who want to deliver well-structured rooftop solar projects."
           cta="Start a partner conversation"
        />
      </main>
      <Footer />

      <FeasibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
