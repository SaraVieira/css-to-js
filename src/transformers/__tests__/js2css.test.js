import { transform } from "../js2css";

describe("js2css", () => {
  test("transforms a rule with a string value", () => {
    const input = `someProp: "someValue"`;
    expect(transform(input)).toBe(`some-prop: someValue;`);
  });

  test("transforms a rule with a string value with single quotes", () => {
    const input = `someProp: 'someValue'`;
    expect(transform(input)).toBe(`some-prop: someValue;`);
  });

  test("transforms a rule with a number value to pixels", () => {
    let input = `someProp: 42`;
    expect(transform(input)).toBe(`some-prop: 42px;`);
    input = `someProp: 13.37`;
    expect(transform(input)).toBe(`some-prop: 13.37px;`);
  });

  test("transforms a rule with an arbitrary expression value", () => {
    const input = `someProp: someExpression`;
    expect(transform(input)).toBe(`some-prop: someExpression;`);
  });

  test("transforms a simple object", () => {
    expect(
      transform(`{
        display: "block",
        fontSize: 16
      }`)
    ).toMatchSnapshot();
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
    ).toMatchSnapshot();
  });

  test("transforms a rule with a double quote char in its value", () => {
    const input = `someProp: 'some"Value'`;
    expect(transform(input)).toBe(`some-prop: some"Value;`);
  });
});
