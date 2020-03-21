/**
 * Transforms a JS object to React props.
 * @param {string} code
 * @returns {string} transformed code
 */
export const transform = code => {
  // Loosly parse the code as a JS object
  const rules = {};
  code.split("\n").forEach(line => {
    line = line.replace(/,$/, ""); // remove trailing comma

    // Split each line into a key and a value
    const segments = line.split(":");
    if (segments.length < 2) return;
    const key = segments[0].trim();
    const value = segments
      .slice(1)
      .join(":")
      .trim();
    rules[key] = value;
  });

  // Convert JS object to array of strings
  const propStrings = Object.keys(rules).map(key => {
    let value = rules[key];

    if (value.startsWith(`"`) || value.startsWith(`'`)) {
      // Replace outer single quotes with double quotes
      // and inner double quotes with single quotes
      let first = value.charAt(0);
      let middle = value.slice(1, -1); // all except first and last
      let last = value.charAt(value.length - 1);

      if (first === `'`) {
        first = `"`;
      }
      middle = middle.replace(/"/g, `'`);
      if (last === `'`) {
        last = `"`;
      }

      value = `${first}${middle}${last}`;
    } else {
      // If value is not a plain string, wrap it in curly braces
      value = `{${value}}`;
    }

    return `${key}=${value}`;
  });

  return propStrings.join("\n");
};

if (typeof window === "undefined") {
  exports.handler = function({ body }, context, callback) {
    callback(null, {
      statusCode: 200,
      body: transform(body)
    });
  };
}
