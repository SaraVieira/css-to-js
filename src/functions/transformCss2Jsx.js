import { transform as css2obj } from "./transformCss2Obj";
import { transform as obj2jsx } from "./transformObj2Jsx";

export function transform(css) {
  const obj = css2obj(css);
  return obj2jsx(obj);
}

if (typeof window === "undefined") {
  exports.handler = function({ body }, context, callback) {
    callback(null, {
      statusCode: 200,
      body: transform(body)
    });
  };
}
