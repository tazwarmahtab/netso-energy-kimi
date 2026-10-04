import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Partners from "./pages/Partners";
import About from "./pages/About";
import Brand from "./pages/Brand";
import Licenses from "./pages/Licenses";
import Legal from "./pages/Legal";

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
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/about" element={<About />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/licenses" element={<Licenses />} />
        <Route path="/legal/privacy-policy" element={<Legal kind="privacy" />} />
        <Route path="/legal/terms-of-service" element={<Legal kind="terms" />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
