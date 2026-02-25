import { CtxStore, useCtxCallback } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC, Dependencies, DependencyItem } from "./depbadgerc.type";
import { ManifestContractSection, ManifestDependencyMap } from "./depbadgerc-manifest-contract.type";

type HydratedDependencyBadge = DependencyItem;
export type HydratedDependencyMap = Partial<Record<ManifestContractSection, Record<string, HydratedDependencyBadge>>>;
export type RCDependencyMap = Record<ManifestContractSection, Dependencies>;

export const hydrateDependencyBadges = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (_, deps: Record<ManifestContractSection, Dependencies>, mfdm: ManifestDependencyMap) => {
    return (Object.entries(deps) as [ManifestContractSection, Dependencies][]).reduce<HydratedDependencyMap>(
      (acc, [section, config]) => {
        if (!config?.items?.length) return acc;
        const entries = config.items.flatMap((item) => {
          const message = mfdm[section]?.[item.name];
          return message === undefined
            ? []
            : [
                [
                  item.name,
                  {
                    ...item,
                    message,
                  } satisfies HydratedDependencyBadge,
                ] as const,
              ];
        });

        if (!entries.length) return acc;

        acc[section] = {
          ...(acc[section] ?? {}),
          ...Object.fromEntries(entries),
        };

        return acc;
      },
      {},
    );
  },
);
