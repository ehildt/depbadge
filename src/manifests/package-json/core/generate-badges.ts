import { WithPackageJsonArgs } from "../package-json.types";

import { hashStringToHsl } from "./hash-string-to-hsl";

import { Badge, BadgeMap } from "@/depbadge/types";

export function generateBadges(
  args: WithPackageJsonArgs,
  versions: Record<string, string>,
): BadgeMap {
  const keyValues: [string, Badge][] = Object.values(args)
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
