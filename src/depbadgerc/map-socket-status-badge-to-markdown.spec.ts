import { SocketStatusBadge } from "./depbadgerc.type.ts";
import { mapSocketStatusBadgeToMarkdown } from "./map-socket-status-badge-to-markdown.ts";

describe("mapSocketStatusBadgeToMarkdown", () => {
  const baseSocketBadge: SocketStatusBadge = {
    name: "socket",
    package: "express",
    message: "irrelevant",
  };

  it("should use badge.socket.dev URL with latest version by default", () => {
    const result = mapSocketStatusBadgeToMarkdown(baseSocketBadge);

    expect(result).toContain("https://badge.socket.dev/npm/package/express/*");
    expect(result).toContain("https://www.npmjs.com/package/express");
  });

  it("should use provided version", () => {
    const badgeWithVersion: SocketStatusBadge = {
      ...baseSocketBadge,
      version: "4.18.2",
    };

    const result = mapSocketStatusBadgeToMarkdown(badgeWithVersion);

    expect(result).toContain("https://badge.socket.dev/npm/package/express/4.18.2");
  });

  it("should handle scoped package names", () => {
    const scopedBadge: SocketStatusBadge = {
      ...baseSocketBadge,
      package: "@babel/core",
    };

    const result = mapSocketStatusBadgeToMarkdown(scopedBadge);

    expect(result).toContain("https://badge.socket.dev/npm/package/@babel/core/*");
    expect(result).toContain("https://www.npmjs.com/package/@babel/core");
  });

  it("should allow custom link override", () => {
    const badgeWithLink: SocketStatusBadge = {
      ...baseSocketBadge,
      link: "https://custom-link.example.com",
    };

    const result = mapSocketStatusBadgeToMarkdown(badgeWithLink);

    expect(result).toContain("https://badge.socket.dev/npm/package/express/*");
    expect(result).toContain("](https://custom-link.example.com)");
  });

  it("should always return a linked image", () => {
    const result = mapSocketStatusBadgeToMarkdown(baseSocketBadge);

    expect(result).toMatch(
      /^\[!\[socket\]\(https:\/\/badge\.socket\.dev\/npm\/package\/.*\*\)\]\(https:\/\/www\.npmjs\.com\/package\/.*\)$/,
    );
  });
});
