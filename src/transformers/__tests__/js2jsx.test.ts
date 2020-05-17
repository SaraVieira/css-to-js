import { transform } from "../js2jsx";

describe("js2jsx", () => {
  test("transforms a rule with a string value", () => {
    const input = `someProp: "someValue"`;
    expect(transform(input)).toBe(`someProp="someValue"`);
  });

  test("transforms a rule with a string value with single quotes", () => {
    const input = `someProp: 'someValue'`;
    expect(transform(input)).toBe(`someProp="someValue"`);
  });

  test("transforms a rule with a number value", () => {
    const input = `someProp: 42`;
    expect(transform(input)).toBe(`someProp={42}`);
  });

  test("transforms a rule with an arbitrary expression value", () => {
    const input = `someProp: someExpression`;
    expect(transform(input)).toBe(`someProp={someExpression}`);
  });

  test("transforms a rule with value `true` to a prop with no value", () => {
    const input = `someProp: true`;
    expect(transform(input)).toBe(`someProp`);
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
    expect(transform(input)).toBe(`someProp='some"Value'`);
  });

  test("transforms a rule with an escaped char in its value", () => {
    const input = `someProp: "some\\tValue"`;
    expect(transform(input)).toBe(`someProp={"some\\tValue"}`);
  });

  test.skip("transforms an invalid string value to `{undefined}`", () => {
    const input = `someProp: "imInvalid`;
    expect(transform(input)).toBe(`someProp={undefined}`);
  });
});
