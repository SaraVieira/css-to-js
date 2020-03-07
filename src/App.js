import React, { useState, useRef } from "react";
import transform from "./transform";
import useClipboard from "react-use-clipboard";
import Code from "./code";
import Logo from "./logo";

const code = `display: block;
font-size: 16px;
background: #1e2f5d;
color: #a4cff4;
font-family: "Inter", sans-serif;
font-weight: bold;
`;

function App() {
  const [value, setValue] = useState(code);
  const textarea = useRef(null);
  const transformed = transform(value);
  const [isCopied, setCopied] = useClipboard(transformed, {
    successDuration: 1000
  });

  const onKeyDown = e => {
    if (e.keyCode === 9) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + "\t" + value.substring(end);
      setValue(newValue);
      textarea.current.selectionStart = textarea.current.selectionEnd =
        start + 1;
    }
  };
  return (
    <main className="App">
      <Logo style={{ margin: 30 }} />
      <small>Because we all do css in the browser</small>
      <section className="areas">
        <textarea
          value={value}
          ref={textarea}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        ></textarea>

        <Code code={transformed} />
      </section>
      {
        <button
          className="toast"
          onClick={e => {
            setCopied();
          }}
        >
          {isCopied ? "Copied" : "Copy"} to Clipboard
        </button>
      }
    </main>
  );
}

export default App;
