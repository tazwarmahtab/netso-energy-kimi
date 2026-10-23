import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Glass from "./pages/Glass";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

/**
 * Route table.
 *
 * The homepage is imported eagerly — it is the one route that has to paint on
 * the first frame. Everything else is a dynamic import, which keeps Three.js
 * (used only by the archived `/classic` page), the calculator, and the long
 * copy pages out of the initial chunk.
 */
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const CalculatorPage = lazy(() => import("./pages/Calculator"));
const Partners = lazy(() => import("./pages/Partners"));
const About = lazy(() => import("./pages/About"));
const Brand = lazy(() => import("./pages/Brand"));
const InsightsPage = lazy(() => import("./pages/Insights"));
const CareersPage = lazy(() => import("./pages/Careers"));
const ContactPage = lazy(() => import("./pages/Contact"));
const Licenses = lazy(() => import("./pages/Licenses"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** How long to keep looking for a `#anchor` target before giving up. A lazy
 *  route has to download its chunk before the target can exist, so the old
 *  30-frame window (~500ms) was too tight on a slow connection. */
const ANCHOR_RETRY_MS = 4000;

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let raf = 0;
      let cancelled = false;
      const started = performance.now();

      // A malformed hash (e.g. "#100%") is not a valid selector. Treat it as
      // "no anchor" rather than throwing inside the animation frame.
      const selector = (() => {
        try {
          document.querySelector(hash);
          return hash;
        } catch {
          return null;
        }
      })();

      const seek = () => {
        if (cancelled) return;
        const el = selector ? document.querySelector(selector) : null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
        if (performance.now() - started < ANCHOR_RETRY_MS) {
          raf = requestAnimationFrame(seek);
          return;
        }
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      };

      raf = requestAnimationFrame(seek);
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
      };
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

/**
 * Suspense fallback.
 *
 * Deliberately a blank glass canvas rather than a spinner: the canvas colour
 * is the page background, so a route that is still downloading looks like a
 * page that has not finished painting — not like a white flash or a loading
 * state. Chunks here are small; this should rarely be visible for long.
 */
function RouteFallback() {
  return (
    <div className="g-root g-canvas" style={{ minHeight: "100svh" }} aria-busy="true">
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Glass v3 is the canonical homepage. The classic page stays routable
              at /classic (one-line revert if needed), and /glass remains an alias
              so existing links and previews do not 404. */}
          <Route path="/" element={<Glass />} />
          <Route path="/glass" element={<Glass />} />
          <Route path="/classic" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/support" element={<ContactPage />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/legal/privacy-policy" element={<Legal kind="privacy" />} />
          <Route path="/legal/terms-of-service" element={<Legal kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <FloatingWhatsApp />
    </>
  );
}
