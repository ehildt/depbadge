import { CtxStore } from "../store/ctx-store";

import { Methods } from "./depbadgerc.store";
import { DepbadgeRC, StatusBadges } from "./depbadgerc.type";
import { getStatusBadges } from "./get-status-badges";

describe("getStatusBadges", () => {
  const bind = (storeOverrides: Partial<DepbadgeRC> = {}) => {
    const store = { ...storeOverrides } as CtxStore<DepbadgeRC, Methods>;
    return getStatusBadges(store);
  };

  it("returns empty object if store.statusBadges is undefined", () => {
    const run = bind();
    const result = run();
    expect(result).toEqual({});
  });

  it("returns object with statusBadges if store.statusBadges exists", () => {
    const mockStatusBadges: StatusBadges = {
      items: [{ name: "github", user: "octocat", repo: "hello-world", metric: "stars", message: "100", color: "blue" }],
    };

    const run = bind({ statusBadges: mockStatusBadges });
    const result = run();

    expect(result).toHaveProperty("statusBadges");
    expect(result.statusBadges).toBe(mockStatusBadges);
  });
});
