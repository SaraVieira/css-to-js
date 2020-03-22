const { transform } = require("../src/functions/transformCss2Jsx");

export async function handler({ body }) {
  return {
    statusCode: 200,
    body: transform(body)
  };
}
