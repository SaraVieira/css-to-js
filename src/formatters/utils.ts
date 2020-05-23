import { formatters, Formatter } from "./index";
import { Language } from "prism-react-renderer";

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
export function findFormatterByLanguage(
  language: Language
): Formatter | undefined {
  return Object.values(formatters).find((fm) => fm.language === language);
}
