import { formatCss, formatObject, formatProps } from "../formatting";

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
      ).toMatchInlineSnapshot(`
        "div {
          some-prop: value;
          whatever: 42px;
        }

        .class {
        }
        #id {
          prop: val;
        }"
      `);
    });
  });

  describe("formatObject()", () => {
    test("formats an object with a single key/value pair", () => {
      let expected = `{ someProp: someValue }`;
      expect(formatObject(`{ someProp: someValue }`)).toBe(expected);
      expect(formatObject(`\t {someProp  : someValue}`)).toBe(expected);
    });

    test("formats an object with multiple key/value pairs", () => {
      let expected = `{ x: 1, y: 2 }`;
      expect(formatObject(`{ x: 1, y: 2 }`)).toBe(expected);
      expect(formatObject(`{x:1,\n \ty: 2}  `)).toBe(expected);
    });

    test("formats a complex object", () => {
      expect(
        formatObject(
          `{ someProp: someValue,
            couldBe: {
              nested  : true, \t messedUp :true,
            }, anotherProp: 'string' || "string",
            ...{ spreadProp:  anyExpr ? what.ever:1337}
          }`
        )
      ).toMatchInlineSnapshot(`
        "{
          someProp: someValue,
          couldBe: {
            nested: true,
            messedUp: true
          },
          anotherProp: \\"string\\" || \\"string\\",
          ...{ spreadProp: anyExpr ? what.ever : 1337 }
        }"
      `);
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
      ).toMatchInlineSnapshot(`
        "someProp={someExpr}
        sneaky=\\"beaky\\"
        anotherProp=\\"whatever dude\\"
        anotherOne={{ x: 2 }}"
      `);
    });
  });
});
