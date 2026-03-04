import fs from "fs";

import { CtxStore, useCtxCallback } from "../store/ctx-store.ts";

import { Methods } from "./depbadgerc.store.ts";
import { DepbadgeRC } from "./depbadgerc.type.ts";
import { ManifestContractSection } from "./depbadgerc-manifest-contract.type.ts";

export type MarkdownPreview = "BADGES" | "STATUS_BADGES";

export const outputMarkdownPreview = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (store, type: MarkdownPreview, badgeMarkdownMap: Record<string, string[]>, dir = ".depbadge"): void => {
    const md = Object.entries(badgeMarkdownMap)
      .map(([section, badges]) => {
        const layout = store[section as ManifestContractSection | "statusBadges"]?.layout;
        const header = layout?.header ?? section;
        const content = `${layout?.showHeader ? `\n# ${header}` : ""}\n\n${badges.join("\n")}`;
        return layout?.position ? `<div align="${layout.position}">\n${content}\n\n</div>` : content;
      })
      .join("")
      .trim();

    if (!md?.length) return;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/${type}.md`, md);
  },
);
