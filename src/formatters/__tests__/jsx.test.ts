import { formatJsxProps } from "../jsx";

describe("formatJsxProps()", () => {
  test("formats a single prop with string value", () => {
    let expected = `someProp="some string"`;
    expect(formatJsxProps(`someProp="some string"`)).toBe(expected);
    expect(formatJsxProps(`\t  someProp= "some string" `)).toBe(expected);
  });

  test("formats a single prop with expression value", () => {
    let expected = "someProp={someExpr}";
    expect(formatJsxProps("someProp={someExpr}")).toBe(expected);
    expect(formatJsxProps("\t  someProp= {  someExpr } ")).toBe(expected);
  });

  test("formats multiple props", () => {
    expect(
      formatJsxProps(
        `  someProp={someExpr} sneaky="beaky"
        anotherProp\t\t=  "whatever dude" 
        anotherOne= {{x: 2}}  `
      )
    ).toMatchInlineSnapshot(`
      "someProp={someExpr}
      sneaky=\\"beaky\\"
      anotherProp=\\"whatever dude\\"
      anotherOne={{ x: 2 }}"
    `);
  });
});
