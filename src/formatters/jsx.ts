import prettier from "prettier/standalone";
import prettierBabel from "prettier/parser-babel";

/**
 * Takes some props written in JSX and formats them so they can easily be
 * applied to a React component.
 * @param propString JSX props as a single string
 */
export function formatJsxProps(propString: string) {
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
