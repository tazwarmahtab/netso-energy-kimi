import { useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageCTA, PageHero } from "../components/glass/shell";
import { getNetsoWhatsAppUrl, WhatsAppIcon } from "../components/ui/WhatsAppIcon";

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

/**
 * Copy note: the metric values here were previously stated as guarantees
 * ("30% Guaranteed", "Tariff Exposure: Zero", "EU CBAM Compliant"). They are <!-- claims-guard: allow -->
 * modelled or regulatory observations, so they now say so. The claims contract
 * in scripts/claims-contract.test.mjs enforces the same rule site-wide.
 */
const ARTICLES: Article[] = [
  {
    slug: "berc-2026-industrial-tariff-hike",
    category: "Regulatory & Tariffs",
    date: "June 2026",
    readTime: "5 min read",
    title: "BERC June 2026 Industrial Tariff Hike: What It Means for Factory EBITDA",
    summary:
      "The latest BERC tariff order moved industrial MT-2/HT-3 grid power tariffs by up to 16.7%. This is not a Netso number — it is the regulator's. What it changes is the arithmetic of a fixed-price energy contract, and why a floating discount structure tracks the bill instead of eroding against it.",
    takeaway:
      "A floating discount to the grid tariff turns tariff volatility into a saving that moves with the bill, rather than a fixed rate that inflates away over twenty years.",
    metrics: [
      { label: "Indicative BERC step", val: "+16.7%" },
      { label: "Structure", val: "Floating discount" },
      { label: "Basis", val: "Applicable grid tariff" },
    ],
  },
  {
    slug: "eu-cbam-decarbonization-bangladesh-rmg",
    category: "Export Compliance",
    date: "May 2026",
    readTime: "7 min read",
    title: "EU CBAM & Decarbonization: How On-Site Solar Safeguards European Buyer Orders",
    summary:
      "European Union Carbon Border Adjustment Mechanism (CBAM) reporting increasingly asks buyers for verified Scope 2 abatement rather than a narrative. Dual-glass rooftop solar produces metered, string-level generation data that maps cleanly into a buyer's Higg FEM submission.",
    takeaway:
      "On-site generation is the only Scope 2 line a factory can evidence from its own meter. We model roughly 840 tonnes of CO₂ avoided per MWp per year — a modelled figure, not a certified one, until the I-REC issuance lands.",
    metrics: [
      { label: "Annual CO₂ avoided (1 MWp)", val: "~840 t · modelled" },
      { label: "Evidence chain", val: "I-REC issuance" },
      { label: "Reporting fit", val: "Scope 2 · Higg FEM" },
    ],
  },
  {
    slug: "sreda-nem-2025-grid-settlement-guide",
    category: "Engineering & Utility",
    date: "April 2026",
    readTime: "6 min read",
    title: "SREDA Net Metering (NEM 2025) Guidelines: Interconnection & Credit Settlement",
    summary:
      "A technical walkthrough of how 11kV and 33kV industrial feeders synchronise bidirectional Class 0.2s utility meters with BREB/BPDB distribution substations, enabling net-export billing credits without a plant shutdown.",
    takeaway:
      "Surplus Friday and holiday generation exports to the grid and offsets subsequent weekday manufacturing bills. The credit mechanism is set by the NEM 2025 order; the export volume is site-specific.",
    metrics: [
      { label: "Net credit mechanism", val: "Per NEM 2025" },
      { label: "Meter class", val: "0.2s bidirectional" },
      { label: "Interconnection window", val: "45–60 days · indicative" },
    ],
  },
];

const CATEGORIES = ["Regulatory & Tariffs", "Export Compliance", "Engineering & Utility"];

/* The standing disclosure. Every figure on this page is either a regulator's
   published number or our model output — saying which is which is the whole
   point of the page, so it sits above the feed rather than in a footnote. */
const NOTE =
  "Figures are either cited from the regulator's published order or produced by Netso's own yield model. Modelled output is illustrative of a specific site and configuration, not a performance warranty; savings are defined only in an executed agreement.";

