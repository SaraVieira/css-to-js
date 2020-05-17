import { ObjectExpression, SpreadElement } from "@babel/types";
import { parseJsObject, formatProps } from "../utils";

/**
 * Transforms a JS object to React props in JSX format.
 * @param objString JS object code
 */
export function transform(objString: string) {
  let objectExpression: ObjectExpression;
  try {
    objectExpression = parseJsObject(objString);
  } catch (e) {
    return e.message; // TODO: throw or return?
  }

  const propStrings = objectExpression.properties.map(property => {
    if (property.type === "SpreadElement") {
      const { start, end } = property; // 1-indexed, inclusive range
      if (start === null || end === null) {
        // I'm not sure when this would happen, but it probably means
        // we can't parse this value
        throw new Error(
          `Can't parse spread element: ${JSON.stringify(property)}`
        );
      }
      const spreadString = objString.slice(start - 1, end).trim();
      return `{${spreadString}}`;
    }

    if (property.type !== "ObjectProperty") {
      throw new Error("Unimplemented property type");
    }

    // TODO: this will break if key is not an identifier! e.g. computed property name `[myKey]`
    const keyString = property.key.name;

    // If the property value is `true`, return a prop with no value
    if (
      property.value.type === "BooleanLiteral" &&
      property.value.value === true
    ) {
      return keyString;
    }

    // Get the code location of the value
    const { start, end } = property.value; // 1-indexed, inclusive range
    if (start === null || end === null) {
      // I'm not sure when this would happen, but it probably means
      // we can't parse this value
      throw new Error(
        `Can't parse property value: ${JSON.stringify(property.value)}`
      );
    }

    // Copy the value directly from the input code
    let valueString = objString.slice(start - 1, end).trim();

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
