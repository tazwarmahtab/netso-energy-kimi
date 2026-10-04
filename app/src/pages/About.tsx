import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import { FadeUp, Stagger, StaggerItem, Words } from "../components/Reveal";
import { SunMark } from "../components/Wordmark";

const EASE = [0.16, 1, 0.3, 1] as const;

const MEANS = [
  "A factory’s biggest cost, finally under control",
  "Every idle roof turned into a productive asset",
  "Cleaner power for the economy the world buys from",
];

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-cream">
      {/* rising sun */}
      <motion.div
        className="absolute left-1/2 top-full aspect-square w-[160vw] rounded-full md:w-[120vw]"
        style={{
          x: "-50%",
          background:
            "radial-gradient(circle, #FCCC3C 0%, #FB8C00 22%, #F66F00 42%, rgba(204,61,0,0.55) 62%, rgba(17,17,17,0) 75%)",
        }}
        initial={{ y: "42%", opacity: 0 }}
        animate={{ y: "-58%", opacity: 1 }}
        transition={{ duration: 2, ease: EASE }}
        aria-hidden="true"
      />
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pb-16 pt-32 text-center md:px-10 md:pb-24">
        <motion.p
          className="eyebrow mb-6 text-cream/90"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
        >
          About Netso
        </motion.p>
        <h1 className="font-display whitespace-nowrap text-[17vw] leading-[0.9] text-cream md:text-[12.5rem]">
          <Words text="Re-Wired." accent={1} accentClassName="text-ink" delay={0.6} />
        </h1>
        <motion.p
          className="mt-8 max-w-xl text-[16.5px] leading-relaxed text-cream/90 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8, ease: EASE }}
        >
          Netso Energy is building Bangladesh’s distributed renewable-energy infrastructure — financing,
          owning and operating rooftop solar for the factories and institutions that power the economy.
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
        >
          <Link
            to="/product"
            className="inline-flex h-[52px] items-center gap-2 rounded-full bg-ink px-7 text-[15.5px] font-semibold text-cream transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97]"
          >
            For building owners <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/partners"
            className="inline-flex h-[52px] items-center rounded-full border border-ink/30 bg-cream/85 px-7 text-[15.5px] font-semibold text-ink backdrop-blur transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97]"
          >
            For partners
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
        <Stagger className="space-y-14 md:space-y-20" gap={0.18}>
          {MEANS.map((m, i) => (
            <StaggerItem key={m}>
              <div className="grid gap-4 md:grid-cols-[220px_1fr] md:items-baseline">
                <p className="eyebrow text-orange">RE-WIRED MEANS</p>
                <p className="font-display max-w-4xl text-4xl text-ink md:text-6xl">
                  <Words text={m} accent={i === 2 ? 3 : 2} />
                </p>
              </div>
              {i < MEANS.length - 1 && <div className="mt-14 h-px bg-ink/10 md:mt-20" />}
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp className="mt-24 md:mt-32">
          <p className="eyebrow text-center text-ink/45">Across Bangladesh’s industrial corridors</p>
          <div className="mask-fade-x mt-8 overflow-hidden" aria-hidden="true">
            <div className="flex w-max animate-marquee items-center gap-14 whitespace-nowrap pr-14">
              {Array.from({ length: 2 }).map((_, dup) =>
                ["Netso Energy", "Zero CAPEX", "Chattogram", "Gazipur", "Narayanganj", "The Sky Works"].map((w, i) => (
                  <span key={`${dup}-${i}`} className="flex items-center gap-14">
                    <span className="font-display text-3xl text-ink/30 md:text-4xl">{w}</span>
                    <SunMark variant="ink" className="h-6 w-6 opacity-40" />
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
    <section className="bg-ink py-24 text-cream md:py-36">
      <div className="mx-auto max-w-[1440px] space-y-28 px-5 md:space-y-40 md:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <FadeUp>
              <p className="eyebrow text-orange">our thesis</p>
            </FadeUp>
            <h2 className="font-display mt-6 text-6xl md:text-8xl">
              <Words text="The grid has no master" accent={2} />
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-xl font-medium leading-snug text-cream/85 md:text-2xl lg:ml-auto">
              Power should be generated where it’s used, priced where it’s fair, and owned by the people
              who build it.
            </p>
          </FadeUp>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <FadeUp>
              <p className="eyebrow text-orange">What we do</p>
            </FadeUp>
            <h2 className="font-display mt-6 text-5xl md:text-7xl">
              <Words text="A new kind of energy company" accent={3} />
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-cream/70 lg:ml-auto">
              Netso finances, builds, owns and operates distributed rooftop solar across Bangladesh’s
              industrial hubs. The grid of the future won’t come from one plant. It’ll come from every roof.
            </p>
          </FadeUp>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <FadeUp>
              <p className="eyebrow text-orange">Our platform</p>
            </FadeUp>
            <h2 className="font-display mt-6 text-5xl md:text-7xl">
              <Words text="Financing the electrified economy" accent={2} />
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-cream/70 lg:ml-auto">
              Behind every Netso roof is an asset-ownership platform purpose-built for distributed energy:
              project SPVs, 20-year PPAs, concessionary debt, telemetry and settlement. One company, end to
              end.
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
            <p className="eyebrow text-orange">A note from our founder</p>
          </FadeUp>
          <h2 className="font-display mt-6 text-6xl text-ink md:text-8xl">
            <Words text="The sky is already working" accent={1} />
          </h2>
        </div>
        <FadeUp delay={0.15}>
          <div className="space-y-5 text-[16px] leading-[1.75] text-ink/75 md:text-[17px]">
            <p>
              I started Netso in Dhaka because I kept seeing the same thing: factories squeezed by tariffs
              they can’t control, sitting under roofs that could power them. Bangladesh’s industrial
              rooftops are one of the largest untapped energy assets in the region.
            </p>
            <p>
              The problem was never technology. It’s that no factory owner wants to spend core liquidity on
              solar assets, or run a second utility inside their business. So we removed both. Netso
              finances, builds, owns and operates the system — you just buy the power, below the grid
              tariff, for twenty years.
            </p>
            <p>
              One roof lowers a bill. A thousand roofs become infrastructure. The sky is already working,
              and we’re so glad you’ve joined us.
            </p>
            <div className="pt-4">
              <p className="font-display text-3xl text-ink">Power on,</p>
              <p className="font-display mt-1 text-5xl text-orange">Tazwar</p>
              <p className="eyebrow mt-2 text-ink/50">Founder & Managing Director</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="bg-cream">
      <Nav theme="dark" />
      <main id="content">
        <Hero />
        <Means />
        <Thesis />
        <Founder />
        <CTASection
          title="The sky is already working"
          heading="Your roof is an asset"
          copy="One roof lowers a bill. A thousand roofs become infrastructure."
          cta="Request a rooftop assessment"
        />
      </main>
      <Footer />
    </div>
  );
}
