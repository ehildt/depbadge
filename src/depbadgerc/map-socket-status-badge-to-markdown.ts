import { SocketStatusBadge } from "./depbadgerc.type.ts";

export function mapSocketStatusBadgeToMarkdown(badge: SocketStatusBadge): string {
  const label = badge.name;
  const version = badge.version ?? "*";
  const url = `https://badge.socket.dev/npm/package/${badge.package}/${version}`;
  const link = badge.link ?? `https://www.npmjs.com/package/${badge.package}`;

  return `[![${label}](${url})](${link})`;
}
