export function transform(jsx) {
  // Parse JSX into a JS object
  const rules = {};
  const matchIterator = jsx.matchAll(/(\w+)=?(".*?"|{.*?}+)?/g);
  for (const match of matchIterator) {
    let property = match[1];
    let value = match[2];

    if (typeof property !== "string" || property === "") {
      // Skip this one
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

  // Format JS object
  return [
    "{",
    ...Object.keys(rules).map(property => `  ${property}: ${rules[property]},`),
    "}"
  ].join("\n");
}
