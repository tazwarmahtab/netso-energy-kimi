/**
 * Quiet handoff after the hero scroll film.
 * Preserves subject (occupied canopy) so the next section is a continuation, not a hard cut.
 * Typography craft borrowed from Meta manifesto — claims-safe, no absolute commercial guarantees.
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
          className="h-full w-full object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/50 via-forest-dark/88 to-forest-dark" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-dark to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/70">
          Manifesto / 01
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <h2 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.04em]">
              <span className="block text-warm/35">Idle GW</span>
              <span className="block italic text-gold">wasted</span>
              <span className="block text-warm">rooftop</span>
            </h2>
            <p className="mt-5 font-display text-lg uppercase tracking-[0.12em] text-warm/45 md:text-xl">
              Bangladesh RMG belt
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-warm/40">
              Hot sheet metal · Stranded roof asset
            </p>
          </div>

          <div className="max-w-md space-y-5 border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <p className="text-sm leading-relaxed text-sage/85 md:text-[15px] md:leading-[1.7]">
              Empty industrial roofs bake through the day — radiating heat into sewing floors while earning nothing. Every idle shed is a stranded energy surface above the load that needs it.
            </p>
            <p className="text-sm leading-relaxed text-sage/85 md:text-[15px] md:leading-[1.7]">
              European buyers push Scope 2 and Scope 3 reporting. Generation evidence, LEED pathways, and RE100-aligned sourcing can support those conversations — specifics stay with the facility&apos;s reporting method and the executed PPA.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
              Next → commercial structure
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
