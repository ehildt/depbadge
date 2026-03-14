import fs from "fs";

import { findFile } from "../shared/find-file.ts";
import { hashStringToHex } from "../shared/hash-string-to-hex.ts";

import { DependencyItem } from "./depbadgerc.type.ts";
import {
  applySectionDefaults,
  mergeLayout,
  mergeStyle,
  readDepbadgeRC,
  withYargs,
} from "./read-depbadgerc-with-defaults.ts";

vi.mock("../shared/find-file", () => ({ findFile: vi.fn() }));
vi.mock("../shared/hash-string-to-hex", () => ({ hashStringToHex: vi.fn() }));

describe("read-depbadgerc-with-defaults", () => {
  const findFileMock = vi.mocked(findFile);
  const hashMock = vi.mocked(hashStringToHex);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mergeLayout merges correctly", () => {
    expect(mergeLayout({ header: "def" }, { showHeader: true })).toEqual({
      header: "def",
      showHeader: true,
    });
  });

  it("mergeStyle merges correctly", () => {
    expect(mergeStyle({ color: "red" }, { labelColor: "blue" })).toEqual({
      color: "red",
      labelColor: "blue",
    });
  });

  it("applySectionDefaults applies defaults and calls hashStringToHex", () => {
    hashMock.mockImplementation((s) => `hash-${s}`);
    const section = { items: [{ name: "foo", message: "bar" }] as DependencyItem[] };
    const result = applySectionDefaults(section);
    expect(result.items[0].color).toBe("hash-foo");
    expect(result.items[0].logoColor).toBe("hash-foo");
    expect(result.items[0].labelColor).toBe("hash-undefined");
  });

  it("readDepbadgeRC throws if file not found", () => {
    findFileMock.mockReturnValue(null);
    expect(() => readDepbadgeRC("missing.yml")).toThrow("missing.yml not found");
  });

  it("readDepbadgeRC reads YAML correctly", () => {
    const yamlContent = "dependencies:\n  items:\n    - name: dep1\n      message: ok\n";
    findFileMock.mockReturnValue("fake.yml");
    vi.spyOn(fs, "readFileSync").mockReturnValue(yamlContent as any);
    const rc = readDepbadgeRC("fake.yml");
    expect(rc.dependencies.items[0].name).toBe("dep1");
  });

  it("withYargs populates rc.output based on argv", () => {
    const rc = { manifest: "package.json", dependencies: { items: [] } } as any;
    const originalArgv = process.argv;
    process.argv = ["node", "test", "--g", "json", "--generate", "markdown"];
    const result = withYargs(rc);
    expect(result.output).toEqual(["json", "markdown"]);
    process.argv = originalArgv;
  });
});
