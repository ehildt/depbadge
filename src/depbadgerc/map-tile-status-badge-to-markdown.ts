import { encodeLabel } from "../shared/encode-label";

import { TileStatusBadge } from "./depbadgerc.type";

export function mapTileStatusBadgeToMarkdown(badge: TileStatusBadge): string {
  const urlSearchParams = new URLSearchParams({
    ...(badge?.labelColor && { labelColor: badge.labelColor }),
    ...(badge?.isError && { isError: "true" }),
    ...(badge?.cacheSeconds && { cacheSeconds: badge.cacheSeconds.toString() }),
    ...(badge?.namedLogo && { logo: badge.namedLogo }),
    ...(badge?.logoColor && { logoColor: badge.logoColor }),
    ...(badge?.logoWidth && { logoWidth: badge.logoWidth.toString() }),
    ...(badge.style && { style: badge.style }),
    ...(badge?.logoSvg && {
      logo: `data:image/svg+xml;utf8,${encodeURIComponent(badge.logoSvg)}`,
    }),
  }).toString();

  const label = encodeLabel(badge.label);
  const message = encodeLabel(badge.message);
  const color = encodeLabel(badge.color ?? "#333");
  const url = `https://img.shields.io/badge/${label}-${message}-${color}?${urlSearchParams}`;
  return badge?.link ? `[![${label}](${url})](${badge.link})` : `![${label}](${url})`;
}
