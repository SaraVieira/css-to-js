import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Logo, Header, Code } from "../components";

const API: React.FC<RouteComponentProps> = () => {
  const [CSStoJSValue, setCSS2JSValue] = useState("");
  const [JSToJSXValue, setJSToJSXValue] = useState("");

  useEffect(() => {
    fetch("https://css2js.dotenv.dev/api/css2js", {
      method: "POST",
      body: "display: block",
    })
      .then((rsp) => rsp.json())
      .then(setCSS2JSValue);
  }, []);

  useEffect(() => {
    fetch("https://css2js.dotenv.dev/api/js2jsx", {
      method: "POST",
      body: "{display: 'block'}",
    })
      .then((rsp) => rsp.json())
      .then(setJSToJSXValue);
  }, [JSToJSXValue]);
  return (
    <main className="App api">
      <Header />
      <div style={{ textAlign: "center" }}>
        <Logo />
      </div>
      <h1>API</h1>
      <p>
        You can access the functions we use to transform the code from the
        website or make your own apps using our exposed functions API.
      </p>
      <p>We offer three different endpoints for now:</p>
      <ul>
        <li>
          CSS to JS at{" "}
          <span style={{ color: " white" }}>
            https://css2js.dotenv.dev/api/css2js
          </span>
        </li>
        <li>
          CSS to JSX Props at{" "}
          <span style={{ color: " white" }}>
            https://css2js.dotenv.dev/api/css2jsx
          </span>
        </li>
        <li>
          JS to JSX Props at{" "}
          <span style={{ color: " white" }}>
            https://css2js.dotenv.dev/api/js2jsx
          </span>
        </li>
      </ul>

      <h2>Transform CSS to JS</h2>
      <Code
        language="javascript"
        code={`
     const js = await fetch("https://css2js.dotenv.dev/api/css2js", {
        method: "POST",
        body: "display: block"
      }).then(rsp => rsp.json())

      console.log(js)
      `}
      ></Code>
      <div>{JSON.stringify(CSStoJSValue, null, 2)}</div>
      <h2>Transform CSS to JS</h2>
      <Code
        language="javascript"
        code={`
     const css = await fetch("https://css2js.dotenv.dev/api/js2jsx", {
        method: "POST",
        body: "{display: "block"}"
      }).then(rsp => rsp.json())

      console.log(css)
      `}
      ></Code>
      <div>{JSON.stringify(JSToJSXValue, null, 2)}</div>
    </main>
  );
};

export default API;
