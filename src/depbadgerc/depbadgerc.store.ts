import { ManifestMethods } from "../manifest/package-json/manifest.store";
import { CtxStore, useCtxStore } from "../store/ctx-store";

import { applyMarkdownToTarget } from "./apply-markdown-to-target";
import { computeStateIntegrity } from "./compute-state-integrity";
import { DepbadgeRC, Dependencies, StatusBadges } from "./depbadgerc.type";
import { ManifestContract, ManifestContractSection, ManifestDependencyMap } from "./depbadgerc-manifest-contract.type";
import { getDependencies } from "./get-dependencies";
import { getStatusBadges } from "./get-status-badges";
import { HydratedDependencyMap, hydrateDependencyBadges, RCDependencyMap } from "./hydrate-dependency-badges";
import { HydratedStatusBadgeMap } from "./hydrate-status-badges";
import { hydrateStatusBadges } from "./hydrate-status-badges";
import { mapBadgesToMarkdown } from "./map-badges-to-markdown";
import { mapStatusBadgesToMarkdown } from "./map-status-badges-to-markdown";
import { outputMarkdownPreview } from "./output-markdown-preview.io";
import { outputShieldioBadgesJson } from "./output-shieldio-badges-json";
import { processManifest } from "./process-manifest";
import { DEPBADGERC } from "./read-depbadgerc-with-defaults";

export type Methods = {
  processManifest(mf: CtxStore<ManifestContract, ManifestMethods>): void;
  getDependencies(): Record<ManifestContractSection, Dependencies>;
  getStatusBadges(): Record<ManifestContractSection, StatusBadges>;
  hydrateDependencyBadges(deps: RCDependencyMap, mfdm: ManifestDependencyMap): HydratedDependencyMap;
  outputShieldioBadgesJson(hbm: HydratedDependencyMap): void;
  mapBadgesToMarkdown(badgeMap: HydratedDependencyMap): Record<string, string[]>;
  applyMarkdownToTarget(...markdowns: Record<string, string[]>[]): void;
  mapStatusBadgesToMarkdown(statusBadges: HydratedStatusBadgeMap): Record<string, string[]>;
  hydrateStatusBadges(statusBadges: Record<ManifestContractSection, StatusBadges>): HydratedStatusBadgeMap;
  computeStateIntegrity(...args: any[]): string;
  outputMarkdownPreview(
    type: "BADGES" | "STATUS_BADGES",
    badgeMarkdownMap: Record<string, string[]>,
    dir?: string,
  ): void;
};

export const rcCtxStore = useCtxStore<DepbadgeRC, Methods>(DEPBADGERC, {
  processManifest,
  getDependencies,
  getStatusBadges,
  outputShieldioBadgesJson,
  hydrateStatusBadges,
  hydrateDependencyBadges,
  mapBadgesToMarkdown,
  applyMarkdownToTarget,
  mapStatusBadgesToMarkdown,
  computeStateIntegrity,
  outputMarkdownPreview,
});
