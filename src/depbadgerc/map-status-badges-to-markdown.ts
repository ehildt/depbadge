import { CtxStore, useCtxCallback } from "../store/ctx-store.ts";

import { Methods } from "./depbadgerc.store.ts";
import { CodecovStatusBadge, DepbadgeRC, DockerHubStatusBadge, GitHubStatusBadge } from "./depbadgerc.type.ts";
import { HydratedStatusBadgeMap } from "./hydrate-status-badges.ts";

const REGEX = /[^a-zA-Z0-9]/g;
const encodeLabel = (s: string) => encodeURIComponent(s?.replace(REGEX, "_"));

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
  const metric = encodeLabel(badge.metric);
  const repo = encodeLabel(badge.repo);
  const url = `https://img.shields.io/${src}/${metric}/${user}/${repo}?${urlSearchParams}`;
  return badge?.link ? `[![${label}](${url})](${badge.link})` : `![${label}](${url})`;
}

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
  }).toString();

  const label = badge.name;
  const user = encodeLabel(badge.user ?? "library");
  const repo = encodeLabel(badge.repo);
  const provider = encodeLabel(label);
  const flag = encodeLabel(badge.flag ?? "c");

  // ! codecov requires a token so this url might change based on if the token is provided or not
  const url = `https://img.shields.io/codecov/${flag}/${provider}/${user}/${repo}?${urlSearchParams}`;
  return badge?.link ? `[![${label}](${url})](${badge.link})` : `![${label}](${url})`;
}

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
          })
          .filter((x): x is string => Boolean(x)),
      ]),
    ),
);
