import { colord } from "colord";
import fs from "fs";
import yaml from "js-yaml";

import { findFile } from "../shared/find-file";

import { DepbadgeRC, DependencyItem } from "./depbadgerc.type";
import { readDepbadgeRC, withDefaults } from "./read-depbadgerc-with-defaults";

jest.mock("fs");
jest.mock("js-yaml");
jest.mock("../shared/find-file");

describe("withDefaults", () => {
  it("applies defaults to dependencies section", () => {
    const rc: DepbadgeRC = {
      manifest: "package.json",
      dependencies: {
        items: [{ name: "react", message: "17.0.0" }],
      },
    };

    const result = withDefaults(rc);

    expect(result.dependencies).toBeDefined();
    const dep = result.dependencies.items[0] as DependencyItem;
    expect(dep.color).toBeDefined();
    expect(dep.labelColor).toBeUndefined();
    expect(dep.logoColor).toBeDefined();
  });

  it("merges layout and badgeStyle defaults", () => {
    const rc: DepbadgeRC = {
      manifest: "package.json",
      dependenciesLayout: { theme: "dark" },
      dependenciesStyle: { color: "red" },
      dependencies: {
        layout: { showHeader: true },
        badgeStyle: { color: "blue" },
        items: [{ name: "react", message: "17.0.0" }],
      },
    };

    const result = withDefaults(rc);
    expect(result.dependencies.layout).toEqual({ theme: "dark", showHeader: true });
    const dep = result.dependencies.items[0] as DependencyItem;
    expect(dep.color).toBe(colord("red").toHslString()); // merged default
  });

  it("handles optional sections correctly", () => {
    const rc: DepbadgeRC = {
      manifest: "package.json",
      dependencies: { items: [] },
    };

    const result = withDefaults(rc);
    expect(result.devDependencies).toBeUndefined();
    expect(result.peerDependencies).toBeUndefined();
    expect(result.statusBadges).toBeUndefined();
  });
});

describe("readDepbadgeRC", () => {
  const mockedFs = fs as jest.Mocked<typeof fs>;
  const mockedYaml = yaml as jest.Mocked<typeof yaml>;
  const mockedFindFile = findFile as jest.MockedFunction<typeof findFile>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("reads and parses YAML file correctly", () => {
    const fakeRc: DepbadgeRC = { manifest: "package.json", dependencies: { items: [] } };
    mockedFindFile.mockReturnValue("/fake/path/depbadgerc.yml");
    mockedFs.readFileSync.mockReturnValue("yaml content");
    mockedYaml.load.mockReturnValue(fakeRc);

    const rc = readDepbadgeRC();
    expect(mockedFindFile).toHaveBeenCalledWith("depbadgerc.yml");
    expect(mockedFs.readFileSync).toHaveBeenCalledWith("/fake/path/depbadgerc.yml", "utf8");
    expect(rc).toEqual(fakeRc);
  });

  it("throws an error if file not found", () => {
    mockedFindFile.mockReturnValue(null);
    expect(() => readDepbadgeRC("missing.yml")).toThrow("missing.yml not found");
  });
});
