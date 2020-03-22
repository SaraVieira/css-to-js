const { transform } = require("../src/functions/transformObj2Jsx.js");

export async function handler({ body }) {
  return {
    statusCode: 200,
    body: transform(body)
  };
}
