import { formatObject } from "../formatters";

/**
 * Transforms React props to a JS object.
 * @param {string} jsx props in JSX format as a single string
 * @returns {string} formatted JS object as a string
 */
export function transform(jsx) {
  // Parse JSX into a JS object
  const rules = {};
  const matchIterator = jsx.matchAll(/(\w+)=?(".*?"|{.*?}[\s}]*)?/g);
  for (const match of matchIterator) {
    let property = match[1];
    let value = match[2];

    if (property) {
      property = property.trim();
    }
    if (value) {
      value = value.trim();
    }

    if (property === "") {
      // Skip this rule
      continue;
    }

    // A property without a value is interpreted as the boolean `true`
    // (how it works in JSX)
    if (value === undefined) {
      value = "true";
    }

    // If value is an expression, remove the curly braces
    if (value.startsWith("{")) {
      value = value.slice(1, -1);
    }

    // Show undefined instead of nothing
    if (value === "") {
      value = "undefined";
    }

    rules[property] = value;
  }

  const objString = `{
    ${Object.keys(rules)
      .map((property) => `${property}: ${rules[property]},`)
      .join("\n")}
  }`;

  try {
    return formatObject(objString);
  } catch (e) {
    return objString;
  }
}
