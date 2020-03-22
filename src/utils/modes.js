import { transform as transformCss2Obj } from "../functions/transformCss2Obj";
import { transform as transformCss2Jsx } from "../functions/transformCss2Jsx";
import { transform as transformObj2Css } from "../functions/transformObj2Css";
import { transform as transformObj2Jsx } from "../functions/transformObj2Jsx";
import { transform as transformJsx2Obj } from "../functions/transformJsx2Obj";

export const modes = {
  css2obj: {
    name: "CSS => JS object",
    transformer: transformCss2Obj
  },
  css2jsx: {
    name: "CSS => React props",
    transformer: transformCss2Jsx
  },
  obj2css: {
    name: "JS object => CSS",
    transformer: transformObj2Css
  },
  obj2jsx: {
    name: "JS object => React props",
    transformer: transformObj2Jsx
  },
  jsx2obj: {
    name: "React props => JS object",
    transformer: transformJsx2Obj
  }
};
