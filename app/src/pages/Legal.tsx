import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FadeUp, Words } from "../components/Reveal";

type Section = { h: string; body: string[] };

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
  return (
    <div className="bg-cream text-ink">
      <Nav theme="light" />
      <main id="content" className="mx-auto max-w-[860px] px-5 pb-28 pt-28 md:px-10 md:pt-40">
        <FadeUp>
          <p className="eyebrow text-orange">Legal · Netso Energy Limited</p>
        </FadeUp>
        <h1 className="font-display mt-5 text-5xl md:text-7xl">
          <Words text={isPrivacy ? "Privacy Policy" : "Terms of Service"} accent={isPrivacy ? 1 : 2} />
        </h1>
        <FadeUp delay={0.15}>
          <p className="mt-4 font-mono text-[12.5px] uppercase tracking-[0.14em] text-ink/45">
            Effective October 1, 2026 · Netso Energy Limited, Dhaka, Bangladesh
          </p>
        </FadeUp>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <FadeUp key={s.h} delay={i * 0.03}>
              <section className="border-b border-ink/10 pb-10">
                <h2 className="font-display-wide text-2xl text-ink md:text-[1.7rem]">{s.h}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3.5 text-[15.5px] leading-[1.75] text-ink/70">
                    {p}
                  </p>
                ))}
              </section>
            </FadeUp>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
