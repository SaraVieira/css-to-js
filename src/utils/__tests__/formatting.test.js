import { formatCss, formatProps } from "../formatting";

describe("formatting", () => {
  describe("formatCss()", () => {
    test("formats a single rule", () => {
      let expected = "some-property: value;";
      expect(formatCss("some-property: value;")).toBe(expected);
      expect(formatCss("\t  some-property : \t value ")).toBe(expected);
    });

    test("formats more complex CSS", () => {
      expect(
        formatCss(
          `div{
            some-prop :   value;
            whatever: 42px;
          }
          

          .class{}; #id { prop:\tval}

          ;;
          `
        )
      ).toMatchSnapshot();
    });
  });

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
      ).toMatchSnapshot();
    });
  });
});
