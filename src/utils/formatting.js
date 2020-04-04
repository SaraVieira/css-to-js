import prettier from "prettier/standalone";
import prettierBabel from "prettier/parser-babylon";
import prettierCss from "prettier/parser-postcss";

export function formatCss(cssString) {
  const prettierOutput = prettier.format(cssString, {
    parser: "css",
    plugins: [prettierCss]
  });

  return prettierOutput.trim();
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
    plugins: [prettierBabel]
  });

  // Return the Prettier output but without the component tag
  let groups = componentString.match(/<Temp(.*)\/>/s);
  if (!groups || groups.length < 2) {
    throw new Error("Something went wrong when parsing Prettier output");
  }

  return groups[1]
    .trim()
    .split("\n")
    .map(line => line.trim()) // remove indentation on each line
    .join("\n");
}
