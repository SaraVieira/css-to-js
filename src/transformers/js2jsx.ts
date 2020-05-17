import { ObjectExpression } from "@babel/types";
import { parseJsObject, formatProps, nodeToString } from "../utils";

/**
 * Transforms a JS object to React props in JSX format.
 * @param input JS object code
 */
export function transform(input: string) {
  let objectExpression: ObjectExpression;
  let realInput: string;
  try {
    const parseResult = parseJsObject(input);
    objectExpression = parseResult[0];
    realInput = parseResult[1];
  } catch (e) {
    return e.message; // TODO: throw or return?
  }

  const propStrings = objectExpression.properties.map(property => {
    if (property.type === "SpreadElement") {
      const spreadString = nodeToString(property, realInput);
      return `{${spreadString}}`;
    }

    if (property.type === "ObjectMethod") {
      const keyString = property.key.name;
      const paramsString = property.params
        .map(param => nodeToString(param, realInput))
        .join(", ");
      const bodyString = nodeToString(property.body, realInput);
      return `${keyString}={(${paramsString}) => ${bodyString}}`;
    }

    if (property.type !== "ObjectProperty") {
      throw new Error("Unknown property type");
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

    let valueString: string;
    try {
      valueString = nodeToString(property.value, realInput);
    } catch {
      throw new Error(
        `Can't parse property value: ${JSON.stringify(property.value)}`
      );
    }

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
