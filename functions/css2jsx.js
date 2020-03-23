const { transform } = require("../src/functions/transformCss2Jsx");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

export async function handler({ body }) {
  return { headers, statusCode: 200, body: JSON.stringify(transform(body)) };
}
