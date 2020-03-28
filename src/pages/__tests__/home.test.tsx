import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import { transformers as mockedTransformers } from "../../transformers";
import Home from "../home";
import { findByFromTo as findTransformerByFromTo } from "../../utils/transformers";

// The transform functions are already unit tested, so replace them with stubs
jest.mock("../../transformers", (): {
  transformers: typeof mockedTransformers; // same type as actual module
} => {
  return {
    transformers: {
      css2js: {
        id: 0,
        name: "CSS => JS object",
        transform: jest.fn(x => x.toUpperCase()),
        from: "css",
        to: "js"
      },
      js2css: {
        id: 1,
        name: "JS object => CSS",
        transform: jest.fn(x => x.toLowerCase()),
        from: "js",
        to: "css"
      }
    }
  };
});

describe("<Home />", () => {
  test("renders without exploding", () => {
    render(<Home />);
  });

  test("has an element that lets the user enter text", async () => {
    const { getByRole, findByText } = render(<Home />);
    const inputBox = getByRole("textbox");
    const testInput = "My test input";

    fireEvent.change(inputBox, { target: { value: testInput } });

    expect(await findByText(testInput)).toBeInTheDocument();
  });

  test("displays some example input on load", async () => {
    const { getByRole } = render(<Home />);
    expect(getByRole("textbox").textContent).not.toBe("");
  });

  test("transforms the input when it is changed", async () => {
    const { getByRole, getByTestId } = render(<Home />);
    const inputBox = getByRole("textbox");
    const outputBox = getByTestId("output");
    const transformerSelect = getByRole("combobox");

    const testInput = "My test input";
    const transformerToUse = mockedTransformers.css2js;
    const expectedOutput = transformerToUse.transform(testInput);

    // Ensure we know which transformer is selected
    fireEvent.change(transformerSelect, {
      target: { value: transformerToUse.id }
    });

    fireEvent.change(inputBox, { target: { value: testInput } });

    await wait(() => expect(outputBox.textContent).toBe(expectedOutput));
  });

  test("allows changing the transformer", async () => {
    const { getByRole, getByTestId } = render(<Home />);
    const inputBox = getByRole("textbox");
    const outputBox = getByTestId("output");
    const transformerSelect = getByRole("combobox");

    const testInput = "My test input";
    const transformerToUse = mockedTransformers.js2css;
    const expectedOutput = transformerToUse.transform(testInput);

    fireEvent.change(inputBox, { target: { value: testInput } });
    fireEvent.change(transformerSelect, {
      target: { value: transformerToUse.id }
    });

    await wait(() => expect(outputBox.textContent).toBe(expectedOutput));
  });

  test("transforms input to new input format when transformer is changed", async () => {
    const { getByRole } = render(<Home />);
    const inputBox = getByRole("textbox");
    const transformerSelect = getByRole("combobox");

    const testInput = "My test input";
    const transformer1 = mockedTransformers.css2js;
    const transformer2 = mockedTransformers.js2css;

    // We're going to change from transformer1 to transformer2, so expect the
    // input to be transformed to the format that is accepted by transformer2
    const intermediateTransformer = findTransformerByFromTo(
      transformer1.from,
      transformer2.from
    );
    const expectedInput = intermediateTransformer?.transform(testInput);

    fireEvent.change(transformerSelect, {
      target: { value: transformer1.id }
    });

    fireEvent.change(inputBox, { target: { value: testInput } });

    fireEvent.change(transformerSelect, {
      target: { value: transformer2.id }
    });

    await wait(() => expect(inputBox.textContent).toBe(expectedInput));
  });
});
