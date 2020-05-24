import { transform } from "../jsx2css";

describe("jsx2css", () => {
  test("transforms a property", () => {
    const input = `someProp="someValue"`;
    expect(transform(input)).toMatchInlineSnapshot(`"some-prop: someValue;"`);
  });
});
