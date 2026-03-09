import { encodeLabel } from "../shared/encode-label";

import { DockerHubStatusBadge } from "./depbadgerc.type";

export function mapDockerHubStatusBadgeToMarkdown(badge: DockerHubStatusBadge): string {
  const urlSearchParams = new URLSearchParams({
    ...(badge?.labelColor && { labelColor: badge.labelColor }),
    ...(badge?.isError && { isError: "true" }),
    ...(badge?.namedLogo && { logo: badge.namedLogo }),
    ...(badge?.logoColor && { logoColor: badge.logoColor }),
    ...(badge?.logoWidth && { logoWidth: badge.logoWidth.toString() }),
    ...(badge.style && { style: badge.style }),
    ...(badge?.cacheSeconds && { cacheSeconds: badge.cacheSeconds.toString() }),
    ...(badge?.color && { color: badge.color }),
    ...(badge?.logoSvg && {
      logo: `data:image/svg+xml;utf8,${encodeURIComponent(badge.logoSvg)}`,
    }),
    ...(badge.tag && badge.metric === "v" && { tag: badge.tag }),
  }).toString();

  const label = badge.name;
  const src = encodeLabel(label);
  const user = encodeLabel(badge.user ?? "library");
  const metric = encodeLabel(badge.metric ?? "v");
  const image = encodeLabel(badge.image);
  const url = `https://img.shields.io/${src}/${metric}/${user}/${image}?${urlSearchParams}`;
  return badge?.link ? `[![${label}](${url})](${badge.link})` : `![${label}](${url})`;
}
