import { useState } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageCTA, PageHero } from "../components/glass/shell";
import { getNetsoWhatsAppUrl, WhatsAppIcon } from "../components/ui/WhatsAppIcon";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const OPENINGS: JobOpening[] = [
  {
    id: "lead-solar-engineer",
    title: "Senior Solar PV Structural Engineer",
    department: "Engineering & Procurement",
    location: "Dhaka HQ · Site travel",
    type: "Full-time",
    description:
      "Lead civil and mechanical design for high-tensile steel solar pergolas. Oversee wind load calculations (160+ km/h BNBC codes), bifacial shadow simulation, and structural integrity certifications for industrial factory rooftops.",
    requirements: [
      "B.Sc. in Civil or Mechanical Engineering (BUET/CUET/RUET preferred)",
      "4+ years experience in C&I rooftop structural design and AutoCAD/STAAD.Pro",
      "Thorough knowledge of BNBC wind load regulations and structural retrofits",
    ],
  },
  {
    id: "origination-associate",
    title: "Industrial PPA Origination Associate",
    department: "Commercial & Business Development",
    location: "Gulshan-2, Dhaka",
    type: "Full-time",
    description:
      "Drive 20-year rooftop solar offtake across Tier-1 RMG, textile, and pharmaceutical manufacturers in Dhaka, Gazipur, and Chattogram. Work alongside CFOs and Managing Directors to present financial yield models.",
    requirements: [
      "BBA/Finance or Engineering background with demonstrated B2B enterprise sales success",
      "Clear understanding of BERC utility tariff structures, IDCOL senior debt covenants, and cash flows",
      "Executive presence and high-conviction communication skills",
    ],
  },
  {
    id: "grid-interconnection-specialist",
    title: "High-Voltage Grid Interconnection Specialist",
    department: "Utility Operations & Compliance",
    location: "Gazipur / Narayanganj",
    type: "Full-time",
    description:
      "Direct on-site 11kV/33kV utility synchronization with BREB and BPDB distribution networks under SREDA Net Metering (NEM 2025) standards. Commission bidirectional Class 0.2s metering and SCADA telemetry.",
    requirements: [
      "B.Sc. in Electrical & Electronic Engineering (EEE)",
      "Hands-on experience with HT switchgear, transformer protection, and utility approvals",
      "Active ABC Electrical Licensing Board certification",
    ],
  },
  {
    id: "scada-telemetry-engineer",
    title: "IoT SCADA & Uptime Telemetry Engineer",
    department: "Digital Systems (NEOS)",
    location: "Dhaka HQ",
    type: "Full-time",
    description:
      "Build and maintain Netso's proprietary Energy Operating System (NEOS). Manage string-level IoT sensors, RS485 Modbus RTU communication, automated inverter fault detection, and real-time generation dashboards.",
    requirements: [
      "Experience with industrial IoT protocols (Modbus, MQTT, REST APIs)",
      "Familiarity with cloud data pipelines, Grafana, and solar monitoring software",
      "Passion for building reliable hardware-software bridges in tough industrial environments",
    ],
  },
];

/* What the hiring process actually is. Stating it up front is the strongest
   signal we can send that the "rigour" line above is not a slogan. */
const PROCESS = [
  { k: "01", h: "Send the work", b: "A CV, plus one thing you built and can defend in detail — a calculation, a model, a commissioning report." },
  { k: "02", h: "A technical conversation", b: "Ninety minutes with the person you would work for. Real drawings, real numbers, no case-study theatre." },
  { k: "03", h: "Site or desk trial", b: "A paid half-day on a live roof or in the model. You should see the job before you accept it." },
  { k: "04", h: "Offer inside two weeks", b: "We move at the pace of the construction programme, because the roof cannot wait for a hiring committee." },
];

const DISCIPLINES = [
  "Structural engineering",
  "Electrical / EEE",
  "Utility interconnection",
  "Origination & structuring",
  "Energy modelling",
  "Asset operations",
  "Embedded / Modbus",
  "Project finance",
];

