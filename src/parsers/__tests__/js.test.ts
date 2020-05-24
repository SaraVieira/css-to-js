import { parseJsObject, parseJsx } from "../js";

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

describe("parseJsx()", () => {
  test("parses a JSX expression without component tags", () => {
    const [expression] = parseJsx(`someProp={someValue}`);
    expect(expression.openingElement.attributes).toHaveLength(1);
  });

  test("parses a JSX expression with regular component tags", () => {
    const [expression] = parseJsx(`
      <SomeComponent someProp={someValue}>
        <div>Hello world</div>
      </SomeComponent>
    `);
    expect(expression.openingElement.attributes).toHaveLength(1);
  });

  test("parses a JSX expression with self-closing component tags", () => {
    const [expression] = parseJsx(`<SomeComponent someProp={someValue} />`);
    expect(expression.openingElement.attributes).toHaveLength(1);
  });

  test("parses a JSX expression without props", () => {
    const [expression] = parseJsx(`<SomeComponent />`);
    expect(expression.openingElement.attributes).toHaveLength(0);
  });

  test("throws when given an expression that is not JSX", () => {
    expect(() => parseJsx("1 + 2")).toThrow();
  });
});
