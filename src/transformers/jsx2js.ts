import { formatJsObject } from "../formatters";
import { parseJsx, nodeToString } from "../parsers";

/**
 * Transforms JSX props to a JS object.
 * @param jsx props in JSX format as a single string
 */
export function transform(jsx: string): string {
  const [jsxElement, rawLines] = parseJsx(jsx);

  const propertyStrings = jsxElement.openingElement.attributes.map(
    (attribute) => {
      if (attribute.type === "JSXSpreadAttribute") {
        const argument = nodeToString(attribute.argument, rawLines);
        return `...${argument}`;
      }

      const keyString = attribute.name.name;

      let valueString: string;
      if (attribute.value) {
        if (attribute.value.type === "JSXExpressionContainer") {
          valueString = nodeToString(attribute.value.expression, rawLines);
        } else {
          valueString = nodeToString(attribute.value, rawLines);
        }
      } else {
        // Attribute without a value is shorthand for `true`
        valueString = "true";
      }

      return `${keyString}: ${valueString}`;
    }
  );

  let objString = propertyStrings.join(",\n");
  objString = `{ ${objString} }`;

  try {
    return formatJsObject(objString);
  } catch (e) {
    return objString;
  }
}
