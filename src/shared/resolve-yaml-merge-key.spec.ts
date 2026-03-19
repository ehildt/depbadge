import { resolveYamlMergeKey } from "./resolve-yaml-merge-key.ts";

describe("resolveYamlMergeKey", () => {
  test("should handle empty object", () => {
    expect(resolveYamlMergeKey({})).toEqual({});
  });

  test("should handle null", () => {
    expect(resolveYamlMergeKey(null)).toBeNull();
  });

  test("should pass through primitives", () => {
    expect(resolveYamlMergeKey("test")).toBe("test");
    expect(resolveYamlMergeKey(42)).toBe(42);
    expect(resolveYamlMergeKey(true)).toBe(true);
  });

  test("should merge single anchor reference", () => {
    const input = {
      defaults: { a: 1, b: 2 },
      merged: { "<<": { a: 1, b: 2 }, c: 3 },
    };
    const result = resolveYamlMergeKey(input);
    expect(result.merged).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should merge multiple anchor references in array", () => {
    const input = {
      defaults: { a: 1 },
      extra: { b: 2 },
      merged: { "<<": [{ a: 1 }, { b: 2 }], c: 3 },
    };
    const result = resolveYamlMergeKey(input);
    expect(result.merged).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should override merged values with explicit ones", () => {
    const input = {
      defaults: { a: 1, b: 2, c: 3 },
      merged: { "<<": { a: 1, b: 2 }, b: 99, c: 3 },
    };
    const result = resolveYamlMergeKey(input);
    expect(result.merged).toEqual({ a: 1, b: 99, c: 3 });
  });

  test("should handle nested objects with merge keys", () => {
    const input = {
      outer: {
        defaults: { x: 1 },
        inner: { "<<": { x: 1 }, y: 2 },
      },
    };
    const result = resolveYamlMergeKey(input);
    expect(result.outer.inner).toEqual({ x: 1, y: 2 });
  });

  test("should handle arrays with merge keys", () => {
    const input = [{ a: 1 }, { "<<": { b: 2 }, c: 3 }];
    const result = resolveYamlMergeKey(input);
    expect(result).toEqual([{ a: 1 }, { b: 2, c: 3 }]);
  });

  test("should handle real-world depbadgerc style config", () => {
    const input = {
      dependenciesStyle: { labelColor: "333", style: "for-the-badge" },
      dependencies: {
        badgeStyle: { labelColor: "333", style: "for-the-badge" },
      },
      devDependencies: {
        badgeStyle: { "<<": { labelColor: "333", style: "for-the-badge" }, style: "flat-square" },
      },
    };
    const result = resolveYamlMergeKey(input);
    expect(result.devDependencies.badgeStyle).toEqual({
      labelColor: "333",
      style: "flat-square",
    });
  });
});
