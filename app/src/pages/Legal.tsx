import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageHero } from "../components/glass/shell";
import { useAssessModal } from "../hooks/useAssessModal";

type Section = { h: string; body: string[] };

const slug = (s: string) => s.toLowerCase().replace(/^[0-9]+\.\s*/, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const PRIVACY: Section[] = [
  {
    h: "1. Information we collect",
    body: [
      "We collect information you provide directly — such as your name, company, address, email, phone number, and facility energy-usage details — when you request an assessment, sign a PPA with Netso, or contact us.",
      "We also collect usage data about how you interact with our site and monitoring platforms, including device information, log data, and cookies, to operate and improve our services.",
    ],
  },
  {
    h: "2. How we use information",
    body: [
      "We use your information to design and build your rooftop energy system, administer your PPA, monitor asset performance, provide support, and communicate with you about your account.",
      "Aggregated, de-identified data may be used to improve asset performance and grid coordination.",
    ],
  },
  {
    h: "3. Sharing",
    body: [
      "We share information with EPC partners, financing counterparties, utilities, regulators, and service providers only as needed to deliver your service, and as required by law.",
      "We do not sell your personal information.",
    ],
  },
  {
    h: "4. Cookies",
    body: [
      "We use cookies to run this site, understand how it is used, and improve your experience. You can accept, reject, or customize non-essential cookies at any time through the banner on this site.",
    ],
  },
  {
    h: "5. Your choices",
    body: [
      "You may request access to, correction of, or deletion of your personal information by contacting us. We respond to verified requests within the timeframes required by applicable law.",
    ],
  },
  {
    h: "6. Contact",
    body: [
      "Questions about this policy can be sent to tazwar@netsoenergy.com.",
    ],
  },
];

const TERMS: Section[] = [
  {
    h: "1. The service",
    body: [
      "Netso Energy provides solar Energy-as-a-Service: rooftop solar systems financed, built, owned and operated by Netso Energy Limited, with electricity supplied under long-term power purchase agreements. Specific terms, tariffs, and equipment are defined in your individual Power Purchase Agreement.",
    ],
  },
  {
    h: "2. Eligibility",
    body: [
      "Not every roof qualifies. Qualification depends on location, roof structure, sanctioned load, shading, utility territory, and credit review. Estimates provided on this site are illustrative and not a binding offer.",
    ],
  },
  {
    h: "3. Savings",
    body: [
      "Savings figures — including '28–35%' — are estimates based on current BERC tariff schedules and modeled system performance. Actual savings vary with weather, consumption, and utility pricing, and are guaranteed only where expressly stated in your agreement.",
    ],
  },
  {
    h: "4. Equipment and ownership",
    body: [
      "Netso owns and maintains the equipment for the duration of your agreement. Buy-out, transfer, and end-of-term options are defined per contract.",
    ],
  },
  {
    h: "5. Acceptable use",
    body: [
      "You agree not to misuse the site, interfere with system monitoring or metering, or attempt to access accounts or data that are not yours.",
    ],
  },
  {
    h: "6. Changes",
    body: [
      "We may update these terms from time to time. Material changes will be posted on this page with an updated effective date.",
    ],
  },
];

export default function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const sections = isPrivacy ? PRIVACY : TERMS;
  const assess = useAssessModal();

  return (
    <GlassShell {...assess}>
      <PageHero
        compact
        eyebrow={`Legal · Netso Energy Limited`}
        title={
          isPrivacy ? (
            <>
              Privacy, in <em>plain terms.</em>
            </>
          ) : (
            <>
              Terms, in <em>plain terms.</em>
            </>
          )
        }
        lede={
          isPrivacy
            ? "What we collect when you ask us to look at a roof, why we need it, and how to get it back. Written to be read, not skimmed past."
            : "How the Energy-as-a-Service relationship is structured, what the estimates on this site do and do not mean, and where your individual agreement takes over."
        }
        meta={
          <>
            <span className="g-chip">Effective 1 October 2026</span>
            <span className="g-chip">{sections.length} sections</span>
            <span className="g-chip">Dhaka, Bangladesh</span>
          </>
        }
      />

      <section className="g-section g-section--tight">
        <div className="g-wrap grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-16">
          {/* Contents index */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="g-label">Contents</p>
              <nav aria-label="Document contents" className="mt-5">
                <ol className="space-y-0.5">
                  {sections.map((s) => (
                    <li key={s.h}>
                      <a
                        href={`#${slug(s.h)}`}
                        className="group flex items-baseline gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[rgba(255,250,240,0.045)]"
                      >
                        <span className="font-mono text-[10px] text-[rgba(198,161,91,0.75)]">
                          {s.h.match(/^\d+/)?.[0]?.padStart(2, "0")}
                        </span>
                        <span className="font-sans text-[13.5px] leading-snug text-[rgba(255,250,240,0.62)] transition-colors group-hover:text-[#fffaf0]">
                          {s.h.replace(/^[0-9]+\.\s*/, "")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="mt-8 border-t border-[rgba(255,250,240,0.1)] pt-6">
                <p className="g-label !text-[9px] text-[rgba(255,250,240,0.42)]">Questions</p>
                <a
                  href="mailto:tazwar@netsoenergy.com"
                  className="mt-2 inline-block font-mono text-[12px] text-[var(--g-gold-hi)] transition-opacity hover:opacity-75"
                >
                  tazwar@netsoenergy.com
                </a>
              </div>
            </Reveal>
          </aside>

          {/* Document body */}
          <div>
            <Reveal>
              <Panel className="px-6 py-8 md:px-10 md:py-12">
                <div className="space-y-10">
                  {sections.map((s) => (
                    <section
                      key={s.h}
                      id={slug(s.h)}
                      className="scroll-mt-28 border-b border-[rgba(255,250,240,0.08)] pb-10 last:border-0 last:pb-0"
                    >
                      <h2 className="g-display text-[24px] md:text-[28px]">{s.h}</h2>
                      {s.body.map((para, j) => (
                        <p
                          key={j}
                          className="mt-4 max-w-[62ch] font-sans text-[15px] leading-[1.78] text-[rgba(255,250,240,0.66)]"
                        >
                          {para}
                        </p>
                      ))}
                    </section>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[62ch] font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.13em] text-[rgba(255,250,240,0.34)]">
                Superseded versions available on request. Governing law: People&rsquo;s Republic of
                Bangladesh.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </GlassShell>
  );
}
