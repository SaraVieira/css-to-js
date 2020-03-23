import React, { useState, useRef, useEffect } from "react";
import useClipboard from "react-use-clipboard";
import transformers from "./transformers";
import Code from "./components/code";
import Logo from "./components/logo";
import Header from "./components/header";
import { exampleCSS, exampleJS, exampleJSX } from "./utils/exampleCode";

function Home() {
  const [input, setInput] = useState(exampleCSS);
  const [mode, setMode] = useState("css2js");
  const [transformed, setTransformed] = useState("");
  const textarea = useRef(null);

  useEffect(() => {
    if (mode === "css2js" || mode === "css2jsx") {
      setInput(exampleCSS);
    }
    if (mode === "js2css" || mode === "js2jsx") {
      setInput(exampleJS);
    }
    if (mode === "jsx2js") {
      setInput(exampleJSX);
    }
  }, [mode]);

  useEffect(() => {
    if (mode in transformers) {
      try {
        const newTransformed = transformers[mode].transform(input);
        setTransformed(newTransformed);
      } catch (e) {
        setTransformed(
          `Something went wrong while transforming the code: ${e.message}`
        );
      }
    } else {
      setTransformed("Invalid transformation mode");
    }
  }, [input, mode]);

  const [isCopied, setCopied] = useClipboard(transformed, {
    successDuration: 1000
  });

  const onKeyDown = e => {
    if (e.keyCode === 9) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = input.substring(0, start) + "\t" + input.substring(end);
      setInput(newValue);
      textarea.current.selectionStart = textarea.current.selectionEnd =
        start + 1;
    }
  };
  return (
    <main className="App">
      <Header />
      <Logo style={{ margin: 30 }} />
      <small>Because we all do css in the browser</small>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "2rem"
        }}
      >
        <select
          className="select"
          value={mode}
          onChange={e => setMode(e.target.value)}
        >
          {Object.keys(transformers).map(key => (
            <option key={key} value={key}>
              {transformers[key].name}
            </option>
          ))}
        </select>
        <div className="select-arrow">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            focusable="false"
            role="presentation"
            aria-hidden="true"
            class="css-12c4avn"
          >
            <path
              fill="currentColor"
              d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
            ></path>
          </svg>
        </div>
      </div>
      <section className="areas">
        <textarea
          value={input}
          ref={textarea}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        ></textarea>

        <Code code={transformed} language={mode === "js2css" ? "css" : "js"} />
      </section>

      <button
        className="toast"
        onClick={e => {
          setCopied();
        }}
      >
        {isCopied ? "Copied" : "Copy"} to Clipboard
      </button>
    </main>
  );
}

export default Home;
