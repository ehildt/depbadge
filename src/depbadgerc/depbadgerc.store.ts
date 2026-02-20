import { useCtxStore } from "src/store/ctx-store";

import { BadgeDependencyMap } from "../manifests/package-json/dependencies-to-badge-map";

import { applyMarkdownToTarget } from "./apply-markdown-to-target";
import { computeStateIntegrity } from "./compute-state-integrity";
import { BadgeArtifactMap, BadgeVariantMap } from "./depbadgerc.helpers";
import { readDepbadgeRC } from "./depbadgerc.read";
import { BadgeArtifact, DepbadgeRC, PackageDependency } from "./depbadgerc.type";
import { getBadgeArtifacts } from "./get-badge-artifacts";
import { getBadgeDependencies } from "./get-badge-dependencies";
import { mapArtifactsToMarkdown } from "./map-artifacts-to-markdown";
import { mapBadgesToMarkdown } from "./map-badges-to-markdown";
import { mapShieldIOEndpointArtifacts } from "./map-shieldio-endpoint-artifacts";
import { mapShieldIOEndpointBadges } from "./map-shieldio-endpoint-badges";
import { outputMarkdownPreview } from "./output-markdown-preview.io";
import { outputShieldioBadgesJson } from "./output-shieldio-badges-json";

export type Methods = {
  getBadgeArtifacts(): BadgeArtifact[];
  getBadgeDependencies(): PackageDependency[];
  outputShieldioBadgesJson(variants: BadgeVariantMap): void;
  mapBadgesToMarkdown(badgeMap: BadgeVariantMap): Record<string, string[]>;
  applyMarkdownToTarget(markdown: string): void;
  mapArtifactsToMarkdown(artifacts: BadgeArtifactMap): Record<string, string[]>;
  mapShieldIOEndpointArtifacts(artifacts: BadgeArtifact[]): BadgeArtifactMap;
  mapShieldIOEndpointBadges(map: BadgeDependencyMap): BadgeVariantMap;
  computeStateIntegrity(...args: any[]): string;
  outputMarkdownPreview(type: "BADGE" | "ARTIFACT", badgeMarkdownMap: Record<string, string[]>, dir?: string): void;
};

export const rcCtxStore = useCtxStore<DepbadgeRC, Methods>(readDepbadgeRC(), {
  getBadgeArtifacts,
  getBadgeDependencies,
  outputShieldioBadgesJson,
  mapBadgesToMarkdown,
  applyMarkdownToTarget,
  mapArtifactsToMarkdown,
  computeStateIntegrity,
  mapShieldIOEndpointArtifacts,
  mapShieldIOEndpointBadges,
  outputMarkdownPreview,
});
