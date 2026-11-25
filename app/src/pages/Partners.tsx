import { useId, useMemo, useState } from "react";
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

/* ------------------------------------------------------------------------- */
/*  Structure metrics — financing is under appraisal, terms are not quoted    */
/* ------------------------------------------------------------------------- */

const STRUCTURE = [
  { val: "CAPEX", unit: "factory-owned", label: "Factory arranges financing", sub: "Netso supports agreed development services; no Netso debt or guarantee." },
  { val: "OPEX", unit: "partner-funded", label: "Third-party ownership", sub: "Funding partner approval and executed site-specific agreements required." },
  { val: "Site", unit: "assessment", label: "Commercial model follows feasibility", sub: "Roof, demand and credit suitability determine available options." },
  { val: "Terms", unit: "negotiated", label: "No published tariff or savings promise", sub: "Commercial terms depend on the selected project route." },
];

const CAPITAL = [
  {
    icon: Landmark,
    t: "Factory-owned CAPEX",
    d: "The factory borrows and owns the rooftop plant. Netso provides agreed development services as a subcontractor within the EPC contract; credit decisions rest with the factory and lenders.",
    tag: "Factory asset",
  },
  {
    icon: Scale,
    t: "Partner-funded OPEX",
    d: "A separate financing partner may fund and own the plant, subject to its approval and a site-specific PPA. No term, tariff, or financing commitment is offered here.",
    tag: "Partner approval",
  },
  {
    icon: Building2,
    t: "Site-led delivery",
    d: "Roof suitability, engineering, payment milestones, ownership and responsibilities are agreed through site review and written contracts before work starts.",
    tag: "Site-specific",
  },
];

const EPC_WHY = [
  {
    n: "01",
    icon: Building2,
    t: "Screened opportunities",
    h: "Assessment before commitment",
    c: "Netso can originate candidate rooftops and coordinate feasibility. No financing, permit, pipeline volume or contracting outcome is promised in advance.",
  },
  {
    n: "02",
    icon: Layers,
    t: "Site-specific engineering",
    h: "Designed for the building",
    c: "Structural condition, loads, coastal wind uplift, drainage, and maintenance access inform the eventual scope and bill of materials.",
  },
  {
    n: "03",
    icon: Award,
    t: "Agreed EPC milestones",
    h: "Payment terms in writing",
    c: "EPC scope, acceptance and any milestone payment schedule are agreed in written, project-specific contracts. No escrow or payment timing is assumed.",
  },
];

