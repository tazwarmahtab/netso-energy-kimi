import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "./ui/WhatsAppIcon";

const LINKS = [
  { to: "/product", label: "Product" },
  { to: "/partners", label: "Partners" },
  { to: "/about", label: "About" },
  { to: "/brand", label: "Brand" },
];

export default function Nav({
  theme = "dark",
  onOpenAssessment,
}: {
  theme?: "dark" | "light";
  onOpenAssessment?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const fg = dark ? "text-cream" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? dark
              ? "bg-forest/80 backdrop-blur-xl border-b border-warm/10"
              : "bg-cream/80 backdrop-blur-xl border-b border-ink/8"
            : "bg-transparent border-b border-transparent"
        } ${fg}`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[76px] md:px-10">
          <Link to="/" aria-label="Netso Energy home" className="relative z-50 flex items-center text-[15px]">
            <Wordmark dark={!dark} />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `link-underline text-[15px] font-medium tracking-[-0.01em] transition-opacity ${
                    isActive ? "opacity-100" : dark ? "opacity-70 hover:opacity-100" : "opacity-70 hover:opacity-100"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="relative z-50 flex items-center gap-3">
            {/* Minimalist Icon-Only WhatsApp Capsule */}
            <a
              href={getNetsoWhatsAppUrl("Hello Netso Energy team, I am interested in exploring a commercial solar PPA for our industrial facility.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-warm/20 bg-forest/70 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/80 hover:bg-emerald-950/40 hover:scale-105 active:scale-95 sm:inline-flex shadow-sm"
              title="Direct WhatsApp line to Netso Origination Desk"
              aria-label="Direct WhatsApp line to Netso Origination Desk"
            >
              <WhatsAppIcon className="h-4.5 w-4.5 shrink-0" />
            </a>

            {/* Scroll-Gated Assessment CTA: Hidden at top of hero to avoid viewport duplication, animated in when scrolled */}
            <AnimatePresence>
              {(location.pathname !== "/" || scrolled) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden sm:inline-flex"
                >
                  {onOpenAssessment ? (
                    <button
                      type="button"
                      onClick={onOpenAssessment}
                      className="h-10 items-center rounded-full bg-gold px-5 text-sm font-semibold text-forest transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-gold/20"
                    >
                      Get roof assessment
                    </button>
                  ) : (
                    <a
                      href="/#get-started"
                      className="h-10 items-center rounded-full bg-gold px-5 text-sm font-semibold text-forest transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      Get roof assessment
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink text-cream lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="spectrum pointer-events-none absolute inset-x-0 top-0 h-1" />
            <div className="flex flex-1 flex-col justify-center gap-2 px-8 pt-16">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink to={l.to} className="font-display block py-2 text-[13vw] leading-[0.95] sm:text-6xl">
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="space-y-4 px-8 pb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ paddingBottom: "calc(3rem + env(safe-area-inset-bottom))" }}
            >
              <div className="flex flex-col gap-3">
                {onOpenAssessment ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onOpenAssessment();
                    }}
                    className="flex h-13 w-full items-center justify-center rounded-full bg-gold text-base font-semibold text-forest shadow-lg shadow-gold/20"
                  >
                    Get roof assessment
                  </button>
                ) : (
                  <a
                    href="/#get-started"
                    onClick={() => setOpen(false)}
                    className="flex h-13 w-full items-center justify-center rounded-full bg-gold text-base font-semibold text-forest shadow-lg shadow-gold/20"
                  >
                    Get roof assessment
                  </a>
                )}
                <a
                  href={getNetsoWhatsAppUrl("Hello Netso Energy team, I am interested in exploring a commercial solar PPA for our industrial facility.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-warm/20 bg-forest/80 text-sm font-semibold text-warm"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
              <p className="eyebrow text-center text-cream/50 pt-2">The sky is already working</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
