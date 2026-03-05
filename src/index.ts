#!/usr/bin/env node
import { rcCtx } from "./depbadgerc/depbadgerc.store.ts";
import { CargoTomlCtx } from "./manifest/cargo.toml/manifest.store.ts";
import { PackageJsonCtx } from "./manifest/package-json/manifest.store.ts";
import { PyProjectCtx } from "./manifest/pyproject-toml/manifest.store.ts";

try {
  const manifestMap = {
    "package.json": PackageJsonCtx,
    "pyproject.toml": PyProjectCtx,
    "Cargo.toml": CargoTomlCtx,
  } as const;

  const manifestFile = rcCtx.manifest as keyof typeof manifestMap;
  const ctx = manifestMap[manifestFile]?.();
  if (!ctx) throw new Error(`Unsupported manifest file: ${rcCtx.manifest}`);
  console.log(`Processing manifest: ${manifestFile}`);
  rcCtx.processManifest(ctx);
  console.log("✅ Manifest processed successfully.");
  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`::error::${message}`);
  process.exit(1);
}
