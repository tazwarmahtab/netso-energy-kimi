/**
 * Quiet handoff after the hero scroll film.
 * Preserves subject (occupied canopy) so the next section is a continuation, not a hard cut.
 */
export function HeroHandoff() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/5 bg-forest-dark text-cream"
      aria-label="From roof film to commercial thesis"
    >
      <div className="absolute inset-0">
        <img
          src="/assets/stills/hero-occupied-canopy.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/40 via-forest-dark/85 to-forest-dark" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-dark to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">
            After the roof becomes an asset
          </p>
          <p className="font-display mt-3 text-2xl font-semibold tracking-tight text-warm sm:text-3xl md:text-4xl">
            The next question is commercial structure.
          </p>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-sage/80 md:text-right">
          How contracted rooftop power can sit against grid exposure — before we show the physical canopy.
        </p>
      </div>
    </section>
  );
}
