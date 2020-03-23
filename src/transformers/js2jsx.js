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
 * @param {string} objString JS object code
 * @returns {string} transformed code
 */
export function transform(objString) {
  // Loosly parse the code as a JS object
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

  // Convert JS object to array of strings
  const propStrings = Object.keys(rules).map(key => {
    let value = rules[key];

    // The value `true` is special, because it can be transformed to a prop
    // with no value in JSX
    if (value === "true") {
      return key;
    }

    if (value.startsWith(`"`) || value.startsWith(`'`)) {
      // Value is probably a plain string, but need to do some more checks
      let first = value.charAt(0);
      let middle = value.slice(1, -1); // all except first and last char
      let last = value.charAt(value.length - 1);

      if (last !== first) {
        // It's a string but not correctly wrapped in quotes
        return `${key}={undefined}`;
      }

      if (middle.includes("\\") || middle.includes(`"`)) {
        // If the string value contains escaped characters, we need to wrap it in
        // curly brackets (escaping does not work in JSX prop values)
        value = `{${value}}`;
      } else {
        // Replace wrapping single quotes with double quotes
        if (first === `'`) {
          first = `"`;
        }
        if (last === `'`) {
          last = `"`;
        }
        value = `${first}${middle}${last}`;
      }
    } else {
      // Value is not a plain string, wrap it in curly braces
      value = `{${value}}`;
    }

    return `${key}=${value}`;
  });

  try {
    return formatProps(propStrings.join(" "));
  } catch (e) {
    return "Could not generate valid props";
  }
}
