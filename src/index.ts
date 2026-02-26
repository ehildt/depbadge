import { execSync } from "node:child_process";

import * as core from "@actions/core";

import { rcCtx } from "./depbadgerc/depbadgerc.store.ts";
import { CargoTomlCtx } from "./manifest/cargo.toml/manifest.store.ts";
import { PackageJsonCtx } from "./manifest/package-json/manifest.store.ts";
import { PyProjectCtx } from "./manifest/pyproject-toml/manifest.store.ts";

try {
  const manifestMap = {
    "package.json": PackageJsonCtx,
    "pyproject.toml": PyProjectCtx,
    "Cargo.toml": CargoTomlCtx,
    // TODO: add more manifest contexts here
  } as const;

  const ctx = manifestMap[rcCtx.manifest as keyof typeof manifestMap];
  if (!ctx) throw new Error(`Unsupported manifest file: ${rcCtx.manifest}`);

  rcCtx.processManifest(ctx);

  const cmd = core.getInput("depbadge") || "pnpm depbadge";
  const commitMessage = core.getInput("commit") || "Update Badges";
  execSync(cmd, { stdio: "inherit" });
  execSync("git add .", { stdio: "inherit" });

  try {
    execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
  } catch {
    // ignore if no changes to commit
    // TODO: logging
  }

  execSync("git push", { stdio: "inherit" });
} catch (error) {
  // TODO: logging
  core.setFailed(error instanceof Error ? error.message : String(error));
}
