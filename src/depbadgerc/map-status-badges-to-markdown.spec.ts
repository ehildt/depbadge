import { CtxStore } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { CodecovStatusBadge, DepbadgeRC, DockerHubStatusBadge, GitHubStatusBadge } from "./depbadgerc.type";
import { HydratedStatusBadgeMap } from "./hydrate-status-badges";
import { mapStatusBadgesToMarkdown } from "./map-status-badges-to-markdown";

describe("Status badge markdown mapping", () => {
  const bind = (storeOverrides: Partial<DepbadgeRC> = {}) => {
    const store = { ...storeOverrides } as CtxStore<DepbadgeRC, Methods>;
    return mapStatusBadgesToMarkdown(store);
  };

  it("maps GitHub badge correctly without link", () => {
    const badges: HydratedStatusBadgeMap = {
      section1: [
        {
          name: "github",
          user: "octocat",
          repo: "hello-world",
          metric: "stars",
          message: "100",
          color: "blue",
        } as GitHubStatusBadge,
      ],
    };

    const run = bind();
    const result = run(badges);

    expect(result.section1).toHaveLength(1);
    expect(result.section1[0]).toContain("img.shields.io/github/stars/octocat/hello_world");
  });

  it("maps GitHub badge correctly with link", () => {
    const badges: HydratedStatusBadgeMap = {
      section1: [
        {
          name: "github",
          user: "octocat",
          repo: "hello-world",
          metric: "stars",
          message: "100",
          color: "blue",
          link: "https://example.com",
        } as GitHubStatusBadge,
      ],
    };

    const run = bind();
    const result = run(badges);

    expect(result.section1).toHaveLength(1);
    expect(result.section1[0]).toMatch(/\[!\[github\]\(.*\)\]\(https:\/\/example.com\)/);
  });

  it("maps DockerHub badge correctly", () => {
    const badges: HydratedStatusBadgeMap = {
      dockerSection: [
        {
          name: "docker",
          user: "library",
          image: "nginx",
          metric: "v",
          message: "1.21",
          color: "green",
        } as DockerHubStatusBadge,
      ],
    };

    const run = bind();
    const result = run(badges);

    expect(result.dockerSection[0]).toContain("img.shields.io/docker/v/library/nginx");
  });

  it("maps Codecov badge correctly without token", () => {
    const badges: HydratedStatusBadgeMap = {
      codecovSection: [
        {
          name: "codecov",
          user: "octocat",
          repo: "hello-world",
          branch: "main",
          color: "red",
        } as CodecovStatusBadge,
      ],
    };

    const run = bind();
    const result = run(badges);

    expect(result.codecovSection[0]).toContain("img.shields.io/codecov");
    expect(result.codecovSection[0]).toContain("octocat");
    expect(result.codecovSection[0]).toContain("hello_world"); // dash -> underscore
  });

  it("filters out unknown badge types", () => {
    const badges: HydratedStatusBadgeMap = {
      section1: [{ name: "unknown", some: "data" } as any],
    };

    const run = bind();
    const result = run(badges);

    expect(result.section1).toHaveLength(0);
  });

  it("maps multiple badges in the same section", () => {
    const badges: HydratedStatusBadgeMap = {
      section1: [
        {
          name: "github",
          user: "octocat",
          repo: "hello-world",
          metric: "stars",
          message: "100",
          color: "blue",
        } as GitHubStatusBadge,
        {
          name: "docker",
          user: "library",
          image: "nginx",
          metric: "v",
          message: "1.21",
          color: "green",
        } as DockerHubStatusBadge,
      ],
    };

    const run = bind();
    const result = run(badges);

    expect(result.section1).toHaveLength(2);
    expect(result.section1[0]).toContain("img.shields.io/github");
    expect(result.section1[1]).toContain("img.shields.io/docker");
  });
});
