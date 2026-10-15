export const V2_CHAPTERS = [
  { id: "roof", number: "01", label: "Roof" },
  { id: "architecture", number: "02", label: "Architecture" },
  { id: "finance", number: "03", label: "Finance" },
  { id: "operations", number: "04", label: "Operations" },
  { id: "assessment", number: "05", label: "Assessment" },
] as const;

export type V2ChapterId = (typeof V2_CHAPTERS)[number]["id"];

export function isV2ChapterId(value: unknown): value is V2ChapterId {
  return V2_CHAPTERS.some((chapter) => chapter.id === value);
}

export function chapterAnchor(id: V2ChapterId): string {
  return id === "assessment" ? "#v2-assessment" : `#${id}`;
}
