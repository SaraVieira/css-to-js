import { parseJsObject } from "../js";

describe("parseJsObject()", () => {
  test("parses an object expression", () => {
    const [result] = parseJsObject(`{ myKey: "myValue" }`);
    expect(result.type).toBe("ObjectExpression");
  });

  test("wraps input in braces if needed", () => {
    const [, rawLines] = parseJsObject(`someKey: "someValue"`);
    expect(rawLines).toBe(`{someKey: "someValue"}`);
  });

  test("throws when passed an expression that's not an object", () => {
    expect(() => parseJsObject("[notAnObject]")).toThrow();
  });

  test("throws when passed something that's not an expression", () => {
    expect(() => parseJsObject("let x = 1")).toThrow();
  });
});
