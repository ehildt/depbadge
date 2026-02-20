import { PackageDependency } from "../../depbadgerc/depbadgerc.type";
import { useCtxStore } from "../../store/ctx-store";

import { BadgeDependencyMap, dependenciesToBadgeMap } from "./dependencies-to-badge-map";
import { readManifest } from "./manifest.read";
import { DepbadgeManifest } from "./manifest.type";

export type ManifestMethods = {
  /**
   * Generates a badge map from RC dependencies.
   * @param v - Array of PackageDependency objects
   * @returns BadgeDependencyMap keyed by dependency labels
   */
  dependenciesToBadgeMap(v: PackageDependency[]): BadgeDependencyMap;
};

export const PackageJsonCtx = useCtxStore<DepbadgeManifest, ManifestMethods>(readManifest(), {
  dependenciesToBadgeMap,
});
