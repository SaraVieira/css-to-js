import { formatCss } from "../utils";

// FIXME: produces invalid CSS when first property is on same line as opening {

/**
 * Transforms a JS object containing CSS rules to CSS.
 * @param {string} objString JS object code
 * @returns {string} CSS code
 */
export function transform(objString) {
  // Loosely parse the code as a JS object
  const rules = {};
  objString.split("\n").forEach(line => {
    line = line.replace(/,$/, ""); // remove trailing comma

    // Split each line into a key and a value
    // Everything before the first : is the key and the reset is the value
    const segments = line.split(":");
    if (segments.length < 2) return; // skip this line
    const key = segments[0].trim();
    const value = segments
      .slice(1)
      .join(":")
      .trim();
    rules[key] = value;
  });

  const cssStrings = Object.keys(rules).map(property => {
    let value = rules[property];

    // Convert property from camelCase to kebab-case
    property = property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);

    let first = value.charAt(0);
    let middle = value.slice(1, -1);
    let last = value.charAt(value.length - 1);

    // If value is wrapped in quotes, leave them out
    if ((first === `"` || first === `'`) && first === last) {
      value = middle;
    }

    // If value is a (decimal) number, interpret it as pixels
    if (value.match(/^\d+\.?\d*$/)) {
      value = `${value}px`;
    }

    return `${property}: ${value};`;
  });

  const css = cssStrings.join("\n");
  try {
    return formatCss(css);
  } catch (e) {
    return css;
  }
}
