import React, { useState, useEffect } from "react";
import Logo from "./components/logo";
import Header from "./components/header";
import Code from "./components/code";

const API = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("https://css2js.dotenv.dev/api/css2js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: "display: block"
    })
      .then(rsp => rsp.json())
      .then(setValue);
  }, []);
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
        language="js"
        code={`
     const js = await fetch("https://css2js.dotenv.dev/api/css2js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: "display: block"
      }).then(rsp => rsp.json())

      console.log(js)
      `}
      ></Code>
    </main>
  );
};

export default API;
