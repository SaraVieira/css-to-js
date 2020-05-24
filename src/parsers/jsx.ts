import * as babelParser from "@babel/parser";
import { JSXElement } from "@babel/types";

export function parseJsx(input: string): [JSXElement, string] {
  let rawLines: string;
  if (input.trim().match(/^<.*>$/s)) {
    rawLines = input;
  } else {
    rawLines = `<TempComponent ${input} />`;
  }

  // TODO: error code frames
  const expression = babelParser.parseExpression(rawLines, {
    plugins: ["jsx"],
  });

  if (expression.type !== "JSXElement") {
    throw new Error("Expression is not a JSX element");
  }

  return [expression, rawLines];
}
