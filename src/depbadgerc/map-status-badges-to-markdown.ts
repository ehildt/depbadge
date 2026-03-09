import { CtxStore, useCtxCallback } from "../store/ctx-store.ts";

import { Methods } from "./depbadgerc.store.ts";
import {
  CodecovStatusBadge,
  DepbadgeRC,
  DockerHubStatusBadge,
  GitHubStatusBadge,
  TileStatusBadge,
} from "./depbadgerc.type.ts";
import { HydratedStatusBadgeMap } from "./hydrate-status-badges.ts";
import { mapCodecovStatusBadgeToMarkdown } from "./map-codecov-status-badge-to-markdown.ts";
import { mapDockerHubStatusBadgeToMarkdown } from "./map-dockerhub-status-badge-to-markdown.ts";
import { mapGithubStatusBadgeToMarkdown } from "./map-github-status-badge-to-markdown.ts";
import { mapTileStatusBadgeToMarkdown } from "./map-tile-status-badge-to-markdown.ts";

export const mapStatusBadgesToMarkdown = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (_, statusBadges: HydratedStatusBadgeMap): Record<string, string[]> =>
    Object.fromEntries(
      Object.entries(statusBadges).map(([section, badges]) => [
        section,
        badges
          .map((item) => {
            if (item.name === "github") return mapGithubStatusBadgeToMarkdown(item as GitHubStatusBadge);
            if (item.name === "docker") return mapDockerHubStatusBadgeToMarkdown(item as DockerHubStatusBadge);
            if (item.name === "codecov") return mapCodecovStatusBadgeToMarkdown(item as CodecovStatusBadge);
            if (item.name === "tile") return mapTileStatusBadgeToMarkdown(item as TileStatusBadge);
          })
          .filter((x): x is string => Boolean(x)),
      ]),
    ),
);
