export type EvidenceState =
  | "reference"
  | "illustrative"
  | "project-specific"
  | "operational"
  | "verified";

export interface VisualAssetDefinition {
  state: EvidenceState;
  scene: string;
  supports: string[];
}

export const VISUAL_ASSET_MANIFEST: Record<string, VisualAssetDefinition> = {
  hero: {
    state: "reference",
    scene: "roof-to-energy-asset",
    supports: ["Netso commercial model", "rooftop solar transformation"],
  },
  architecture: {
    state: "reference",
    scene: "solar-reference-architecture",
    supports: ["structure", "module configuration", "architectural integration"],
  },
  economics: {
    state: "illustrative",
    scene: "asset-to-cashflow",
    supports: ["PPA mechanism", "illustrative savings logic"],
  },
  operations: {
    state: "reference",
    scene: "operating-asset",
    supports: ["maintenance workflow", "monitoring workflow", "engineering process"],
  },
  engineering: {
    state: "reference",
    scene: "structural-reference-model",
    supports: ["system geometry", "component relationships", "day-to-night lighting concept"],
  },
  network: {
    state: "reference",
    scene: "distributed-rooftop-network",
    supports: ["network thesis", "distributed asset vision"],
  },
};

export const EVIDENCE_LABEL: Record<EvidenceState, string> = {
  reference: "REFERENCE",
  illustrative: "ILLUSTRATIVE",
  "project-specific": "PROJECT-SPECIFIC",
  operational: "LIVE",
  verified: "VERIFIED",
};
