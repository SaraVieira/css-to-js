import { parseCss } from "../css";

describe("parseCss()", () => {
  test("throws when passed invalid css", () => {
    expect(() => parseCss("color #fff")).toThrow();
  });
});
