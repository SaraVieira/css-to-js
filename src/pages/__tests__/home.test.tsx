import React from "react";
import { render, screen, wait, fireEvent } from "@testing-library/react";
import { Language } from "prism-react-renderer";
import { transformers as mockedTransformers } from "../../transformers";
import { findTransformerByLanguage } from "../../transformers/utils";
import Home from "../home";

// The transform functions are already unit tested, so replace them with stubs
jest.mock("../../transformers", (): {
  transformers: typeof mockedTransformers; // same type as actual module
} => {
  return {
    transformers: {
      css2js: {
        id: 0,
        name: "CSS => JS object",
        transform: jest.fn((x) => x.toUpperCase()),
        from: "css",
        to: "javascript",
      },
      js2css: {
        id: 1,
        name: "JS object => CSS",
        transform: jest.fn((x) => x.toLowerCase()),
        from: "javascript",
        to: "css",
      },
      x2y: {
        id: 2,
        name: "X => Y",
        transform: jest.fn((x) => x),
        from: "x" as Language,
        to: "y" as Language,
      },
    },
  };
});

describe("<Home />", () => {
  test("renders without exploding", () => {
    render(<Home />);
  });

  test("has an element that lets the user enter text", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");

    fireEvent.change(inputBox, { target: { value: "My test input" } });

    expect(await screen.findAllByText("My test input")).toBeTruthy();
  });

  test("displays some example input on load", async () => {
    render(<Home />);
    expect(screen.getByRole("textbox").textContent).not.toBe("");
  });

  test("transforms the input when it is changed", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");
    const outputBox = screen.getByTitle("output");
    const transformerSelect = screen.getByRole("combobox");

    const testInput = "My test input";
    const transformerToUse = mockedTransformers.css2js;
    const expectedOutput = transformerToUse.transform(testInput);

    // Ensure we know which transformer is selected
    fireEvent.change(transformerSelect, {
      target: { value: transformerToUse.id },
    });

    fireEvent.change(inputBox, { target: { value: testInput } });

    await wait(() => expect(outputBox.textContent).toBe(expectedOutput));
  });

  test("allows changing the transformer", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");
    const outputBox = screen.getByTitle("output");
    const transformerSelect = screen.getByRole("combobox");

    const testInput = "My test input";
    const transformerToUse = mockedTransformers.js2css;
    const expectedOutput = transformerToUse.transform(testInput);

    fireEvent.change(inputBox, { target: { value: testInput } });
    fireEvent.change(transformerSelect, {
      target: { value: transformerToUse.id },
    });

    await wait(() => expect(outputBox.textContent).toBe(expectedOutput));
  });

  test("transforms input to new input format when transformer is changed", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");
    const transformerSelect = screen.getByRole("combobox");

    const testInput = "My test input";
    const transformer1 = mockedTransformers.css2js;
    const transformer2 = mockedTransformers.js2css;

    // We're going to change from transformer1 to transformer2, so expect the
    // input to be transformed to the format that is accepted by transformer2
    const intermediateTransformer = findTransformerByLanguage(
      transformer1.from,
      transformer2.from
    );
    const expectedInput = intermediateTransformer?.transform(testInput);

    fireEvent.change(transformerSelect, {
      target: { value: transformer1.id },
    });

    fireEvent.change(inputBox, { target: { value: testInput } });

    fireEvent.change(transformerSelect, {
      target: { value: transformer2.id },
    });

    await wait(() => expect(inputBox.textContent).toBe(expectedInput));
  });

  test("clicking the swap button swaps the input and output formats", async () => {
    render(<Home />);
    const transformerSelect = screen.getByRole("combobox");
    const swapButton = screen.getByLabelText(/swap/i);

    // Make sure we know what transformer is initially selected
    fireEvent.change(transformerSelect, {
      target: { value: mockedTransformers.css2js.id },
    });

    expect(screen.getByDisplayValue(/CSS => JS object/i)).toBeInTheDocument();
    expect(
      screen.queryByDisplayValue(/JS object => CSS/i)
    ).not.toBeInTheDocument();

    fireEvent.click(swapButton);

    expect(screen.getByDisplayValue(/JS object => CSS/i)).toBeInTheDocument();
    expect(
      screen.queryByDisplayValue(/CSS => JS object/i)
    ).not.toBeInTheDocument();
  });

  test("the swap button does nothing when no inverse transformer exists", async () => {
    render(<Home />);
    const transformerSelect = screen.getByRole("combobox");
    const swapButton = screen.getByLabelText(/swap/i);

    // Make sure we know what transformer is initially selected
    fireEvent.change(transformerSelect, {
      target: { value: mockedTransformers.x2y.id },
    });

    expect(screen.getByDisplayValue(/X => Y/i)).toBeInTheDocument();

    fireEvent.click(swapButton);

    // Expect transformer not to have changed since it doesn't have an inverse
    expect(screen.getByDisplayValue(/X => Y/i)).toBeInTheDocument();
  });
});
