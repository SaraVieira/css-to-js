const { transform } = require("../src/functions/transformCss2Obj");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

export async function handler({ body }) {
  return {
    headers,
    statusCode: 200,
    body: transform(body)
  };
}
