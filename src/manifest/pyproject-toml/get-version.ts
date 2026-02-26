import { CtxStore, useCtxCallback } from "../../store/ctx-store.ts";

import { ManifestMethods } from "./manifest.store.ts";
import { Manifest } from "./manifest.type.ts";

export const getVersion = useCtxCallback<CtxStore<Manifest, ManifestMethods>>((store): string => store.project.version);
