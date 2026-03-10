import { encodeLabel } from "../shared/encode-label";

import { DockerHubStatusBadge } from "./depbadgerc.type";
import { mapDockerHubStatusBadgeToMarkdown } from "./map-dockerhub-status-badge-to-markdown";

jest.mock("../shared/encode-label", () => ({
  encodeLabel: jest.fn((s: string) => `encoded_${s}`),
}));

describe("mapDockerHubStatusBadgeToMarkdown (with mocked encoder)", () => {
  const mockedEncodeLabel = encodeLabel as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseDockerBadge: DockerHubStatusBadge = {
    name: "docker",
    metric: "v",
    user: "myuser",
    image: "myimage",
    message: "irrelevant",
  };

  it('should use "library" as a default if user is not provided', () => {
    const badgeWithoutUser = { ...baseDockerBadge, user: undefined as any };
    const result = mapDockerHubStatusBadgeToMarkdown(badgeWithoutUser);
    expect(mockedEncodeLabel).toHaveBeenCalledWith("library");
    expect(result).toContain("/encoded_library/");
  });

  it('should use "v" as a default metric if not provided', () => {
    const badgeWithoutMetric = { ...baseDockerBadge, metric: undefined as any };
    const result = mapDockerHubStatusBadgeToMarkdown(badgeWithoutMetric);
    expect(mockedEncodeLabel).toHaveBeenCalledWith("v");
    expect(result).toContain("/encoded_v/");
  });

  it('should include the tag query param ONLY if metric is "v"', () => {
    const badgeWithTag: DockerHubStatusBadge = {
      ...baseDockerBadge,
      metric: "v",
      tag: "latest",
    };

    const resultV = mapDockerHubStatusBadgeToMarkdown(badgeWithTag);
    expect(resultV).toContain("tag=latest");
    const badgeWithPulls: DockerHubStatusBadge = {
      ...baseDockerBadge,
      metric: "pulls",
      tag: "latest",
    };

    const resultPulls = mapDockerHubStatusBadgeToMarkdown(badgeWithPulls);
    expect(resultPulls).not.toContain("tag=latest");
  });

  it("should correctly handle complex style parameters", () => {
    const styledBadge: DockerHubStatusBadge = {
      ...baseDockerBadge,
      color: "blue",
      labelColor: "333",
      namedLogo: "docker",
      logoWidth: 20,
      cacheSeconds: 60,
    };

    const result = mapDockerHubStatusBadgeToMarkdown(styledBadge);
    const url = new URL(result.match(/\(([^)]+)\)/)![1]);
    expect(url.searchParams.get("color")).toBe("blue");
    expect(url.searchParams.get("labelColor")).toBe("333");
    expect(url.searchParams.get("logo")).toBe("docker");
    expect(url.searchParams.get("logoWidth")).toBe("20");
    expect(url.searchParams.get("cacheSeconds")).toBe("60");
  });

  it("should encode SVG logos correctly into the query string", () => {
    const svgBadge: DockerHubStatusBadge = {
      ...baseDockerBadge,
      logoSvg: "<svg>docker</svg>",
    };

    const result = mapDockerHubStatusBadgeToMarkdown(svgBadge);
    expect(result).toContain(
      "![docker](https://img.shields.io/encoded_docker/encoded_v/encoded_myuser/encoded_myimage?logo=data%3Aimage%2Fsvg%2Bxml%3Butf8%2C%253Csvg%253Edocker%253C%252Fsvg%253E)",
    );
  });

  it("should return a linked markdown image when link is provided", () => {
    const linkedBadge = { ...baseDockerBadge, link: "https://hub.docker.com" };
    const result = mapDockerHubStatusBadgeToMarkdown(linkedBadge);
    expect(result).toMatch(
      "[![docker](https://img.shields.io/encoded_docker/encoded_v/encoded_myuser/encoded_myimage?)](https://hub.docker.com)",
    );
  });
});
