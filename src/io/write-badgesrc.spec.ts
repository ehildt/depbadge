import fs from "fs";

import { writeBadgesrc } from "./write-badgesrc";

jest.mock("fs");

describe("writeBadgesrc", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("writes a YAML file with signature and blank lines between sections", () => {
    const signature = "abc123";
    const path = "badgesrc.yml";
    const badgesrc = {
      dependencies: ["react", "lodash"],
      devDependencies: ["jest"],
      peerDependencies: [],
    };

    writeBadgesrc(badgesrc, signature, path);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    const written = (fs.writeFileSync as jest.Mock).mock.calls[0][1] as string;
    expect(written).toMatch(/signature: abc123/);
    const sections = written.trim().split("\n\n");
    const topKeys = sections.map((s) => s.split(":")[0].trim());
    expect(topKeys).toEqual(
      expect.arrayContaining([
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "signature",
      ]),
    );

    expect(written.endsWith("\n")).toBe(true);
  });
});
