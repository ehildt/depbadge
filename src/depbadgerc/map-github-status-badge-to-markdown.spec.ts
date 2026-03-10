import { encodeLabel } from "../shared/encode-label";

import { GitHubStatusBadge } from "./depbadgerc.type";
import { mapGithubStatusBadgeToMarkdown } from "./map-github-status-badge-to-markdown";

jest.mock("../shared/encode-label", () => ({
  encodeLabel: jest.fn((s: string) => `encoded_${s}`),
}));

describe("mapGithubStatusBadgeToMarkdown (with mocked encoder)", () => {
  const mockedEncodeLabel = encodeLabel as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseBadge: GitHubStatusBadge = {
    name: "github",
    metric: "stars",
    user: "my-user",
    repo: "my-repo",
    message: "irrelevant-for-url",
  };

  it("should call encodeLabel for every URL segment", () => {
    mapGithubStatusBadgeToMarkdown(baseBadge);
    expect(mockedEncodeLabel).toHaveBeenCalledTimes(5);
    expect(mockedEncodeLabel).toHaveBeenCalledWith("github");
    expect(mockedEncodeLabel).toHaveBeenCalledWith("my-user");
    expect(mockedEncodeLabel).toHaveBeenCalledWith("my-repo");
  });

  it("should construct the standard URL using mocked values", () => {
    const result = mapGithubStatusBadgeToMarkdown(baseBadge);
    expect(result).toContain("https://img.shields.io/encoded_github/encoded_stars/encoded_my-user/encoded_my-repo");
  });

  it('should construct the "actions" URL using mocked values', () => {
    const actionsBadge: GitHubStatusBadge = {
      ...baseBadge,
      metric: "actions",
      workflow: "main-ci",
    };

    const result = mapGithubStatusBadgeToMarkdown(actionsBadge);
    expect(result).toContain("/workflow/status/encoded_my-user/encoded_my-repo/encoded_main-ci");
    expect(mockedEncodeLabel).toHaveBeenCalledWith("main-ci");
  });

  it("should still handle query parameters correctly regardless of mocking", () => {
    const styledBadge: GitHubStatusBadge = {
      ...baseBadge,
      color: "red",
      style: "flat",
    };

    const result = mapGithubStatusBadgeToMarkdown(styledBadge);
    expect(result).toContain("color=red");
    expect(result).toContain("style=flat");
  });
});
