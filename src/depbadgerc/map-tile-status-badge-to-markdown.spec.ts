import { TileStatusBadge } from "./depbadgerc.type";
import { mapTileStatusBadgeToMarkdown } from "./map-tile-status-badge-to-markdown";

jest.mock("../shared/encode-label", () => ({
  encodeLabel: jest.fn((val: string) => val.replace(/-/g, "--").replace(/\s/g, "_").replace(/#/g, "%23")),
}));

describe("mapTileStatusBadgeToMarkdown", () => {
  const mockTile: TileStatusBadge = {
    name: "tile",
    label: "build status",
    message: "passing",
    color: "#4c1",
  };

  it("should generate a valid static badge markdown string", () => {
    const result = mapTileStatusBadgeToMarkdown(mockTile);
    expect(result).toBe("![build_status](https://img.shields.io/badge/build_status-passing-%234c1?)");
  });

  it("should handle optional link wrapping", () => {
    const tileWithLink: TileStatusBadge = {
      ...mockTile,
      link: "https://github.com/user/repo",
    };
    const result = mapTileStatusBadgeToMarkdown(tileWithLink);
    expect(result).toBe(
      "[![build_status](https://img.shields.io/badge/build_status-passing-%234c1?)](https://github.com/user/repo)",
    );
  });

  it("should correctly build URLSearchParams from BadgeStyle properties", () => {
    const styledTile: TileStatusBadge = {
      ...mockTile,
      style: "for-the-badge",
      namedLogo: "github",
      logoColor: "white",
      cacheSeconds: 3600,
    };

    const result = mapTileStatusBadgeToMarkdown(styledTile);
    const url = new URL(result.match(/\((https:[^)]+)\)/)![1]);
    expect(url.searchParams.get("style")).toBe("for-the-badge");
    expect(url.searchParams.get("logo")).toBe("github");
    expect(url.searchParams.get("logoColor")).toBe("white");
    expect(url.searchParams.get("cacheSeconds")).toBe("3600");
  });

  it("should handle complex SVG logos in query params", () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    const tileWithSvg: TileStatusBadge = {
      ...mockTile,
      logoSvg: svgContent,
    };

    const result = mapTileStatusBadgeToMarkdown(tileWithSvg);
    const expectedLogoParam = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
    expect(result).toContain(`logo=${encodeURIComponent(expectedLogoParam)}`);
  });

  it("should use default color #333 when color is not provided", () => {
    const noColorTile = { ...mockTile, color: undefined } as TileStatusBadge;
    const result = mapTileStatusBadgeToMarkdown(noColorTile);
    expect(result).toContain("-%23333?");
  });
});
