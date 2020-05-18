import prettier from "prettier/standalone";
import prettierCss from "prettier/parser-postcss";
import prettierBabel from "prettier/parser-babel";

/**
 * Takes some CSS code and formats it.
 * @param {string} cssString string of CSS code
 */
export function formatCss(cssString) {
  const prettierOutput = prettier.format(cssString, {
    parser: "css",
    plugins: [prettierCss],
  });

  return prettierOutput.trim();
}

/**
 * Takes a JS object written as a string and formats it.
 * @param {string} objString string that defines a JS object
 */
export function formatObject(objString) {
  // Write object in a piece of JS code so Prettier knows how to format it
  let codeString = `let temp = ${objString};`;

  codeString = prettier.format(codeString, {
    parser: "babel",
    plugins: [prettierBabel],
  });

  let groups = codeString.match(/let temp = (\{.*\});/s);
  if (!groups || groups.length < 2) {
    throw new Error("Something went wrong when parsing Prettier output");
  }

  return groups[1].trim();
}

/**
 * Takes some props written in JSX and formats them so they can easily be
 * applied to a React component.
 * @param {string} propString JSX props as a single string
 */
export function formatProps(propString) {
  // Write the props in a component so Prettier knows how to format it
  let componentString = `<Temp ${propString} />`;

  componentString = prettier.format(componentString, {
    parser: "babel",
    plugins: [prettierBabel],
  });

  // Return the Prettier output but without the component tag
  let groups = componentString.match(/<Temp(.*)\/>/s);
  if (!groups || groups.length < 2) {
    throw new Error("Something went wrong when parsing Prettier output");
  }

  return groups[1]
    .trim()
    .split("\n")
    .map((line) => line.replace(/^ {2}/, "")) // unindent each line once
    .join("\n");
}
