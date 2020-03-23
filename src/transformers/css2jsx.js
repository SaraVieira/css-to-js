import { transform as css2obj } from "./css2js";
import { transform as obj2jsx } from "./js2jsx";

export function transform(css) {
  const obj = css2obj(css);
  return obj2jsx(obj);
}
