/**
 * Transforms a JS object to React props.
 * @param {string} code
 * @returns {string} transformed code
 */
export const transform = code => {
  // Parse the code as a JS object
  let rules;
  try {
    // eslint-disable-next-line no-new-func
    rules = new Function(`return ${code}`)();
  } catch (e) {
    return "Could not parse input";
  }

  // Convert JS object to array of strings
  const propStrings = Object.keys(rules).map(key => {
    let value = rules[key];

    if (typeof value === "string") {
      return `${key}="${value}"`;
    } else {
      value = `{${JSON.stringify(value)}}`;
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
