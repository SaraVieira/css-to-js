import * as CSS from "csstype";
import { parseCss } from "../utils/parser";
import { formatObject } from "../utils/formatter";

// convert props
// -webkit-flex becomes "-webkit-flex"
// margin-bottom becomes marginBottom
function convertCssPropToJs(prop: string): string {
  return prop.startsWith("-")
    ? `"${prop}"`
    : prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function convertCssValueToJs(value: string): string {
  return value.replace(/"/g, "'").replace(/(\d)px/g, "$1");
}

export function transform(css: string): string {
  const declarations = parseCss(css);

  const cssInJs = declarations.reduce<CSS.Properties>((acc, curr) => {
    let prop: string = convertCssPropToJs(curr.prop);
    let value: string | number = convertCssValueToJs(curr.value);
    const numVal = Number(value);

    return {
      ...acc,
      ...{
        [prop]: isNaN(numVal) ? `"${value}"` : numVal,
      },
    };
  }, {});

  const objString: string = `{
    ${Object.keys(cssInJs)
      .map((key) => `${key}: ${cssInJs[key]}, `)
      .join("\n")}
  }`;

  try {
    return formatObject(objString);
  } catch (e) {
    return objString;
  }
}
