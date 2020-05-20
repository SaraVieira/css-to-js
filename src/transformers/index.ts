import { transform as css2js } from "./css2js";
import { transform as css2jsx } from "./css2jsx";
import { transform as js2css } from "./js2css";
import { transform as js2jsx } from "./js2jsx";
import { transform as jsx2css } from "./jsx2css";
import { transform as jsx2js } from "./jsx2js";
import { Language } from "prism-react-renderer";

export interface Transformer {
  id: number;
  name: string;
  transform: (input: string) => string;
  from: Language;
  to: Language;
}

export const transformers: Record<string, Transformer> = {
  css2js: {
    id: 0,
    name: "CSS => JS object",
    transform: css2js,
    from: "css",
    to: "javascript",
  },
  css2jsx: {
    id: 1,
    name: "CSS => React props",
    transform: css2jsx,
    from: "css",
    to: "jsx",
  },
  js2css: {
    id: 2,
    name: "JS object => CSS",
    transform: js2css,
    from: "javascript",
    to: "css",
  },
  js2jsx: {
    id: 3,
    name: "JS object => React props",
    transform: js2jsx,
    from: "javascript",
    to: "jsx",
  },
  jsx2css: {
    id: 4,
    name: "React props => CSS",
    transform: jsx2css,
    from: "jsx",
    to: "css",
  },
  jsx2js: {
    id: 5,
    name: "React props => JS object",
    transform: jsx2js,
    from: "jsx",
    to: "javascript",
  },
};
