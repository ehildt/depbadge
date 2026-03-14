import fs from "fs";
import path from "path";
import { beforeEach, describe, expect, Mocked, test, vi } from "vitest";

import { outputShieldioBadgesJson } from "./output-shieldio-badges-json.ts";

vi.mock("fs");
vi.mock("path");

describe("outputShieldioBadgesJson", () => {
  const mockedFs = fs as Mocked<typeof fs>;
  const mockedPath = path as Mocked<typeof path>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedPath.join.mockImplementation((...args: string[]) => args.join("/"));
  });

  const bind = () => {
    const store = {} as any; // ctx store not used
    return outputShieldioBadgesJson(store);
  };

  test("creates section directories", () => {
    const run = bind();

    const map = {
      dependencies: {
        react: { name: "react", message: "18.0.0" },
      },
    };

    run(map as any);

    expect(mockedFs.mkdirSync).toHaveBeenCalledWith(".depbadge/dependencies", { recursive: true });
  });

  test("writes badge files", () => {
    const run = bind();

    const map = {
      dependencies: {
        react: { name: "react", message: "18.0.0" },
      },
    };

    run(map as any);

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      ".depbadge/dependencies/react.json",
      JSON.stringify({ name: "react", message: "18.0.0" }, null, 2),
    );
  });

  test("normalizes scoped package names", () => {
    const run = bind();

    const map = {
      dependencies: {
        "@scope/pkg": { name: "@scope/pkg", message: "1.0.0" },
      },
    };

    run(map as any);

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      ".depbadge/dependencies/scope__pkg.json",
      JSON.stringify({ name: "@scope/pkg", message: "1.0.0" }, null, 2),
    );
  });

  test("supports custom output directory", () => {
    const run = bind();

    const map = {
      dependencies: {
        react: { name: "react", message: "18.0.0" },
      },
    };

    run(map as any, "custom");

    expect(mockedFs.mkdirSync).toHaveBeenCalledWith("custom/dependencies", { recursive: true });
  });

  test("handles multiple sections", () => {
    const run = bind();

    const map = {
      dependencies: { react: { name: "react", message: "18" } },
      devDependencies: { jest: { name: "jest", message: "29" } },
    };

    run(map as any);

    expect(mockedFs.writeFileSync).toHaveBeenCalledTimes(2);
  });
});
