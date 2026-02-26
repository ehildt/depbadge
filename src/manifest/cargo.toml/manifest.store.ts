import { ManifestContract, ManifestContractSection } from "../../depbadgerc/depbadgerc-manifest-contract.type";
import { useCtxStore } from "../../store/ctx-store";

import { getDependencies } from "./get-dependencies";
import { getVersion } from "./get-version";
import { readManifest } from "./manifest.read";
import { Manifest } from "./manifest.type";

export type ManifestMethods = {
  getVersion(): string;
  getDependencies(): Record<ManifestContractSection, Record<string, string>>;
} & ManifestContract;

export const CargoTomlCtx = useCtxStore<Manifest, ManifestMethods>(readManifest(), {
  getVersion,
  getDependencies,
});
