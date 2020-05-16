import * as babelParser from "@babel/parser";
import { VariableDeclaration, ObjectExpression } from "@babel/types";

export function parseJsObject(objString: string) {
  const code = `const yourObject = ${objString}`;

  const file = babelParser.parse(code);

  const declarations = file.program.body.filter(
    node => node.type === "VariableDeclaration"
  ) as VariableDeclaration[];

  const declarators = declarations.flatMap(
    declaration => declaration.declarations
  );

  const expressions = declarators.map(declarator => declarator.init);

  const objectExpressions = expressions.filter(
    expr => expr?.type === "ObjectExpression"
  ) as ObjectExpression[];

  if (objectExpressions.length === 0) {
    throw new Error("No object expression found");
  }

  return objectExpressions[0];
}
