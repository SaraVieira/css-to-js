import { transform as css2js } from "./css2js";
import { transform as css2jsx } from "./css2jsx";
import { transform as js2css } from "./js2css";
import { transform as js2jsx } from "./js2jsx";
import { transform as jsx2css } from "./jsx2css";
import { transform as jsx2js } from "./jsx2js";

/**
 * @typedef Transformer
 * @type {object}
 * @property {number} id a unique identifier
 * @property {string} name user-friendly name
 * @property {function} transform transforms code
 * @property {string} from format of the input it consumes
 * @property {string} to format of the output it produces
 */

/**
 * @type {Object<string, Transformer>}
 */
const transformers = {
  css2js: {
    id: 0,
    name: "CSS => JS object",
    transform: css2js,
    from: "css",
    to: "js"
  },
  css2jsx: {
    id: 1,
    name: "CSS => React props",
    transform: css2jsx,
    from: "css",
    to: "jsx"
  },
  js2css: {
    id: 2,
    name: "JS object => CSS",
    transform: js2css,
    from: "js",
    to: "css"
  },
  js2jsx: {
    id: 3,
    name: "JS object => React props",
    transform: js2jsx,
    from: "js",
    to: "jsx"
  },
  jsx2css: {
    id: 4,
    name: "React props => CSS",
    transform: jsx2css,
    from: "jsx",
    to: "css"
  },
  jsx2js: {
    id: 5,
    name: "React props => JS object",
    transform: jsx2js,
    from: "jsx",
    to: "js"
  }
};

/**
 * Finds a transformer with the specified ID.
 * @param {*} id
 */
export function findById(id) {
  if (typeof id !== "number") {
    id = parseInt(id, 10);
  }

  return Object.values(transformers).find(tf => tf.id === id);
}

/**
 * Finds a transformer with the specified `from` and `to` format.
 * Both arguments can be omitted to weaken the constraints.
 * @param {string} from format
 * @param {string} to format
 */
export function findByFromTo(from, to) {
  return Object.values(transformers).find(tf => {
    if (from !== undefined && to !== undefined) {
      return tf.from === from && tf.to === to;
    } else if (from !== undefined) {
      return tf.from === from;
    } else if (to !== undefined) {
      return tf.to === to;
    }
    return true;
  });
}

export default transformers;
