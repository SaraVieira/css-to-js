import React, { useState, useLayoutEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import useClipboard from "react-use-clipboard";
import SwapIcon from "@material-ui/icons/SwapHoriz";
import PrettifyIcon from "@material-ui/icons/Looks";
import CopyIcon from "@material-ui/icons/FileCopy";
import { Code, Editor, Logo, Nav, Select } from "../components";
import { transformers } from "../transformers";
import {
  findTransformerById,
  findTransformerByLanguage,
} from "../transformers/utils";
import { findFormatterByLanguage } from "../formatters/utils";
import { exampleCSS, usePrevious } from "../utils";
import "./home.css";

const Home: React.FC<RouteComponentProps> = () => {
  const [input, setInput] = useState(exampleCSS);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [transformer, setTransformer] = useState(transformers.css2js);
  const prevTransformer = usePrevious(transformer);

  // Update input when transformer is changed
  useLayoutEffect(() => {
    if (prevTransformer && transformer !== prevTransformer) {
      const intermediateTransformer = findTransformerByLanguage(
        prevTransformer.from,
        transformer.from
      );
      if (intermediateTransformer) {
        try {
          const newInput = intermediateTransformer.transform(input);
          setInput(newInput);
        } catch {
          // don't change the input
        }
      }
    }
  }, [input, transformer, prevTransformer]);

  // Update output when input or transformer is changed
  useLayoutEffect(() => {
    try {
      const newOutput = transformer.transform(input);
      setOutput(newOutput);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }, [input, transformer]);

  const [isCopied, setCopied] = useClipboard(output, {
    successDuration: 1000,
  });

  const formatInput = () => {
    const formatter = findFormatterByLanguage(transformer.from);
    if (formatter) {
      try {
        setInput(formatter.format(input));
      } catch (e) {
        console.warn(`Could not format input: ${e.message}`);
      }
    }
  };

  return (
    <main className="App">
      <Nav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo style={{ margin: 30 }} />
        <small>Because we all do CSS in our own ways</small>
        <div
          style={{
            display: "inline-flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Select
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
          </Select>
          <button
            className="swap"
            disabled={
              !findTransformerByLanguage(transformer.to, transformer.from)
            }
            onClick={() => {
              const swappedTransformer = findTransformerByLanguage(
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
      </div>
      <section className="code-area">
        <Editor
          value={input}
          language={transformer.from}
          label="input"
          onChange={(newValue) => setInput(newValue)}
        />

        <Code
          code={
            error
              ? `Something went wrong while transforming the code:\n${error}`
              : output
          }
          language={error ? transformer.from : transformer.to}
          label="output"
        />
      </section>

      <button className="toast toast--left" onClick={formatInput}>
        <PrettifyIcon style={{ marginRight: 4 }} />
        <span>Prettify</span>
      </button>

      <button className="toast toast--right" onClick={setCopied}>
        <CopyIcon style={{ marginRight: 4 }} />
        <span>{isCopied ? "Copied" : "Copy"} to Clipboard</span>
      </button>
    </main>
  );
};

export default Home;
