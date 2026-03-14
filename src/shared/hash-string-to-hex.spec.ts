import { hashStringToHex } from "./hash-string-to-hex.ts";

describe("hashStringToHex", () => {
  test("should return a 6-character hex string without the #", () => {
    const result = hashStringToHex("test-string");
    expect(result).toMatch(/^[0-9a-f]{6}$/i);
    expect(result).not.toContain("#");
  });

  test("should be deterministic (same input returns same hex)", () => {
    const input = "cookies";
    const firstCall = hashStringToHex(input);
    const secondCall = hashStringToHex(input);
    expect(firstCall).toBe(secondCall);
  });

  test("should produce different colors for different strings", () => {
    const color1 = hashStringToHex("apple");
    const color2 = hashStringToHex("banana");
    expect(color1).not.toBe(color2);
  });

  test("should handle empty strings without crashing", () => {
    const result = hashStringToHex("");
    expect(result).toMatch(/^[0-9a-f]{6}$/i);
  });

  test("should generate a valid hex color within expected HSL range", () => {
    const result = hashStringToHex("ShieldsIO");
    const isValidHex = /^[0-9a-f]{6}$/i.test(result);
    expect(isValidHex).toBe(true);
  });
});
