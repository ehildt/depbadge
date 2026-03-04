import { CtxStore } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC, StatusBadgeItem, StatusBadges } from "./depbadgerc.type";
import { hydrateStatusBadges } from "./hydrate-status-badges";

describe("hydrateStatusBadges", () => {
  const bind = (storeOverrides: any = {}) => {
    const store = { ...storeOverrides } as CtxStore<DepbadgeRC, Methods>;
    return hydrateStatusBadges(store);
  };

  it("returns empty object when input is empty", () => {
    const run = bind();
    const result = run({});
    expect(result).toEqual({});
  });

  it("hydrates a single status badge", () => {
    const badge: StatusBadgeItem = {
      name: "github",
      user: "octocat",
      repo: "hello-world",
      metric: "stars",
      message: "100",
      color: "blue",
    };

    const input: Record<"statusBadges", StatusBadges> = {
      statusBadges: { items: [badge] },
    };

    const run = bind();
    const result = run(input);

    expect(result.statusBadges).toHaveLength(1);
    expect(result.statusBadges[0]).toEqual(badge);
  });

  it("merges multiple badges in the same section", () => {
    const badge1: StatusBadgeItem = {
      name: "github",
      user: "octocat",
      repo: "hello-world",
      metric: "stars",
      message: "100",
      color: "blue",
    };
    const badge2: StatusBadgeItem = {
      name: "codecov",
      user: "octocat",
      repo: "hello-world",
      message: "90%",
      color: "green",
    };

    const input: Record<"statusBadges", StatusBadges> = {
      statusBadges: { items: [badge1, badge2] },
    };

    const run = bind();
    const result = run(input);

    expect(result.statusBadges).toHaveLength(2);
    expect(result.statusBadges).toEqual([badge1, badge2]);
  });

  it("ignores empty items array", () => {
    const input: Record<"statusBadges", StatusBadges> = {
      statusBadges: { items: [] },
    };

    const run = bind();
    const result = run(input);

    expect(result).toEqual({});
  });
});
