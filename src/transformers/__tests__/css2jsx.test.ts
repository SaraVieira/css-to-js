import { transform } from "../css2jsx";

describe("css2jsx", () => {
  test("transforms a property", () => {
    const input = `color: red`;
    expect(transform(input)).toMatchInlineSnapshot(`"color=\\"red\\""`);
  });
});
