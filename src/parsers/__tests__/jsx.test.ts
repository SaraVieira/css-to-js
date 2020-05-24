import { parseProps } from "../jsx";

describe("parseProps()", () => {
  test("TODO", () => {
    const result = parseProps(`<MyComponent someProp={someValue} />`);
    console.log(result.openingElement.attributes);
  });
});
