import { useState } from "react";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FeasibilityModal from "../components/FeasibilityModal";
import CTASection from "../components/CTASection";
import { FadeUp } from "../components/Reveal";
import { getNetsoWhatsAppUrl } from "../components/ui/WhatsAppIcon";

interface Article {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  summary: string;
  takeaway: string;
  metrics: { label: string; val: string }[];
}

const ARTICLES: Article[] = [
  {
    slug: "berc-2026-industrial-tariff-hike",
    category: "Regulatory & Tariffs",
    date: "June 2026",
    readTime: "5 min read",
    title: "BERC June 2026 Industrial Tariff Hike: What It Means for Factory EBITDA",
    summary:
      "The latest BERC tariff order bumped industrial MT-2/HT-3 grid power tariffs by up to 16.7% in unhedged utility expenses. We analyze why fixed-tariff PPAs fail and why floating discount structures preserve operational margins.",
    takeaway: "Floating solar PPAs at 30% discount turn grid tariff volatility into expanding cash savings.",
    metrics: [
      { label: "Utility Grid Hike", val: "+16.7%" },
      { label: "Netso Offtaker Hedge", val: "30% Guaranteed" },
      { label: "Tariff Exposure", val: "Zero" },
    ],
  },
  {
    slug: "eu-cbam-decarbonization-bangladesh-rmg",
    category: "Export Compliance",
    date: "May 2026",
    readTime: "7 min read",
    title: "EU CBAM & Decarbonization: How On-Site Solar Safeguards European Buyer Orders",
    summary:
      "Starting 2026, European Union Carbon Border Adjustment Mechanism (CBAM) audits require verified Scope 2 emission abatement. Dual-glass rooftop solar provides certified on-site generation data directly mapped into buyer Higg FEM scorecards.",
    takeaway: "Every 1 MWp of on-site solar abates ~840 tonnes of CO₂ annually with audited I-REC certificates.",
    metrics: [
      { label: "Annual CO₂ Abated (1 MWp)", val: "840 Tonnes" },
      { label: "Certification Standard", val: "I-REC Standard" },
      { label: "Buyer Audit Status", val: "EU CBAM Compliant" },
    ],
  },
  {
    slug: "sreda-nem-2025-grid-settlement-guide",
    category: "Engineering & Utility",
    date: "April 2026",
    readTime: "6 min read",
    title: "SREDA Net Metering (NEM 2025) Guidelines: Interconnection & Credit Settlement",
    summary:
      "A technical walkthrough of how 11kV and 33kV industrial feeders synchronize bi-directional Class 0.2s utility meters with BREB/BPDB distribution substations, enabling 90% net export billing credits without plant shutdown.",
    takeaway: "Surplus Friday and holiday solar export automatically offsets subsequent weekday manufacturing bills.",
    metrics: [
      { label: "Utility Net Credit", val: "90% Exported Units" },
      { label: "Meter Precision", val: "Class 0.2s Bidirectional" },
      { label: "Interconnection Window", val: "45–60 Days" },
    ],
  },
];

export default function InsightsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#08140F] min-h-screen text-warm">
      <Nav theme="dark" onOpenAssessment={() => setModalOpen(true)} />

      <main id="content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-warm/10 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 h-[500px] w-[600px] rounded-full bg-gold/10 blur-[140px]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
                <BookOpen className="h-4 w-4 text-gold" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                  Netso Intelligence & Analysis
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl">
                Regulatory Briefings for <br />
                <span className="text-gold italic font-serif">Industrial Energy Leadership.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-5 text-base sm:text-lg text-sage max-w-2xl mx-auto leading-relaxed">
                Objective analysis on BERC tariff schedules, SREDA net metering frameworks, and EU CBAM decarbonization requirements for Bangladesh's manufacturing backbone.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Articles Feed */}
        <section className="py-20 px-6 sm:px-12">
          <div className="mx-auto max-w-5xl space-y-10">
            {ARTICLES.map((art, idx) => (
              <FadeUp key={art.slug} delay={idx * 0.1}>
                <article className="group relative rounded-3xl border border-warm/15 bg-forest/40 p-8 md:p-10 transition-all duration-300 hover:border-gold/50 hover:bg-forest/60 shadow-xl backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-warm/60">
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-semibold text-gold">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-warm/40" />
                        <span>{art.date}</span>
                      </span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-display mt-5 text-2xl sm:text-3xl font-bold text-cream group-hover:text-gold transition-colors">
                    {art.title}
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-sage leading-relaxed font-sans">
                    {art.summary}
                  </p>

                  {/* Key Metrics Strip */}
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 rounded-2xl border border-warm/10 bg-black/30 p-4">
                    {art.metrics.map((m) => (
                      <div key={m.label} className="font-mono">
                        <p className="text-[10px] uppercase text-warm/50">{m.label}</p>
                        <p className="text-sm font-bold text-warm mt-0.5">{m.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Commercial Takeaway */}
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-warm/10 pt-5">
                    <p className="text-xs text-warm/80 italic font-serif">
                      <strong className="font-mono not-italic text-gold uppercase tracking-wider text-[11px] block sm:inline sm:mr-2">
                        Executive Takeaway:
                      </strong>
                      {art.takeaway}
                    </p>

                    <a
                      href={getNetsoWhatsAppUrl(`Hello Tazwar, I read the insight on "${art.title}" and would like to request the detailed whitepaper dossier.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold text-gold hover:text-warm transition-colors"
                    >
                      <span>Request Full Dossier</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </section>

        <CTASection
          title="Stay ahead of the grid"
          heading="Have specific tariff questions for your plant?"
          copy="Connect directly with our origination and regulatory compliance desk."
          cta="Request Rooftop Assessment"
        />
      </main>

      <Footer />
      <FeasibilityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
