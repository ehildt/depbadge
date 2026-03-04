import { CtxStore } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC, Dependencies } from "./depbadgerc.type";
import { getDependencies } from "./get-dependencies";

describe("getDependencies", () => {
  const bind = (storeOverrides: Partial<DepbadgeRC> = {}) => {
    const store = { ...storeOverrides } as CtxStore<DepbadgeRC, Methods>;
    return getDependencies(store);
  };

  it("returns empty object if no dependency sections exist", () => {
    const run = bind();
    const result = run();
    expect(result).toEqual({});
  });

  it("returns only dependencies if set", () => {
    const deps: Dependencies = { items: [] };
    const run = bind({ dependencies: deps });
    const result = run();

    expect(result.dependencies).toBe(deps);
    expect(result.devDependencies).toBeUndefined();
    expect(result.peerDependencies).toBeUndefined();
  });

  it("returns all sections when set", () => {
    const deps: Dependencies = { items: [] };
    const devDeps: Dependencies = { items: [] };
    const peerDeps: Dependencies = { items: [] };

    const run = bind({ dependencies: deps, devDependencies: devDeps, peerDependencies: peerDeps });
    const result = run();

    expect(result.dependencies).toBe(deps);
    expect(result.devDependencies).toBe(devDeps);
    expect(result.peerDependencies).toBe(peerDeps);
  });

  it("returns a mix of defined sections", () => {
    const deps: Dependencies = { items: [] };
    const peerDeps: Dependencies = { items: [] };

    const run = bind({ dependencies: deps, peerDependencies: peerDeps });
    const result = run();

    expect(result.dependencies).toBe(deps);
    expect(result.devDependencies).toBeUndefined();
    expect(result.peerDependencies).toBe(peerDeps);
  });
});
