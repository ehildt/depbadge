import { ManifestContractSection } from "../../depbadgerc/depbadgerc-manifest-contract.type";
import { CtxStore, useCtxCallback } from "../../store/ctx-store";

import { ManifestMethods } from "./manifest.store";
import { DepbadgeManifest } from "./manifest.type";

export const getDependencies = useCtxCallback<CtxStore<DepbadgeManifest, ManifestMethods>>(
  (store): Record<ManifestContractSection, Record<string, string>> => ({
    dependencies: store.dependencies ?? {},
    devDependencies: store.devDependencies ?? {},
    peerDependencies: store.peerDependencies ?? {},
  }),
);
