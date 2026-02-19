import { CtxStore, useCtxCallback } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC, StatusBadges } from "./depbadgerc.type";

export const getStatusBadges = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (store): Record<"statusBadges", StatusBadges> => {
    const result = {} as Record<"statusBadges", StatusBadges>;
    if (store.statusBadges) result.statusBadges = store.statusBadges;
    return result;
  },
);
