import { encodeLabel } from "./encode-label.ts";

describe("encodeLabel", () => {
  test("should preserve dashes in URL paths", () => {
    expect(encodeLabel("my-label")).toBe("my-label");
  });

  test("should double existing underscores", () => {
    expect(encodeLabel("my_label")).toBe("my__label");
  });

  test("should convert single spaces to a single underscore", () => {
    expect(encodeLabel("my label")).toBe("my_label");
  });

  test("should convert multiple consecutive spaces to a single underscore", () => {
    expect(encodeLabel("my    label")).toBe("my_label");
  });

  test("should convert scoped package names to display format", () => {
    expect(encodeLabel("@scope/pkg")).toBe("scope-pkg");
    expect(encodeLabel("@ehildt/ckir-helpers")).toBe("ehildt-ckir-helpers");
  });

  test("should handle a combination of all rules", () => {
    // "@" -> ""
    // "/" -> "-"
    // "_" -> "__"
    // " " -> "_"
    expect(encodeLabel("a-b_c d")).toBe("a-b__c_d");
    expect(encodeLabel("@scope/my-package")).toBe("scope-my-package");
  });

  test("should return an empty string when given an empty string", () => {
    expect(encodeLabel("")).toBe("");
  });
});
