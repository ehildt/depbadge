/* eslint-disable @typescript-eslint/no-unused-vars */
import crypto from "crypto";
import yaml from "js-yaml";

import { computeStateIntegrity } from "./compute-state-integrity";
import { Methods } from "./depbadgerc.store";
import { DepbadgeRC } from "./depbadgerc.type";

describe("computeStateIntegrity", () => {
  const makeMockStore = (overrides: Partial<DepbadgeRC> = {}): Readonly<DepbadgeRC & Methods> => {
    const base: DepbadgeRC & Methods = {
      manifest: "package.json",
      dependencies: { items: [] },
      devDependencies: undefined,
      peerDependencies: undefined,
      statusBadges: undefined,
      target: undefined,
      output: undefined,
      dependenciesLayout: undefined,
      devDependenciesLayout: undefined,
      peerDependenciesLayout: undefined,
      statusBadgesLayout: undefined,
      dependenciesStyle: undefined,
      devDependenciesStyle: undefined,
      peerDependenciesStyle: undefined,
      statusBadgesStyle: undefined,

      // Methods mocked
      processManifest: jest.fn(),
      getDependencies: jest.fn(),
      getStatusBadges: jest.fn(),
      hydrateDependencyBadges: jest.fn(),
      outputShieldioBadgesJson: jest.fn(),
      hydrateStatusBadges: jest.fn(),
      mapBadgesToMarkdown: jest.fn(),
      applyMarkdownToTarget: jest.fn(),
      mapStatusBadgesToMarkdown: jest.fn(),
      computeStateIntegrity: jest.fn(),
      outputMarkdownPreview: jest.fn(),
    };

    return { ...base, ...overrides };
  };

  // Helper to pick only state properties (strip all methods)
  const pickState = (store: DepbadgeRC & Methods): DepbadgeRC => {
    const {
      processManifest,
      getDependencies,
      getStatusBadges,
      hydrateDependencyBadges,
      outputShieldioBadgesJson,
      hydrateStatusBadges,
      mapBadgesToMarkdown,
      applyMarkdownToTarget,
      mapStatusBadgesToMarkdown,
      computeStateIntegrity,
      outputMarkdownPreview,
      ...state
    } = store;
    return state;
  };

  it("computes a SHA-256 hash based on store and payload", () => {
    const store = makeMockStore();
    const payload = [{ some: "data" }];

    const result = computeStateIntegrity(store)(...payload);

    const hash = crypto.createHash("sha256");
    const yml = yaml.dump({ ...pickState(store), integrity: null });
    const payloadStringified = JSON.stringify(payload);
    hash.update(`${yml} --- ${payloadStringified}`, "utf8");
    const expectedHash = hash.digest("hex");

    expect(result).toBe(expectedHash);
  });

  it("produces different hashes for different payloads", () => {
    const store = makeMockStore();

    const hash1 = computeStateIntegrity(store)({ foo: 1 });
    const hash2 = computeStateIntegrity(store)({ foo: 2 });

    expect(hash1).not.toBe(hash2);
  });

  it("produces different hashes for different store states", () => {
    const store1 = makeMockStore();
    const store2 = makeMockStore({ dependencies: { items: [{ name: "x", message: "ok" }] } });

    const hash1 = computeStateIntegrity(store1)();
    const hash2 = computeStateIntegrity(store2)();

    expect(hash1).not.toBe(hash2);
  });
});
