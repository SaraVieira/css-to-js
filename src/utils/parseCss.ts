import { parse, Declaration, ChildNode, Root } from "postcss";

function getCssProps(root: Root): Declaration[] {
  const { nodes } = root;

  if (!nodes) {
    return [];
  }

  function iterate(nodes: ChildNode[], declarations: Declaration[] = []) {
    nodes.forEach((item) => {
      if (item.type === "decl") {
        declarations.push(item);
      } else if (item.type === "rule" && item?.nodes) {
        iterate(item.nodes, declarations);
      }
    });

    return declarations;
  }

  return iterate(nodes);
}

export function parseCss(css: string): Declaration[] {
  try {
    const root: Root = parse(css);
    return getCssProps(root);
  } catch (e) {
    throw new Error(e.message);
  }
}
