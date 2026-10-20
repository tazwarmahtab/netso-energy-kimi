import { FadeUp } from "./Reveal";

/**
 * Quiet handoff after the hero scroll film.
 * Preserves subject (occupied canopy) so the next section is a continuation, not a hard cut.
 * Typography craft borrowed from Meta manifesto — claims-safe, no absolute commercial guarantees.
 */
export function HeroHandoff() {
  return (
    <section
      className="relative overflow-hidden bg-forest-dark text-cream"
      aria-label="From roof film to commercial thesis"
    >
      {/* Continuity still first — same subject/geometry as hero end frame (VISUAL-CONTINUITY §7). */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/assets/stills/hero-occupied-canopy.jpg"
          alt=""
          className="h-full w-full object-cover object-[50%_42%] opacity-[0.38]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/40 via-forest-dark/82 to-forest-dark" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-dark via-forest-dark/90 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20 lg:pt-24">
        <FadeUp y={20}>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/70">
            Manifesto / 01
          </p>
        </FadeUp>

        <div className="mt-5 grid gap-8 lg:mt-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-14">
          <FadeUp delay={0.06} y={24}>
            <h2 className="font-display text-[clamp(3rem,9.5vw,7.25rem)] font-bold leading-[0.86] tracking-[-0.045em]">
              <span className="block text-warm/40">Idle GW</span>
              <span className="block italic text-gold">wasted</span>
              <span className="block text-warm">rooftop</span>
            </h2>
            <p className="mt-5 font-display text-base uppercase tracking-[0.14em] text-warm/50 md:text-lg">
              Bangladesh RMG belt
            </p>
            <p className="mt-3 max-w-sm border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-warm/45">
              Hot sheet metal · Stranded roof asset
            </p>
          </FadeUp>

          <FadeUp delay={0.12} y={18}>
            <div className="max-w-md space-y-4 border-t border-white/10 pt-5 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-1">
              <p className="text-sm leading-relaxed text-sage/85 md:text-[15px] md:leading-[1.7]">
                Empty industrial roofs bake through the day — radiating heat into sewing floors while earning nothing. The commercial question is next: contracted rooftop power vs grid exposure.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/80">
                Next → commercial structure
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
