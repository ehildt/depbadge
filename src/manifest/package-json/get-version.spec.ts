import { CtxStore } from "../../store/ctx-store.ts";

import { getVersion } from "./get-version.ts";
import { ManifestMethods } from "./manifest.store.ts";
import type { DepbadgeManifest } from "./manifest.type.ts";

describe("getManifestVersion", () => {
  it("returns the version from the store", () => {
    const mockStore: CtxStore<DepbadgeManifest, ManifestMethods> = {
      version: "1.2.3",
    } as any;

    const boundGetVersion = getVersion(mockStore);

    expect(boundGetVersion()).toBe("1.2.3");
  });
});
