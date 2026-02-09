import { Badge, BadgeMap, Sections } from "./types";

const REGEX = /[^a-zA-Z0-9]/g;
const encodeMessage = (s: string) => encodeURIComponent(s.replace(/^\^/, "v"));
const encodeLabel = (s: string) => encodeURIComponent(s.replace(REGEX, "_"));

function renderBadge(badge: Badge): string {
  return `![${badge.label}](https://img.shields.io/badge/${encodeLabel(
    badge.label,
  )}-${encodeMessage(badge.message)}-${encodeURIComponent(
    badge.color,
  )}.svg?style=for-the-badge)`;
}

export function renderBadgesMarkdown(
  sections: Sections,
  badges: BadgeMap,
): string {
  return Object.entries(sections)
    .filter(([, deps]) => deps.some((dep) => badges[dep]))
    .map(([section, deps]) => {
      const badgeLines = deps
        .map((dep) => badges[dep])
        .filter(Boolean)
        .map(renderBadge);
      if (badgeLines.length === 0) return "";
      const title = `## ${section[0].toUpperCase()}${section.slice(1)}`;
      return [title, ...badgeLines, ""].join("\n");
    })
    .filter(Boolean)
    .join("\n");
}
