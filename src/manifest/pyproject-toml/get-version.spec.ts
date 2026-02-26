import { getVersion } from "./get-version.ts";

describe("getVersion (bound store)", () => {
  const bind = (version?: string) => getVersion({ project: { version } } as any)(); // bind + execute

  it("returns the project version when defined", () => {
    const result = bind("1.2.3");
    expect(result).toBe("1.2.3");
  });

  it("returns undefined when project.version is missing", () => {
    const result = bind(undefined);
    expect(result).toBeUndefined();
  });
});
