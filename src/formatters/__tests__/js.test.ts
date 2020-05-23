import { formatObject } from "../js";

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
          messedUp: true,
        },
        anotherProp: \\"string\\" || \\"string\\",
        ...{ spreadProp: anyExpr ? what.ever : 1337 },
      }"
    `);
  });
});
