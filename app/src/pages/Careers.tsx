import { useState } from "react";
import { Users, MapPin, Zap, Shield, Sparkles, Mail } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FeasibilityModal from "../components/FeasibilityModal";
import CTASection from "../components/CTASection";
import { FadeUp } from "../components/Reveal";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../components/ui/WhatsAppIcon";

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
    location: "Dhaka HQ · Site Travel",
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
      "Drive 20-year take-or-pay solar PPA acquisitions across Tier-1 RMG, textile, and pharmaceutical manufacturers in Dhaka, Gazipur, and Chattogram. Work alongside CFOs and Managing Directors to present financial yield models.",
    requirements: [
      "BBA/Finance or Engineering background with demonstrated B2B enterprise sales success",
      "Clear understanding of BERC utility tariff structures, IDCOL senior debt covenants, and cash flows",
      "Executive executive presence and high-conviction communication skills",
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
      "Build and maintain Netso’s proprietary Energy Operating System (NEOS). Manage string-level IoT sensors, RS485 Modbus RTU communication, automated inverter fault detection, and real-time generation dashboards.",
    requirements: [
      "Experience with industrial IoT protocols (Modbus, MQTT, REST APIs)",
      "Familiarity with cloud data pipelines, Grafana, and solar monitoring software",
      "Passion for building reliable hardware-software bridges in tough industrial environments",
    ],
  },
];

export default function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#08140F] min-h-screen text-warm">
      <Nav theme="dark" onOpenAssessment={() => setModalOpen(true)} />

      <main id="content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-warm/10 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
                <Users className="h-4 w-4 text-gold" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                  Careers at Netso Energy
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl">
                Build Infrastructure That <br />
                <span className="text-gold italic font-serif">Outlasts the Monsoon.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-5 text-base sm:text-lg text-sage max-w-2xl mx-auto leading-relaxed">
                We are building Bangladesh's premier private clean energy utility. We value engineering rigor, legal clarity, and uncompromising operational discipline over marketing noise.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-mono text-warm/75">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span>Zero-Phantom Truth Culture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-gold" />
                  <span>Multi-Megawatt Industrial Assets</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>Competitive Equity & Health Benefits</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="py-20 px-6 sm:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between border-b border-warm/10 pb-6 mb-10">
              <div>
                <h2 className="font-display text-3xl font-bold text-cream">Open Positions</h2>
                <p className="mt-1 text-sm text-sage">Join our Dhaka origination and engineering teams.</p>
              </div>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-mono text-xs font-bold text-gold">
                {OPENINGS.length} Active Searches
              </span>
            </div>

            <div className="space-y-8">
              {OPENINGS.map((job, idx) => (
                <FadeUp key={job.id} delay={idx * 0.1}>
                  <div className="rounded-3xl border border-warm/15 bg-forest/40 p-8 md:p-10 transition-all duration-300 hover:border-gold/50 hover:bg-forest/60 shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider text-gold font-semibold">
                          {job.department}
                        </span>
                        <h3 className="font-display mt-1 text-2xl font-bold text-cream">
                          {job.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-warm/60">
                        <span className="flex items-center gap-1 rounded-full border border-warm/15 bg-black/30 px-3 py-1">
                          <MapPin className="h-3 w-3 text-gold" />
                          <span>{job.location}</span>
                        </span>
                        <span className="rounded-full border border-warm/15 bg-black/30 px-3 py-1">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-sage leading-relaxed font-sans">
                      {job.description}
                    </p>

                    <div className="mt-5 border-t border-warm/10 pt-4">
                      <p className="font-mono text-xs uppercase text-warm/50 font-semibold mb-2">Key Competencies:</p>
                      <ul className="space-y-1 text-xs text-warm/75 font-sans">
                        {job.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-gold">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-warm/10">
                      <span className="font-mono text-xs text-warm/50">
                        Reference: NETSO-JOB-{idx + 101}
                      </span>
                      <div className="flex gap-3">
                        <a
                          href={`mailto:careers@netsoenergy.com?subject=Application:%20${encodeURIComponent(job.title)}&body=Dear%20Netso%20Hiring%20Team,%0A%0AI%20am%20applying%20for%20the%20${encodeURIComponent(job.title)}%20position.%20Please%20find%20my%20CV%20and%20credentials%20attached.`}
                          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Apply via Email</span>
                        </a>
                        <a
                          href={getNetsoWhatsAppUrl(`Hello Netso Team, I am reaching out to discuss the ${job.title} opening.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition-all"
                        >
                          <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
                          <span>WhatsApp Desk</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title="Don't see your specific discipline?"
          heading="We are always looking for exceptional engineers."
          copy="Send your portfolio and engineering calculations to careers@netsoenergy.com."
          cta="Request Rooftop Assessment"
        />
      </main>

      <Footer />
      <FeasibilityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
