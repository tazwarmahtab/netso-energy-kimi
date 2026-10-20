/** Location / craft metadata rail — no absolute commercial claims. */
export function MarqueeTicker() {
  const items = [
    "GAZIPUR",
    "SAVAR",
    "ASHULIA",
    "CHATTOGRAM",
    "BOO MODEL",
    "ROOF-SENSITIVE STRUCTURAL DESIGN",
    "LOCAL OPERATIONS SUPPORT",
    "LONG-TERM PPA MODEL",
    "SITE-SPECIFIC ENGINEERING",
    "INSTALL AROUND OPERATIONS",
  ];

  return (
    <div
      className="relative w-full select-none overflow-hidden border-y border-gold/12 bg-[#06110c] py-3.5"
      aria-label="Locations and craft metadata"
    >
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marqueeScroll 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-infinite { animation: none; }
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-marquee-infinite flex items-center">
        {[...items, ...items].map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex shrink-0 items-center gap-4 px-5 sm:px-6">
            <span className="h-1 w-1 shrink-0 rounded-full bg-gold/70" aria-hidden="true" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-cream/60 sm:text-[11px]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
