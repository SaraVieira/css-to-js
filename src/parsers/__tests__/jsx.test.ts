import { parseProps } from "../jsx";

describe("parseProps()", () => {
  test("parses a JSX expression without component tags", () => {
    const [expression] = parseProps(`someProp={someValue}`);
    expect(expression.openingElement.attributes).toHaveLength(1);
  });

  test("parses a JSX expression with regular component tags", () => {
    const [expression] = parseProps(`
      <SomeComponent someProp={someValue}>
        <div>Hello world</div>
      </SomeComponent>
    `);
    expect(expression.openingElement.attributes).toHaveLength(1);
  });

  test("parses a JSX expression with self-closing component tags", () => {
    const [expression] = parseProps(`<SomeComponent someProp={someValue} />`);
    expect(expression.openingElement.attributes).toHaveLength(1);
  });

  test("parses a JSX expression without props", () => {
    const [expression] = parseProps(`<SomeComponent />`);
    expect(expression.openingElement.attributes).toHaveLength(0);
  });

  test("throws when given an expression that is not JSX", () => {
    expect(() => parseProps("1 + 2")).toThrow();
  });
});
