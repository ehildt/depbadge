import crypto from "crypto";
import yaml from "yaml";

import { CtxStore, useCtxCallback } from "../store/ctx-store.ts";

import { Methods } from "./depbadgerc.store.ts";
import { DepbadgeRC } from "./depbadgerc.type.ts";

export const computeStateIntegrity = useCtxCallback<CtxStore<DepbadgeRC, Methods>>((store, ...rest: unknown[]) => {
  const payloadStringified = JSON.stringify(rest);
  const hash = crypto.createHash("sha256");
  const yml = yaml.stringify({
    ...JSON.parse(JSON.stringify(store)),
    integrity: null,
  });
  hash.update(`${yml} --- ${payloadStringified}`, "utf8");
  return hash.digest("hex");
});
