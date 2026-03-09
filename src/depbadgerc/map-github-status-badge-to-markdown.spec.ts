import { mapGithubStatusBadgeToMarkdown } from "./map-github-status-badge-to-markdown";

describe("mapGithubStatusBadgeToMarkdown", () => {
  const baseBadge = {
    name: "Build Status",
    user: "john_doe",
    metric: "stars",
    repo: "my-repo",
  };

  test("should return a basic image markdown without a link", () => {
    const result = mapGithubStatusBadgeToMarkdown(baseBadge as any);
    expect(result).toContain("![Build Status]");
    expect(result).toContain("https://img.shields.io/Build_Status/stars/john_doe/my_repo?");
    expect(result).not.toContain("[![Build Status]"); // Should not be wrapped in a link
  });

  test("should wrap in markdown link if badge.link is provided", () => {
    const badgeWithLink = {
      ...baseBadge,
      link: "https://example.com",
    };
    const result = mapGithubStatusBadgeToMarkdown(badgeWithLink as any);

    expect(result).toBe(
      "[![Build Status](https://img.shields.io/Build_Status/stars/john_doe/my_repo?)](https://example.com)",
    );
  });

  test("should correctly append URL search parameters", () => {
    const badgeWithParams = {
      ...baseBadge,
      labelColor: "red",
      style: "flat-square",
      isError: true,
      namedLogo: "github",
    };

    const result = mapGithubStatusBadgeToMarkdown(badgeWithParams as any);

    const url = new URL(result.match(/\(([^)]+)\)/)![1]);
    expect(url.searchParams.get("labelColor")).toBe("red");
    expect(url.searchParams.get("style")).toBe("flat-square");
    expect(url.searchParams.get("isError")).toBe("true");
    expect(url.searchParams.get("logo")).toBe("github");
  });

  test("should handle numeric values (cacheSeconds, logoWidth) as strings", () => {
    const badgeWithNumbers = {
      ...baseBadge,
      cacheSeconds: 3600,
      logoWidth: 20,
    };

    const result = mapGithubStatusBadgeToMarkdown(badgeWithNumbers as any);

    expect(result).toContain("cacheSeconds=3600");
    expect(result).toContain("logoWidth=20");
  });

  test("should handle logoSvg with data URI encoding", () => {
    const badgeWithSvg = {
      ...baseBadge,
      logoSvg: "<svg>...</svg>",
    };

    const result = mapGithubStatusBadgeToMarkdown(badgeWithSvg as any);
    expect(result).toContain(
      "![Build Status](https://img.shields.io/Build_Status/stars/john_doe/my_repo?logo=data%3Aimage%2Fsvg%2Bxml%3Butf8%2C%253Csvg%253E...%253C%252Fsvg%253E)",
    );
  });
});
