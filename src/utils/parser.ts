import * as babelParser from "@babel/parser";

export function parseJsObject(objString: string) {
  const expression = babelParser.parseExpression(objString);

  if (expression.type !== "ObjectExpression") {
    throw new Error("Expression is not an object expression");
  }

  return expression;
}
