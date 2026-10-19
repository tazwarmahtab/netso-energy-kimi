/** Location / craft metadata rail — no absolute commercial claims. */
export function MarqueeTicker() {
  const items = [
    "GAZIPUR",
    "SAVAR",
    "ASHULIA",
    "CHATTOGRAM",
    "ROOF-SENSITIVE STRUCTURAL DESIGN",
    "LOCAL OPERATIONS SUPPORT",
    "LONG-TERM PPA MODEL",
    "SITE-SPECIFIC ENGINEERING",
  ];

  return (
    <div className="relative w-full select-none overflow-hidden border-y border-gold/15 bg-[#06110c] py-3">
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
          <div key={`${item}-${idx}`} className="flex shrink-0 items-center gap-4 px-6">
            <span className="h-1 w-1 shrink-0 rounded-full bg-gold/70" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-cream/65 sm:text-[12px]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
