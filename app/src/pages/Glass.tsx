import { useState } from "react";
import { Link } from "react-router";
import FeasibilityModal from "../components/FeasibilityModal";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import {
  GlassArchitecture,
  GlassEconomics,
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
  GlassWhy,
} from "../components/glass/sections-b";
import "../styles/glass.css";

/**
 * NETSO GLASS — the v3 experience.
 *
 * A parallel route to the shipped homepage so the two can be compared
 * side by side. Design direction, section-by-section audit and the decision
 * ledger live in `docs/GLASS-AUDIT.md`.
 */
export default function Glass() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useSmoothScroll();

  return (
    <div className="g-root g-canvas g-grain overflow-x-clip">
      <GlassProgress />
      <GlassNav onAssess={() => setIsModalOpen(true)} />

      <main>
        <GlassHero onAssess={() => setIsModalOpen(true)} />
        <GlassTicker />
        <GlassArchitecture />
        <GlassEconomics onAssess={() => setIsModalOpen(true)} />
        <GlassOperations />
        <GlassProof />
        <GlassBenefits />
        <GlassProcess />
        <GlassWhy />
        <GlassNetwork />
        <GlassCTA onAssess={() => setIsModalOpen(true)} />
      </main>

      <GlassFooter />

      <div className="fixed bottom-4 left-4 z-40 hidden md:block">
        <Link
          to="/"
          className="g-chip !bg-[rgba(4,13,9,0.7)] !text-[9px] hover:!text-[var(--g-gold-hi)]"
        >
          ← Classic view
        </Link>
      </div>

      <FeasibilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