const CMP = [
  { k: "Origination", old: "A roof discussed without sufficient site data", dl: "Initial roof and load screening before a proposed scope" },
  { k: "Capital", old: "Financing route not yet established", dl: "Factory-owned CAPEX or approved partner-funded OPEX" },
  { k: "Engineering", old: "One layout applied to every roof", dl: "Engineering defined after building-specific review" },
  { k: "Payment", old: "Milestones left unclear", dl: "Responsibilities and payments agreed in EPC documents" },
  { k: "Handover", old: "Unclear post-installation responsibilities", dl: "O&M scope and access established by agreement" },
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
  id,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div>
      <label htmlFor={inputId} className={LABEL}>
        {label} {props.required ? <span className="text-[var(--g-gold)]">*</span> : null}
      </label>
      <input id={inputId} className={FIELD} {...props} />
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
  const [prepared, setPrepared] = useState(false);

  const toggleRegion = (region: string) =>
    setRegions((current) =>
      current.includes(region) ? current.filter((r) => r !== region) : [...current, region],
    );

  const summary = useMemo(() => {
    const label = CATEGORIES.find((c) => c.id === category)?.label ?? "Partner";
    return `Hello Netso, I am writing about a ${label} partnership.\n\nName: ${first} ${last}\nRole: ${title}\nEntity: ${company}\nEmail: ${email}\nPhone: ${phone}\nTrack record: ${track}\nDistricts: ${regions.join(", ") || "—"}`;
  }, [category, first, last, title, company, email, phone, track, regions]);

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        eyebrow="Partners · capital & delivery"
        title={
          <>
            Rooftop opportunities for the people who <em>build and fund</em> them.
          </>
        }
        lede={
          <>
            Netso develops rooftop solar opportunities with factory owners and partners.
            The factory borrows and owns in CAPEX; OPEX requires a separate funding partner
            and a site-specific PPA.
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
              Factory-owned CAPEX
            </span>
            <span className="g-chip">Partner-funded OPEX · subject to approval</span>
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
            Capital follows the project, not a <em>headline.</em>
          </>
        }
        aside={
          <p>
            The factory arranges any borrowing for CAPEX. An OPEX partner decides whether
            to finance and own a separate plant. Netso provides no debt or guarantee.
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
            All commercial routes are subject to roof assessment, the relevant lender or
            funding partner, and written site-specific terms. Nothing here is a binding offer.
          </p>
        </Reveal>
      </PageSection>

      {/* EPC */}
      <PageSection
        eyebrow="For contractors & engineers"
        title={
          <>
            How EPC teams could work <em>with</em> Netso.
          </>
        }
        aside={
          <p>
            Netso can support origination, feasibility and agreed development services
            inside the EPC contract; funding and engineering responsibilities depend on the route.
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
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.4)]">Without defined assessment</p>
                <p className="mt-1.5 text-[15px] text-[rgba(255,250,240,0.6)]">Unverified project scope</p>
              </div>
              <div className="border-l border-[rgba(198,161,91,0.25)] bg-[rgba(198,161,91,0.08)] p-5">
                <p className="g-label !text-[9px] text-[var(--g-gold)]">Site-assessed approach</p>
                <p className="mt-1.5 text-[15px] font-semibold text-[#fffaf0]">Proposed delivery process</p>
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
                Clearer scope and responsibilities before commitment.
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
                Tell Netso about your experience. Preparing a message here does not send an
                enquiry; you decide whether to send it through WhatsApp.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Confidentiality arrangements agreed before sensitive documents are shared",
                  "Financing and diligence requirements assessed per project",
                  "Engineering scope and materials reviewed for each site",
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
              {prepared ? (
                <div className="py-8">
                  <CheckCircle2 className="h-9 w-9 text-[var(--g-gold)]" aria-hidden="true" />
                  <h3 className="g-display mt-4 text-[24px]">Partnership enquiry ready to review</h3>
                  <p className="g-body mt-3 max-w-[52ch]">
                    Netso has not received this enquiry. Your details were not saved on this device.
                    Review the draft below, then choose Continue in WhatsApp and press Send in that app.
                    Opening WhatsApp does not confirm delivery.
                  </p>
                  <div className="mt-6 max-h-64 overflow-y-auto rounded-xl border border-[rgba(255,250,240,0.14)] bg-black/20 p-4">
                    <pre className="whitespace-pre-wrap break-words font-sans text-[12px] leading-relaxed text-[#fffaf0]">{summary}</pre>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={getNetsoWhatsAppUrl(summary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="g-btn"
                    >
                      <WhatsAppIcon className="h-4 w-4 shrink-0" />
                      Continue in WhatsApp
                    </a>
                    <button type="button" onClick={() => setPrepared(false)} className="g-btn g-btn--ghost">
                      Edit enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="space-y-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setPrepared(true);
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
                      <label htmlFor="partner-track" className={LABEL}>
                        Track record <span className="text-[var(--g-gold)]">*</span>
                      </label>
                      <select
                        id="partner-track"
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
                    Review partnership enquiry
                  </button>

                  <p className="text-center text-[10.5px] leading-relaxed text-[rgba(255,250,240,0.3)]">
                    Review only. Nothing is saved or sent to Netso by this form.
                    To contact the desk, continue in WhatsApp and press Send there.
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
            Assess the <em>roof,</em> then define the terms.
          </>
        }
        copy="A site assessment identifies engineering, demand and commercial information needed for partner review. No financing commitment is implied."
      />
    </GlassShell>
  );
}
