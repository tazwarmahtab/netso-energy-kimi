/**
 * One chapter map for the side rail, the mobile menu and every chapter kicker.
 *
 * Anchors are public targets and must not change (blueprint section 6); the
 * human-readable labels may. Chapter names follow the blueprint journey:
 * Roof → Structure → Economics → Operations → Assessment.
 */
import { ASSESSMENT_HREF } from "./v2Actions";

export type V2ChapterId = "roof" | "architecture" | "finance" | "operations" | "assessment";

export interface V2Chapter {
  id: V2ChapterId;
  label: string;
  href: string;
}

export const V2_CHAPTERS: readonly V2Chapter[] = [
  { id: "roof", label: "Roof", href: "#roof" },
  { id: "architecture", label: "Structure", href: "#architecture" },
  { id: "finance", label: "Economics", href: "#finance" },
  { id: "operations", label: "Operations", href: "#operations" },
  { id: "assessment", label: "Assessment", href: ASSESSMENT_HREF },
];

export const V2_CHAPTER_IDS: readonly V2ChapterId[] = V2_CHAPTERS.map((chapter) => chapter.id);

export const v2ChapterIndex = (id: V2ChapterId): number =>
  Math.max(0, V2_CHAPTERS.findIndex((chapter) => chapter.id === id));

export const v2ChapterNumber = (id: V2ChapterId): string =>
  String(v2ChapterIndex(id) + 1).padStart(2, "0");

export const getV2Chapter = (id: V2ChapterId): V2Chapter =>
  V2_CHAPTERS[v2ChapterIndex(id)];

/** The single kicker string for a chapter, so rails and sections cannot drift. */
export const v2ChapterKicker = (id: V2ChapterId): string =>
  `${v2ChapterNumber(id)} / ${getV2Chapter(id).label}`;

export const isV2ChapterId = (value: string | null | undefined): value is V2ChapterId =>
  typeof value === "string" && V2_CHAPTER_IDS.some((id) => id === value);
