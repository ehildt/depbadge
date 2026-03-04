import fs from "fs";
import path from "path";

import { findFile } from "./find-file";

jest.mock("fs");

describe("findFile", () => {
  const mockedFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns the file in the start directory if it exists", () => {
    mockedFs.existsSync.mockImplementation((filePath) => filePath === "/home/project/file.txt");

    const result = findFile("file.txt", "/home/project");

    expect(result).toBe("/home/project/file.txt");
  });

  it("returns the file from a parent directory", () => {
    const existing = "/home/file.txt";
    mockedFs.existsSync.mockImplementation((filePath) => filePath === existing);

    const result = findFile("file.txt", "/home/project/subdir");

    expect(result).toBe(existing);
  });

  it("returns null if the file is not found in any parent directory", () => {
    mockedFs.existsSync.mockReturnValue(false);

    const result = findFile("missing.txt", "/home/project/subdir");

    expect(result).toBeNull();
  });

  it("stops at root directory and finds file", () => {
    const existing = path.join("/", "file.txt");
    mockedFs.existsSync.mockImplementation((filePath) => filePath === existing);

    const result = findFile("file.txt", "/");

    expect(result).toBe(existing);
  });

  it("returns null if file does not exist at root", () => {
    mockedFs.existsSync.mockReturnValue(false);

    const result = findFile("file.txt", "/");

    expect(result).toBeNull();
  });
});
