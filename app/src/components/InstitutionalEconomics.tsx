interface InstitutionalEconomicsProps {
  onOpenAssessment: () => void;
}

export default function InstitutionalEconomics({ onOpenAssessment }: InstitutionalEconomicsProps) {
  return (
    <section aria-labelledby="assessment-heading" className="bg-forest-dark px-5 py-24 text-warm md:px-10 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <h2 id="assessment-heading" className="font-display max-w-lg text-4xl leading-tight sm:text-6xl">
            How much solar can your factory use?
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-sage">
            A roof sets the limit on what you can generate. Your daytime electricity use determines how much of that power can serve the factory.
          </p>
        </div>
        <div className="border-t border-warm/25 pt-6">
          <h3 className="font-display text-2xl">Start with your electricity bill</h3>
          <p className="mt-3 max-w-md leading-relaxed text-sage">
            Bring a recent bill, your operating hours and the site location. The assessment compares your load with the roof area, shading and access for maintenance.
          </p>
          <button type="button" onClick={onOpenAssessment} className="mt-8 min-h-12 rounded-full bg-gold px-6 font-semibold text-ink focus-visible:outline-offset-4">
            Request a roof assessment
          </button>
        </div>
      </div>
    </section>
  );
}