export default function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        eyebrow="Careers · Dhaka, Gazipur, Chattogram"
        title={
          <>
            Build infrastructure that <em>outlasts the monsoon.</em>
          </>
        }
        lede="We are building a private clean-energy utility for Bangladesh's industrial belt. We value engineering rigour, legal clarity and operational discipline over marketing noise — and we describe the work honestly, including the parts that are hard."
        actions={
          <>
            <a href="#openings" className="g-btn">
              {OPENINGS.length} open roles
            </a>
            <a
              href="mailto:careers@netsoenergy.com?subject=Speculative%20application%20%E2%80%94%20Netso%20Energy"
              className="g-btn g-btn--ghost"
            >
              Send a speculative application
            </a>
          </>
        }
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              Straight answers, including the inconvenient ones
            </span>
            <span className="g-chip">Multi-megawatt industrial assets</span>
            <span className="g-chip">Equity & health cover</span>
          </>
        }
      />

      {/* Why here */}
      <section className="g-section--tight g-section">
        <div className="g-wrap">
          <Reveal>
            <div className="grid gap-8 border-b border-[rgba(255,250,240,0.12)] pb-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
              <div>
                <p className="g-label">The work</p>
                <h2 className="g-display mt-4 text-[clamp(1.7rem,3.4vw,2.5rem)]">
                  Assets you can stand <em>under.</em>
                </h2>
              </div>
              <p className="max-w-[52ch] font-sans text-[14.5px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                A megawatt on a spreadsheet is a rounding exercise. A megawatt on a
                corrugated factory roof in Gazipur, holding 160 km/h of monsoon wind across
                twenty years, is an engineering problem — and the only one we are
                interested in.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06}>
                <Panel className="flex h-full flex-col px-5 py-6" variant="quiet" sheen={false}>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[rgba(198,161,91,0.7)]">
                    {s.k}
                  </span>
                  <h3 className="mt-3 font-sans text-[15px] font-medium leading-snug text-[rgba(255,250,240,0.9)]">
                    {s.h}
                  </h3>
                  <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.45)]">
                    {s.b}
                  </p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="g-section g-section--tight scroll-mt-24">
        <div className="g-wrap">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(255,250,240,0.12)] pb-4">
              <div>
                <p className="g-label">Open positions</p>
                <h2 className="g-display mt-3 text-[clamp(1.6rem,3vw,2.2rem)]">
                  {OPENINGS.length} active searches
                </h2>
              </div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.4)]">
                Dhaka origination & engineering
              </p>
            </div>
          </Reveal>

          <div className="mt-6 space-y-3">
            {OPENINGS.map((job, idx) => (
              <Reveal key={job.id} delay={idx * 0.05}>
                <Panel className="px-5 py-6 md:px-8 md:py-8" sheen={false}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="g-label !text-[9.5px] !tracking-[0.17em] text-[rgba(198,161,91,0.8)]">
                        {job.department}
                      </p>
                      <h3 className="mt-2.5 font-sans text-[19px] font-medium leading-snug text-[#fffaf0] md:text-[21px]">
                        {job.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="g-chip">
                        <MapPin aria-hidden="true" className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="g-chip">{job.type}</span>
                    </div>
                  </div>

                  <p className="mt-4 max-w-[76ch] font-sans text-[14px] leading-relaxed text-[rgba(255,250,240,0.6)]">
                    {job.description}
                  </p>

                  <div className="mt-5 border-t border-[rgba(255,250,240,0.08)] pt-4">
                    <p className="g-label !text-[9px] !tracking-[0.17em] text-[rgba(255,250,240,0.36)]">
                      Key competencies
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {job.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-[rgba(198,161,91,0.8)]"
                          />
                          <span className="font-sans text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,250,240,0.08)] pt-4">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.3)]">
                      Ref · NETSO-JOB-{idx + 101}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`mailto:careers@netsoenergy.com?subject=Application:%20${encodeURIComponent(
                          job.title,
                        )}&body=${encodeURIComponent(
                          `Dear Netso Hiring Team,\n\nI am applying for the ${job.title} position. Please find my CV and credentials attached.\n\nRegards,`,
                        )}`}
                        className="g-btn g-btn--sm"
                      >
                        <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                        Apply by email
                      </a>
                      <a
                        href={getNetsoWhatsAppUrl(
                          `Hello Netso Team, I am reaching out to discuss the ${job.title} opening.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="g-btn g-btn--ghost g-btn--sm"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[rgba(255,250,240,0.1)] pt-5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.17em] text-[rgba(255,250,240,0.34)]">
                Not your discipline?
              </span>
              {DISCIPLINES.map((d) => (
                <span key={d} className="font-sans text-[12px] text-[rgba(255,250,240,0.42)]">
                  {d}
                  <span aria-hidden="true" className="ml-3 text-[rgba(198,161,91,0.4)]">
                    ·
                  </span>
                </span>
              ))}
              <a
                href="mailto:careers@netsoenergy.com?subject=Speculative%20application%20%E2%80%94%20Netso%20Energy"
                className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--g-gold-hi)] transition-opacity hover:opacity-75"
              >
                Write anyway
                <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <PageCTA
        onAssess={() => setModalOpen(true)}
        title={
          <>
            Send a roof. We will send back <em>the truth about it.</em>
          </>
        }
        copy="Whether you are applying or exploring a rooftop for your own plant, the first step is the same: twelve months of bills and a roof plan."
      />
    </GlassShell>
  );
}
