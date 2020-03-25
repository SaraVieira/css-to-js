import React, { useState, useRef, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import useClipboard from "react-use-clipboard";
import transformers, { findById as findTransformerById } from "../transformers";
import Code from "../components/code";
import Logo from "../components/logo";
import Header from "../components/header";
import { exampleCSS, exampleJS, exampleJSX } from "../utils/exampleCode";

const Home: React.FC<RouteComponentProps> = () => {
  const [input, setInput] = useState(exampleCSS);
  const [transformer, setTransformer] = useState(transformers.css2js);
  const [transformed, setTransformed] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (transformer.from === "css") {
      setInput(exampleCSS);
    } else if (transformer.from === "js") {
      setInput(exampleJS);
    } else if (transformer.from === "jsx") {
      setInput(exampleJSX);
    }
  }, [transformer]);

  useEffect(() => {
    try {
      const newTransformed = transformer.transform(input);
      setTransformed(newTransformed);
    } catch (e) {
      setTransformed(
        `Something went wrong while transforming the code: ${e.message}`
      );
    }
  }, [input, transformer]);

  const [isCopied, setCopied] = useClipboard(transformed, {
    successDuration: 1000
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key
    if (e.keyCode === 9) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = input.substring(0, start) + "\t" + input.substring(end);
      setInput(newValue);

      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
          start + 1;
      }
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
          value={transformer.id}
          onChange={e => {
            const newTransformer = findTransformerById(e.target.value);
            if (newTransformer) {
              setTransformer(newTransformer);
            } else {
              console.error(
                `Could not set transformer with id: ${e.target.value}`
              );
            }
          }}
        >
          {Object.values(transformers).map(tf => (
            <option key={tf.id} value={tf.id}>
              {tf.name}
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
          ref={textareaRef}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Code
          code={transformed}
          language={transformer.to === "jsx" ? "js" : transformer.to}
        />
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
};

export default Home;
