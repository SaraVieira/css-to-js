import { parseJsObject } from "../parser";

describe("parser", () => {
  test("parses an object with a literal value", () => {
    const result = parseJsObject(`{ myKey: "myValue" }`);

    expect(result.properties[0].type).toBe("ObjectProperty");
    expect(result.properties[0]).toHaveProperty("key.name", "myKey");
    expect(result.properties[0]).toHaveProperty("value.value", "myValue");
  });
});
