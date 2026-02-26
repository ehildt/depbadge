import { ManifestContractSection } from "../../depbadgerc/depbadgerc-manifest-contract.type";
import { CtxStore, useCtxCallback } from "../../store/ctx-store";

import { ManifestMethods } from "./manifest.store";
import { Manifest } from "./manifest.type";

const parseRequirement = (req: string): [string, string] => {
  const match = req.match(/^([A-Za-z0-9_.-]+)\s*[<>=!~]*\s*([^,;\s]+)?/);
  return match ? [match[1], match[2] ?? "*"] : [req, "*"];
};

const toRecord = (deps?: string[]): Record<string, string> =>
  deps?.reduce<Record<string, string>>((acc, req) => {
    const [name, version] = parseRequirement(req);
    acc[name] = version;
    return acc;
  }, {}) ?? {};

export const getDependencies = useCtxCallback<CtxStore<Manifest, ManifestMethods>>(
  (store): Record<ManifestContractSection, Record<string, string>> => {
    const { project } = store;

    return {
      dependencies: toRecord(project.dependencies),
      devDependencies: toRecord(project["optional-dependencies"]?.dev),
      peerDependencies: {},
    };
  },
);
