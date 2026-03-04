import { CtxStore } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC } from "./depbadgerc.type";
import { ManifestDependencyMap } from "./depbadgerc-manifest-contract.type";
import { HydratedDependencyMap, hydrateDependencyBadges, RCDependencyMap } from "./hydrate-dependency-badges";

describe("hydrateDependencyBadges", () => {
  const bind = (storeOverrides: any = {}) => {
    const store = { ...storeOverrides } as CtxStore<DepbadgeRC, Methods>;
    return hydrateDependencyBadges(store);
  };

  it("returns empty object if no deps", () => {
    const run = bind();
    const result = run({}, {} as ManifestDependencyMap);
    expect(result).toEqual({});
  });

  it("ignores items with missing messages in ManifestDependencyMap", () => {
    const deps: RCDependencyMap = {
      dependencies: { items: [{ name: "react", message: "" }] },
      devDependencies: { items: [] },
      peerDependencies: { items: [] },
    };

    const mfdm: ManifestDependencyMap = {
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    };

    const run = bind();
    const result = run(deps, mfdm);
    expect(result).toEqual({});
  });

  it("hydrates a single dependency badge", () => {
    const deps: RCDependencyMap = {
      dependencies: {
        items: [{ name: "react", message: "" }],
      },
      devDependencies: { items: [] },
      peerDependencies: { items: [] },
    };

    const mfdm: ManifestDependencyMap = {
      dependencies: { react: "^17.0.0" },
      devDependencies: {},
      peerDependencies: {},
    };

    const run = bind();
    const result: HydratedDependencyMap = run(deps, mfdm);

    expect(result.dependencies).toHaveProperty("react");
    expect(result.dependencies?.react.message).toBe("^17.0.0");
  });

  it("hydrates multiple badges in the same section", () => {
    const deps: RCDependencyMap = {
      dependencies: {
        items: [
          { name: "react", message: "" },
          { name: "lodash", message: "" },
        ],
      },
      devDependencies: { items: [] },
      peerDependencies: { items: [] },
    };

    const mfdm: ManifestDependencyMap = {
      dependencies: { react: "^17.0.0", lodash: "^4.17.21" },
      devDependencies: {},
      peerDependencies: {},
    };

    const run = bind();
    const result = run(deps, mfdm);

    expect(Object.keys(result.dependencies!)).toHaveLength(2);
    expect(result.dependencies!.react.message).toBe("^17.0.0");
    expect(result.dependencies!.lodash.message).toBe("^4.17.21");
  });

  it("hydrates multiple sections independently", () => {
    const deps: RCDependencyMap = {
      dependencies: {
        items: [{ name: "react", message: "" }],
      },
      devDependencies: {
        items: [{ name: "jest", message: "" }],
      },
      peerDependencies: {
        items: [{ name: "typescript", message: "" }],
      },
    };

    const mfdm: ManifestDependencyMap = {
      dependencies: { react: "^17.0.0" },
      devDependencies: { jest: "^29.0.0" },
      peerDependencies: { typescript: "^5.0.0" },
    };

    const run = bind();
    const result = run(deps, mfdm);

    expect(result.dependencies!.react.message).toBe("^17.0.0");
    expect(result.devDependencies!.jest.message).toBe("^29.0.0");
    expect(result.peerDependencies!.typescript.message).toBe("^5.0.0");
  });
});
