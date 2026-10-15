export function MarqueeTicker() {
  const items = [
    "ROOFTOP SOLAR FOR INDUSTRY",
    "FINANCED, BUILT AND OPERATED BY NETSO",
    "NO PLANT FUNDING UPFRONT*",
    "LONG-TERM POWER PURCHASE AGREEMENTS",
    "UTILITY APPROVALS COORDINATED PER SITE",
    "GAZIPUR • SAVAR • ASHULIA • CHATTOGRAM",
    "ROOF-SENSITIVE STRUCTURAL DESIGN",
    "LOCAL OPERATIONS SUPPORT",
    "METERED GENERATION AND PERFORMANCE REPORTING",
    "COMMERCIAL TERMS CONFIRMED AFTER ASSESSMENT",
  ];

  return (
    <div className="relative w-full border-y border-gold/20 bg-[#06100c] py-3 overflow-hidden select-none">
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
      `}</style>
      
      <div className="animate-marquee-infinite flex items-center">
        {/* Render two copies to create a seamless infinite loop */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-6 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.16em] uppercase text-cream/70 font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
