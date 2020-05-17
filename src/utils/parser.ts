import * as babelParser from "@babel/parser";
import { Expression } from "@babel/types";

export function parseJsObject(objString: string) {
  let expression: Expression;
  try {
    expression = babelParser.parseExpression(objString);
  } catch {
    // Try parsing again, but wrap the input in curly braces
    // This is to support passing input without curly braces
    expression = babelParser.parseExpression(`{${objString}}`);
  }

  if (expression.type !== "ObjectExpression") {
    throw new Error("Expression is not an object expression");
  }

  return expression;
}
