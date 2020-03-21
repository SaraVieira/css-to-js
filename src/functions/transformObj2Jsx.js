import prettier from "prettier/standalone";
import prettierBabylon from "prettier/parser-babylon";

/**
 * Takes some props written in JSX and formats them so they can easily be
 * applied to a React component.
 * @param {string} propString JSX props as a single string
 */
function formatProps(propString) {
  // Write the props in a component so Prettier knows how to format it
  let componentString = `<Temp ${propString} />`;

  componentString = prettier.format(componentString, {
    parser: "babel",
    plugins: [prettierBabylon]
  });

  // Return the Prettier output but without the component tag
  let groups = componentString.match(/<Temp(.*)\/>/s);
  if (groups.length < 2) {
    throw new Error("Something went wrong when parsing Prettier output");
  }
  return groups[1]
    .trim()
    .split("\n")
    .map(line => line.trim()) // remove indentation on each line
    .join("\n");
}

/**
 * Transforms a JS object to React props in JSX format.
 * @param {string} code
 * @returns {string} transformed code
 */
export const transform = code => {
  // Loosly parse the code as a JS object
  const rules = {};
  code.split("\n").forEach(line => {
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

  try {
    return formatProps(propStrings.join(" "));
  } catch (e) {
    return "Could not generate valid props";
  }
};

if (typeof window === "undefined") {
  exports.handler = function({ body }, context, callback) {
    callback(null, {
      statusCode: 200,
      body: transform(body)
    });
  };
}
