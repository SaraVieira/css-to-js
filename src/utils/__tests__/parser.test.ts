import { parseJsObject, parseCss } from "../parser";

describe("parser", () => {
  describe("parseJsObject()", () => {
    test("parses an object expression", () => {
      const [result] = parseJsObject(`{ myKey: "myValue" }`);
      expect(result.type).toBe("ObjectExpression");
    });

    test("wraps input in braces if needed", () => {
      const [, rawLines] = parseJsObject(`someKey: "someValue"`);
      expect(rawLines).toBe(`{someKey: "someValue"}`);
    });

    test("throws when passed an expression that's not an object", () => {
      const callWithBadParam = () => {
        parseJsObject("[notAnObject]");
      };
      expect(callWithBadParam).toThrow();
    });

    test("throws when passed something that's not an expression", () => {
      const callWithBadParam = () => {
        parseJsObject("let x = 1");
      };
      expect(callWithBadParam).toThrow();
    });
  });

  describe("parseCss()", () => {
    test("throws when passed invalid css", () => {
      const css = "color #fff";
      expect(() => parseCss(css)).toThrow();
    });

    test("parses css declarations when classes, ids and elements are used", () => {
      const css = `
        div {
          color: red;
        }
        #content {
          width: 300px;
        }
        .main {
          height: 100px;
        }
      `;
      expect(parseCss(css)).toHaveLength(3);
    });

    test("returns array of PostCss AST declarations", () => {
      const css = `
        font-size: 10px;
        color: #000;
        font-weight: 700;
        .icon {
          width: 30px;
        }
      `;
      const parsed = parseCss(css);
      const matchDeclarations = parsed.every((item) => item.type === "decl");

      expect(parsed instanceof Array).toBeTruthy();
      expect(matchDeclarations).toBeTruthy();
    });
  });
});
