import { ManifestContract, ManifestContractSection } from "../../depbadgerc/depbadgerc-manifest-contract.type.ts";
import { useCtxStore } from "../../store/ctx-store.ts";

import { getDependencies } from "./get-dependencies.ts";
import { getVersion } from "./get-version.ts";
import { readManifest } from "./manifest.read.ts";
import { DepbadgeManifest } from "./manifest.type.ts";

export type ManifestMethods = {
  getVersion(): string;
  getDependencies(): Record<ManifestContractSection, Record<string, string>>;
} & ManifestContract;

export const PackageJsonCtx = useCtxStore<DepbadgeManifest, ManifestMethods>(readManifest(), {
  getVersion,
  getDependencies,
});
