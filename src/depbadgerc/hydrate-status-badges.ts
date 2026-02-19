import { CtxStore, useCtxCallback } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC, StatusBadgeItem, StatusBadges } from "./depbadgerc.type";

export type HydratedStatusBadgeMap = Record<string, StatusBadgeItem[]>;

export const hydrateStatusBadges = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (_, statusBadges: Record<"statusBadges", StatusBadges>): HydratedStatusBadgeMap =>
    (Object.entries(statusBadges) as ["statusBadges", StatusBadges][]).reduce<HydratedStatusBadgeMap>(
      (acc, [section, statusBadges]) => {
        if (!statusBadges?.items?.length) return acc;
        const style = statusBadges.badgeStyle ?? {};
        acc[section] = [...(acc[section] ?? []), ...statusBadges.items.map((item) => ({ ...style, ...item }))];
        return acc;
      },
      {},
    ),
);
