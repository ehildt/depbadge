/* eslint-disable no-console */
import chalk from "chalk";
import fs from "fs";

import { writeBadgesrc } from "../manifests/package-json/io/write-badgesrc";
import { WithPackageJsonArgs } from "../manifests/package-json/package-json.types";

import { DEPBADGE, README_MD } from "./constants";
import { findFile } from "./find-file";
import { Badgesrc } from "./types";

export function injectBadges(
  badgesrc: Badgesrc<WithPackageJsonArgs>,
  renderedBadges: string,
  signature: string,
  target = README_MD,
) {
  let fileContent;
  const fileAbsPath = findFile(target);
  if (fileAbsPath) {
    fileContent = fs.readFileSync(fileAbsPath, "utf8");
    fileContent = fileContent.replace(
      /<!-- DEPBADGES_START -->[\s\S]*?<!-- DEPBADGES_END -->/,
      `<!-- DEPBADGES_START -->\n${renderedBadges}\n<!-- DEPBADGES_END -->`,
    );

    fs.writeFileSync(target, fileContent, "utf8");

    // why does the signature change? probably some sorting going on?
    writeBadgesrc(badgesrc, signature);
    console.log(
      `${chalk.bold.yellowBright(DEPBADGE)} ${chalk.blueBright(
        target,
      )}: updated`,
    );
    return 0;
  }

  console.log(
    `${chalk.bold.yellowBright(DEPBADGE)} ${chalk.redBright(
      target,
    )}: skip — file not found`,
  );
  return 1;
}
