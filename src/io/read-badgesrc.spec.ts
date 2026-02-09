import fs from "fs";
import yaml from "js-yaml";

import { readBadgesrc } from "./read-badgesrc";

jest.mock("fs");

describe("readBadgesrc", () => {
  const mockPath = "badgesrc.yml";

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("throws an error if file does not exist", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    expect(() => readBadgesrc(mockPath)).toThrow(`${mockPath} not found`);
  });

  it("reads the file and returns badgesrc and signature", () => {
    const fileContents = yaml.dump({
      setting1: true,
      setting2: "value",
      signature: "abc123",
    });

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(fileContents);

    const result = readBadgesrc(mockPath);

    expect(result.badgesrc).toEqual({
      setting1: true,
      setting2: "value",
    });
    expect(result.signature).toBe("abc123");
  });

  it("returns null for signature if it does not exist", () => {
    const fileContents = yaml.dump({
      setting1: true,
      setting2: "value",
    });

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(fileContents);

    const result = readBadgesrc(mockPath);

    expect(result.badgesrc).toEqual({
      setting1: true,
      setting2: "value",
    });
    expect(result.signature).toBeNull();
  });
});
