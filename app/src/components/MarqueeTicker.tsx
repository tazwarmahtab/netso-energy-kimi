export function MarqueeTicker() {
  const items = [
    "Industrial rooftops",
    "Solar canopies",
    "Site assessment",
    "Engineering design",
    "Installation",
  ];

  return (
    <section aria-label="Netso capabilities and services" className="relative w-full border-y border-gold/20 bg-forest-dark py-3 overflow-hidden select-none">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marqueeScroll 35s linear infinite;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-infinite {
            width: 100%;
            flex-wrap: wrap;
            animation: none;
          }
          .animate-marquee-infinite [aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
      
      <div className="animate-marquee-infinite flex items-center">
        {/* Render two copies to create a seamless infinite loop */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} aria-hidden={idx >= items.length ? true : undefined} className="flex items-center gap-4 px-6 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.16em] uppercase text-cream/70 font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
