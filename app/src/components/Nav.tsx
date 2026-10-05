import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
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

  // Top reading scroll progress line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isPast = window.scrollY > 30;
          setScrolled((prev) => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
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
      {/* 1. Golden Scroll Progress Bar (scaleX driven) */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-gold via-amber-300 to-gold pointer-events-none shadow-sm shadow-gold/30"
        style={{ scaleX }}
      />

      {/* 2. Hero & Scroll-Craft Floating Capsule Navbar */}
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-out ${
          scrolled ? "pt-3 md:pt-4 px-4 sm:px-6" : "pt-0 px-0"
        }`}
        style={{ paddingTop: scrolled ? undefined : "env(safe-area-inset-top)" }}
      >
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? dark
                ? "w-full max-w-5xl h-14 md:h-16 rounded-full bg-forest/85 backdrop-blur-2xl border border-warm/20 shadow-2xl shadow-black/50 px-5 md:px-7"
                : "w-full max-w-5xl h-14 md:h-16 rounded-full bg-cream/90 backdrop-blur-2xl border border-ink/10 shadow-xl shadow-ink/10 px-5 md:px-7"
              : "w-full max-w-[1440px] h-16 md:h-[76px] px-5 md:px-10 bg-transparent border-b border-transparent"
          } ${fg}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Brand Mark */}
          <Link
            to="/"
            aria-label="Netso Energy home"
            className="relative z-50 flex items-center text-[15px] transition-transform duration-300 hover:opacity-90 active:scale-98"
          >
            <Wordmark dark={!dark} />
          </Link>

          {/* Center Nav Links */}
          <nav
            className={`hidden items-center transition-all duration-300 lg:flex ${
              scrolled ? "gap-7 text-[14px]" : "gap-8 text-[15px]"
            }`}
            aria-label="Primary"
          >
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `link-underline font-medium tracking-[-0.01em] transition-opacity ${
                    isActive
                      ? "opacity-100 text-gold"
                      : dark
                      ? "opacity-75 hover:opacity-100"
                      : "opacity-75 hover:opacity-100"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Capsule / Mobile Menu Trigger */}
          <div className="relative z-50 flex items-center">
            {/* Mobile Menu Trigger */}
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
      </motion.header>

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
