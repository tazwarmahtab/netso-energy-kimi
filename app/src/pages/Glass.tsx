import { useState } from "react";
import FeasibilityModal from "../components/FeasibilityModal";
import { EnergyEcosystem } from "../components/glass/EnergyEcosystem";
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
import "../styles/glass.css";

/**
 * NETSO GLASS — the v3 homepage.
 *
 * Served at / and /glass. Legacy classic code is preserved in Git history,
 * not publicly routable while its outdated commercial claims remain unverified.
 * Design/audit context lives in docs/GLASS-AUDIT.md.
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
        <GlassOperations />
        <GlassProof />
        <GlassBenefits />
        <GlassProcess />
        <GlassNetwork />
        <EnergyEcosystem />
        <GlassCTA onAssess={() => setIsModalOpen(true)} />
      </main>

      <GlassFooter />

      <FeasibilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
