import * as babelParser from "@babel/parser";
import { JSXElement, Expression } from "@babel/types";
import { getErrorLocation } from "../utils";
import { codeFrameColumns } from "@babel/code-frame";

export function parseJsx(input: string): [JSXElement, string] {
  let rawLines: string;
  if (input.trim().match(/^<.*>$/s)) {
    rawLines = input;
  } else {
    rawLines = `<TempComponent ${input} />`;
  }

  let expression: Expression;
  try {
    expression = babelParser.parseExpression(rawLines, {
      plugins: ["jsx"],
    });
  } catch (e) {
    if (e instanceof SyntaxError) {
      const location = getErrorLocation(e);
      const codeFrame = codeFrameColumns(rawLines, { start: location });
      throw new SyntaxError(`${e.message}\n\n${codeFrame}`);
    }
    throw e;
  }

  if (expression.type !== "JSXElement") {
    throw new Error("Expression is not a JSX element");
  }

  return [expression, rawLines];
}
