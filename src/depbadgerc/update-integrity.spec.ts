import fs from "fs";

import { findFile } from "../shared/find-file";

import { updateIntegrity } from "./update-integrity";

jest.mock("fs");
jest.mock("../shared/find-file");

describe("updateIntegrity", () => {
  const mockedFs = fs as jest.Mocked<typeof fs>;
  const mockedFindFile = findFile as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does nothing if file is not found", () => {
    mockedFindFile.mockReturnValue(undefined);

    updateIntegrity("abc123");

    expect(mockedFs.readFileSync).not.toHaveBeenCalled();
    expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
  });

  test("replaces existing integrity line", () => {
    mockedFindFile.mockReturnValue("/tmp/depbadgerc.yml");
    mockedFs.readFileSync.mockReturnValue("name: test\nintegrity: oldhash\nversion: 1");

    updateIntegrity("newhash");

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      "/tmp/depbadgerc.yml",
      "name: test\nintegrity: newhash\nversion: 1",
      "utf8",
    );
  });

  test("adds integrity if missing", () => {
    mockedFindFile.mockReturnValue("/tmp/depbadgerc.yml");
    mockedFs.readFileSync.mockReturnValue("name: test\nversion: 1");

    updateIntegrity("hash123");

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      "/tmp/depbadgerc.yml",
      "integrity: hash123\nname: test\nversion: 1",
      "utf8",
    );
  });

  test("adds integrity to empty file", () => {
    mockedFindFile.mockReturnValue("/tmp/depbadgerc.yml");
    mockedFs.readFileSync.mockReturnValue("");

    updateIntegrity("hash123");

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith("/tmp/depbadgerc.yml", "integrity: hash123\n", "utf8");
  });
});
