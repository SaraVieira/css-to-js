import React, { useState, useRef, useEffect } from "react";
import { transform as transformCss2Obj } from "./functions/transformCss2Obj";
import { transform as transformCss2Jsx } from "./functions/transformCss2Jsx";
import { transform as transformObj2Jsx } from "./functions/transformObj2Jsx";
import useClipboard from "react-use-clipboard";
import Code from "./code";
import Logo from "./logo";

const example = `display: block;
font-size: 16px;
background: #1e2f5d;
color: #a4cff4;
font-family: "Inter", sans-serif;
font-weight: bold;
`;

const modes = {
  css2obj: {
    name: "CSS => JS object",
    transformer: transformCss2Obj
  },
  css2jsx: {
    name: "CSS => React props",
    transformer: transformCss2Jsx
  },
  obj2jsx: {
    name: "JS object => React props",
    transformer: transformObj2Jsx
  }
};

function App() {
  const [input, setInput] = useState(example);
  const [mode, setMode] = useState("css2obj");
  const [transformed, setTransformed] = useState("");
  const textarea = useRef(null);

  useEffect(() => {
    if (mode in modes) {
      try {
        const newTransformed = modes[mode].transformer(input);
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
          {Object.keys(modes).map(modeKey => (
            <option key={modeKey} value={modeKey}>
              {modes[modeKey].name}
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

        <Code code={transformed} />
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

export default App;
