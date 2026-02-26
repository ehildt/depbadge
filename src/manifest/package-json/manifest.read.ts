import fs from "fs";

import { findFile } from "../../shared/find-file.ts";

import { DepbadgeManifest } from "./manifest.type.ts";

export function readManifest(path = "package.json"): DepbadgeManifest {
  const filePath = findFile(path);
  if (!filePath) throw new Error(`${path} not found`);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as DepbadgeManifest;
}
