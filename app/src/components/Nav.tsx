import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { to: "/product", label: "Product" },
  { to: "/partners", label: "Partners" },
  { to: "/about", label: "About" },
  { to: "/brand", label: "Brand" },
];

export default function Nav({ theme = "dark" }: { theme?: "dark" | "light" }) {
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
              ? "bg-ink/72 backdrop-blur-xl border-b border-cream/10"
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

          <div className="relative z-50 flex items-center gap-3 md:gap-5">
            <span
              className={`hidden cursor-pointer text-[15px] font-medium sm:inline ${dark ? "opacity-80 hover:opacity-100" : "opacity-80 hover:opacity-100"} transition-opacity`}
              title="Client portal"
            >
              Client login
            </span>
            <a
              href="/#get-started"
              className="hidden h-11 items-center rounded-full bg-orange px-5 text-[15px] font-semibold text-cream transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] sm:inline-flex"
            >
              Get started
            </a>
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
              <a
                href="/#get-started"
                className="flex h-14 w-full items-center justify-center rounded-full bg-orange text-[17px] font-semibold text-cream"
              >
                Get started
              </a>
              <p className="eyebrow text-center text-cream/50">The sky is already working</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
