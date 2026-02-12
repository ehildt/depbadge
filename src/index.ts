import { unsupportedManifestFile } from "./depbadge/errors";
import { handleBadgesrc } from "./depbadge/handle-badgesrc";
import { Data, ManifestHandlers } from "./depbadge/types";
import { handlePackageJson } from "./manifests/package-json/handle-package-json";
import { readBadgesrc } from "./manifests/package-json/io/read-badgesrc";

const badgesrc = readBadgesrc();

const handlers: ManifestHandlers = new Map<string, () => Data>([
  ["package.json", () => handlePackageJson(badgesrc)],
  // ADD MORE HANDLERS AS NEEDED
]);

const handler = handlers.get(badgesrc.manifestFile);
if (handler) handleBadgesrc(badgesrc, handler());
else unsupportedManifestFile(badgesrc.manifestFile);
