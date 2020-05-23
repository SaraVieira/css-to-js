import { formatJsObject } from "../js";

describe("formatJsObject()", () => {
  test("formats an object with a single key/value pair", () => {
    let expected = `{ someProp: someValue }`;
    expect(formatJsObject(`{ someProp: someValue }`)).toBe(expected);
    expect(formatJsObject(`\t {someProp  : someValue}`)).toBe(expected);
  });

  test("formats an object with multiple key/value pairs", () => {
    let expected = `{ x: 1, y: 2 }`;
    expect(formatJsObject(`{ x: 1, y: 2 }`)).toBe(expected);
    expect(formatJsObject(`{x:1,\n \ty: 2}  `)).toBe(expected);
  });

  test("formats a complex object", () => {
    expect(
      formatJsObject(
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
          messedUp: true,
        },
        anotherProp: \\"string\\" || \\"string\\",
        ...{ spreadProp: anyExpr ? what.ever : 1337 },
      }"
    `);
  });
});
