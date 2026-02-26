import { CtxStore, useCtxCallback } from "../store/ctx-store.ts";

import { Methods } from "./depbadgerc.store.ts";
import { DepbadgeRC } from "./depbadgerc.type.ts";
import { ManifestContract } from "./depbadgerc-manifest-contract.type.ts";
import { updateIntegrity } from "./update-integrity.ts";

function canOutput(x: string[] = [], y: string) {
  return x?.includes(y) ?? false;
}

function canUpdate(x: string | undefined, y: string) {
  return x ? !y.includes(x) : true;
}

export const processManifest = useCtxCallback<CtxStore<DepbadgeRC, Methods>>((store, mfc: ManifestContract): void => {
  const version = mfc.getVersion();
  const mfDeps = mfc.getDependencies();
  const rcDeps = store.getDependencies();
  const dependencyBadges = store.hydrateDependencyBadges(rcDeps, mfDeps);
  const integrity = store.computeStateIntegrity(dependencyBadges, version);
  const statusBadgeMap = store.getStatusBadges();
  const statusBadges = store.hydrateStatusBadges(statusBadgeMap);
  const badgesMarkdown = store.mapBadgesToMarkdown(dependencyBadges);
  const statusBadgesMarkdown = store.mapStatusBadgesToMarkdown(statusBadges);

  if (canOutput(store.output, "json")) store.outputShieldioBadgesJson(dependencyBadges);
  if (canOutput(store.output, "markdown")) {
    store.outputMarkdownPreview("BADGES", badgesMarkdown);
    store.outputMarkdownPreview("STATUS_BADGES", statusBadgesMarkdown);
  }

  store.applyMarkdownToTarget(statusBadgesMarkdown, badgesMarkdown);
  if (canUpdate(store.integrity, integrity)) updateIntegrity(integrity);
  process.exit(0);
});
