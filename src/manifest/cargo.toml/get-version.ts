import { CtxStore, useCtxCallback } from "../../store/ctx-store";

import { ManifestMethods } from "./manifest.store";
import { Manifest } from "./manifest.type";

export const getVersion = useCtxCallback<CtxStore<Manifest, ManifestMethods>>((store): string => store.package.version);
