import fs from "fs";

import * as findFileModule from "../../../depbadge/find-file";

import { writeBadgesrc } from "./write-badgesrc";

import { Badgesrc } from "@/depbadge/types";

jest.mock("fs");

describe("writeBadgesrc", () => {
  const mockFindFile = jest.spyOn(findFileModule, "findFile");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add the signature to badgesrc object", () => {
    const badgesrc: Badgesrc = {
      manifestFile: "package.json",
      readmePath: "README.md",
      generateBadgesPreview: true,
      generateBadgesJson: true,
      target: "node",
    };
    const signature = "abc123";

    mockFindFile.mockReturnValue("mocked-path.yml");

    writeBadgesrc(badgesrc, signature);

    expect(badgesrc.signature).toBe(signature);
  });

  it("should call findFile with the given path", () => {
    const badgesrc: Badgesrc = {
      manifestFile: "package.json",
      readmePath: "README.md",
      generateBadgesPreview: true,
      generateBadgesJson: true,
    };
    const path = "custom.yml";
    const signature = "sig";

    mockFindFile.mockReturnValue("mocked-path.yml");

    writeBadgesrc(badgesrc, signature, path);

    expect(mockFindFile).toHaveBeenCalledWith(path);
  });

  it("should write YAML to the file with each top-level section separated", () => {
    const badgesrc: Badgesrc = {
      manifestFile: "package.json",
      readmePath: "README.md",
      generateBadgesPreview: true,
      generateBadgesJson: true,
      target: "node",
    };
    const signature = "sig";

    mockFindFile.mockReturnValue("/fake/path.yml");

    writeBadgesrc(badgesrc, signature);

    const writeCall = (fs.writeFileSync as jest.Mock).mock.calls[0];
    const [filePath, content, encoding] = writeCall;

    expect(filePath).toBe("/fake/path.yml");
    expect(encoding).toBe("utf8");
    expect(content).toContain("signature: sig");
  });

  it("should not write if findFile returns null", () => {
    const badgesrc: Badgesrc = {
      manifestFile: "package.json",
      readmePath: "README.md",
      generateBadgesPreview: true,
      generateBadgesJson: true,
    };
    const signature = "sig";

    mockFindFile.mockReturnValue(null);

    writeBadgesrc(badgesrc, signature);

    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});
