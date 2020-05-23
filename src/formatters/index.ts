import { Language } from "prism-react-renderer";
import { formatCss } from "./css";
import { formatJsObject } from "./js";
import { formatJsxProps } from "./jsx";

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
    format: formatJsObject,
    language: "javascript",
  },
  jsx: {
    id: 2,
    format: formatJsxProps,
    language: "jsx",
  },
};

export { formatCss, formatJsObject, formatJsxProps };
