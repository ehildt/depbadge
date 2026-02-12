import { buildDependencyMap } from "./core/build-dependency-map";
import { generateBadges } from "./core/generate-badges";
import { getStableConfigHash } from "./core/get-stable-config-hash";
import { normalizeSections } from "./core/normalize-sections";
import { readPackageJson } from "./core/read-package-json";
import { renderBadgesMarkdown } from "./core/render-badges-markdown";
import { WithPackageJsonArgs } from "./package-json.types";

import { Badgesrc } from "@/depbadge/types";

export function handlePackageJson(badgesrc: Badgesrc<WithPackageJsonArgs>) {
  const manifest = readPackageJson();
  const signature = getStableConfigHash(badgesrc, manifest);

  const sections = normalizeSections(badgesrc);
  const versions = buildDependencyMap(manifest, sections.internalDependencies);

  if (!sections.dependencies?.length) delete sections.dependencies;
  if (!sections.devDependencies?.length) delete sections.devDependencies;
  if (!sections.peerDependencies?.length) delete sections.peerDependencies;
  if (!sections.internalDependencies?.length)
    delete sections.internalDependencies;

  const badgesJson = generateBadges(sections, versions);
  const badgesMD = renderBadgesMarkdown(sections, badgesJson).trim();

  return {
    badgesJson,
    badgesMD,
    signature,
    manifest,
  };
}