export default function InsightsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [feature, ...rest] = ARTICLES;

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        eyebrow="Netso intelligence & analysis"
        title={
          <>
            Regulatory briefings for <em>industrial energy leadership.</em>
          </>
        }
        lede="Objective analysis on BERC tariff schedules, SREDA net metering and EU CBAM requirements — written for the CFO and the plant engineer who have to act on them, not for a press release."
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              {ARTICLES.length} briefings
            </span>
            {CATEGORIES.map((c) => (
              <span key={c} className="g-chip">
                {c}
              </span>
            ))}
          </>
        }
      />

      <section className="g-section g-section--tight">
        <div className="g-wrap">
          <Reveal>
            <div className="grid gap-4 border-b border-[rgba(255,250,240,0.12)] pb-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
              <p className="g-label">The desk</p>
              <p className="max-w-[62ch] font-sans text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.42)]">
                {NOTE}
              </p>
            </div>
          </Reveal>

          {/* Feature */}
          <Reveal delay={0.04}>
            <Panel className="mt-6 px-5 py-7 md:px-9 md:py-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="g-chip border-[rgba(198,161,91,0.42)] text-[var(--g-gold-hi)]">
                  {feature.category}
                </span>
                <span className="g-chip">
                  <Calendar aria-hidden="true" className="h-3 w-3" />
                  {feature.date}
                </span>
                <span className="g-chip">{feature.readTime}</span>
              </div>

              <h2 className="g-display mt-5 max-w-[34ch] text-[clamp(1.5rem,3.2vw,2.15rem)]">
                {feature.title}
              </h2>

              <p className="mt-4 max-w-[74ch] font-sans text-[14px] leading-[1.72] text-[rgba(255,250,240,0.6)]">
                {feature.summary}
              </p>

              <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-[rgba(255,250,240,0.09)] bg-[rgba(255,250,240,0.09)] sm:grid-cols-3">
                {feature.metrics.map((m) => (
                  <div key={m.label} className="bg-[rgba(4,13,9,0.55)] px-4 py-3.5">
                    <p className="font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-[rgba(255,250,240,0.38)]">
                      {m.label}
                    </p>
                    <p className="mt-1.5 font-sans text-[14px] font-medium text-[rgba(255,250,240,0.88)]">
                      {m.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-[rgba(255,250,240,0.08)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[64ch] font-sans text-[13px] italic leading-relaxed text-[rgba(255,250,240,0.55)]">
                  <span className="mr-2 font-mono text-[9.5px] not-italic uppercase tracking-[0.16em] text-[rgba(198,161,91,0.8)]">
                    Takeaway
                  </span>
                  {feature.takeaway}
                </p>
                <a
                  href={getNetsoWhatsAppUrl(
                    `Hello Tazwar, I read the insight on "${feature.title}" and would like to request the detailed whitepaper dossier.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="g-btn g-btn--sm shrink-0 self-start"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
                  Request the dossier
                </a>
              </div>
            </Panel>
          </Reveal>

          {/* Rest */}
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {rest.map((art, idx) => (
              <Reveal key={art.slug} delay={0.06 + idx * 0.06}>
                <Panel className="flex h-full flex-col px-5 py-6 md:px-7 md:py-7" sheen={false}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="g-chip !text-[9px]">{art.category}</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.32)]">
                      {art.date} · {art.readTime}
                    </span>
                  </div>

                  <h3 className="g-display mt-4 text-[clamp(1.12rem,2vw,1.35rem)] leading-[1.22]">
                    {art.title}
                  </h3>

                  <p className="mt-3 font-sans text-[13px] leading-relaxed text-[rgba(255,250,240,0.55)]">
                    {art.summary}
                  </p>

                  <dl className="mt-5 space-y-2 border-t border-[rgba(255,250,240,0.08)] pt-4">
                    {art.metrics.map((m) => (
                      <div key={m.label} className="flex items-baseline justify-between gap-4">
                        <dt className="font-mono text-[9px] uppercase tracking-[0.13em] text-[rgba(255,250,240,0.34)]">
                          {m.label}
                        </dt>
                        <dd className="text-right font-sans text-[12.5px] text-[rgba(255,250,240,0.8)]">
                          {m.val}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <a
                      href={getNetsoWhatsAppUrl(
                        `Hello Tazwar, I read the insight on "${art.title}" and would like to request the detailed whitepaper dossier.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--g-gold-hi)] transition-opacity hover:opacity-75"
                    >
                      Request dossier
                      <ArrowRight aria-hidden="true" className="h-3 w-3" />
                    </a>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[rgba(255,250,240,0.2)]"
                    />
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        onAssess={() => setModalOpen(true)}
        title={
          <>
            Have a tariff question for <em>your plant?</em>
          </>
        }
        copy="The origination and regulatory desk answers specifics — tariff class, sanctioned load, interconnection route, export credit. Send the bills and we will work from your numbers, not a brochure figure."
      />
    </GlassShell>
  );
}
