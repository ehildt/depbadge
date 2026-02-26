import { CtxStore, useCtxCallback } from "../store/ctx-store.ts";

import { Methods } from "./depbadgerc.store.ts";
import { DepbadgeRC, Dependencies } from "./depbadgerc.type.ts";
import { ManifestContractSection } from "./depbadgerc-manifest-contract.type.ts";

export const getDependencies = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (store): Record<ManifestContractSection, Dependencies> => {
    const result = {} as Record<ManifestContractSection, Dependencies>;
    if (store.dependencies) result.dependencies = store.dependencies;
    if (store.devDependencies) result.devDependencies = store.devDependencies;
    if (store.peerDependencies) result.peerDependencies = store.peerDependencies;
    return result;
  },
);
