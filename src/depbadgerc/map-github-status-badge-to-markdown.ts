import { encodeLabel } from "../shared/encode-label.ts";

import { GitHubStatusBadge } from "./depbadgerc.type.ts";

export function mapGithubStatusBadgeToMarkdown(badge: GitHubStatusBadge): string {
  const urlSearchParams = new URLSearchParams({
    ...(badge?.labelColor && { labelColor: badge.labelColor }),
    ...(badge.style && { style: badge.style }),
    ...(badge?.cacheSeconds && { cacheSeconds: badge.cacheSeconds.toString() }),
    ...(badge?.color && { color: badge.color }),
    ...(badge?.isError && { isError: "true" }),
    ...(badge?.namedLogo && { logo: badge.namedLogo }),
    ...(badge?.logoColor && { logoColor: badge.logoColor }),
    ...(badge?.logoWidth && { logoWidth: badge.logoWidth.toString() }),
    ...(badge?.logoSvg && {
      logo: `data:image/svg+xml;utf8,${encodeURIComponent(badge.logoSvg)}`,
    }),
    ...(badge.branch && { branch: badge.branch }),
  }).toString();

  const label = badge.name;
  const src = encodeLabel(label);
  const user = encodeLabel(badge.user);
  const workflow = encodeLabel(badge.workflow!);
  const metric = encodeLabel(badge.metric);
  const repo = encodeLabel(badge.repo);

  const url =
    badge.metric === "actions"
      ? `https://img.shields.io/${src}/${metric}/workflow/status/${user}/${repo}/${workflow}?${urlSearchParams}`
      : `https://img.shields.io/${src}/${metric}/${user}/${repo}?${urlSearchParams}`;

  return badge?.link ? `[![${label}](${url})](${badge.link})` : `![${label}](${url})`;
}
