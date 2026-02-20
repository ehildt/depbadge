// ! depbadgerc should be agnostic in function and typ from any manifest file
// one solution could be to pass a callback function and require a return type
import { Store } from "src/store/create-store";
import { CtxStore, useCtxCallback } from "src/store/ctx-store";

import { BadgeArtifact, BadgeArtifactSource, DepbadgeRC } from "../depbadgerc/depbadgerc.type";
import { ManifestMethods } from "../manifests/package-json/manifest.store";
import { DepbadgeManifest } from "../manifests/package-json/manifest.type";

import { Methods } from "./depbadgerc.store";
import { BadgeVariant } from "./depbadgerc.type";
import { updateDepbadgeRCIntegrity } from "./depbadgerc.update";

export type BadgeVariantMap = Record<string, Record<string, BadgeVariant[]>>;
export type BadgeArtifactMap = Record<BadgeArtifactSource, BadgeArtifact[]>;

export function canGenerate(args: string[] = [], v: string) {
  return args?.includes(v) ?? false;
}

export function stateIntegrityChanged(arg: string | undefined, v: string) {
  return arg ? !v.includes(arg) : true;
}

export const materializeHelper = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (store, mf: Store<DepbadgeManifest, ManifestMethods>) => {
    const deps = store.getBadgeDependencies();
    const depMap = mf.dependenciesToBadgeMap(deps);
    const integrity = store.computeStateIntegrity(deps, mf.version);
    const badgeMap = store.mapShieldIOEndpointBadges(depMap);
    const artifacts = store.getBadgeArtifacts();
    const artifactMap = store.mapShieldIOEndpointArtifacts(artifacts);
    const badgesMarkdown = store.mapBadgesToMarkdown(badgeMap);
    const artifactsMarkdown = store.mapArtifactsToMarkdown(artifactMap);

    if (canGenerate("badges")) store.outputShieldioBadgesJson(badgeMap);
    if (canGenerate("preview")) {
      store.outputMarkdownPreview("BADGE", badgesMarkdown);
      store.outputMarkdownPreview("ARTIFACT", artifactsMarkdown);
    }

    // ! clean the helpers file
    if (stateIntegrityChanged(integrity)) updateDepbadgeRCIntegrity(integrity);

    const mdBadges = Object.entries(badgesMarkdown)
      .map(([section, badges]) => `${store.badgeStyle.sectionHeader ? `\n\n# ${section}` : ""}\n\n${badges.join("\n")}`)
      .join("")
      .trim();

    const mdArtifacts = Object.entries(artifactsMarkdown)
      .map(([section, badges]) => `${store.badgeStyle.sectionHeader ? `\n\n# ${section}` : ""}\n\n${badges.join("\n")}`)
      .join("")
      .trim();

    store.applyMarkdownToTarget(`<div align="center">\n\n${mdArtifacts}\n\n${mdBadges}\n\n</div>`);

    process.exit(0);
  },
);
