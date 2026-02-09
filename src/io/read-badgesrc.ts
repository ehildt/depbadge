import fs from "fs";
import yaml from "js-yaml";

import { Badgesrc } from "@/core/types";

/**
 * Reads a badgesrc YAML file, removes the internal hash field, and returns
 * both the config and the extracted hash (if present).
 */
export function readBadgesrc(path = "badgesrc.yml"): {
  badgesrc: Badgesrc;
  signature: string | null;
} {
  if (!fs.existsSync(path)) throw new Error(`${path} not found`);
  const fileContents = fs.readFileSync(path, "utf8");
  const badgesrc = (yaml.load(fileContents) as Badgesrc) ?? {};
  const signature = badgesrc.signature ?? null;
  delete badgesrc.signature;
  return { badgesrc, signature };
}
