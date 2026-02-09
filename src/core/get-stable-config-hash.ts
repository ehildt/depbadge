import crypto from "crypto";
import yaml from "js-yaml";

export function getStableConfigHash(
  rc: Record<string, any>,
  pkgDeps: Record<string, Record<string, string>>,
): string {
  const hash = crypto.createHash("sha256");
  const payload = `${yaml.dump(rc)} --- ${JSON.stringify(
    pkgDeps,
    Object.keys(pkgDeps).sort(),
  )}`;
  hash.update(payload, "utf8");
  return hash.digest("hex");
}
