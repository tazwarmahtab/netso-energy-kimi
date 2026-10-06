import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Words } from "./Reveal";
import { SunMark } from "./Wordmark";

/** "The sky is already working" — full-bleed sunrise spectrum closer. */
export default function CTASection({
  title = "The sky is already working",
  accent = 2,
  heading = "Your roof is an asset",
  copy = "Ready to put your roof to work? Explore a rooftop PPA with no customer asset purchase where the project structure supports it, with design, construction and operating services handled by Netso.",
  cta = "Request a rooftop assessment",
}: {
  title?: string;
  accent?: number;
  heading?: string;
  copy?: string;
  cta?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  return (
    <section ref={ref} id="get-started" className="sunrise grain relative overflow-hidden">
      <motion.div
        className="spectrum spectrum-animated absolute inset-0 opacity-70 mix-blend-soft-light"
        style={{ y, scale }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1440px] flex-col items-center justify-center px-5 py-28 text-center md:px-10">
        <motion.div
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SunMark variant="cream" className="h-12 w-12 text-cream md:h-16 md:w-16" />
        </motion.div>

        <h2 className="font-display mt-8 text-[13vw] text-cream sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <Words text={title} accent={accent} accentClassName="text-ink" />
        </h2>
        <p className="font-display-wide mt-4 text-2xl text-cream/90 md:text-4xl">
          <Words text={heading} accent={0} delay={0.3} />
        </p>
        <motion.p
          className="mt-6 max-w-xl text-[16px] leading-relaxed text-cream/85 md:text-[17px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {copy}
        </motion.p>
        <motion.a
          href="#get-started"
          onClick={(e) => e.preventDefault()}
          className="mt-10 inline-flex h-14 items-center rounded-full bg-ink px-9 text-[16px] font-semibold text-cream shadow-xl transition-transform duration-300 hover:scale-[1.05] active:scale-[0.97]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {cta}
        </motion.a>
      </div>
    </section>
  );
}
