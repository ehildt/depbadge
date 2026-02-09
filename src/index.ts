import fs from "fs";

import { buildDependencyMap } from "./core/build-dependency-map";
import { generateBadges } from "./core/generate-badges";
import { getStableConfigHash } from "./core/get-stable-config-hash";
import { normalizeSections } from "./core/normalize-sections";
import { readPackageJson } from "./core/read-package-json";
import { renderBadgesMarkdown } from "./core/render-badges-markdown";
import { readBadgesrc } from "./io/read-badgesrc";
import { writeBadgesrc } from "./io/write-badgesrc";

const BADGES_JSON = "badges.json";
const BADGES_README = "BADGES.md";

const packageJson = readPackageJson();
const { badgesrc, signature } = readBadgesrc();

const newSignature = getStableConfigHash(badgesrc, {
  dependencies: packageJson.dependencies ?? {},
  devDependencies: packageJson.devDependencies ?? {},
  peerDependencies: packageJson.peerDependencies ?? {},
});

if (signature === newSignature) {
  console.log("No dependency changes detected");
  process.exit(0);
}

const sections = normalizeSections(badgesrc);
const versions = buildDependencyMap(packageJson, sections.internalDependencies);

if (!sections.dependencies?.length) delete sections.dependencies;
if (!sections.devDependencies?.length) delete sections.devDependencies;
if (!sections.peerDependencies?.length) delete sections.peerDependencies;
if (!sections.internalDependencies?.length)
  delete sections.internalDependencies;

console.log(JSON.stringify(versions, null, 2));

const badges = generateBadges(sections, versions);

fs.writeFileSync(BADGES_JSON, JSON.stringify(badges, null, 2));
fs.writeFileSync(BADGES_README, renderBadgesMarkdown(sections, badges));
writeBadgesrc(badgesrc, newSignature);
