import prettier from "prettier/standalone";
import prettierBabel from "prettier/parser-babel";

/**
 * Takes a JS object written as a string and formats it.
 * @param objString string that defines a JS object
 */
export function formatJsObject(objString: string) {
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
