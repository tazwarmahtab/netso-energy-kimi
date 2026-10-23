import { ArrowUpRight, FileCheck2 } from "lucide-react";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageHero } from "../components/glass/shell";
import { useAssessModal } from "../hooks/useAssessModal";

const FILINGS = [
  { entity: "Netso Energy Limited", authority: "RJSC", item: "Certificate of Incorporation", ref: "On file" },
  { entity: "Netso Energy Limited", authority: "SREDA", item: "Net Metering (NEM) 2025 interconnection filings", ref: "Per site" },
  { entity: "Netso Energy Limited", authority: "BERC", item: "Tariff & settlement compliance", ref: "Jun 2026 order" },
  { entity: "Netso Energy Limited", authority: "IDCOL", item: "Concessionary project debt (SREUP window)", ref: "Under appraisal" },
  { entity: "Netso Energy Limited", authority: "BIDA", item: "Tax holiday application", ref: "Dossier filed" },
  { entity: "Netso Energy Limited", authority: "Evident I-TRACK", item: "I-REC registration & monetization", ref: "Workflow established" },
];

/** Statuses that are finished read as gold; everything still in motion stays
 *  quieter so a reader can see at a glance what is closed vs. open. */
const SETTLED = new Set(["On file", "Per site", "Workflow established"]);

/* Each filing authority gets one line of context. This is the difference
   between a compliance table and something a lender can actually read. */
const AUTHORITY_NOTE: Record<string, string> = {
  RJSC: "Registrar of Joint Stock Companies and Firms — company existence.",
  SREDA: "Sustainable & Renewable Energy Development Authority — net metering.",
  BERC: "Bangladesh Energy Regulatory Commission — tariff and settlement.",
  IDCOL: "Infrastructure Development Company Limited — concessional debt.",
  BIDA: "Bangladesh Investment Development Authority — fiscal incentives.",
  "Evident I-TRACK": "International registry for renewable energy certificates.",
};

export default function Licenses() {
  const assess = useAssessModal();
  return (
    <GlassShell {...assess}>
      <PageHero
        compact
        eyebrow="Compliance · Registrations & filings"
        title={
          <>
            Built to be <em>auditable.</em>
          </>
        }
        lede="Netso Energy Limited operates inside Bangladesh's renewable-energy framework. Every registration, filing and programme we rely on is listed here with its current status — including the ones still open."
        meta={
          <>
            <span className="g-chip">RJSC incorporated</span>
            <span className="g-chip">SREDA net metering</span>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              {FILINGS.length} filings tracked
            </span>
          </>
        }
      />

      <section className="g-section g-section--tight">
        <div className="g-wrap">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(255,250,240,0.12)] pb-4">
              <p className="g-label">Filing register</p>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.4)]">
                As of October 2026
              </p>
            </div>
          </Reveal>

          <div className="space-y-2">
            {FILINGS.map((f, i) => (
              <Reveal key={f.item} delay={i * 0.04}>
                <Panel className="group px-5 py-5 md:px-7 md:py-6" sheen={false}>
                  <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] md:items-center md:gap-8">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <FileCheck2
                          aria-hidden="true"
                          className="h-[15px] w-[15px] shrink-0 text-[rgba(198,161,91,0.85)]"
                        />
                        <p className="g-label !text-[9.5px] !tracking-[0.17em] text-[rgba(255,250,240,0.5)]">
                          {f.authority}
                        </p>
                      </div>
                      <p className="mt-2 font-sans text-[14.5px] leading-snug text-[rgba(255,250,240,0.88)]">
                        {f.item}
                      </p>
                    </div>

                    <p className="max-w-[46ch] font-sans text-[12.5px] leading-relaxed text-[rgba(255,250,240,0.42)]">
                      {AUTHORITY_NOTE[f.authority]}
                    </p>

                    <span
                      className={`g-chip w-fit justify-self-start md:justify-self-end ${
                        SETTLED.has(f.ref)
                          ? "border-[rgba(198,161,91,0.42)] text-[var(--g-gold-hi)]"
                          : "border-[rgba(255,250,240,0.18)] text-[rgba(255,250,240,0.62)]"
                      }`}
                    >
                      {f.ref}
                    </span>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-6 border-t border-[rgba(255,250,240,0.1)] pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <p className="max-w-[64ch] font-sans text-[13px] leading-relaxed text-[rgba(255,250,240,0.45)]">
                Filing status is provided for reference and changes as registrations are completed
                or renewed. Items marked <em className="not-italic text-[rgba(255,250,240,0.72)]">under appraisal</em> or{" "}
                <em className="not-italic text-[rgba(255,250,240,0.72)]">filed</em> are in progress, not
                concluded — we do not present a pending application as an approval.
              </p>
              <a
                href="mailto:tazwar@netsoenergy.com?subject=Regulatory%20documentation%20request"
                className="g-btn g-btn--ghost w-fit"
              >
                Request documentation
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </GlassShell>
  );
}
