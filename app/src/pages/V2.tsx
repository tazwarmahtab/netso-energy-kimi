import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import FrameSequence, { type FrameSequenceMarker } from "../components/v2/FrameSequence";
import MasterStory from "../components/v2/MasterStory";
import FinalCTA from "../components/v2/FinalCTA";
import { Wordmark } from "../components/Wordmark";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../components/ui/WhatsAppIcon";
import { MASTER_MANIFEST } from "../components/v2/masterManifestAdapter";
import "../styles/v2.css";
import "../styles/v2-master.css";

const CHAPTERS = [
  { id: "roof", label: "Roof" },
  { id: "architecture", label: "Architecture" },
  { id: "finance", label: "Finance" },
  { id: "operations", label: "Proof" },
] as const;

const MARKERS: FrameSequenceMarker[] = [
  { id: "roof-transform", segmentId: "roof-transform", chapter: "roof" },
  { id: "architecture", segmentId: "city-infrastructure", chapter: "architecture" },
  { id: "finance", segmentId: "finance", chapter: "finance" },
  { id: "operations", segmentId: "operations", chapter: "operations" },
];

function V2Topbar({ activeChapter }: { activeChapter: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="v2-topbar">
        <a href="#roof" className="v2-topbar__brand" aria-label="NETSO°ENERGY">
          <Wordmark />
        </a>
        <nav className="v2-rail" aria-label="Story chapters">
          {CHAPTERS.map((chapter, index) => (
              <a key={chapter.id} className={activeChapter === chapter.id ? "is-active" : ""} aria-current={activeChapter === chapter.id ? "page" : undefined} href={`#${chapter.id}`}>
              <span className="v2-rail__number">0{index + 1}</span>
              <span>{chapter.label}</span>
            </a>
          ))}
        </nav>
        <div className="v2-topbar__actions">
          <a className="v2-topbar__cta" href="#v2-assessment">Request assessment <ArrowRight size={14} /></a>
          <button type="button" className="v2-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="v2-mobile-menu">
          {CHAPTERS.map((chapter, index) => (
            <a key={chapter.id} aria-current={activeChapter === chapter.id ? "page" : undefined} href={`#${chapter.id}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{chapter.label}</a>
          ))}
          <a href="#v2-assessment" onClick={() => setMenuOpen(false)}>Request feasibility assessment <ArrowRight size={16} /></a>
        </div>
      )}
    </>
  );
}

export default function V2() {
  const [activeChapter, setActiveChapter] = useState("roof");
  const [staticMode, setStaticMode] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => setStaticMode(motionQuery.matches);
    motionQuery.addEventListener("change", updateMode);
    const hash = window.location.hash.slice(1);
    if (hash) window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }));
    return () => {
      motionQuery.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    if (!staticMode || typeof IntersectionObserver === "undefined") return undefined;
    const storyScenes = document.querySelectorAll<HTMLElement>("[data-story-chapter]");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      const chapter = visible?.target.getAttribute("data-story-chapter");
      if (chapter && CHAPTERS.some((candidate) => candidate.id === chapter)) setActiveChapter(chapter);
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: "-10% 0px -28%" });
    storyScenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [staticMode]);

  const handleDrawnFrame = (frame: number) => {
    if (staticMode) return;
    const segment = MASTER_MANIFEST.segments.find((candidate) => frame >= candidate.startFrame && frame < candidate.endFrame);
    const chapter = segment?.chapter;
    if (chapter && CHAPTERS.some((candidate) => candidate.id === chapter)) setActiveChapter(chapter);
  };

  return (
    <div className="v2-page">
      <a className="v2-skip-link" href="#v2-assessment">Skip to assessment</a>
      <V2Topbar activeChapter={activeChapter} />
      <main>
        <FrameSequence id="roof" label="Netso Energy master sequence" manifest={MASTER_MANIFEST} markers={MARKERS} onDrawnFrame={handleDrawnFrame}>
          <MasterStory manifest={MASTER_MANIFEST} />
        </FrameSequence>
        <FinalCTA />
      </main>
      <a className="v2-whatsapp-pill" aria-label="WhatsApp commercial desk" href={getNetsoWhatsAppUrl("Hello Netso Energy team, I would like to discuss a rooftop solar feasibility assessment.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width="17" height="17" /> <span>WhatsApp commercial desk</span></a>
    </div>
  );
}
