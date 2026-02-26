import { CtxStore, useCtxCallback } from "../../store/ctx-store.ts";

import { ManifestMethods } from "./manifest.store.ts";
import { DepbadgeManifest } from "./manifest.type.ts";

export const getVersion = useCtxCallback<CtxStore<DepbadgeManifest, ManifestMethods>>((store): string => store.version);
