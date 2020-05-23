import { Language } from "prism-react-renderer";
import { formatCss } from "./css";
import { formatObject } from "./js";
import { formatProps } from "./jsx";

export interface Formatter {
  id: number;
  transform: (input: string) => string;
  language: Language;
}

export const formatters: Record<string, Formatter> = {
  css: {
    id: 0,
    transform: formatCss,
    language: "css",
  },
  js: {
    id: 1,
    transform: formatObject,
    language: "javascript",
  },
  jsx: {
    id: 2,
    transform: formatProps,
    language: "jsx",
  },
};

export { formatCss, formatObject, formatProps };
