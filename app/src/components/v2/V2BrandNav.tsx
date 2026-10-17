import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import { Wordmark } from "../Wordmark";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../ui/WhatsAppIcon";
import { v2ChapterNumber, V2_CHAPTERS, type V2ChapterId } from "./v2Chapters";
import { ASSESSMENT_HREF, PRIMARY_ACTION_LABEL, WHATSAPP_MESSAGE } from "./v2Actions";
import "../../styles/v2-brand-nav.css";

export type { V2ChapterId };

interface V2BrandNavProps {
  activeChapter?: V2ChapterId;
  onOpenAssessment?: () => void;
  theme?: "dark" | "light";
}

const ROUTE_LINKS = [
  { to: "/product", label: "Product" },
  { to: "/calculator", label: "Calculator" },
  { to: "/partners", label: "Partners" },
  { to: "/about", label: "About" },
  { to: "/brand", label: "Brand" },
] as const;

/** The rail already owns Assessment, so the menu drops that duplicate row. */
const MENU_CHAPTERS = V2_CHAPTERS.filter((chapter) => chapter.id !== "assessment");

function ChapterLinks({
  activeChapter,
  onSelect,
}: {
  activeChapter: V2ChapterId;
  onSelect: (chapter: V2ChapterId) => void;
}) {
  return (
    <>
      {MENU_CHAPTERS.map((chapter) => (
        <a
          key={chapter.id}
          className={`v2-brand-nav__chapter-link${activeChapter === chapter.id ? " is-active" : ""}`}
          href={chapter.href}
          aria-current={activeChapter === chapter.id ? "location" : undefined}
          onClick={() => onSelect(chapter.id)}
        >
          <span className="v2-brand-nav__chapter-number">{v2ChapterNumber(chapter.id)}</span>
          <span>{chapter.label}</span>
        </a>
      ))}
    </>
  );
}

export default function V2BrandNav({
  activeChapter,
  onOpenAssessment,
  theme = "dark",
}: V2BrandNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const currentChapter: V2ChapterId = activeChapter ?? "roof";

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled((previous) => {
          const next = window.scrollY > 30;
          return previous === next ? previous : next;
        });
        ticking = false;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const resetTimer = window.setTimeout(() => setMenuOpen(false), 0);
    return () => window.clearTimeout(resetTimer);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    document.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => firstMobileLinkRef.current?.focus());
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const selectChapter = () => {
    setMenuOpen(false);
  };

  const renderPrimaryAction = (mobile = false) => {
    const className = mobile
      ? "v2-brand-nav__mobile-cta v2-brand-nav__mobile-cta--gold"
      : "v2-brand-nav__assessment-link";

    if (onOpenAssessment) {
      return (
        <button
          type="button"
          className={className}
          onClick={() => {
            setMenuOpen(false);
            onOpenAssessment();
          }}
        >
          <span>{PRIMARY_ACTION_LABEL}</span>
          <ArrowRight size={mobile ? 17 : 14} aria-hidden="true" />
        </button>
      );
    }

    return (
      <a className={className} href={ASSESSMENT_HREF} onClick={() => setMenuOpen(false)}>
        <span>{PRIMARY_ACTION_LABEL}</span>
        <ArrowRight size={mobile ? 17 : 14} aria-hidden="true" />
      </a>
    );
  };

  return (
    <>
      <motion.header
        className="v2-brand-nav"
        data-scrolled={scrolled}
        data-theme={theme}
        initial={reducedMotion ? false : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <motion.div
          className="v2-brand-nav__shell"
          animate={reducedMotion ? undefined : { y: scrolled ? 6 : 0, scale: scrolled ? 0.985 : 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 30, mass: 0.8 }}
        >
          <span className="v2-brand-nav__hairline" aria-hidden="true">
            <motion.span
              className="v2-brand-nav__hairline-fill"
              style={{ scaleX: reducedMotion ? scrollYProgress : progressScale }}
            />
          </span>

          <div className="v2-brand-nav__topline">
            <Link className="v2-brand-nav__brand" to="/" aria-label="NETSO°ENERGY">
              <Wordmark dark={theme === "light"} />
            </Link>

            <nav className="v2-brand-nav__routes" aria-label="Primary">
              {ROUTE_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `v2-brand-nav__route-link${isActive ? " is-active" : ""}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="v2-brand-nav__actions">
              {renderPrimaryAction()}
              <button
                ref={menuButtonRef}
                type="button"
                className="v2-brand-nav__menu-button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="v2-brand-nav-mobile-menu"
              >
                {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="v2-brand-nav-mobile-menu"
            className="v2-brand-nav__mobile-menu"
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            <div className="v2-brand-nav__mobile-wash" aria-hidden="true" />
            <div className="v2-brand-nav__mobile-content">
              <div className="v2-brand-nav__mobile-routes">
                {ROUTE_LINKS.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { delay: 0.06 + index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                    }
                  >
                    <NavLink
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                      to={link.to}
                      className={({ isActive }) => `v2-brand-nav__mobile-route${isActive ? " is-active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="v2-brand-nav__mobile-chapters">
                <p className="v2-brand-nav__mobile-label">Story chapters</p>
                <div className="v2-brand-nav__mobile-chapter-list">
                  <ChapterLinks activeChapter={currentChapter} onSelect={selectChapter} />
                </div>
              </div>

              <motion.div
                className="v2-brand-nav__mobile-footer"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reducedMotion ? 0 : 0.34, duration: reducedMotion ? 0 : 0.35 }}
              >
                {renderPrimaryAction(true)}
                <a
                  className="v2-brand-nav__mobile-alt"
                  href={getNetsoWhatsAppUrl(WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <WhatsAppIcon className="v2-brand-nav__whatsapp-icon" />
                  <span>Prefer WhatsApp? Message the desk</span>
                </a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
