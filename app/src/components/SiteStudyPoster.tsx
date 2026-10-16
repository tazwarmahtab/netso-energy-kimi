import { lazy, Suspense, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { SITE_STUDY_MANIFEST } from "./site-study/manifest";
import "../styles/site-study.css";

const SiteStudyScene = lazy(() => import("./site-study/SiteStudyScene"));

type SiteStudyPosterProps = {
  onOpenAssessment: () => void;
};

export default function SiteStudyPoster({ onOpenAssessment }: SiteStudyPosterProps) {
  const [activeBeat, setActiveBeat] = useState(0);
  const [shouldLoadScene, setShouldLoadScene] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sceneAnchorRef = useRef<HTMLDivElement>(null);
  const beat = SITE_STUDY_MANIFEST.beats[activeBeat];

  useEffect(() => {
    const anchor = sceneAnchorRef.current;
    if (!anchor) return;

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoadScene(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(anchor);

    return () => observer.disconnect();
  }, []);

  const selectBeat = (index: number, moveFocus = false) => {
    setActiveBeat(index);
    if (moveFocus) {
      window.requestAnimationFrame(() => tabRefs.current[index]?.focus());
    }
  };

  const handleBeatKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % SITE_STUDY_MANIFEST.beats.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + SITE_STUDY_MANIFEST.beats.length) % SITE_STUDY_MANIFEST.beats.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = SITE_STUDY_MANIFEST.beats.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectBeat(nextIndex, true);
  };

  return (
    <section id="pergola-twin" className="site-study" aria-labelledby="site-study-title">
      <div className="site-study__shell">
        <div className="site-study__intro">
          <div>
            <p className="site-study__eyebrow">Poster-first site study</p>
            <h2 id="site-study-title">Read the roof as infrastructure.</h2>
          </div>
          <p className="site-study__intro-copy">
            A guided reference for how Netso looks at roof fit, operating access, and electrical context before a project is proposed.
          </p>
        </div>

        <div className="site-study__label" aria-label="Study provenance">
          <span className="site-study__label-dot" aria-hidden="true" />
          <span>{SITE_STUDY_MANIFEST.provenanceLabel}</span>
        </div>

        <div className="site-study__layout">
          <div className="site-study__visual-column">
            <figure className="site-study__poster" aria-labelledby="site-study-poster-caption">
              <img
                src={SITE_STUDY_MANIFEST.poster.asset}
                alt={SITE_STUDY_MANIFEST.poster.alt}
                className="site-study__poster-image"
                loading="lazy"
                decoding="async"
              />
              <div ref={sceneAnchorRef} className="site-study__scene-anchor">
                {shouldLoadScene ? (
                  <Suspense
                    fallback={
                      <span className="site-study__scene-status" role="status">
                        Loading optional 3D site study…
                      </span>
                    }
                  >
                    <SiteStudyScene
                      asset={SITE_STUDY_MANIFEST.scene.asset}
                      alt={SITE_STUDY_MANIFEST.scene.alt}
                      beatId={beat.id}
                    />
                  </Suspense>
                ) : null}
              </div>
              <div className="site-study__poster-wash" aria-hidden="true" />
              <div className="site-study__poster-grid" aria-hidden="true" />
              <div className="site-study__poster-status">{SITE_STUDY_MANIFEST.poster.statusLabel}</div>
              <div className="site-study__poster-notes" aria-hidden="true">
                {beat.annotations.map((annotation, index) => (
                  <span key={annotation} className="site-study__poster-note" data-note-index={index}>
                    <i />
                    {annotation}
                  </span>
                ))}
              </div>
              <figcaption id="site-study-poster-caption" className="site-study__poster-caption">
                {SITE_STUDY_MANIFEST.provenanceLabel}
              </figcaption>
            </figure>

            <p className="site-study__poster-disclosure">
              {SITE_STUDY_MANIFEST.poster.disclosure}
            </p>
            <p className="site-study__scene-disclosure">
              {SITE_STUDY_MANIFEST.scene.disclosure}
            </p>
          </div>

          <div className="site-study__story-column">
            <nav className="site-study__chapters" aria-label="Site-study chapters" role="tablist">
              {SITE_STUDY_MANIFEST.beats.map((chapter, index) => {
                const ChapterIcon = chapter.icon;
                return (
                  <button
                    key={chapter.id}
                    ref={(element) => { tabRefs.current[index] = element; }}
                    id={`site-study-tab-${chapter.id}`}
                    type="button"
                    role="tab"
                    aria-selected={activeBeat === index}
                    aria-controls="site-study-panel"
                    tabIndex={activeBeat === index ? 0 : -1}
                    className={activeBeat === index ? "is-active" : ""}
                    onClick={() => selectBeat(index)}
                    onKeyDown={(event) => handleBeatKeyDown(event, index)}
                  >
                    <span className="site-study__chapter-number">{chapter.number}</span>
                    <ChapterIcon size={14} aria-hidden="true" />
                    <span>{chapter.label}</span>
                  </button>
                );
              })}
            </nav>

            <article
              id="site-study-panel"
              className="site-study__panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`site-study-tab-${beat.id}`}
              aria-live="polite"
            >
              <p className="site-study__panel-eyebrow">{beat.eyebrow}</p>
              <h3>{beat.title}</h3>
              <p className="site-study__panel-copy">{beat.copy}</p>

              <div className="site-study__annotation-summary">
                <p>Reference annotations</p>
                <ul>
                  {beat.annotations.map((annotation) => (
                    <li key={annotation}>
                      <span aria-hidden="true">•</span>
                      {annotation}
                    </li>
                  ))}
                </ul>
              </div>

              {activeBeat === SITE_STUDY_MANIFEST.beats.length - 1 && (
                <div className="site-study__cta">
                  <button type="button" onClick={onOpenAssessment}>
                    Request a preliminary site assessment <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  <a href="/contact">Keep exploring with Netso</a>
                </div>
              )}
            </article>

            <aside className="site-study__considerations" aria-label="What a preliminary site study considers">
              <p>What the review considers</p>
              <ul>
                <li><strong>Roof fit</strong><span>Usable zones, setbacks, equipment, and maintenance clearance.</span></li>
                <li><strong>Operating access</strong><span>Service paths, loading, drainage, and installation windows.</span></li>
                <li><strong>Electrical context</strong><span>Load, protection, and the route to the facility connection.</span></li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
