import { generateBadges } from "./generate-badges";
import { hashStringToHsl } from "./hash-string-to-hsl";
import { BadgeMap, Sections } from "./types";

describe("generateBadges", () => {
  it("generates badges only for deps with known versions", () => {
    const sections: Sections = {
      dependencies: ["react", "lodash"],
      devDependencies: ["jest"],
      peerDependencies: [],
      internalDependencies: [],
    };

    const versions = {
      react: "18.2.0",
      jest: "30.2.0",
      // lodash missing → skipped
    };

    const result = generateBadges(sections, versions);

    expect(Object.keys(result)).toEqual(["react", "jest"]);
    expect(result).not.toHaveProperty("lodash");
  });

  it("produces a valid BadgeMap entry", () => {
    const sections: Sections = {
      dependencies: ["react"],
      devDependencies: [],
      peerDependencies: [],
      internalDependencies: [],
    };

    const versions = { react: "18.2.0" };

    const result: BadgeMap = generateBadges(sections, versions);

    expect(result.react).toEqual({
      schemaVersion: 1,
      label: "react",
      message: "18.2.0",
      color: hashStringToHsl("react"),
    });
  });

  it("returns an empty object when all versions are unknown", () => {
    const sections: Sections = {
      dependencies: ["react"],
      devDependencies: ["jest"],
      peerDependencies: [],
      internalDependencies: [],
    };

    const result = generateBadges(sections, {});

    expect(result).toEqual({});
  });

  it("handles empty sections", () => {
    const emptySections: Sections = {
      dependencies: [],
      devDependencies: [],
      peerDependencies: [],
      internalDependencies: [],
    };

    const result = generateBadges(emptySections, {});

    expect(result).toEqual({});
  });
});
