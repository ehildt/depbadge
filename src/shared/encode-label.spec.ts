import { encodeLabel } from "./encode-label";

describe("encodeLabel", () => {
  test("should double existing dashes", () => {
    expect(encodeLabel("my-label")).toBe("my--label");
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

  test("should handle a combination of all rules", () => {
    // "-" -> "--"
    // "_" -> "__"
    // " " -> "_"
    expect(encodeLabel("a-b_c d")).toBe("a--b__c_d");
  });

  test("should return an empty string when given an empty string", () => {
    expect(encodeLabel("")).toBe("");
  });
});
