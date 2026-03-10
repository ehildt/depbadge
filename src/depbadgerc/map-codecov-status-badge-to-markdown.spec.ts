import { encodeLabel } from "../shared/encode-label";

import { CodecovStatusBadge } from "./depbadgerc.type";
import { mapCodecovStatusBadgeToMarkdown } from "./map-codecov-status-badge-to-markdown";

jest.mock("../shared/encode-label", () => ({
  encodeLabel: jest.fn((s: string) => `encoded_${s}`),
}));

describe("mapCodecovStatusBadgeToMarkdown (with mocked encoder)", () => {
  const mockedEncodeLabel = encodeLabel as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseCodecovBadge: CodecovStatusBadge = {
    name: "codecov",
    user: "owner",
    repo: "repo-name",
    message: "irrelevant",
  };

  it('should use default values for user ("library") and flag ("c")', () => {
    const badgeWithDefaults: CodecovStatusBadge = {
      name: "default-badge",
      repo: "my-repo",
    } as any;

    const result = mapCodecovStatusBadgeToMarkdown(badgeWithDefaults);
    expect(mockedEncodeLabel).toHaveBeenCalledWith("library");
    expect(mockedEncodeLabel).toHaveBeenCalledWith("c");
    expect(mockedEncodeLabel).toHaveBeenCalledWith("github");

    expect(result).toContain("https://img.shields.io/codecov/encoded_c/encoded_github/encoded_library/encoded_my-repo");
  });

  it("should include branch and token in the query parameters if provided", () => {
    const privateBadge: CodecovStatusBadge = {
      ...baseCodecovBadge,
      branch: "develop",
      token: "12345-abcde",
    };

    const result = mapCodecovStatusBadgeToMarkdown(privateBadge);

    expect(result).toContain("branch=develop");
    expect(result).toContain("token=12345-abcde");
  });

  it('should use the provided flag instead of the default "c"', () => {
    const badgeWithFlag: CodecovStatusBadge = {
      ...baseCodecovBadge,
      flag: "unit-tests",
    };

    const result = mapCodecovStatusBadgeToMarkdown(badgeWithFlag);
    expect(mockedEncodeLabel).toHaveBeenCalledWith("unit-tests");
    expect(result).toContain("/codecov/encoded_unit-tests/");
  });

  it("should correctly map all visual style parameters", () => {
    const styledBadge: CodecovStatusBadge = {
      ...baseCodecovBadge,
      style: "for-the-badge",
      color: "green",
      labelColor: "black",
      isError: true,
      cacheSeconds: 300,
    };

    const result = mapCodecovStatusBadgeToMarkdown(styledBadge);
    const url = new URL(result.match(/\(([^)]+)\)/)![1]);
    expect(url.searchParams.get("style")).toBe("for-the-badge");
    expect(url.searchParams.get("color")).toBe("green");
    expect(url.searchParams.get("labelColor")).toBe("black");
    expect(url.searchParams.get("isError")).toBe("true");
    expect(url.searchParams.get("cacheSeconds")).toBe("300");
  });

  it("should handle SVG logos and URL-encode the data URI", () => {
    const svgBadge: CodecovStatusBadge = {
      ...baseCodecovBadge,
      logoSvg: "<svg>codecov</svg>",
    };

    const result = mapCodecovStatusBadgeToMarkdown(svgBadge);
    expect(result).toContain(
      "![codecov](https://img.shields.io/codecov/encoded_c/encoded_github/encoded_owner/encoded_repo-name?logo=data%3Aimage%2Fsvg%2Bxml%3Butf8%2C%253Csvg%253Ecodecov%253C%252Fsvg%253E)",
    );
  });

  it("should return a linked markdown image when link is provided", () => {
    const linkedBadge = {
      ...baseCodecovBadge,
      link: "https://codecov.io/gh/owner/repo",
    };
    const result = mapCodecovStatusBadgeToMarkdown(linkedBadge);
    expect(result).toContain("[![codecov]");
    expect(result).toContain("](https://codecov.io/gh/owner/repo)");
  });
});
