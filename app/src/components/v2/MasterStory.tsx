import { Activity, ArrowDown, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { getMasterSegment, type MasterManifest, type MasterSegment } from "./masterStoryHelper";
import { getV2Chapter, v2ChapterNumber, type V2ChapterId } from "./v2Chapters";
import FinanceChapter from "./FinanceChapter";

interface MasterStoryProps {
  manifest: MasterManifest;
}

const sceneTitleId = (segmentId: string) => `master-${segmentId}-title`;

/** Number and label both come from the shared chapter map, so the rail and the
 *  section kickers cannot drift apart. Sub-beats pass no chapter. */
const ChapterKicker = ({ chapter, beat }: { chapter?: V2ChapterId; beat?: string }) => (
  <p className="v2-kicker">
    {chapter ? <><span>{v2ChapterNumber(chapter)}</span> / {getV2Chapter(chapter).label}</> : beat}
  </p>
);

function handleDiscoverRoof(event: MouseEvent<HTMLAnchorElement>): void {
  const sequence = document.querySelector<HTMLElement>("[data-master-sequence]");
  const staticMode = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    || sequence?.dataset.masterFallback === "true";
  if (!staticMode) return;
  event.preventDefault();
  document.getElementById("architecture")?.scrollIntoView({ block: "start" });
}

/**
 * The receipt-locked manifest carries the provenance class; supplied footage
 * needs the qualifier that the manifest cannot restate without a media-version
 * change. Keep those qualifiers in one place instead of inline ternaries.
 */
const EVIDENCE_OVERRIDES: Record<string, string> = {
  operations: "Supplied footage · operating context, not a Netso installation",
  dusk: "Supplied footage · dusk context, not nighttime generation",
  decision: "Supplied footage · commercial context",
};

function Evidence({ segment }: { segment: MasterSegment }) {
  return (
    <p className="master-story__evidence">
      <span aria-hidden="true" /> {EVIDENCE_OVERRIDES[segment.id] ?? segment.evidenceLabel}
    </p>
  );
}

function Poster({ segment }: { segment: MasterSegment }) {
  return <img className="master-story__poster" src={segment.poster} alt="" aria-hidden="true" width="1280" height="720" loading="lazy" />;
}

const VALUE_DOCK_ITEMS = [
  {
    label: "Asset-owned model",
    detail: "Customer asset purchase may be zero upfront*",
    icon: ShieldCheck,
  },
  {
    label: "Netso operates",
    detail: "The operating scope stays visible",
    icon: Activity,
  },
  {
    label: "Site-specific terms",
    detail: "Reviewed against measured load and generation",
    icon: TrendingUp,
  },
] as const;

function ValueDock() {
  return (
    <aside className="master-story__value-dock" aria-label="Commercial model highlights">
      <ul>
        {VALUE_DOCK_ITEMS.map(({ label, detail, icon: Icon }) => (
          <li key={label}>
            <span className="master-story__value-icon" aria-hidden="true"><Icon size={14} strokeWidth={1.6} /></span>
            <span className="master-story__value-copy">
              <strong>{label}</strong>
              <span>{detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <p>* Project-financing and site-feasibility dependent.</p>
    </aside>
  );
}

function Scene({ segment, children, labelledBy, staticHidden = false }: { segment: MasterSegment; children: ReactNode; labelledBy?: string; staticHidden?: boolean }) {
  const titleId = labelledBy ?? sceneTitleId(segment.id);
  return (
    <article
      className={`master-story__scene master-story__scene--${segment.id}`}
      data-story-segment-id={segment.id}
      data-story-chapter={segment.chapter}
      data-story-static-hidden={staticHidden ? "true" : undefined}
      data-story-active={segment.id === "sky-opening" ? "true" : "false"}
      aria-hidden={segment.id === "sky-opening" ? undefined : true}
      inert={segment.id === "sky-opening" ? undefined : true}
      aria-labelledby={titleId}
    >
      <Poster segment={segment} />
      <div className="master-story__copy">{children}<Evidence segment={segment} /></div>
    </article>
  );
}

export default function MasterStory({ manifest }: MasterStoryProps) {
  const sky = getMasterSegment(manifest, "sky-opening");
  const roof = getMasterSegment(manifest, "roof-transform");
  const city = getMasterSegment(manifest, "city-infrastructure");
  const pergola = getMasterSegment(manifest, "pergola-payoff");
  const finance = getMasterSegment(manifest, "finance");
  const operations = getMasterSegment(manifest, "operations");
  const dusk = getMasterSegment(manifest, "dusk");
  const decision = getMasterSegment(manifest, "decision");

  return (
    <div className="master-story" aria-label="Netso rooftop energy story">
      <Scene segment={sky}>
        <ChapterKicker chapter="roof" />
        <h1 id={sceneTitleId(sky.id)}>The sky is<br /><em>already working.</em></h1>
        <p className="v2-lede">A rooftop system designed, financed, and operated by Netso, subject to site feasibility and approved commercial terms.</p>
        <a className="master-story__text-action" href="#finance">See the economics <ArrowRight size={15} aria-hidden="true" /></a>
        <a className="v2-scroll-cue master-story__scroll-cue" href="#roof-transform" onClick={handleDiscoverRoof}>
          <span>Continue through the roof</span><ArrowDown size={16} aria-hidden="true" />
        </a>
      </Scene>

      <Scene segment={roof} staticHidden>
        <ChapterKicker beat="Transformation" />
        <h2 id={sceneTitleId(roof.id)}>Your roof.<br /><em>In focus.</em></h2>
        <p className="v2-lede">A proposed rooftop system makes the facility’s roof, load, and contract reviewable in one frame.</p>
      </Scene>

      <Scene segment={city}>
        <ChapterKicker chapter="architecture" />
        <h2 id={sceneTitleId(city.id)}>Infrastructure<br /><em>with presence.</em></h2>
        <p className="v2-lede">Structural steel, bifacial glass, shade, and energy are composed as one proposed rooftop system for a working facility.</p>
        <div className="master-story__specs"><span><b>01</b> Structural steel</span><span><b>02</b> Bifacial glass</span><span><b>03</b> Under-canopy light</span></div>
      </Scene>

      <Scene segment={pergola} staticHidden>
        <ChapterKicker beat="The finished system" />
        <h2 id={sceneTitleId(pergola.id)}>Designed<br /><em>to belong.</em></h2>
        <p className="v2-lede">A shaded rooftop proposal designed around the building, with a commercial structure ready for site review.</p>
      </Scene>

      <Scene segment={finance} labelledBy="v2-finance-title">
        <FinanceChapter embedded evidenceLabel="Illustrative calculation / no tariff or live quote" />
      </Scene>

      <Scene segment={operations}>
        <ChapterKicker chapter="operations" />
        <h2 id={sceneTitleId(operations.id)}>Power, under<br /><em>watch.</em></h2>
        <p className="v2-lede">Netso can coordinate monitoring, maintenance, and service obligations; final coverage follows the project documents and measured site data.</p>
      </Scene>

      <Scene segment={dusk} staticHidden>
        <ChapterKicker beat="Stewardship" />
        <h2 id={sceneTitleId(dusk.id)}>A roof becomes<br /><em>an agreement.</em></h2>
        <p className="v2-lede">Daytime generation is one input. The commercial case is a system and a contract, reviewed against the facility’s measured load.</p>
      </Scene>

      <Scene segment={decision} staticHidden>
        <ChapterKicker beat="The decision" />
        <h2 id={sceneTitleId(decision.id)}>Start with<br /><em>the site.</em></h2>
        <p className="v2-lede">Roof area, load shape, structural conditions, site access, and commercial terms determine whether the concept can become a project.</p>
      </Scene>

      <ValueDock />
    </div>
  );
}
