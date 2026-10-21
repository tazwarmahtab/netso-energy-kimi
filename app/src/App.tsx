import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Glass from "./pages/Glass";
import Product from "./pages/Product";
import CalculatorPage from "./pages/Calculator";
import Partners from "./pages/Partners";
import About from "./pages/About";
import Brand from "./pages/Brand";
import InsightsPage from "./pages/Insights";
import CareersPage from "./pages/Careers";
import ContactPage from "./pages/Contact";
import Licenses from "./pages/Licenses";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
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
      <FloatingWhatsApp />
    </>
  );
}
