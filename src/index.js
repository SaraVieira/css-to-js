import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import normalize from "normalize.css";
import App from "./App";

const Styles = createGlobalStyle`
${normalize}
html, body, #root, main {
    height: 100%;
}
    body {
        background: #1e2f5d;
        color: #a4cff4;
        font-family: 'Inter', sans-serif;
    }
    code, pre, textarea {
        font-family: 'Roboto Mono', monospace;
    }

    textarea {
        background: #18264a;
        border: 0;
        resize: none;
        color: #d0d3d6;
        padding: 20px;

        &:focus {
            outline: 2px solid #0e1833;
        }

        &:first-of-type {
            border-right: 1px solid #1e2f5d;
        }
    }
`;

ReactDOM.render(
  <>
    <Styles />
    <App />
  </>,
  document.getElementById("root")
);
