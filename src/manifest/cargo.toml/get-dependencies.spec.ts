import { CtxStore } from "../../store/ctx-store";

import { getDependencies } from "./get-dependencies";
import { ManifestMethods } from "./manifest.store";
import { Manifest } from "./manifest.type";

describe("Cargo manifest getDependencies", () => {
  const bind = (storeOverrides: Partial<Manifest> = {}) => {
    const store = { ...storeOverrides } as CtxStore<Manifest, ManifestMethods>;
    return getDependencies(store);
  };

  it("returns empty records when store is empty", () => {
    const run = bind();
    const result = run();
    expect(result.dependencies).toEqual({});
    expect(result.devDependencies).toEqual({});
    expect(result.peerDependencies).toEqual({});
  });

  it("parses normal dependencies correctly", () => {
    const run = bind({
      dependencies: {
        serde: "1.0.130",
        tokio: { version: "1.28.0" },
      },
    });
    const result = run();

    expect(result.dependencies).toEqual({
      serde: "1.0.130",
      tokio: "1.28.0",
    });
  });

  it("parses dev-dependencies correctly", () => {
    const run = bind({
      "dev-dependencies": {
        criterion: "0.4.0",
        mockall: { version: "0.11.0" },
      },
    });
    const result = run();

    expect(result.devDependencies).toEqual({
      criterion: "0.4.0",
      mockall: "0.11.0",
    });
  });

  it("parses features as peerDependencies", () => {
    const run = bind({
      features: {
        default: ["serde", "tokio"],
        extras: ["criterion"],
      },
    });
    const result = run();

    expect(result.peerDependencies).toEqual({
      serde: "*",
      tokio: "*",
      criterion: "*",
    });
  });

  it("combines dependencies, devDependencies, and features correctly", () => {
    const run = bind({
      dependencies: { serde: "1.0.130" },
      "dev-dependencies": { criterion: "0.4.0" },
      features: { default: ["serde", "tokio"] },
    });
    const result = run();

    expect(result.dependencies).toEqual({ serde: "1.0.130" });
    expect(result.devDependencies).toEqual({ criterion: "0.4.0" });
    expect(result.peerDependencies).toEqual({ serde: "*", tokio: "*" });
  });
});
