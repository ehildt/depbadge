import fs from "fs";

import { findFile } from "../shared/find-file.ts";
import { CtxStore, useCtxCallback } from "../store/ctx-store.ts";

import { Methods } from "./depbadgerc.store.ts";
import { DepbadgeRC } from "./depbadgerc.type.ts";
import { ManifestContractSection } from "./depbadgerc-manifest-contract.type.ts";

function formatMarkdown(store: DepbadgeRC, markdowns: Record<string, string[]>[]) {
  return markdowns
    .flatMap((md) =>
      Object.entries(md).map(([section, badges]) => {
        const layout = store[section as ManifestContractSection | "statusBadges"]?.layout;
        const headerText = layout?.showHeader ? layout?.header ?? section : "";
        const content = `${headerText ? `\n\n# ${headerText}\n\n` : ""}${badges.join("\n")}`;
        return layout?.position ? `<div align="${layout.position}">\n\n${content}\n\n</div>` : content;
      }),
    )
    .join("\n\n<br>\n\n")
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
