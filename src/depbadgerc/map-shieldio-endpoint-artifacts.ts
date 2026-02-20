import { CtxStore, useCtxCallback } from "src/store/ctx-store";

import { BadgeArtifactMap } from "./depbadgerc.helpers";
import { Methods } from "./depbadgerc.store";
import { BadgeArtifact, DepbadgeRC } from "./depbadgerc.type";

export const mapShieldIOEndpointArtifacts = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (_, artifacts: BadgeArtifact[]): BadgeArtifactMap => {
    return artifacts.reduce<BadgeArtifactMap>(
      (acc, { source, label, artifact }) => ({
        ...acc,
        [source]: [...(acc[source] ?? []), { source, label, artifact }],
      }),
      {} as BadgeArtifactMap,
    );
  },
);
