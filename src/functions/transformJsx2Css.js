import { transform as jsx2obj } from "./transformJsx2Obj";
import { transform as obj2css } from "./transformObj2Css";

export function transform(jsx) {
  const obj = jsx2obj(jsx);
  return obj2css(obj);
}
