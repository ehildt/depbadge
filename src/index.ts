import { rcCtxStore } from "./depbadgerc/depbadgerc.store";
import { PackageJsonCtx } from "./manifest/package-json/manifest.store";
import { PyProjectCtx } from "./manifest/pyproject-toml/manifest.store";

if (rcCtxStore.manifest === "package.json") rcCtxStore.processManifest(PackageJsonCtx);
if (rcCtxStore.manifest === "pyproject.toml") rcCtxStore.processManifest(PyProjectCtx);
else {
  // console.error(`${chalk.bold.yellowBright("DEPBADGES")} ${chalk.redBright(file)}: manifest file not supported`);
  process.exit(1);
}
