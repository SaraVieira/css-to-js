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

/**
 * Finds a formatter with the specified ID.
 */
export function findFormatterById(id: number | string): Formatter | undefined {
  if (typeof id === "string") {
    id = parseInt(id, 10);
  }

  return Object.values(formatters).find((fm) => fm.id === id);
}

/**
 * Finds a formatter with the specified language.
 */
export function findTransformerByLanguage(
  language: Language
): Formatter | undefined {
  return Object.values(formatters).find((fm) => fm.language === language);
}

export * from "./css";
export * from "./js";
export * from "./jsx";
