import { transform as css2js } from "./css2js";
import { transform as css2jsx } from "./css2jsx";
import { transform as js2css } from "./js2css";
import { transform as js2jsx } from "./js2jsx";
import { transform as jsx2js } from "./jsx2js";

export default {
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
