import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "./ui/WhatsAppIcon";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal after user scrolls past top viewport threshold (300px)
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40"
        >
          <a
            href={getNetsoWhatsAppUrl(
              "Hello Tazwar, reaching out to discuss a rooftop solar PPA assessment for our industrial facility."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-gold/30 bg-[#08140F]/90 px-4 py-2.5 text-xs font-semibold text-cream shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/80 hover:bg-emerald-950/60 hover:text-emerald-300 hover:scale-105 active:scale-95"
            title="Direct line to Tazwar Mahtab on WhatsApp"
            aria-label="Direct WhatsApp chat with Netso Energy"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <WhatsAppIcon className="h-4.5 w-4.5 shrink-0" />
            <span className="hidden sm:inline font-mono tracking-tight text-[11px] text-cream/90 group-hover:text-emerald-300">
              Chat on WhatsApp
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
