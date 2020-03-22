import { transform as css2obj } from "./transformCss2Obj";
import { transform as obj2jsx } from "./transformObj2Jsx";

export function transform(css) {
  const obj = css2obj(css);
  return obj2jsx(obj);
}
