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
       "Industrial customers need to understand how tariff changes affect operating costs. This briefing explains the questions to ask when comparing grid exposure with a rooftop power agreement.",
     takeaway: "A well-structured rooftop PPA can make part of the power price easier to plan.",
    metrics: [
       { label: "Primary question", val: "What changes?" },
       { label: "Commercial response", val: "Assess a PPA" },
       { label: "Decision input", val: "Your tariff data" },
    ],
  },
  {
    slug: "eu-cbam-decarbonization-bangladesh-rmg",
    category: "Export Compliance",
    date: "May 2026",
    readTime: "7 min read",
     title: "Export decarbonisation: What rooftop solar can evidence for buyers",
    summary:
       "Export manufacturers increasingly need reliable energy and emissions data for customer and supply-chain reporting. This briefing separates what rooftop solar can evidence from what each buyer or programme still requires.",
     takeaway: "Use project data as evidence, then match it to the buyer or reporting programme that applies.",
    metrics: [
       { label: "Evidence source", val: "Metered generation" },
       { label: "Environmental claim", val: "Verify per programme" },
       { label: "Buyer status", val: "Confirm per customer" },
    ],
  },
  {
    slug: "sreda-nem-2025-grid-settlement-guide",
    category: "Engineering & Utility",
    date: "April 2026",
    readTime: "6 min read",
    title: "SREDA Net Metering (NEM 2025) Guidelines: Interconnection & Credit Settlement",
    summary:
       "A practical walkthrough of the information utilities and project teams need to review a rooftop solar connection, including load data, protection, metering, export and settlement.",
     takeaway: "Export credit is a project and utility question, not an assumption to make before approval.",
    metrics: [
       { label: "Export treatment", val: "Confirm per site" },
       { label: "Metering", val: "Agree per connection" },
       { label: "Approval timing", val: "Depends on utility" },
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
                 Clear, practical briefings on industrial energy costs, rooftop solar, utility coordination and the reporting questions that matter to Bangladesh's manufacturers.
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
                       <span>Discuss this topic</span>
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
           copy="Have a question about your facility's tariff, roof or utility connection? Start a conversation with the Netso team."
           cta="Talk to Netso"
        />
      </main>

      <Footer />
      <FeasibilityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
