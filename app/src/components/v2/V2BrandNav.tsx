import { Menu, X } from "lucide-react";
import { useState } from "react";
import { chapterAnchor, V2_CHAPTERS, type V2ChapterId } from "./v2Chapters";

export default function V2BrandNav({ activeChapter }: { activeChapter: V2ChapterId }) {
  const [open, setOpen] = useState(false);
  const selectChapter = (id: V2ChapterId) => {
    setOpen(false);
    document.querySelector(chapterAnchor(id))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="v2-topbar">
      <a className="v2-topbar__brand" href="/" aria-label="Netso Energy home">
        <strong>NETSO<span>°</span>ENERGY</strong>
      </a>
      <nav className="v2-rail" aria-label="Story chapters">
        {V2_CHAPTERS.map((chapter) => (
          <button key={chapter.id} type="button" className={activeChapter === chapter.id ? "is-active" : ""} onClick={() => selectChapter(chapter.id)}>
            <span className="v2-rail__number">{chapter.number}</span><span>{chapter.label}</span>
          </button>
        ))}
      </nav>
      <div className="v2-topbar__actions">
        <a className="v2-topbar__cta" href="#v2-assessment">Start assessment</a>
        <button className="v2-menu-button" type="button" aria-label={open ? "Close story menu" : "Open story menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav className="v2-mobile-menu" aria-label="Mobile story chapters">
          {V2_CHAPTERS.map((chapter) => (
            <button key={chapter.id} type="button" className={activeChapter === chapter.id ? "is-active" : ""} onClick={() => selectChapter(chapter.id)}>
              <span>{chapter.number}</span>{chapter.label}
            </button>
          ))}
          <a href="#v2-assessment" onClick={() => setOpen(false)}>Start assessment</a>
        </nav>
      )}
    </header>
  );
}
