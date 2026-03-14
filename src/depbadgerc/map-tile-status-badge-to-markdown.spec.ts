vi.mock("../shared/encode-label.ts", () => ({
  encodeLabel: vi.fn(),
}));

import { encodeLabel } from "../shared/encode-label.ts";

import { mapTileStatusBadgeToMarkdown } from "./map-tile-status-badge-to-markdown.ts";

describe("mapTileStatusBadgeToMarkdown", () => {
  const encodeLabelMock = vi.mocked(encodeLabel);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a basic markdown badge", () => {
    encodeLabelMock.mockImplementation((v) => `enc-${v}`);
    const badge: any = {
      name: "tile",
      label: "Build",
      message: "Passing",
      color: "green",
    };

    const result = mapTileStatusBadgeToMarkdown(badge);
    expect(result).toBe("![enc-Build](https://img.shields.io/badge/enc-Build-enc-Passing-green?)");
    expect(encodeLabelMock).toHaveBeenCalledWith("Build");
    expect(encodeLabelMock).toHaveBeenCalledWith("Passing");
  });

  it("wraps badge with link when link exists", () => {
    encodeLabelMock.mockImplementation((v) => v);
    const badge: any = {
      name: "tile",
      label: "CI",
      message: "ok",
      color: "blue",
      link: "https://example.com",
    };

    const result = mapTileStatusBadgeToMarkdown(badge);
    expect(result).toBe("[![CI](https://img.shields.io/badge/CI-ok-blue?)](https://example.com)");
  });

  it("includes optional query params", () => {
    encodeLabelMock.mockImplementation((v) => v);
    const badge: any = {
      name: "tile",
      label: "Coverage",
      message: "90%",
      color: "green",
      labelColor: "black",
      cacheSeconds: 3600,
      namedLogo: "github",
      logoColor: "white",
      logoWidth: 20,
      style: "flat",
      isError: true,
    };

    const result = mapTileStatusBadgeToMarkdown(badge);
    expect(result).toContain("labelColor=black");
    expect(result).toContain("cacheSeconds=3600");
    expect(result).toContain("logo=github");
    expect(result).toContain("logoColor=white");
    expect(result).toContain("logoWidth=20");
    expect(result).toContain("style=flat");
    expect(result).toContain("isError=true");
  });

  it("encodes inline SVG logo", () => {
    encodeLabelMock.mockImplementation((v) => v);
    const badge: any = {
      name: "tile",
      label: "SVG",
      message: "ok",
      color: "green",
      logoSvg: "<svg></svg>",
    };

    const result = mapTileStatusBadgeToMarkdown(badge);
    expect(result).toContain("logo=");
    expect(result).toContain("%253Csvg"); // double encoded SVG
  });
});
