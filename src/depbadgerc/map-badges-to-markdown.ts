import { hashStringToHsl } from "../shared/hash-string-to-hsl";
import { CtxStore, useCtxCallback } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC } from "./depbadgerc.type";
import { HydratedDependencyMap } from "./hydrate-dependency-badges";

const REGEX = /[^a-zA-Z0-9]/g;
const encodeMessage = (s: string) => encodeURIComponent(s.replace(/^\^/, "v"));
const encodeLabel = (s: string) => encodeURIComponent(s?.replace(REGEX, "_"));

export const mapBadgesToMarkdown = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (_, hdm: HydratedDependencyMap): Record<string, string[]> => {
    return Object.fromEntries(
      Object.entries(hdm).map(([section, badgeMap]) => [
        section,
        Object.entries(badgeMap).flatMap(([name, badge]) => {
          const urlSearchParams = new URLSearchParams({
            ...(badge.isError && { isError: "true" }),
            ...(badge.labelColor && { labelColor: badge.labelColor }),
            ...(badge.cacheSeconds && { cacheSeconds: badge.cacheSeconds?.toString() }),
            ...(badge.namedLogo && { logo: badge.namedLogo }),
            ...(badge.logoColor && { logoColor: badge.logoColor }),
            ...(badge.logoWidth && { logoWidth: badge.logoWidth.toString() }),
            ...(badge.style && { style: badge.style }),
            ...(badge.logoSvg && { logo: `data:image/svg+xml;utf8,${encodeURIComponent(badge.logoSvg)}` }),
          }).toString();

          const dependency = encodeLabel(name);
          const message = encodeMessage(badge.message);
          const color = encodeURIComponent(badge.color ?? hashStringToHsl(name));
          const url = `https://img.shields.io/badge/${dependency}-${message}-${color}.svg?${urlSearchParams}`;
          return badge.link ? `[![${name}](${url})](${badge.link})` : `![${name}](${url})`;
        }),
      ]),
    );
  },
);
