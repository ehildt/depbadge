import { CtxStore, useCtxCallback } from "../store/ctx-store.ts";

import { Methods } from "./depbadgerc.store.ts";
import { DepbadgeRC, StatusBadges } from "./depbadgerc.type.ts";

export const getStatusBadges = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (store): Record<"statusBadges", StatusBadges> => {
    const result = {} as Record<"statusBadges", StatusBadges>;
    if (store.statusBadges) result.statusBadges = store.statusBadges;
    return result;
  },
);
