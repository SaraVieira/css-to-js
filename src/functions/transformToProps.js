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

    if (value.startsWith(`"`) || value.startsWith(`'`)) {
      // Replace outer single quotes with double quotes
      value = value.replace(/(^')|('$)/g, `"`);

      // Replace inner double quotes with single quotes
      const newValue = []; // array of characters
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i < value.length - 1 && value[i] === `"`) {
          newValue.push(`'`);
        } else {
          newValue.push(value[i]);
        }
      }
      value = newValue.join("");
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
