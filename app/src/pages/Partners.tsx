import { useMemo, useState } from "react";
import {
  Award,
  Building2,
  CheckCircle2,
  Layers,
  Landmark,
  Scale,
} from "lucide-react";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageCTA, PageHero, PageSection } from "../components/glass/shell";
import { getNetsoWhatsAppUrl, WhatsAppIcon } from "../components/ui/WhatsAppIcon";
import { recordLeadForDispatch } from "../lib/notion";

/* ------------------------------------------------------------------------- */
/*  Structure metrics — financing is under appraisal, terms are not quoted    */
/* ------------------------------------------------------------------------- */

const STRUCTURE = [
  {
    val: "80%",
    unit: "target",
    label: "Senior debt share",
    sub: "IDCOL facility applied for, under appraisal (SREUP window).",
  },
  {
    val: "1.25×",
    unit: "floor",
    label: "DSCR covenant target",
    sub: "Tested against conservative generation modelling.",
  },
  {
    val: "30%",
    unit: "basis",
    label: "Floating offtaker discount",
    sub: "A percentage below the grid tariff, set in the agreement.",
  },
  {
    val: "SPV",
    unit: "model",
    label: "Ring-fenced assets",
    sub: "Non-recourse vehicles with audited escrow waterfall.",
  },
];

const CAPITAL = [
  {
    icon: Landmark,
    t: "Senior project debt",
    d: "Institutional term debt arranged per project at financial close. Terms are set in the project documents — no rates are disclosed on this site.",
    tag: "Per project",
  },
  {
    icon: Scale,
    t: "Lender-ready covenants",
    d: "Debt service is tested against conservative generation modelling, with cash-flow buffers sized per project across all seasons.",
    tag: "1.25× target",
  },
  {
    icon: Building2,
    t: "Ring-fenced delivery",
    d: "Each site sits in a bankruptcy-remote vehicle with tri-partite escrow, milestone certification and an audited waterfall.",
    tag: "SPV",
  },
];

const EPC_WHY = [
  {
    n: "01",
    icon: Building2,
    t: "Financed pipeline",
    h: "No chasing unvetted leads",
    c: "Netso originates, audits the structure, finances the vehicle and executes the agreement. You receive shovel-ready projects with capital behind them.",
  },
  {
    n: "02",
    icon: Layers,
    t: "Standardised engineering",
    h: "Modular pergola system",
    c: "Pre-engineered structural drawings, wind-load ratings for coastal exposure, and a standard bill of materials across sites.",
  },
  {
    n: "03",
    icon: Award,
    t: "Certified milestone escrow",
    h: "No 120-day receivables",
    c: "Disbursement runs against certified progress — mobilisation, mechanical completion and grid synchronisation — instead of a client invoice cycle.",
  },
];

const CMP = [
  { k: "Origination", old: "Months spent chasing and pitching factory owners", dl: "Financed, permitted projects handed over" },
  { k: "Capital", old: "You carry the working capital while the client decides", dl: "Project vehicle funds construction" },
  { k: "Engineering", old: "Bespoke drawings per site, rework risk", dl: "Standard system, site-specific foundation only" },
  { k: "Payment", old: "Client receivable risk, 90–120 day terms", dl: "Escrow against certified milestones" },
  { k: "Handover", old: "Commission, then the relationship ends", dl: "Operating partner for the full term" },
];

const CATEGORIES = [
  { id: "lender", label: "Senior lender / DFI", desc: "Institutional project debt or green financing" },
  { id: "epc", label: "Tier-1 EPC contractor", desc: "Turnkey electrical and pergola installation" },
  { id: "origination", label: "Commercial origination", desc: "Industrial park or factory roof portfolios" },
];

const TRACK = [
  "10 MWp+ installed or financed",
  "2–10 MWp C&I experience",
  "Under 2 MWp / emerging partner",
  "Financial institution / asset manager",
];

const REGIONS = ["Chattogram", "Gazipur", "Narayanganj", "Dhaka EPZ", "Mymensingh", "Nationwide"];

