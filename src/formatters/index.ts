import { Language } from "prism-react-renderer";
import { formatCss } from "./css";
import { formatObject } from "./js";
import { formatProps } from "./jsx";

export interface Formatter {
  id: number;
  format: (input: string) => string;
  language: Language;
}

export const formatters: Record<string, Formatter> = {
  css: {
    id: 0,
    format: formatCss,
    language: "css",
  },
  js: {
    id: 1,
    format: formatObject,
    language: "javascript",
  },
  jsx: {
    id: 2,
    format: formatProps,
    language: "jsx",
  },
};

export { formatCss, formatObject, formatProps };
