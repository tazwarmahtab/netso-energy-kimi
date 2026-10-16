import { Check, MapPin, Route, Ruler, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import industrialAerial from "../../assets/neighborhood-aerial.jpg";

export type SiteStudyBeat = {
  id: string;
  number: string;
  label: string;
  eyebrow: string;
  title: string;
  copy: string;
  annotations: readonly string[];
  icon: LucideIcon;
};

type SiteStudyPosterAsset = {
  asset: string;
  alt: string;
  statusLabel: string;
  status: "temporary";
  sourceStatus: "existing-local-reference";
  disclosure: string;
};

type SiteStudySceneAsset = {
  asset: string;
  alt: string;
  status: "generated-illustrative";
  sourceStatus: "local-generated-geometry";
  disclosure: string;
};

export type SiteStudyManifest = {
  provenanceLabel: string;
  poster: SiteStudyPosterAsset;
  scene: SiteStudySceneAsset;
  evidenceStatus: "illustrative";
  sourceStatus: "temporary-local-reference";
  beats: readonly SiteStudyBeat[];
};

export const SITE_STUDY_MANIFEST = {
  provenanceLabel: "Representative garment facility · illustrative site study",
  poster: {
    asset: industrialAerial,
    alt: "Industrial district aerial reference image used as a temporary illustrative poster; not a surveyed garment facility or engineering result.",
    statusLabel: "Temporary asset · illustrative poster",
    status: "temporary",
    sourceStatus: "existing-local-reference",
    disclosure:
      "Temporary poster retained as the immediate fallback while the optional scene loads. It is an existing local reference, not a surveyed garment facility or engineering result.",
  },
  scene: {
    asset: "/assets/v2/site-study-factory.glb",
    alt: "Low-poly illustrative garment-factory roof study with parapets, access paths, utility boxes, loading edge, and reference solar markers.",
    status: "generated-illustrative",
    sourceStatus: "local-generated-geometry",
    disclosure:
      "Locally generated fictional geometry for the site-study experience. It is not a surveyed customer facility, installed project, or engineering result; solar elements are reference markers only.",
  },
  evidenceStatus: "illustrative",
  sourceStatus: "temporary-local-reference",
  beats: [
    {
      id: "arrival",
      number: "01",
      label: "Arrival",
      eyebrow: "Whole-site arrival",
      title: "Start with the facility, not the panels.",
      copy: "This temporary visual reference frames the site as a working garment facility: production space, roof surface, and the movement around it.",
      annotations: ["Representative production block", "Loading + circulation edge"],
      icon: MapPin,
    },
    {
      id: "roof-fit",
      number: "02",
      label: "Roof fit",
      eyebrow: "Roof-fit reveal",
      title: "The roof is assessed as a working surface.",
      copy: "A preliminary review looks at usable roof zones, parapet edges, roof equipment, and maintenance clearance before any system is proposed.",
      annotations: ["Illustrative roof zone", "Maintenance clearance", "Roof equipment / vent zone"],
      icon: Ruler,
    },
    {
      id: "access",
      number: "03",
      label: "Access",
      eyebrow: "Operating constraints",
      title: "Operating access stays in the picture.",
      copy: "Panel placement must leave room for service access, drainage, loading, and safe installation windows. These are reference conditions, not approval.",
      annotations: ["Reference access path", "Illustrative exclusion zone", "Loading / service edge"],
      icon: Route,
    },
    {
      id: "electrical",
      number: "04",
      label: "Electrical context",
      eyebrow: "Energy path",
      title: "Generation is planned around the facility.",
      copy: "The electrical context connects the roof to the production block through an example route. A site review verifies the actual connection, load, and protection requirements.",
      annotations: ["Example electrical route", "Representative production block", "Illustrative utility interface"],
      icon: Zap,
    },
    {
      id: "assessment",
      number: "05",
      label: "Assessment",
      eyebrow: "Preliminary site-assessment handoff",
      title: "Could your factory's roof support a project like this?",
      copy: "Share the facility basics. Netso can review the roof, load, access, and electrical context before proposing a project structure. This is a preliminary conversation, not an instant engineering result.",
      annotations: ["Roof + load review", "Access + electrical context", "Preliminary assessment handoff"],
      icon: Check,
    },
  ],
} as const satisfies SiteStudyManifest;
