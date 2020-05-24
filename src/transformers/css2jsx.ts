import { transform as css2js } from "./css2js";
import { transform as js2jsx } from "./js2jsx";

export function transform(css: string): string {
  const obj = css2js(css);
  return js2jsx(obj);
}
