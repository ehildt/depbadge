import fs from "fs";

import { PackageDeps } from "./types";

/**
 * Reads a package.json file and returns its dependencies as a PackageDeps object.
 */
export function readPackageJson(path = "package.json"): PackageDeps {
  const content = fs.readFileSync(path, "utf8");
  return JSON.parse(content) as PackageDeps;
}
