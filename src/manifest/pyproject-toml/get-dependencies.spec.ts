import { getDependencies } from "./get-dependencies";
import { DepbadgeManifest } from "./manifest.type";

describe("getDependencies (bound store)", () => {
  const bind = (project: Partial<DepbadgeManifest["project"]>) => getDependencies({ project } as any)(); // bind + execute

  it("parses dependencies and strips operators", () => {
    const result = bind({
      dependencies: ["requests>=2.31.0", "pydantic==2.5.0"],
    });

    expect(result.dependencies).toEqual({
      requests: "2.31.0",
      pydantic: "2.5.0",
    });

    expect(result.devDependencies).toEqual({});
    expect(result.peerDependencies).toEqual({});
  });

  it("parses devDependencies from optional-dependencies.dev", () => {
    const result = bind({
      "optional-dependencies": {
        dev: ["pytest>=8.0.0", "ruff~=0.3.0"],
      },
    });

    expect(result.devDependencies).toEqual({
      pytest: "8.0.0",
      ruff: "0.3.0",
    });
  });

  it("handles compound constraints", () => {
    const result = bind({
      dependencies: ["uvicorn>=0.20,<1.0"],
    });

    expect(result.dependencies).toEqual({
      uvicorn: "0.20",
    });
  });

  it("returns '*' when no version specified", () => {
    const result = bind({
      dependencies: ["pytest"],
    });

    expect(result.dependencies).toEqual({
      pytest: "*",
    });
  });

  it("returns empty maps if nothing defined", () => {
    const result = bind({});

    expect(result).toEqual({
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    });
  });

  it("handles empty arrays", () => {
    const result = bind({
      dependencies: [],
      "optional-dependencies": { dev: [] },
    });

    expect(result.dependencies).toEqual({});
    expect(result.devDependencies).toEqual({});
  });
});
