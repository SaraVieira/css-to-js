/**
 * Transforms a JS object to React props.
 * @param {string} code
 * @returns {string} transformed code
 */
export const transform = code => {
  // Parse the code as a JS object
  let rules;
  try {
    rules = JSON.parse(code);
  } catch (e) {
    return "";
  }

  // Convert JS object to array of strings
  const ruleStrings = Object.keys(rules).map(property => {
    let value = rules[property];
    return `${property}="${value}"`;
  });

  return ruleStrings.join("\n");
};

if (typeof window === "undefined") {
  exports.handler = function({ body }, context, callback) {
    callback(null, {
      statusCode: 200,
      body: transform(body)
    });
  };
}
