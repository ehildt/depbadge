import { hashStringToHsl } from "./hash-string-to-hsl";
import { Badge, BadgeMap, Sections } from "./types";

export function generateBadges(
  sections: Sections,
  versions: Record<string, string>,
): BadgeMap {
  const keyValues: [string, Badge][] = Object.values(sections)
    .flat()
    .map((dep): [string, Badge] => [
      dep,
      {
        schemaVersion: 1,
        label: dep,
        message: versions[dep],
        color: hashStringToHsl(dep),
      },
    ])
    .filter(([, { message }]) => Boolean(message));

  return Object.fromEntries(keyValues);
}
