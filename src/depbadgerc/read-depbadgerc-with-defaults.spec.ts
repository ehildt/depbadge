import fs from "fs";
import yaml from "js-yaml";

import { findFile } from "../shared/find-file.ts";
import { hashStringToHex } from "../shared/hash-string-to-hsl.ts";

import { getDepbadgeRC, readDepbadgeRC, withDefaults } from "./read-depbadgerc-with-defaults.ts";

jest.mock("fs");
jest.mock("js-yaml");
jest.mock("../shared/find-file.ts");
jest.mock("../shared/hash-string-to-hsl.ts");

describe("Depbadge Config Loader", () => {
  const mockRawConfig = {
    manifest: "package.json",
    dependencies: {
      items: [{ name: "react", message: "v18" }],
    },
    dependenciesStyle: { style: "flat-square" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (hashStringToHex as jest.Mock).mockImplementation((str) => `hex_${str}`);
    (findFile as jest.Mock).mockReturnValue("/mock/path/depbadgerc.yml");
    (fs.readFileSync as jest.Mock).mockReturnValue("mock yaml content");
    (yaml.load as jest.Mock).mockReturnValue(mockRawConfig);
  });

  describe("readDepbadgeRC", () => {
    it("should throw an error if the file is not found", () => {
      (findFile as jest.Mock).mockReturnValue(null);
      expect(() => readDepbadgeRC()).toThrow("depbadgerc.yml not found");
    });

    it("should read and parse the yaml file correctly", () => {
      const result = readDepbadgeRC("custom.yml");
      expect(findFile).toHaveBeenCalledWith("custom.yml");
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(result).toEqual(mockRawConfig);
    });
  });

  describe("withDefaults", () => {
    it("should merge layout and style defaults into sections", () => {
      const rc: any = {
        dependenciesLayout: { position: "center" },
        dependenciesStyle: { color: "333" },
        dependencies: {
          items: [{ name: "jest", message: "latest" }],
        },
      };

      const result = withDefaults(rc);
      expect(result.dependencies.layout).toEqual({ position: "center" });
      const item = result.dependencies.items[0];
      expect(item.color).toBe("333");
      expect(item.logoColor).toBe("hex_jest");
    });

    it("should prioritize item-level styles over defaults", () => {
      const rc: any = {
        dependenciesStyle: { color: "333" },
        dependencies: {
          items: [{ name: "typescript", message: "5.0", color: "aaa" }],
        },
      };

      const result = withDefaults(rc);
      expect(result.dependencies.items[0].color).toBe("aaa");
    });

    it("should handle optional sections (devDependencies) being undefined", () => {
      const rc: any = {
        dependencies: { items: [] },
      };

      const result = withDefaults(rc);
      expect(result.devDependencies).toBeUndefined();
      expect(result.statusBadges).toBeUndefined();
    });

    it("should generate hex colors for name, logo, and label if missing", () => {
      const rc: any = {
        dependencies: {
          items: [{ name: "test-lib", message: "ok" }],
        },
      };

      const result = withDefaults(rc);
      const item = result.dependencies.items[0];
      expect(hashStringToHex).toHaveBeenCalled();
      expect(item.color).toBe("hex_test-lib");
      expect(item.logoColor).toBe("hex_test-lib");
    });
  });

  describe("getDepbadgeRC", () => {
    it("should orchestrate reading and applying defaults", () => {
      const result = getDepbadgeRC();
      expect(findFile).toHaveBeenCalled();
      expect(result.dependencies.items[0].color).toBeDefined();
    });
  });
});
