import { CtxStore } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC } from "./depbadgerc.type";
import { mapBadgesToMarkdown } from "./map-badges-to-markdown";

describe("mapBadgesToMarkdown", () => {
  const bind = (storeOverrides: any = {}) => {
    const store = { ...storeOverrides } as CtxStore<DepbadgeRC, Methods>;
    return mapBadgesToMarkdown(store);
  };

  it("maps a simple badge without optional fields", () => {
    const hdm = {
      dependencies: {
        react: { name: "react", message: "^17.0.0", color: "blue" },
      },
    };
    const run = bind();
    const result = run(hdm);

    expect(result.dependencies).toHaveLength(1);
    const badgeMarkdown = result.dependencies[0];
    expect(badgeMarkdown).toMatch(/^!\[react\]\(/);
    expect(badgeMarkdown).toContain("react-v17.0.0-blue.svg");
  });

  it("encodes special characters in name and message", () => {
    const hdm = {
      dependencies: {
        "@scope/pkg": { name: "@scope/pkg", message: "^1.2.3", color: "green" },
      },
    };
    const run = bind();
    const result = run(hdm);

    const badgeMarkdown = result.dependencies[0];
    expect(badgeMarkdown).toContain("img.shields.io/badge/_scope_pkg-v1.2.3-green.svg");
  });

  it("includes optional fields like labelColor, logo, cacheSeconds", () => {
    const hdm = {
      dependencies: {
        lodash: {
          name: "lodash",
          message: "4.17.21",
          color: "yellow",
          labelColor: "black",
          logoColor: "white",
          cacheSeconds: 3600,
          namedLogo: "npm",
        },
      },
    };
    const run = bind();
    const result = run(hdm);

    const badgeMarkdown = result.dependencies[0];
    expect(badgeMarkdown).toContain("labelColor=black");
    expect(badgeMarkdown).toContain("logo=npm");
    expect(badgeMarkdown).toContain("cacheSeconds=3600");
    expect(badgeMarkdown).toContain("logoColor=white");
  });

  it("wraps badge with link if badge.link exists", () => {
    const hdm = {
      dependencies: {
        vue: {
          name: "vue",
          message: "3.2.0",
          color: "green",
          link: "https://example.com",
        },
      },
    };
    const run = bind();
    const result = run(hdm);

    const badgeMarkdown = result.dependencies[0];
    expect(badgeMarkdown.startsWith("[![vue](")).toBe(true);
    expect(badgeMarkdown.endsWith("](https://example.com)")).toBe(true);
  });

  it("handles multiple badges in one section", () => {
    const hdm = {
      dependencies: {
        react: { name: "react", message: "17.0.0", color: "blue" },
        vue: { name: "vue", message: "3.2.0", color: "green" },
      },
    };
    const run = bind();
    const result = run(hdm);

    expect(result.dependencies).toHaveLength(2);
    expect(result.dependencies[0]).toContain("react-17.0.0-blue.svg");
    expect(result.dependencies[1]).toContain("vue-3.2.0-green.svg");
  });

  it("returns empty object when input is empty", () => {
    const run = bind();
    const result = run({});
    expect(result).toEqual({});
  });
});
