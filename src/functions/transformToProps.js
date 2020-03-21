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
    const both = line.split(":");
    if (both.length < 2) return;
    const key = both[0].trim();
    const value = both[1].trim();
    rules[key] = value;
  });

  // Convert JS object to array of strings
  const propStrings = Object.keys(rules).map(key => {
    let value = rules[key];

    // If the value is not a string, wrap it in curly braces
    if (!value.startsWith(`"`)) {
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
