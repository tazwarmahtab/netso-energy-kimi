import { V2_CHAPTERS, chapterAnchor, type V2ChapterId } from "./v2Chapters";

export default function V2ChapterRail({ activeChapter, onSelect }: { activeChapter: V2ChapterId; onSelect: (chapter: V2ChapterId) => void }) {
  return (
    <aside className="v2-rail v2-chapter-rail" aria-label="Current story chapter">
      {V2_CHAPTERS.map((chapter) => (
        <a key={chapter.id} href={chapterAnchor(chapter.id)} className={activeChapter === chapter.id ? "is-active" : ""} onClick={() => onSelect(chapter.id)}>
          <span className="v2-rail__number">{chapter.number}</span><span>{chapter.label}</span>
        </a>
      ))}
    </aside>
  );
}
