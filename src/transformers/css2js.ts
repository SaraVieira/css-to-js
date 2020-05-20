import * as CSS from "csstype";
import { parseCss } from "../utils/parseCss";
import { formatObject } from "../utils/formatter";

export function transform(css: string): string {
  const declarations = parseCss(css);

  const cssInJs = declarations.reduce<CSS.Properties>(
    (acc, { prop: p, value: v }) => {
      // convert props
      // -webkit-flex becomes "-webkit-flex"
      // margin-bottom becomes marginBottom
      let prop: string = p.startsWith("-")
        ? `"${p}"`
        : p.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

      let value: string | number = v
        .replace(/"/g, "'")
        .replace(/(\d)px/g, "$1");

      const numVal = Number(value);

      return {
        ...acc,
        ...{
          [prop]: isNaN(numVal) ? `"${value}"` : numVal,
        },
      };
    },
    {}
  );

  const objString: string = `{
    ${Object.keys(cssInJs)
      .map((key) => `${key}: ${cssInJs[key]}, `)
      .join("\n")}
  }`;

  return formatObject(objString);
}
