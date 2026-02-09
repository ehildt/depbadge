import { getStableConfigHash } from "./get-stable-config-hash";

describe("getStableConfigHash", () => {
  it("produces a deterministic hash for the same input", () => {
    const rc = { name: "app", debug: true };
    const pkgDeps = {
      dependencies: { react: "18.2.0" },
      devDependencies: { jest: "30.2.0" },
    };

    const hash1 = getStableConfigHash(rc, pkgDeps);
    const hash2 = getStableConfigHash(rc, pkgDeps);

    expect(hash1).toBe(hash2);
  });

  it("produces different hashes for different inputs", () => {
    const rc1 = { name: "app" };
    const rc2 = { name: "app", debug: true };
    const pkgDeps = {
      dependencies: { react: "18.2.0" },
      devDependencies: { jest: "30.2.0" },
    };

    const hash1 = getStableConfigHash(rc1, pkgDeps);
    const hash2 = getStableConfigHash(rc2, pkgDeps);

    expect(hash1).not.toBe(hash2);
  });

  it("handles empty objects", () => {
    const rc: Record<string, any> = {};
    const pkgDeps: Record<string, Record<string, string>> = {};

    const hash = getStableConfigHash(rc, pkgDeps);

    expect(hash).toMatch(/^[a-f0-9]{64}$/); // valid sha256 hex
  });

  it("produces consistent hash even if pkgDeps keys are out of order", () => {
    const rc = { name: "app" };
    const pkgDeps1 = {
      devDependencies: { jest: "30.2.0" },
      dependencies: { react: "18.2.0" },
    };
    const pkgDeps2 = {
      dependencies: { react: "18.2.0" },
      devDependencies: { jest: "30.2.0" },
    };

    const hash1 = getStableConfigHash(rc, pkgDeps1);
    const hash2 = getStableConfigHash(rc, pkgDeps2);

    expect(hash1).toBe(hash2);
  });
});
