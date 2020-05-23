import { formatProps } from "../formatters";
import { parseJsObject, nodeToString } from "../utils";

/**
 * Transforms a JS object to React props in JSX format.
 * @param input JS object code
 */
export function transform(input: string) {
  const [objectExpression, rawLines] = parseJsObject(input);

  const propStrings = objectExpression.properties.map((property) => {
    if (property.type === "SpreadElement") {
      const spreadString = nodeToString(property, rawLines);
      return `{${spreadString}}`;
    }

    if (property.type === "ObjectMethod") {
      const keyString = property.key.name;
      const paramsString = property.params
        .map((param) => nodeToString(param, rawLines))
        .join(", ");
      const bodyString = nodeToString(property.body, rawLines);
      return `${keyString}={(${paramsString}) => ${bodyString}}`;
    }

    if (property.computed) {
      const keyString = nodeToString(property.key, rawLines);
      const valueString = nodeToString(property.value, rawLines);

      // Add the property to an object and spread it
      // This is needed because JSX doesn't allow props with computed names
      return `{...{ [${keyString}]: ${valueString} }}`;
    }

    const keyString = property.key.name;

    // If the property value is `true`, return a shorthand prop with no value
    if (
      property.value.type === "BooleanLiteral" &&
      property.value.value === true
    ) {
      return keyString;
    }

    let valueString = nodeToString(property.value, rawLines);

    // Wrap the value in curly braces if it's not a string,
    // or if the string contains escaped characters (needed for JSX)
    if (property.value.type !== "StringLiteral" || valueString.includes("\\")) {
      valueString = `{${valueString}}`;
    }

    return `${keyString}=${valueString}`;
  });

  try {
    return formatProps(propStrings.join(" "));
  } catch {
    // Formatting failed, just concatenate the props
    return propStrings.join(" ");
  }
}
