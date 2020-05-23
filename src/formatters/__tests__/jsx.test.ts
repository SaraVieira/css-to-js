import { formatProps } from "../jsx";

describe("formatProps()", () => {
  test("formats a single prop with string value", () => {
    let expected = `someProp="some string"`;
    expect(formatProps(`someProp="some string"`)).toBe(expected);
    expect(formatProps(`\t  someProp= "some string" `)).toBe(expected);
  });

  test("formats a single prop with expression value", () => {
    let expected = "someProp={someExpr}";
    expect(formatProps("someProp={someExpr}")).toBe(expected);
    expect(formatProps("\t  someProp= {  someExpr } ")).toBe(expected);
  });

  test("formats multiple props", () => {
    expect(
      formatProps(
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
