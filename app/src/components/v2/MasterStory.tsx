import { ArrowDown, ArrowRight } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { getMasterSegment, type MasterManifest, type MasterSegment } from "./masterStoryHelper";
import FinanceChapter from "./FinanceChapter";

interface MasterStoryProps {
  manifest: MasterManifest;
}

const sceneTitleId = (segmentId: string) => `master-${segmentId}-title`;

function handleDiscoverRoof(event: MouseEvent<HTMLAnchorElement>): void {
  const sequence = document.querySelector<HTMLElement>("[data-master-sequence]");
  const staticMode = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    || sequence?.dataset.masterFallback === "true";
  if (!staticMode) return;
  event.preventDefault();
  document.getElementById("architecture")?.scrollIntoView({ block: "start" });
}

function Evidence({ segment }: { segment: MasterSegment }) {
  return <p className="master-story__evidence"><span className="v2-signal" /> {segment.evidenceLabel}</p>;
}

function Poster({ segment }: { segment: MasterSegment }) {
  return <img className="master-story__poster" src={segment.poster} alt="" aria-hidden="true" width="1280" height="720" loading="lazy" />;
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
      <div className="master-story__copy">{children}</div>
      <Evidence segment={segment} />
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
  const assessment = getMasterSegment(manifest, "assessment");

  return (
    <div className="master-story" aria-label="Netso rooftop energy story">
      <Scene segment={sky}>
        <p className="v2-kicker"><span>01</span> / Solar transformation</p>
        <h1 id={sceneTitleId(sky.id)}>The sky is<br /><em>already working.</em></h1>
        <p className="v2-lede">A building surface becomes a working energy asset—financed, designed, and operated by Netso.</p>
        <a className="v2-scroll-cue master-story__scroll-cue" href="#roof-transform" onClick={handleDiscoverRoof}>
          <span>Discover the roof</span><ArrowDown size={16} />
        </a>
      </Scene>

      <Scene segment={roof} staticHidden>
        <p className="v2-kicker"><span>01</span> / Roof transformation</p>
        <h2 id={sceneTitleId(roof.id)}>Your roof.<br /><em>Paying you.</em></h2>
        <p className="v2-lede">A proposed rooftop system turns an underused surface into an energy asset for evaluation.</p>
        <a className="v2-button v2-button--gold" href="#v2-assessment">Request a feasibility assessment <ArrowRight size={16} /></a>
      </Scene>

      <Scene segment={city}>
        <p className="v2-kicker"><span>02</span> / Architecture</p>
        <h2 id={sceneTitleId(city.id)}>Infrastructure<br /><em>with presence.</em></h2>
        <p className="v2-lede">Steel, glass, shade, and energy are composed as one proposed rooftop system.</p>
        <div className="master-story__specs"><span><b>01</b> Structural steel</span><span><b>02</b> Bifacial glass</span><span><b>03</b> Under-canopy light</span></div>
      </Scene>

      <Scene segment={pergola} staticHidden>
        <p className="v2-kicker"><span>02</span> / The finished system</p>
        <h2 id={sceneTitleId(pergola.id)}>Designed<br /><em>to belong.</em></h2>
        <p className="v2-lede">The architectural payoff is a shaded, durable rooftop proposal that earns its place in the building.</p>
      </Scene>

      <Scene segment={finance} labelledBy="v2-finance-title">
        <FinanceChapter embedded evidenceLabel="Illustrative index / no tariff or live quote" />
      </Scene>

      <Scene segment={operations}>
        <p className="v2-kicker"><span>04</span> / Operating practice</p>
        <h2 id={sceneTitleId(operations.id)}>The work<br /><em>continues.</em></h2>
        <p className="v2-lede">Inspection, monitoring, and maintenance are practices to evaluate during feasibility—not a verified Netso installation claim.</p>
      </Scene>

      <Scene segment={dusk} staticHidden>
        <p className="v2-kicker"><span>04</span> / Context footage</p>
        <h2 id={sceneTitleId(dusk.id)}>Stay close<br /><em>to the evidence.</em></h2>
        <p className="v2-lede">Supplied-footage context carries the story from operating practice toward a human commercial decision. It does not imply solar generation after dark.</p>
      </Scene>

      <Scene segment={decision} staticHidden>
        <p className="v2-kicker"><span>04</span> / Commercial decision</p>
        <h2 id={sceneTitleId(decision.id)}>The decision<br /><em>is human.</em></h2>
        <p className="v2-lede">Measure, review, and decide with the site facts in view. Commercial terms remain subject to site feasibility.</p>
      </Scene>

      <Scene segment={assessment} staticHidden>
        <p className="v2-kicker"><span>Next</span> / Feasibility</p>
        <h2 id={sceneTitleId(assessment.id)}>Bring the roof<br /><em>into focus.</em></h2>
        <p className="v2-lede">The next chapter starts with a real facility, a recent bill, and a local-only first-pass assessment.</p>
        <a className="v2-button v2-button--gold" href="#v2-assessment">Start the assessment <ArrowRight size={16} /></a>
      </Scene>
    </div>
  );
}
