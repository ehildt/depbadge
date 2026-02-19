import { CtxStore, useCtxCallback } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC } from "./depbadgerc.type";
import { updateDepbadgeRCIntegrity } from "./depbadgerc.update";
import { ManifestContract } from "./depbadgerc-manifest-contract.type";

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
    store.outputMarkdownPreview("ARTIFACTS", statusBadgesMarkdown);
  }

  store.applyMarkdownToTarget(statusBadgesMarkdown, badgesMarkdown);
  if (canUpdate(store.integrity, integrity)) updateDepbadgeRCIntegrity(integrity);
  process.exit(0);
});
