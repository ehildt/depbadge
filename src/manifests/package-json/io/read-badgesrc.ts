import fs from "fs";
import yaml from "js-yaml";

import { findFile } from "../../../depbadge/find-file";
import { WithPackageJsonArgs } from "../package-json.types";

import { Badgesrc } from "@/depbadge/types";

/**
 * Reads a badgesrc YAML file and returns the config
 */
export function readBadgesrc(path = "badgesrc.yml") {
  const abdFilePath = findFile(path);
  if (!abdFilePath) throw new Error(`${path} not found`);
  const fileContents = fs.readFileSync(abdFilePath, "utf8");
  return (yaml.load(fileContents) as Badgesrc<WithPackageJsonArgs>) ?? {};
}
