import { transform } from "../css2js";

describe("css2js", () => {
  test("transforms a rule with a string value", () => {
    const input = `color: red`;
    expect(transform(input)).toMatchInlineSnapshot(`
      "{
        color: \\"red\\",
      }"
    `);
  });

  test("transforms a rule with a string value with single quotes", () => {
    const input = `font-family: "Inter", sans-serif`;
    expect(transform(input)).toMatchInlineSnapshot(`
      "{
        fontFamily: \\"'Inter', sans-serif\\",
      }"
    `);
  });

  test("transforms a rule with a number value", () => {
    const input = `width: 42px`;
    expect(transform(input)).toMatchInlineSnapshot(`
      "{
        width: 42,
      }"
    `);
  });

  test("transforms a rule with an arbitrary expression value", () => {
    const input = `someProp: someExpression`;
    expect(transform(input)).toMatchInlineSnapshot(`
      "{
        someProp: \\"someExpression\\",
      }"
    `);
  });

  test("transforms a simple rule", () => {
    expect(
      transform(`
        display: block;
        font-size: 16px;
      `)
    ).toMatchInlineSnapshot(`
      "{
        display: \\"block\\",
        fontSize: 16,
      }"
    `);
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
    ).toMatchInlineSnapshot(`
      "{
        display: \\"block\\",
        fontSize: 16,
        background: \\"#1e2f5d\\",
        color: \\"#a4cff4\\",
        fontFamily: \\"'Inter', sans-serif\\",
        fontWeight: \\"bold\\",
      }"
    `);
  });

  test("transforms multiple rules with classes, ids and elements", () => {
    expect(
      transform(`
        background-color: #fff;
        div {
          color: red;
        }
        #content {
          width: 300px;
        }
        .main {
          height: 100px;
        }
    `)
    ).toMatchInlineSnapshot(`
      "{
        backgroundColor: \\"#fff\\",
        color: \\"red\\",
        width: 300,
        height: 100,
      }"
    `);
  });

  test("transforms rules with duplicate properties and maintains position", () => {
    expect(
      transform(`
        display: block;
        color: red;
        font-size: 16px;
        background: #fff;
        color: green;
        display: flex;
    `)
    ).toMatchInlineSnapshot(`
      "{
        fontSize: 16,
        background: \\"#fff\\",
        color: \\"green\\",
        display: \\"flex\\",
      }"
    `);
  });
});
