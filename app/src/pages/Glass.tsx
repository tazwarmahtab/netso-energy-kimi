import { useState } from "react";
import { Link } from "react-router";
import FeasibilityModal from "../components/FeasibilityModal";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import {
  GlassArchitecture,
  GlassHero,
  GlassNav,
  GlassProgress,
  GlassTicker,
} from "../components/glass/sections-a";
import {
  GlassBenefits,
  GlassCTA,
  GlassFooter,
  GlassNetwork,
  GlassOperations,
  GlassProcess,
  GlassProof,
} from "../components/glass/sections-b";
import LiquidChromeBridge from "../components/glass/LiquidChromeBridge";
import { ChromeWorldBackdrop, ChromeWorldInterlude } from "../components/glass/ChromeWorldBackdrop";
import "../styles/glass.css";

/**
 * NETSO GLASS — the v3 homepage.
 *
 * Served at `/` (and `/glass`). The previous homepage remains reachable at
 * `/classic` so the two can be compared and so the swap can be reverted with a
 * one-line route change. Design direction, the section-by-section audit and the
 * decision ledger live in `docs/GLASS-AUDIT.md`.
 */
export default function Glass({ chromeWorld = false }: { chromeWorld?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useSmoothScroll();

  return (
    <div className={`g-root g-canvas g-grain overflow-x-clip${chromeWorld ? " g-chrome-world" : ""}`}>
      {chromeWorld ? <ChromeWorldBackdrop /> : null}
      <GlassProgress />
      <GlassNav onAssess={() => setIsModalOpen(true)} />

      <main>
        <GlassHero onAssess={() => setIsModalOpen(true)} />
        <GlassTicker />
        {chromeWorld ? <ChromeWorldInterlude placement="opening" /> : <LiquidChromeBridge />}
        <GlassArchitecture />
        <GlassOperations />
        <GlassProof />
        <GlassBenefits />
        <GlassProcess />
        {chromeWorld && <ChromeWorldInterlude placement="mid" />}
        <GlassNetwork />
        <GlassCTA onAssess={() => setIsModalOpen(true)} />
        {chromeWorld && <ChromeWorldInterlude placement="closing" />}
      </main>

      <GlassFooter />

      <div className={chromeWorld ? "fixed bottom-4 left-4 z-40" : "fixed bottom-4 left-4 z-40 hidden md:block"}>
        <Link
          to={chromeWorld ? "/glass" : "/classic"}
          className="g-chip !bg-[rgba(4,13,9,0.7)] !text-[9px] hover:!text-[var(--g-gold-hi)]"
        >
          {chromeWorld ? "← Standard" : "← Classic view"}
        </Link>
      </div>

      <FeasibilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
