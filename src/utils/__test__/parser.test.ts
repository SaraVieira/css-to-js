import { parseJsObject } from "../parser";

describe("parser", () => {
  test("parses an object expression", () => {
    const result = parseJsObject(`{ myKey: "myValue" }`);
    expect(result.type).toBe("ObjectExpression");
  });

  test("throws when passed an expression that's not an object", () => {
    const callWithBadParam = () => {
      parseJsObject("[notAnObject]");
    };
    expect(callWithBadParam).toThrow();
  });

  test("throws when passed something that's not an expression", () => {
    const callWithBadParam = () => {
      parseJsObject("let x = 1");
    };
    expect(callWithBadParam).toThrow();
  });
});