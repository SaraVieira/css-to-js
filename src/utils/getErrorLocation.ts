export function getErrorLocation(error: SyntaxError) {
  const groups = error.message.match(/\((\d+):(\d+)\)$/);

  if (!groups || groups.length < 2) {
    throw new Error(`Can't get location of error: ${error.message}`);
  }

  return {
    line: parseInt(groups[1]),
    column: parseInt(groups[2]) + 1, // converted to 0-indexed
  };
}
