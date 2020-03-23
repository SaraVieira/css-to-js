import { transform as css2js } from "../transformers/css2js";
import { transform as css2jsx } from "../transformers/css2jsx";
import { transform as js2css } from "../transformers/js2css";
import { transform as js2jsx } from "../transformers/js2jsx";
import { transform as jsx2js } from "../transformers/jsx2js";

export const modes = {
  // TODO: rename mode keys
  // TODO: add transformers/index.js
  // TODO: add to/from props
  css2js: {
    name: "CSS => JS object",
    transformer: css2js
  },
  css2jsx: {
    name: "CSS => React props",
    transformer: css2jsx
  },
  js2css: {
    name: "JS object => CSS",
    transformer: js2css
  },
  js2jsx: {
    name: "JS object => React props",
    transformer: js2jsx
  },
  jsx2js: {
    name: "React props => JS object",
    transformer: jsx2js
  }
};
