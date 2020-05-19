/**
 * @deprecated use parseJsObject from ./parser.ts instead
 * Loosely parses the specified string as a JS object.
 */
export function parseObj(objString: string) {
  const rules: Record<string, string> = {};

  // Remove outer curly braces
  objString = objString.replace(/^\s*\{([\s\S]*)\}\s*$/, "$1");

  objString.split("\n").forEach((line: string) => {
    line = line.replace(/,\s*$/, ""); // remove trailing comma

    // Split each line into a key and a value
    // Everything before the first : is the key and the reset is the value
    const segments = line.split(":");
    if (segments.length < 2) return; // skip this line
    const key = segments[0].trim();
    const value = segments.slice(1).join(":").trim();
    rules[key] = value;
  });

  return rules;
}
