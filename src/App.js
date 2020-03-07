import React, { useState, useEffect } from "react";
import transform from "./transform";
import styled from "styled-components";
import useClipboard from "react-use-clipboard";
import "./App.css";

const code = `
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
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

const Toast = styled.div`
  background: #5fbb9e;
  border-radius: 4px;
  color: white;
  padding: 10px;
  position: fixed;
  right: 50px;
  bottom: 30px;
`;

function App() {
  const [value, setValue] = useState(code);
  const [isCopied, setCopied] = useClipboard(transform(value), {
    successDuration: 1000
  });
  //(`-webkit-appearance: none;
  // margin-top: 20px;
  // top: 10px;
  // background: red;`);
  return (
    <main className="App">
      <h1>CSS to JS Objects</h1>
      <Small>Cause we all do css in the browser</Small>
      <Areas>
        <textarea
          rows="5"
          onChange={e => setValue(e.target.value)}
          defaultValue={value}
        ></textarea>

        <textarea
          onClick={e => {
            setCopied();
            e.target.select();
          }}
          rows="5"
          value={transform(value)}
        ></textarea>
      </Areas>
      {isCopied && <Toast>Copied to Clipboard</Toast>}
    </main>
  );
}

export default App;
