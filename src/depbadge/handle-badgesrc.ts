/* eslint-disable no-console */
import chalk from "chalk";
import fs from "fs";

import { BADGES_JSON, BADGES_MD, DEPBADGE } from "./constants";
import { injectBadges } from "./inject-badges";
import { Badgesrc, Data } from "./types";

export function handleBadgesrc<T = any>(badgesrc: Badgesrc<T>, data: Data) {
  if (badgesrc.generateBadgesPreview) {
    fs.writeFileSync(BADGES_MD, data.badgesMD);
    console.log(
      `${chalk.bold.yellowBright(DEPBADGE)} ${chalk.blueBright(
        BADGES_MD,
      )}: created.`,
    );
  }

  if (badgesrc.generateBadgesJson) {
    fs.writeFileSync(BADGES_JSON, JSON.stringify(data.badgesJson, null, 2));
    console.log(
      `${chalk.bold.yellowBright(DEPBADGE)} ${chalk.blueBright(
        BADGES_JSON,
      )}: created.`,
    );
  }

  if (badgesrc.signature !== data.signature) {
    process.exit(
      injectBadges(badgesrc, data.badgesMD, data.signature, badgesrc.target),
    );
  } else {
    console.log(
      `${chalk.bold.yellowBright(DEPBADGE)} ${chalk.blueBright(
        data.manifest.name,
      )}: skip — dependencies unchanged.`,
    );
    process.exit(0);
  }
}
