import React, { useState, useRef } from "react";
import transform from "./transform";
import styled from "styled-components";
import useClipboard from "react-use-clipboard";
import "./App.css";

const code = `display: block;
font-size: 2em;
background: #1e2f5d;
color: #a4cff4;
font-family: 'Inter', sans-serif;
font-weight: bold;
`;

const Areas = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Small = styled.small`
  display: block;
  font-style: italic;
  margin-bottom: 2rem;
`;

const Toast = styled.button`
  border: none;
  background: #5fbb9e;
  border-radius: 4px;
  color: white;
  padding: 10px;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
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
      <h1>CSS to JS Objects</h1>
      <Small>Cause we all do css in the browser</Small>
      <Areas>
        <textarea
          rows="5"
          value={value}
          ref={textarea}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        ></textarea>

        <textarea rows="5" value={transformed}></textarea>
      </Areas>
      {
        <Toast
          onClick={e => {
            setCopied();
          }}
        >
          {isCopied ? "Copied" : "Copy"} to Clipboard
        </Toast>
      }
    </main>
  );
}

export default App;
