import { formatJsObject } from "../formatters";
import { parseCss } from "../parsers";

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

export function transform(css: string): any {
  const declarations = parseCss(css);

  const propMap = new Map<string, string | number>();

  declarations.forEach((decl) => {
    let prop: string = convertCssPropToJs(decl.prop);
    let value: string | number = convertCssValueToJs(decl.value);
    const numVal = Number(value);

    // Remove duplicate and maintain
    // position of item
    if (propMap.has(prop)) {
      propMap.delete(prop);
    }
    propMap.set(prop, isNaN(numVal) ? `"${value}"` : numVal);
  });

  const objString: string = `{
    ${[...propMap.keys()]
      .map((key) => `${key}: ${propMap.get(key)}, `)
      .join("\n")}
  }`;

  try {
    return formatJsObject(objString);
  } catch (e) {
    return objString;
  }
}
