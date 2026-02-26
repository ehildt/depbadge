import { ManifestContractSection } from "../../depbadgerc/depbadgerc-manifest-contract.type.ts";
import { CtxStore, useCtxCallback } from "../../store/ctx-store.ts";

import { ManifestMethods } from "./manifest.store.ts";
import { DepbadgeManifest } from "./manifest.type.ts";

export const getDependencies = useCtxCallback<CtxStore<DepbadgeManifest, ManifestMethods>>(
  (store): Record<ManifestContractSection, Record<string, string>> => ({
    dependencies: store.dependencies ?? {},
    devDependencies: store.devDependencies ?? {},
    peerDependencies: store.peerDependencies ?? {},
  }),
);
