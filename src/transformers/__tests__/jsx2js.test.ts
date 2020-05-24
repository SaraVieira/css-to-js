import { transform } from "../jsx2js";

describe("jsx2js", () => {
  test("transforms a rule with a string value", () => {
    const input = `someProp="someValue"`;
    expect(transform(input)).toContain(`someProp: "someValue"`);
  });

  test("transforms a rule with a number value", () => {
    const input = `someProp={42}`;
    expect(transform(input)).toContain(`someProp: 42`);
  });

  test("transforms a rule with an object value", () => {
    const input = `someProp={{ key: "value" }}`;
    expect(transform(input)).toContain(`someProp: { key: "value" }`);
  });

  test("transforms a rule with a complex object value", () => {
    const input = `someProp={{ x: { y: z } }}`;
    expect(transform(input)).toContain(`someProp: { x: { y: z } }`);
  });

  test("transforms a rule with an arbitrary expression value", () => {
    const input = `someProp={someExpression}`;
    expect(transform(input)).toContain(`someProp: someExpression`);
  });

  test("transforms a rule without a value to `true`", () => {
    const input = `someProp`;
    expect(transform(input)).toContain(`someProp: true`);
  });

  test("transforms props on a single line", () => {
    expect(transform(`display="block" fontSize={16}`)).toMatchInlineSnapshot(`
      "{
        display: \\"block\\",
        fontSize: 16,
      }"
    `);
  });

  test("transforms props on multiple lines", () => {
    expect(
      transform(
        `display="block"
        fontSize={16}
        margin={{ xs: 4, sm: 8 }}
        padding={[2, 3]}
        background="#1e2f5d"
        color="#a4cff4"
        fontFamily="'Inter', sans-serif" fontWeight="bold"`
      )
    ).toMatchInlineSnapshot(`
      "{
        display: \\"block\\",
        fontSize: 16,
        margin: { xs: 4, sm: 8 },
        padding: [2, 3],
        background: \\"#1e2f5d\\",
        color: \\"#a4cff4\\",
        fontFamily: \\"'Inter', sans-serif\\",
        fontWeight: \\"bold\\",
      }"
    `);
  });
});
