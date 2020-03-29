import React, { useState, useRef, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import useClipboard from "react-use-clipboard";
import { transformers } from "../transformers";
import {
  findTransformerById,
  findTransformerByFromTo
} from "../utils/transformers";
import { usePrevious } from "../utils/usePrevious";
import { exampleCSS } from "../utils/exampleCode";
import Code from "../components/code";
import Logo from "../components/logo";
import Header from "../components/header";

const Home: React.FC<RouteComponentProps> = () => {
  const [input, setInput] = useState(exampleCSS);
  const [transformed, setTransformed] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [transformer, setTransformer] = useState(transformers.css2js);
  const prevTransformer = usePrevious(transformer);

  // Update input when transformer is changed
  useEffect(() => {
    if (prevTransformer && transformer !== prevTransformer) {
      const intermediateTransformer = findTransformerByFromTo(
        prevTransformer.from,
        transformer.from
      );
      if (intermediateTransformer) {
        const newInput = intermediateTransformer.transform(input);
        setInput(newInput);
      }
    }
  }, [input, transformer, prevTransformer]);

  // Update output when input or transformer is changed
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

      <button className="toast" onClick={setCopied}>
        {isCopied ? "Copied" : "Copy"} to Clipboard
      </button>
    </main>
  );
};

export default Home;
