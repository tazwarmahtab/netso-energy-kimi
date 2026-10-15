import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FadeUp, Stagger, StaggerItem, Words } from "../components/Reveal";

const FILINGS = [
  { entity: "Netso Energy Limited", authority: "RJSC", item: "Certificate of Incorporation", ref: "On file" },
  { entity: "Netso Energy Limited", authority: "SREDA / utility", item: "Net-metering and interconnection work", ref: "Reviewed per site" },
  { entity: "Netso Energy Limited", authority: "BERC / utility", item: "Tariff and settlement review", ref: "Applied per project" },
  { entity: "Netso Energy Limited", authority: "Financing partners", item: "Project finance diligence", ref: "Subject to appraisal" },
  { entity: "Netso Energy Limited", authority: "Relevant authorities", item: "Corporate and project registrations", ref: "Verified per engagement" },
  { entity: "Netso Energy Limited", authority: "Environmental programmes", item: "Attribute and reporting eligibility", ref: "Confirmed per project" },
];

export default function Licenses() {
  return (
    <div className="bg-cream text-ink">
      <Nav theme="light" />
      <main id="content" className="mx-auto max-w-[1100px] px-5 pb-28 pt-28 md:px-10 md:pt-40">
        <FadeUp>
          <p className="eyebrow text-gold">Compliance</p>
        </FadeUp>
        <h1 className="font-display mt-5 text-6xl md:text-8xl">
          <Words text="Regulatory & Filings" accent={1} />
        </h1>
        <FadeUp delay={0.15}>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink/70">
             Netso works within the regulatory and utility processes that apply to each rooftop solar project in Bangladesh. The table below describes the workstreams we review; it is not a claim that every approval applies to every site.
          </p>
        </FadeUp>

        <FadeUp className="mt-12 overflow-hidden rounded-3xl border border-ink/10">
          <div className="hidden grid-cols-[1.2fr_1fr_1.6fr_1fr] bg-ink md:grid">
            {["Entity", "Authority", "Item", "Status"].map((h) => (
              <span key={h} className="eyebrow p-5 text-cream/60">
                {h}
              </span>
            ))}
          </div>
          <Stagger gap={0.05}>
            {FILINGS.map((l) => (
              <StaggerItem key={l.item}>
                <div
                  className={`grid gap-2 p-5 md:grid-cols-[1.2fr_1fr_1.6fr_1fr] md:items-center md:gap-0 md:p-0 ${
                    FILINGS.indexOf(l) % 2 ? "bg-parchment" : "bg-cream"
                  }`}
                >
                  <span className="text-[15px] font-semibold text-ink md:p-5">{l.entity}</span>
                  <span className="text-[14px] text-ink/70 md:p-5">{l.authority}</span>
                  <span className="text-[14px] text-ink/70 md:p-5">{l.item}</span>
                  <span className="font-mono text-[13.5px] font-bold text-forest md:p-5">{l.ref}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-8 text-[13.5px] leading-relaxed text-ink/50">
             Status depends on the project, authority and current rules. We share supporting documents during the relevant diligence or customer engagement.
            Questions about our regulatory posture? Contact us at tazwar@netsoenergy.com.
          </p>
        </FadeUp>
      </main>
      <Footer />
    </div>
  );
}
