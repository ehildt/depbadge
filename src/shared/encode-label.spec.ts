import { encodeLabel } from "./encode-label";

describe("encodeLabel()", () => {
  test("should replace special characters with underscores", () => {
    expect(encodeLabel("hello-world")).toBe("hello_world");
    expect(encodeLabel("user@name!")).toBe("user_name_");
    expect(encodeLabel("my label 123")).toBe("my_label_123");
  });

  test("should preserve alphanumeric characters", () => {
    expect(encodeLabel("Version2026")).toBe("Version2026");
    expect(encodeLabel("abcXYZ")).toBe("abcXYZ");
  });

  test("should handle multiple consecutive special characters", () => {
    expect(encodeLabel("test!!!abc")).toBe("test___abc");
  });

  test("should handle empty strings", () => {
    expect(encodeLabel("")).toBe("");
  });

  test("should handle null or undefined input by returning an empty string", () => {
    expect(encodeLabel(null as any)).toBe("");
    expect(encodeLabel(undefined as any)).toBe("");
  });

  test("should produce URL-safe output", () => {
    expect(encodeLabel("data 100%")).toBe("data_100_");
  });
});
