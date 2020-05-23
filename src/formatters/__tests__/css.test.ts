import { formatCss } from "../css";

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
