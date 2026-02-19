import { CtxStore, useCtxCallback } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC, Dependencies } from "./depbadgerc.type";
import { ManifestContractSection } from "./depbadgerc-manifest-contract.type";

export const getDependencies = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (store): Record<ManifestContractSection, Dependencies> => {
    const result = {} as Record<ManifestContractSection, Dependencies>;
    if (store.dependencies) result.dependencies = store.dependencies;
    if (store.devDependencies) result.devDependencies = store.devDependencies;
    if (store.peerDependencies) result.peerDependencies = store.peerDependencies;
    return result;
  },
);
