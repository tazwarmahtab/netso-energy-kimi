import { useEffect, useState } from "react";
import { SunMark } from "./Wordmark";

function shouldShowIntro() {
  try {
    if (window.location.search.includes("nointro")) {
      return false;
    }

    return sessionStorage.getItem("netso_intro_seen") !== "true";
  } catch {
    // Show the intro when storage is unavailable in a restricted context.
    return true;
  }
}

export function CinematicIntro() {
  const [shouldRender] = useState(shouldShowIntro);
  const [isVisible, setIsVisible] = useState(shouldRender);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!shouldRender) return;

    let current = 0;
    const interval = setInterval(() => {
      // Non-linear organic acceleration
      const increment = Math.floor(Math.random() * 8) + 4;
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
    }, 45);

    // After reaching 100%, trigger exit slide-up
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem("netso_intro_seen", "true");
      } catch {
        // Ignore storage errors
      }
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [shouldRender]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem("netso_intro_seen", "true");
    } catch {
      // Ignore storage errors
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden={!isVisible}
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] bg-[#07110D] text-cream flex flex-col justify-between p-[5vw] ${
        isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
      }`}
      style={{
        transition: "transform 1100ms cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      {/* Top Metadata Header */}
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-cream/40 uppercase">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span>NETSO ENERGY © 2026</span>
        </span>
        <span className="hidden sm:inline">DHAKA — CHATTOGRAM — GAZIPUR EPZ</span>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-cream/30 hover:text-gold transition-colors font-mono text-[10px] tracking-widest cursor-pointer"
        >
          SKIP [→]
        </button>
      </div>

      {/* Center Brand Lockup */}
      <div className="relative flex flex-col items-center justify-center gap-8 my-auto select-none">
        <div
          className="flex items-center gap-3"
          style={{
            transform: `scale(${0.9 + progress / 600})`,
            transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SunMark variant="yellow" className="h-12 w-12 sm:h-16 sm:w-16" />
          <div className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-cream">
            NETSO<span className="text-gold ml-0.5">°</span>
          </div>
        </div>

        {/* Micro-loading progress bar */}
        <div className="w-full max-w-[360px] sm:max-w-[440px] h-[1.5px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Counter & Manifesto Note */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-white/[0.08] pt-6">
        <div className="font-display font-bold text-[16vw] sm:text-[11vw] leading-none tracking-[-0.05em] text-cream">
          {String(progress).padStart(2, "0")}
          <span className="text-gold text-[0.6em] font-light">%</span>
        </div>

        <div className="max-w-[320px] font-mono text-[10px] sm:text-[11px] tracking-[0.12em] text-cream/50 sm:text-right leading-relaxed">
          ROOFTOP PPA • CUSTOMER CAPEX CAN BE ZERO* • NEM-READY DESIGN
        </div>
      </div>
    </div>
  );
}
