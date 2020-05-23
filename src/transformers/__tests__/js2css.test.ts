import { transform } from "../js2css";

describe("js2css", () => {
  test("transforms a property with a string value", () => {
    const input = `someProp: "someValue"`;
    expect(transform(input)).toBe(`some-prop: someValue;`);
  });

  test("transforms a property with a string value with single quotes", () => {
    const input = `someProp: 'someValue'`;
    expect(transform(input)).toBe(`some-prop: someValue;`);
  });

  test("transforms a property with a number value to pixels", () => {
    const input = `someProp: 13.37`;
    expect(transform(input)).toBe(`some-prop: 13.37px;`);
  });

  test("transforms a property with an arbitrary expression value", () => {
    const input = `someProp: someExpression`;
    expect(transform(input)).toBe(`some-prop: someExpression;`);
  });

  test("transforms a property with a double quote char in its value", () => {
    const input = `someProp: 'some"Value'`;
    expect(transform(input)).toBe(`some-prop: some"Value;`);
  });

  test("preserves brackets around computed properties", () => {
    const input = `[computedProp]: "someValue"`;
    expect(transform(input)).toBe(`[computed-prop]: someValue;`);
  });

  test("transforms an object method property", () => {
    const input = `someMethod() { return 42 }`;
    expect(transform(input)).toMatchInlineSnapshot(
      `"someMethod() { return 42 }"`
    );
  });

  test("transforms a spread element", () => {
    const input = `...spreadMe`;
    expect(transform(input)).toMatchInlineSnapshot(`"...spreadMe"`);
  });

  test("transforms a simple object", () => {
    expect(
      transform(`{
        display: "block",
        fontSize: 16
      }`)
    ).toMatchInlineSnapshot(`
      "display: block;
      font-size: 16px;"
    `);
  });

  test("transforms a more complex object", () => {
    expect(
      transform(`{
        display: "block",
        margin: { sm: 4, md: 8 },
        padding: [2, 3],
        background: "#1e2f5d",
        fontSize: 16,
        fontFamily: "'Inter', sans-serif",
      }`)
    ).toMatchInlineSnapshot(`
      "display: block;
      margin: { sm: 4, md: 8 };
      padding: [2, 3];
      background: #1e2f5d;
      font-size: 16px;
      font-family: 'Inter', sans-serif;"
    `);
  });
});
