import { encodeLabel } from "../shared/encode-label";

import { CodecovStatusBadge } from "./depbadgerc.type";

export function mapCodecovStatusBadgeToMarkdown(badge: CodecovStatusBadge): string {
  const urlSearchParams = new URLSearchParams({
    ...(badge?.labelColor && { labelColor: badge.labelColor }),
    ...(badge?.isError && { isError: "true" }),
    ...(badge?.cacheSeconds && { cacheSeconds: badge.cacheSeconds.toString() }),
    ...(badge?.namedLogo && { logo: badge.namedLogo }),
    ...(badge?.logoColor && { logoColor: badge.logoColor }),
    ...(badge?.logoWidth && { logoWidth: badge.logoWidth.toString() }),
    ...(badge.style && { style: badge.style }),
    ...(badge?.color && { color: badge.color }),
    ...(badge?.logoSvg && {
      logo: `data:image/svg+xml;utf8,${encodeURIComponent(badge.logoSvg)}`,
    }),
    ...(badge.branch && { branch: badge.branch }),
    ...(badge.token && { token: badge.token }),
  }).toString();

  const label = badge.name;
  const user = encodeLabel(badge.user ?? "library");
  const repo = encodeLabel(badge.repo);
  const provider = encodeLabel("github");
  const flag = encodeLabel(badge.flag ?? "c");
  const url = `https://img.shields.io/codecov/${flag}/${provider}/${user}/${repo}?${urlSearchParams}`;
  return badge?.link ? `[![${label}](${url})](${badge.link})` : `![${label}](${url})`;
}
