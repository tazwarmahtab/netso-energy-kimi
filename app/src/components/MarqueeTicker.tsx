export function MarqueeTicker() {
  const items = [
    "FLOATING 30% DISCOUNT PPA",
    "BOO MODEL (BUILD-OWN-OPERATE)",
    "0 BDT CUSTOMER CAPEX",
    "EU CBAM & HIGG INDEX COMPLIANT",
    "SREDA NET METERING 2025",
    "GAZIPUR • SAVAR • ASHULIA • CHATTOGRAM EPZ",
    "NON-PENETRATIVE TIN CLAMPS",
    "IDCOL CONCESSIONARY DEBT QUALIFIED",
    "BUET STRUCTURAL SAFETY VETTED",
    "ZERO PRODUCTION DOWNTIME",
  ];

  return (
    <div className="relative w-full border-y border-gold/20 bg-forest-dark py-3 overflow-hidden select-none">
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
