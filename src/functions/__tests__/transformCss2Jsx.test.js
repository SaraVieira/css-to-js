import { transform } from "../transformCss2Jsx";

describe("transformCss2Jsx", () => {
  test("transforms a rule with a string value", () => {
    const input = `color: red`;
    expect(transform(input)).toBe(`color="red"`);
  });

  test("transforms a rule with a string value with single quotes", () => {
    const input = `font-family: "Inter", sans-serif`;
    expect(transform(input)).toBe(`fontFamily="'Inter', sans-serif"`);
  });

  test("transforms a rule with a number value", () => {
    const input = `width: 42px`;
    expect(transform(input)).toBe(`width={42}`);
  });

  test("transforms a rule with an arbitrary expression value", () => {
    const input = `someProp: someExpression`;
    expect(transform(input)).toBe(`someProp="someExpression"`);
  });

  test("transforms a simple rule", () => {
    expect(
      transform(`
        display: block;
        font-size: 16px;
      `)
    ).toMatchSnapshot();
  });

  test("transforms a more complex rule", () => {
    expect(
      transform(`
        display: block;
        font-size: 16px;
        background: #1e2f5d;
        color: #a4cff4;
        font-family: "Inter", sans-serif;
        font-weight: bold; 
    `)
    ).toMatchSnapshot();
  });
});
