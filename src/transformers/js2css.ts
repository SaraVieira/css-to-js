import { formatCss } from "../formatters";
import { parseJsObject, nodeToString } from "../parsers";

/**
 * Transforms a JS object containing CSS rules to CSS.
 * @param objString JS object code
 */
export function transform(objString: string) {
  const [objectExpression, rawLines] = parseJsObject(objString);

  const cssStrings = objectExpression.properties.map((property) => {
    if (property.type === "ObjectMethod" || property.type === "SpreadElement") {
      // Nothing we can really do here since CSS doesn't have these things
      return nodeToString(property, rawLines);
    }

    let key: string;
    if (property.computed) {
      // Preserve brackets around computed properties
      key = nodeToString(property.key, rawLines);
      key = `[${key}]`;
    } else {
      if (property.key.name) {
        key = property.key.name;
      } else {
        // This probably never happens, but TS types suggest it is possible
        key = nodeToString(property.key, rawLines);
      }
    }
    // Convert camelCase to kebab-case
    key = key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);

    let value: string;
    if (property.value.type === "StringLiteral") {
      value = property.value.value;
    } else if (property.value.type === "NumericLiteral") {
      value = `${property.value.value}px`;
    } else {
      value = nodeToString(property.value, rawLines);
    }

    return `${key}: ${value};`;
  });

  try {
    return formatCss(cssStrings.join("\n"));
  } catch (e) {
    return cssStrings.join("\n");
  }
}