const FIELD =
  "h-12 w-full rounded-xl border border-[rgba(255,250,240,0.14)] bg-[rgba(4,13,9,0.55)] px-4 text-[14px] text-[#fffaf0] placeholder:text-[rgba(255,250,240,0.26)] transition-colors focus:border-[rgba(198,161,91,0.7)] focus:outline-none";
const LABEL =
  "mb-2 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.5)]";

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className={LABEL}>
        {label} {props.required ? <span className="text-[var(--g-gold)]">*</span> : null}
      </label>
      <input className={FIELD} {...props} />
    </div>
  );
}

export default function Partners() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("lender");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [track, setTrack] = useState(TRACK[0]);
  const [regions, setRegions] = useState<string[]>(["Chattogram"]);
  const [sent, setSent] = useState(false);

  const toggleRegion = (region: string) =>
    setRegions((current) =>
      current.includes(region) ? current.filter((r) => r !== region) : [...current, region],
    );

  const summary = useMemo(() => {
    const label = CATEGORIES.find((c) => c.id === category)?.label ?? "Partner";
    return `Hello Netso, I am writing about a ${label} partnership.\n\nName: ${first} ${last}\nRole: ${title}\nEntity: ${company}\nEmail: ${email}\nPhone: ${phone}\nTrack record: ${track}\nDistricts: ${regions.join(", ") || "—"}`;
  }, [category, first, last, title, company, email, phone, track, regions]);

  const dispatch = async () => {
    try {
      await recordLeadForDispatch({
        contactName: `${first} ${last}`.trim() || "Partner enquiry",
        orgName: company || "Partner enquiry",
        email,
        phone,
        facilityType: "commercial",
        roofArea: "20000",
        monthlySpend: "500000",
        notes: summary,
      });
    } catch {
      // The local ledger keeps the lead; never block the handover.
    }
    setSent(true);
    window.open(getNetsoWhatsAppUrl(summary), "_blank", "noopener,noreferrer");
  };

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        eyebrow="Partners · capital & delivery"
        title={
          <>
            Bankable structures for the people who <em>build and fund</em> them.
          </>
        }
        lede={
          <>
            Netso originates and finances distributed rooftop assets. Lenders underwrite the
            project vehicle; contractors build a standard system against certified milestones.
          </>
        }
        actions={
          <>
            <a href="#partner-form" className="g-btn">
              Apply to partner
            </a>
            <a href="#capital" className="g-btn g-btn--ghost">
              Capital structure
            </a>
          </>
        }
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              Non-recourse SPVs
            </span>
            <span className="g-chip">IDCOL application · under appraisal</span>
          </>
        }
      />

      {/* Structure metrics */}
      <section className="border-y border-[rgba(255,250,240,0.07)] bg-[rgba(255,250,240,0.02)]">
        <div className="g-wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {STRUCTURE.map((item, index) => (
            <Reveal key={item.label} delay={index * 60}>
              <div className="flex items-baseline gap-1.5">
                <span className="g-num text-[clamp(1.9rem,3vw,2.6rem)] leading-none">{item.val}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--g-gold)]">
                  {item.unit}
                </span>
              </div>
              <p className="mt-2.5 text-[13px] font-semibold text-[#fffaf0]">{item.label}</p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.4)]">
                {item.sub}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capital structure */}
      <PageSection
        id="capital"
        eyebrow="Capital structure"
        title={
          <>
            Depth of water, not a stack of <em>guarantees.</em>
          </>
        }
        aside={
          <p>
            Financing is underwritten per project. The facility is applied for and under
            appraisal; nothing on this page is a committed term.
          </p>
        }
      >
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {CAPITAL.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.t} delay={index * 80}>
                <Panel className="flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(198,161,91,0.24)] bg-[rgba(198,161,91,0.08)]">
                      <Icon className="h-4 w-4 text-[var(--g-gold)]" strokeWidth={1.7} />
                    </span>
                    <span className="g-chip !text-[9px]">{item.tag}</span>
                  </div>
                  <h3 className="mt-5 text-[15.5px] font-semibold tracking-[-0.012em] text-[#fffaf0]">
                    {item.t}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                    {item.d}
                  </p>
                </Panel>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={140}>
          <p className="mt-6 max-w-[78ch] text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.3)]">
            Indicative only. Facility size, tenor, covenant package and pricing are set at
            financial close between the project vehicle and its lenders, and are not published.
          </p>
        </Reveal>
      </PageSection>

      {/* EPC */}
      <PageSection
        eyebrow="For contractors & engineers"
        title={
          <>
            Why EPC teams build <em>with</em> Netso.
          </>
        }
        aside={
          <p>
            Focus on precision electrical and structural work. Origination, agreement
            structuring and financing sit with Netso.
          </p>
        }
        tight
      >
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {EPC_WHY.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.n} delay={index * 80}>
                <Panel className="flex h-full flex-col justify-between p-6 md:p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="g-num text-[26px] leading-none text-[rgba(198,161,91,0.6)]">
                        {item.n}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,250,240,0.12)] bg-[rgba(255,250,240,0.04)]">
                        <Icon className="h-4 w-4 text-[var(--g-gold)]" strokeWidth={1.7} />
                      </span>
                    </div>
                    <h3 className="mt-6 text-[16px] font-semibold tracking-[-0.012em] text-[#fffaf0]">
                      {item.t}
                    </h3>
                    <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--g-gold)]">
                      {item.h}
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                      {item.c}
                    </p>
                  </div>
                </Panel>
              </Reveal>
            );
          })}
        </div>
      </PageSection>

      {/* Comparison */}
      <PageSection
        eyebrow="Commercial comparison"
        title={
          <>
            Not every EPC contract is built the <em>same way.</em>
          </>
        }
      >
        <Reveal delay={100} className="mt-12">
          <div className="overflow-hidden rounded-[20px] border border-[rgba(255,250,240,0.1)]">
            <div className="grid grid-cols-2 bg-[rgba(255,250,240,0.05)]">
              <div className="p-5">
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.4)]">The legacy way</p>
                <p className="mt-1.5 text-[15px] text-[rgba(255,250,240,0.6)]">Typical subcontract</p>
              </div>
              <div className="border-l border-[rgba(198,161,91,0.25)] bg-[rgba(198,161,91,0.08)] p-5">
                <p className="g-label !text-[9px] text-[var(--g-gold)]">The Netso partnership</p>
                <p className="mt-1.5 text-[15px] font-semibold text-[#fffaf0]">Project SPV partner</p>
              </div>
            </div>

            {CMP.map((row) => (
              <div key={row.k} className="grid grid-cols-2 border-t border-[rgba(255,250,240,0.07)]">
                <div className="border-r border-[rgba(255,250,240,0.06)] p-5">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[rgba(255,250,240,0.35)]">
                    {row.k}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.5)]">
                    {row.old}
                  </p>
                </div>
                <div className="bg-[rgba(198,161,91,0.05)] p-5">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[rgba(198,161,91,0.8)]">
                    {row.k}
                  </p>
                  <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-[rgba(255,250,240,0.8)]">
                    {row.dl}
                  </p>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 border-t border-[rgba(255,250,240,0.1)] bg-[rgba(255,250,240,0.03)] p-5">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[rgba(255,250,240,0.4)]">
                Partner outcome
              </p>
              <p className="text-[14px] font-medium text-[var(--g-gold-hi)]">
                Predictable cash flow, no sales drag.
              </p>
            </div>
          </div>
        </Reveal>
      </PageSection>

      {/* Application form */}
      <section id="partner-form" className="g-section">
        <div className="g-wrap grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <div>
              <p className="g-label flex items-center gap-2.5">
                <span className="g-dot" aria-hidden="true" />
                Partner application
              </p>
              <h2 className="g-display g-display--lg mt-5 max-w-[16ch]">
                Tell us how you <em>build or fund.</em>
              </h2>
              <p className="g-body mt-5 max-w-[38ch]">
                Applications are reviewed by the origination desk. Expect a reply within two
                working days, with a diligence pack where there is a fit.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "NDA on request before any commercial detail is shared",
                  "Structured diligence pack for lenders",
                  "Standard bill of materials for contractors",
                ].map((line) => (
                  <p key={line} className="flex items-start gap-2.5 text-[12.5px] text-[rgba(255,250,240,0.5)]">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-[var(--g-gold)]" />
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Panel className="p-6 md:p-8" variant="gold">
              {sent ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <h3 className="g-display mt-4 text-[24px]">Application recorded</h3>
                  <p className="g-body mx-auto mt-3 max-w-[42ch]">
                    The desk has your details. If the WhatsApp handover did not open, the
                    ledger copy is still queued for review.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="g-btn g-btn--ghost mt-7">
                    Submit another
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void dispatch();
                  }}
                >
                  <fieldset>
                    <legend className={`${LABEL} !mb-3`}>Partnership category</legend>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {CATEGORIES.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCategory(item.id)}
                          aria-pressed={category === item.id}
                          className={`rounded-2xl border p-3.5 text-left transition-colors ${
                            category === item.id
                              ? "border-[rgba(198,161,91,0.6)] bg-[rgba(198,161,91,0.12)]"
                              : "border-[rgba(255,250,240,0.12)] hover:border-[rgba(255,250,240,0.26)]"
                          }`}
                        >
                          <p className="text-[13px] font-semibold text-[#fffaf0]">{item.label}</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-[rgba(255,250,240,0.45)]">
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className={`${LABEL} !mb-3`}>Primary contact</legend>
                    <Field label="First name" required value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Arif" />
                    <Field label="Last name" required value={last} onChange={(e) => setLast(e.target.value)} placeholder="Rahman" />
                    <Field label="Work email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="a.rahman@firm.com.bd" />
                    <Field label="Direct phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1711-XXXXXX" />
                    <div className="sm:col-span-2">
                      <Field
                        label="Title / function"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Head of structured finance"
                      />
                    </div>
                  </fieldset>

                  <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className={`${LABEL} !mb-3`}>Organization</legend>
                    <Field
                      label="Company / entity"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Crescent Infrastructure Ltd."
                    />
                    <div>
                      <label className={LABEL}>
                        Track record <span className="text-[var(--g-gold)]">*</span>
                      </label>
                      <select
                        className={FIELD}
                        required
                        value={track}
                        onChange={(e) => setTrack(e.target.value)}
                      >
                        {TRACK.map((option) => (
                          <option key={option} value={option} className="bg-[#0b2419]">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <span className={LABEL}>Operational districts</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {REGIONS.map((region) => (
                          <button
                            key={region}
                            type="button"
                            onClick={() => toggleRegion(region)}
                            aria-pressed={regions.includes(region)}
                            className={`h-9 rounded-full border px-3.5 text-[12px] transition-colors ${
                              regions.includes(region)
                                ? "border-[rgba(198,161,91,0.6)] bg-[rgba(198,161,91,0.14)] text-[var(--g-gold-hi)]"
                                : "border-[rgba(255,250,240,0.12)] text-[rgba(255,250,240,0.55)] hover:border-[rgba(255,250,240,0.28)]"
                            }`}
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                    </div>
                  </fieldset>

                  <button type="submit" className="g-btn w-full">
                    <WhatsAppIcon className="h-4 w-4 shrink-0" />
                    Submit application
                  </button>

                  <p className="text-center text-[10.5px] leading-relaxed text-[rgba(255,250,240,0.3)]">
                    Submitting records your details for this application and opens a WhatsApp
                    handover to the origination desk.
                  </p>
                </form>
              )}
            </Panel>
          </Reveal>
        </div>
      </section>

      <PageCTA
        onAssess={() => setModalOpen(true)}
        title={
          <>
            Underwrite the <em>roof,</em> not the promise.
          </>
        }
        copy="The assessment produces the geometry, yield and settlement basis a credit committee actually needs."
      />
    </GlassShell>
  );
}
