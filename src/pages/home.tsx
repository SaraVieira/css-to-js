import React, { useState, useLayoutEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import useClipboard from "react-use-clipboard";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SwapIcon from "@material-ui/icons/SwapHoriz";
import { Code, CodeInput, Logo, Header } from "../components";
import { transformers } from "../transformers";
import {
  exampleCSS,
  usePrevious,
  findTransformerById,
  findTransformerByFromTo,
} from "../utils";
import "./home.css";

const Home: React.FC<RouteComponentProps> = () => {
  const [input, setInput] = useState(exampleCSS);
  const [output, setOutput] = useState("");
  const [transformer, setTransformer] = useState(transformers.css2js);
  const prevTransformer = usePrevious(transformer);

  // Update input when transformer is changed
  useLayoutEffect(() => {
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
  useLayoutEffect(() => {
    try {
      const newOutput = transformer.transform(input);
      setOutput(newOutput);
    } catch (e) {
      setOutput(
        `Something went wrong while transforming the code: ${e.message}`
      );
    }
  }, [input, transformer]);

  const [isCopied, setCopied] = useClipboard(output, {
    successDuration: 1000,
  });

  return (
    <main className="App">
      <Header />
      <Logo style={{ margin: 30 }} />
      <small>Because we all do css in the browser</small>
      <div
        style={{
          display: "inline-flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <select
            className="select"
            value={transformer.id}
            onChange={(e) => {
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
            {Object.values(transformers).map((tf) => (
              <option key={tf.id} value={tf.id}>
                {tf.name}
              </option>
            ))}
          </select>
          <div className="select-arrow">
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <button
          className="swap"
          disabled={!findTransformerByFromTo(transformer.to, transformer.from)}
          onClick={() => {
            const swappedTransformer = findTransformerByFromTo(
              transformer.to,
              transformer.from
            );
            if (swappedTransformer) {
              setTransformer(swappedTransformer);
            }
          }}
        >
          <SwapIcon aria-label="Swap transformer" />
        </button>
      </div>
      <section className="areas">
        <CodeInput
          value={input}
          language={transformer.from}
          onChange={(newValue) => setInput(newValue)}
        />

        <Code code={output} language={transformer.to} />
      </section>

      <button className="toast" onClick={setCopied}>
        {isCopied ? "Copied" : "Copy"} to Clipboard
      </button>
    </main>
  );
};

export default Home;
