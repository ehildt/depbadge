import fs from "fs";

import { findFile } from "../shared/find-file";
import { CtxStore, useCtxCallback } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC } from "./depbadgerc.type";
import { ManifestContractSection } from "./depbadgerc-manifest-contract.type";

function formatMarkdown(store: DepbadgeRC, markdowns: Record<string, string[]>[]) {
  return markdowns
    .flatMap((md) =>
      Object.entries(md).map(([section, badges]) => {
        const layout = store[section as ManifestContractSection | "statusBadges"]?.layout;
        const showHeader = layout?.showHeader;
        const headerText = showHeader ? layout?.header ?? section : "";
        const content = `${headerText ? `\n\n# ${headerText}\n\n` : ""}${badges.join("\n")}`;
        return layout?.position ? `<div align="${layout.position}">\n\n${content}\n\n</div>` : content;
      }),
    )
    .join("\n\n")
    .trim();
}

export const applyMarkdownToTarget = useCtxCallback<CtxStore<DepbadgeRC, Methods>>((store, ...markdowns) => {
  const fileAbsPath = findFile(store.target ?? "README.md");
  if (!fileAbsPath) return;
  const renderedMarkdown = formatMarkdown(store, markdowns);
  const fileContent = fs
    .readFileSync(fileAbsPath, "utf8")
    .replace(
      /<!-- DEPBADGE:START -->[\s\S]*?<!-- DEPBADGE:END -->/,
      `<!-- DEPBADGE:START -->\n${renderedMarkdown}\n<!-- DEPBADGE:END -->`,
    );

  fs.writeFileSync(fileAbsPath, fileContent, "utf8");
});
