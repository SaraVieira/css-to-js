import { transform as jsx2js } from "./jsx2js";
import { transform as js2css } from "./js2css";

export function transform(jsx) {
  const obj = jsx2js(jsx);
  return js2css(obj);
}
