import { useEffect, useState } from "react";
import FrameSequence, { type FrameSequenceMarker } from "../components/v2/FrameSequence";
import MasterStory from "../components/v2/MasterStory";
import V2BrandNav from "../components/v2/V2BrandNav";
import V2ChapterRail from "../components/v2/V2ChapterRail";
import FinalCTA from "../components/v2/FinalCTA";
import Footer from "../components/Footer";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../components/ui/WhatsAppIcon";
import { shouldUseStaticMode } from "../components/v2/frameSequenceMath";
import { MASTER_MANIFEST } from "../components/v2/masterManifestAdapter";
import { isV2ChapterId, type V2ChapterId } from "../components/v2/v2Chapters";
import { WHATSAPP_MESSAGE, WHATSAPP_PILL_LABEL } from "../components/v2/v2Actions";
import SkyVideoHero from "../components/v2/SkyVideoHero";
import "../styles/v2.css";
import "../styles/v2-hero-video.css";
import "../styles/v2-master.css";

const MARKERS: FrameSequenceMarker[] = [
  { id: "roof-transform", segmentId: "roof-transform", chapter: "roof" },
  { id: "architecture", segmentId: "city-infrastructure", chapter: "architecture" },
  { id: "finance", segmentId: "finance", chapter: "finance" },
  { id: "operations", segmentId: "operations", chapter: "operations" },
];

function readStaticMode(): boolean {
  if (typeof window === "undefined") return false;
  const connection = typeof navigator !== "undefined"
    ? (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    : undefined;
  return shouldUseStaticMode({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    reducedData: window.matchMedia("(prefers-reduced-data: reduce)").matches,
    saveData: connection?.saveData === true,
    viewportWidth: window.innerWidth,
  });
}

export default function V2() {
  const [activeChapter, setActiveChapter] = useState<V2ChapterId>("roof");
  const [staticMode, setStaticMode] = useState(readStaticMode);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dataQuery = window.matchMedia("(prefers-reduced-data: reduce)");
    const widthQuery = window.matchMedia("(max-width: 900px)");
    const updateMode = () => setStaticMode(readStaticMode());
    motionQuery.addEventListener("change", updateMode);
    dataQuery.addEventListener("change", updateMode);
    widthQuery.addEventListener("change", updateMode);
    const hash = window.location.hash.slice(1);
    if (hash) window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" }));
    return () => {
      motionQuery.removeEventListener("change", updateMode);
      dataQuery.removeEventListener("change", updateMode);
      widthQuery.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    if (!staticMode || typeof IntersectionObserver === "undefined") return undefined;
    const storyScenes = document.querySelectorAll<HTMLElement>("[data-story-chapter]");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      const chapter = visible?.target.getAttribute("data-story-chapter");
      if (isV2ChapterId(chapter)) setActiveChapter(chapter);
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: "-10% 0px -28% 0px" });
    storyScenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [staticMode]);

  const handleDrawnFrame = (frame: number) => {
    if (staticMode) return;
    const segment = MASTER_MANIFEST.segments.find((candidate) => frame >= candidate.startFrame && frame < candidate.endFrame);
    if (isV2ChapterId(segment?.chapter)) setActiveChapter(segment.chapter);
  };

  return (
    <div className="v2-page">
      <a className="v2-skip-link" href="#v2-assessment">Skip to assessment</a>
      <V2BrandNav activeChapter={activeChapter} />
      <V2ChapterRail activeChapter={activeChapter} onSelect={setActiveChapter} />
      <main>
        <SkyVideoHero />
        <FrameSequence id="roof" label="Netso Energy master sequence" manifest={MASTER_MANIFEST} markers={MARKERS} onDrawnFrame={handleDrawnFrame}>
          <MasterStory manifest={MASTER_MANIFEST} />
        </FrameSequence>
        <FinalCTA />
      </main>
      <Footer v2 />
      <a className="v2-whatsapp-pill" aria-label={`${WHATSAPP_PILL_LABEL} — Netso Energy desk`} href={getNetsoWhatsAppUrl(WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width="17" height="17" /> <span>{WHATSAPP_PILL_LABEL}</span></a>
    </div>
  );
}
