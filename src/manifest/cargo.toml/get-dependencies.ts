import { ManifestContractSection } from "../../depbadgerc/depbadgerc-manifest-contract.type.ts";
import { CtxStore, useCtxCallback } from "../../store/ctx-store.ts";

import { ManifestMethods } from "./manifest.store.ts";
import { Manifest } from "./manifest.type.ts";

const parseCargoDependency = (
  entry: string | { version: string; optional?: boolean; features?: string[] },
): [string, string] => {
  if (typeof entry === "string") {
    return ["", entry];
  } else {
    return ["", entry.version];
  }
};

const depsToRecord = (deps?: Record<string, string | { version: string }>): Record<string, string> => {
  if (!deps) return {};
  return Object.entries(deps).reduce<Record<string, string>>((acc, [name, entry]) => {
    const [, version] = parseCargoDependency(entry);
    acc[name] = version;
    return acc;
  }, {});
};

const featuresToRecord = (features?: Record<string, string[]>): Record<string, string> => {
  if (!features) return {};
  return Object.keys(features).reduce<Record<string, string>>((acc, feature) => {
    features[feature].forEach((depName) => (acc[depName] = "*"));
    return acc;
  }, {});
};

export const getDependencies = useCtxCallback<CtxStore<Manifest, ManifestMethods>>(
  (store): Record<ManifestContractSection, Record<string, string>> => ({
    dependencies: depsToRecord(store.dependencies),
    devDependencies: depsToRecord(store["dev-dependencies"]),
    peerDependencies: featuresToRecord(store.features),
  }),
);
