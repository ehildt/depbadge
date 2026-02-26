import { ManifestMethods } from "../manifest/package-json/manifest.store.ts";
import { CtxStore, useCtxStore } from "../store/ctx-store.ts";

import { applyMarkdownToTarget } from "./apply-markdown-to-target.ts";
import { computeStateIntegrity } from "./compute-state-integrity.ts";
import { DepbadgeRC, Dependencies, StatusBadges } from "./depbadgerc.type.ts";
import {
  ManifestContract,
  ManifestContractSection,
  ManifestDependencyMap,
} from "./depbadgerc-manifest-contract.type.ts";
import { getDependencies } from "./get-dependencies.ts";
import { getStatusBadges } from "./get-status-badges.ts";
import { HydratedDependencyMap, hydrateDependencyBadges, RCDependencyMap } from "./hydrate-dependency-badges.ts";
import { HydratedStatusBadgeMap } from "./hydrate-status-badges.ts";
import { hydrateStatusBadges } from "./hydrate-status-badges.ts";
import { mapBadgesToMarkdown } from "./map-badges-to-markdown.ts";
import { mapStatusBadgesToMarkdown } from "./map-status-badges-to-markdown.ts";
import { MarkdownPreview, outputMarkdownPreview } from "./output-markdown-preview.io.ts";
import { outputShieldioBadgesJson } from "./output-shieldio-badges-json.ts";
import { processManifest } from "./process-manifest.ts";
import { DEPBADGERC } from "./read-depbadgerc-with-defaults.ts";

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
  outputMarkdownPreview(type: MarkdownPreview, badgeMarkdownMap: Record<string, string[]>, dir?: string): void;
};

export const rcCtx = useCtxStore<DepbadgeRC, Methods>(DEPBADGERC, {
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
