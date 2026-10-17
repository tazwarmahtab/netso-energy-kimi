import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { v2ChapterNumber, V2_CHAPTERS, type V2ChapterId } from "./v2Chapters";
import "../../styles/v2-chapter-rail.css";

interface V2ChapterRailProps {
  activeChapter: V2ChapterId;
  onSelect?: (chapter: V2ChapterId) => void;
}

/**
 * The chapter journey lives beside the story, not attached under the header.
 * Desktop only; small screens keep the chapter list inside the menu.
 */
export default function V2ChapterRail({ activeChapter, onSelect }: V2ChapterRailProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const progressScale = reducedMotion ? scrollYProgress : progress;
  const theme = activeChapter === "finance" || activeChapter === "assessment" ? "light" : "dark";

  return (
    <nav className="v2-chapter-rail" data-theme={theme} aria-label="Story chapters">
      <span className="v2-chapter-rail__track" aria-hidden="true">
        <motion.span className="v2-chapter-rail__fill" style={{ scaleY: progressScale }} />
      </span>

      <ol className="v2-chapter-rail__list">
        {V2_CHAPTERS.map((chapter) => {
          const isActive = chapter.id === activeChapter;

          return (
            <li key={chapter.id}>
              <a
                className={`v2-chapter-rail__link${isActive ? " is-active" : ""}`}
                href={chapter.href}
                aria-current={isActive ? "location" : undefined}
                onClick={() => onSelect?.(chapter.id)}
              >
                <span className="v2-chapter-rail__marker" aria-hidden="true">
                  {reducedMotion ? (
                    <span className={`v2-chapter-rail__dot${isActive ? " is-active" : ""}`} />
                  ) : (
                    <motion.span
                      layoutId={isActive ? "v2-chapter-rail-marker" : undefined}
                      className={`v2-chapter-rail__dot${isActive ? " is-active" : ""}`}
                      transition={{ type: "spring", stiffness: 460, damping: 34 }}
                    />
                  )}
                </span>
                <span className="v2-chapter-rail__number">{v2ChapterNumber(chapter.id)}</span>
                <span className="v2-chapter-rail__label">{chapter.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
