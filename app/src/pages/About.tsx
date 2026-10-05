import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import FeasibilityModal from "../components/FeasibilityModal";
import { FadeUp, Stagger, StaggerItem, Words } from "../components/Reveal";
import { SunMark } from "../components/Wordmark";
import aerial from "../assets/neighborhood-aerial.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const MEANS = [
  {
    title: "A factory's biggest cost, finally contained",
    desc: "Energy is often 20%–35% of an industrial plant's operational expenditure. Netso locks in 20-year fixed tariffs below the grid peak.",
    stat: "35% Instant Cut",
  },
  {
    title: "Every idle roof converted into a productive utility asset",
    desc: "Hundreds of thousands of square meters of reinforced concrete industrial roofs sit idle in Chattogram and Gazipur. We turn them into clean revenue-producing power plants.",
    stat: "৳0 Upfront CAPEX",
  },
  {
    title: "Clean power for the economy the world buys from",
    desc: "Global apparel brands, European buyers, and ESG supply chain covenants mandate decarbonization. Netso delivers auditable I-RECs and zero-carbon grid offsets.",
    stat: "100% Audited I-RECs",
  },
];

function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative flex min-h-[95svh] flex-col justify-end overflow-hidden bg-forest text-warm">
      <motion.img
        src={aerial}
        alt="Industrial rooftop solar arrays across Bangladesh manufacturing hubs"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.1, opacity: 0.35 }}
        animate={{ scale: 1, opacity: 0.65 }}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/40" />

      {/* Corporate Pill */}
      <div className="absolute top-28 left-6 z-20 hidden md:block lg:left-12">
        <div className="flex items-center gap-2.5 rounded-full border border-gold/30 bg-forest/85 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="font-mono text-xs font-medium tracking-wide text-gold">
            C&I Distributed Rooftop Utility · Dhaka & Chattogram
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pb-16 pt-32 text-center md:px-10 md:pb-24">
        <motion.p
          className="font-mono text-xs font-semibold uppercase tracking-wider text-gold mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
        >
          About Netso Energy Ltd
        </motion.p>
        <h1 className="font-display max-w-5xl text-[10vw] leading-[0.98] text-warm sm:text-6xl md:text-8xl">
          <Words text="Industrial rooftop infrastructure. Engineered for Bangladesh." accent={1} />
        </h1>
        <motion.p
          className="mt-8 max-w-2xl text-[16.5px] leading-relaxed text-warm/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
        >
          Netso Energy is Bangladesh’s distributed renewable energy utility. We originate, finance,
          construct, and operate commercial & industrial rooftop solar for the manufacturing exporters,
          textile mills, and corporate institutions powering the nation’s economy.
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
        >
          <button
            onClick={onOpenModal}
            className="inline-flex h-[52px] items-center gap-2 rounded-full bg-gold px-8 text-[15px] font-semibold text-forest shadow-lg shadow-gold/25 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Assess Your Facility <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            to="/partners"
            className="inline-flex h-[52px] items-center rounded-full border border-warm/25 bg-forest/40 px-7 text-[15px] font-medium text-warm backdrop-blur transition-colors hover:border-gold hover:text-gold active:scale-[0.98]"
          >
            Lender & EPC Partnerships
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Means() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">The Netso Mandate</p>
          <h2 className="font-display mt-4 max-w-3xl text-4xl text-forest sm:text-6xl">
            Why distributed industrial solar changes the economic landscape
          </h2>
        </FadeUp>

        <Stagger className="mt-16 space-y-12 md:space-y-16" gap={0.15}>
          {MEANS.map((m, i) => (
            <StaggerItem key={m.title}>
              <div className="grid gap-6 rounded-3xl border border-ink/8 bg-parchment p-8 md:grid-cols-[240px_1fr_180px] md:items-center md:p-10">
                <span className="font-mono text-3xl font-bold text-gold">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl text-forest md:text-3xl">{m.title}</h3>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed max-w-2xl">{m.desc}</p>
                </div>
                <div className="md:text-right">
                  <span className="rounded-full bg-forest px-4 py-2 font-mono text-xs font-semibold text-gold">
                    {m.stat}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Industrial Corridors Marquee */}
        <FadeUp className="mt-24 md:mt-32">
          <p className="font-mono text-xs text-center uppercase tracking-wider text-ink/45">
            Active in Bangladesh's Core Manufacturing Clusters
          </p>
          <div className="mask-fade-x mt-8 overflow-hidden" aria-hidden="true">
            <div className="flex w-max animate-marquee items-center gap-14 whitespace-nowrap pr-14">
              {Array.from({ length: 2 }).map((_, dup) =>
                [
                  "Chattogram EPZ",
                  "Gazipur Textile Corridor",
                  "Narayanganj Knitwear Hub",
                  "Dhaka EPZ",
                  "Mymensingh Industrial Zone",
                  "SREDA NEM 2025 Synchronized",
                ].map((w, i) => (
                  <span key={`${dup}-${i}`} className="flex items-center gap-14">
                    <span className="font-display text-2xl text-forest/40 md:text-3xl font-medium">{w}</span>
                    <SunMark variant="ink" className="h-5 w-5 opacity-40" />
                  </span>
                ))
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="bg-forest py-24 text-warm md:py-36">
      <div className="mx-auto max-w-[1440px] space-y-24 px-5 md:space-y-36 md:px-10">
        {/* Thesis 1 */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <FadeUp>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Our Operating Thesis</p>
            </FadeUp>
            <h2 className="font-display mt-4 text-4xl sm:text-6xl md:text-7xl text-warm">
              <Words text="Generation belongs where power is consumed" accent={2} />
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-base leading-relaxed text-warm/75 md:text-lg lg:ml-auto">
              Centralized transmission losses, fossil-fuel imports, and unpredictable grid tariffs throttle factory
              competitiveness. Generating clean kilowatt-hours directly on the plant roof eliminates transmission
              drag, avoids expensive diesel genset cycling, and establishes direct price certainty.
            </p>
          </FadeUp>
        </div>

        {/* Thesis 2 */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <FadeUp>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Corporate Model</p>
            </FadeUp>
            <h2 className="font-display mt-4 text-4xl sm:text-6xl md:text-7xl text-warm">
              <Words text="A utility partner, not a hardware broker" accent={3} />
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-base leading-relaxed text-warm/75 md:text-lg lg:ml-auto">
              Netso does not dump panels on a roof and walk away. We own the assets, absorb 100% of equipment and
              performance risks, manage SCADA telemetry 24/7/365, and sell power under transparent 20-year agreements.
              If the system produces less, you pay less.
            </p>
          </FadeUp>
        </div>

        {/* Thesis 3 */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <FadeUp>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Institutional Architecture</p>
            </FadeUp>
            <h2 className="font-display mt-4 text-4xl sm:text-6xl md:text-7xl text-warm">
              <Words text="Structured for bankable institutional scale" accent={1} />
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-base leading-relaxed text-warm/75 md:text-lg lg:ml-auto">
              Every megawatt Netso deploys is financed through ring-fenced project SPVs, supported by 80% IDCOL
              concessionary senior facilities and Tier-1 banking covenants. It is an infrastructure platform engineered
              to deploy billions of Taka in institutional climate capital.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="bg-parchment py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">Executive Leadership</p>
          </FadeUp>
          <h2 className="font-display mt-4 text-4xl text-forest sm:text-6xl md:text-7xl">
            <Words text="The sky is already working" accent={1} />
          </h2>
          <div className="mt-8 flex items-center gap-3 text-sm text-ink/60 font-mono">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>Netso Energy Ltd · Dhaka, Bangladesh</span>
          </div>
        </div>
        <FadeUp delay={0.15}>
          <div className="space-y-6 text-[16px] leading-[1.75] text-ink/80 md:text-[17px]">
            <p>
              I founded Netso in Dhaka because of an unmistakable paradox: Bangladesh's manufacturing powerhouses
              drive the global supply chain, yet they are systematically squeezed by grid tariff hikes, diesel
              backup costs, and tightening international ESG audits.
            </p>
            <p>
              At the same time, millions of square feet of prime industrial reinforced concrete roofs sit directly
              under high-irradiance equatorial sun, completely unutilized.
            </p>
            <p>
              The bottleneck was never solar technology. It was financial architecture. Industrialists should not have
              to lock up core working capital in non-core power hardware or manage electrical maintenance. Netso was
              created to remove both: we provide <strong>100% of the CAPEX</strong>, build utility-grade architectural
              pergolas, manage digital SCADA telemetry, and deliver electricity below grid benchmarks for two decades.
            </p>
            <p>
              One factory roof stabilizes an industrial enterprise. A thousand roofs transform a national grid. The
              sun is already shining — we are simply building the infrastructure to harvest it.
            </p>
            <div className="pt-6 border-t border-ink/10">
              <p className="font-display text-2xl text-forest">Tazwar Mahtab</p>
              <p className="font-mono text-xs text-gold font-semibold uppercase tracking-wider mt-1">
                Founder & Managing Director · Netso Energy Ltd
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-ink/50">
                <span className="rounded-md border border-ink/10 bg-cream px-2.5 py-1">CGS 80kWp Reference</span>
                <span className="rounded-md border border-ink/10 bg-cream px-2.5 py-1">IDCOL Senior Facility</span>
                <span className="rounded-md border border-ink/10 bg-cream px-2.5 py-1">SREDA NEM 2025</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-cream">
      <Nav theme="dark" onOpenAssessment={() => setIsModalOpen(true)} />
      <main id="content">
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <Means />
        <Thesis />
        <Founder />
        <CTASection
          title="The Sky Is Already Working"
          heading="Turn your roof into an operating energy asset"
          copy="Zero capital expenditure. Guaranteed lower kilowatt-hour costs. Full utility-grade operations for twenty years."
          cta="Request Rooftop Feasibility"
        />
      </main>
      <Footer />

      <FeasibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
