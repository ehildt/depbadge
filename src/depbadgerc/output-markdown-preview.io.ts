import fs from "fs";

import { CtxStore, useCtxCallback } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC } from "./depbadgerc.type";
import { ManifestContractSection } from "./depbadgerc-manifest-contract.type";

export const outputMarkdownPreview = useCtxCallback<CtxStore<DepbadgeRC, Methods>>(
  (store, type: "BADGES" | "STATUS_BADGES", badgeMarkdownMap: Record<string, string[]>, dir = ".depbadge"): void => {
    const md = Object.entries(badgeMarkdownMap)
      .map(([section, badges]) => {
        const layout = store[section as ManifestContractSection | "statusBadges"]?.layout;
        const header = layout?.header ?? section;
        const content = `${layout?.header ? `\n\n# ${header}` : ""}\n\n${badges.join("\n")}`;
        return layout?.position ? `<div align="${layout.position}">\n\n${content}\n\n</div>` : content;
      })
      .join("")
      .trim();

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/${type}.md`, md);
  },
);
