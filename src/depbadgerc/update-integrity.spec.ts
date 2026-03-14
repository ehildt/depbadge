vi.mock("../shared/find-file.ts", () => ({
  findFile: vi.fn(),
}));

vi.mock("fs", () => ({
  default: {
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
  },
}));

import fs from "fs";

import { findFile } from "../shared/find-file.ts";

import { updateIntegrity } from "./update-integrity.ts";

describe("updateIntegrity", () => {
  const findFileMock = vi.mocked(findFile);
  const readFileSyncMock = vi.mocked(fs.readFileSync);
  const writeFileSyncMock = vi.mocked(fs.writeFileSync);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does nothing if file is not found", () => {
    findFileMock.mockReturnValue(null);
    updateIntegrity("abc123");
    expect(readFileSyncMock).not.toHaveBeenCalled();
    expect(writeFileSyncMock).not.toHaveBeenCalled();
  });

  it("replaces existing integrity field", () => {
    findFileMock.mockReturnValue("/fake/depbadgerc.yml");
    readFileSyncMock.mockReturnValue("integrity: oldhash\ndependencies:\n  items: []");
    updateIntegrity("newhash");
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      "/fake/depbadgerc.yml",
      "integrity: newhash\ndependencies:\n  items: []",
      "utf8",
    );
  });

  it("prepends integrity field if missing", () => {
    findFileMock.mockReturnValue("/fake/depbadgerc.yml");
    readFileSyncMock.mockReturnValue("dependencies:\n  items: []");
    updateIntegrity("newhash");
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      "/fake/depbadgerc.yml",
      "integrity: newhash\ndependencies:\n  items: []",
      "utf8",
    );
  });
});
