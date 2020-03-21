import React, { useState, useRef, useEffect } from "react";
import { transform as transformCss2Obj } from "./functions/transform";
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
  // TODO: remove
  test: {
    name: "Test",
    transformer: input => input.toUpperCase()
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
      <select onChange={e => setMode(e.target.value)}>
        {Object.keys(modes).map(modeKey => (
          <option value={modeKey}>{modes[modeKey].name}</option>
        ))}
      </select>
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
