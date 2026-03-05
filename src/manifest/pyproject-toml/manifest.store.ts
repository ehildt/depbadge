import { ManifestContract, ManifestContractSection } from "../../depbadgerc/depbadgerc-manifest-contract.type.ts";
import { useCtxStore } from "../../store/ctx-store.ts";

import { getDependencies } from "./get-dependencies.ts";
import { getVersion } from "./get-version.ts";
import { readManifest } from "./manifest.read.ts";
import { Manifest } from "./manifest.type.ts";

export type ManifestMethods = {
  getVersion(): string;
  getDependencies(): Record<ManifestContractSection, Record<string, string>>;
} & ManifestContract;

export const PyProjectCtx = () =>
  useCtxStore<Manifest, ManifestMethods>(readManifest(), {
    getVersion,
    getDependencies,
  });
