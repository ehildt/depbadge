import { CtxStore } from "../../store/ctx-store";

import { getVersion } from "./get-version";
import { ManifestMethods } from "./manifest.store";
import type { DepbadgeManifest } from "./manifest.type";

describe("getManifestVersion", () => {
  it("returns the version from the store", () => {
    const mockStore: CtxStore<DepbadgeManifest, ManifestMethods> = {
      version: "1.2.3",
    } as any;

    const boundGetVersion = getVersion(mockStore);

    expect(boundGetVersion()).toBe("1.2.3");
  });
});
