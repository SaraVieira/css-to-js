import * as babelParser from "@babel/parser";

export function parseProps(input: string) {
  const expression = babelParser.parseExpression(input, { plugins: ["jsx"] });

  if (expression.type !== "JSXElement") {
    throw new Error("Expression is not a JSX element");
  }

  return expression;
}
