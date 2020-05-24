import React from "react";
import { render, screen, wait, fireEvent } from "@testing-library/react";
import { transformers } from "../../transformers";
import Home from "../home";

describe("<Home />", () => {
  test("renders without exploding", () => {
    render(<Home />);
  });

  test("has an element that lets the user enter text", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");

    fireEvent.change(inputBox, { target: { value: "Some test input" } });

    expect(await screen.findAllByText("Some test input"));
  });

  test("displays some example input on load", async () => {
    render(<Home />);
    expect(screen.getByRole("textbox")).not.toBeEmpty();
  });

  test("transforms the input when it is changed", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");
    const outputBox = screen.getByTitle("output");

    // TODO: use user-event
    fireEvent.change(inputBox, { target: { value: `some-prop: someValue;` } });

    await wait(() =>
      expect(outputBox.textContent).toMatchInlineSnapshot(
        `"{  someProp: \\"someValue\\",}"`
      )
    );
  });

  test("allows changing the transformer", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");
    const outputBox = screen.getByTitle("output");
    const transformerSelect = screen.getByRole("combobox");

    fireEvent.change(transformerSelect, {
      target: { value: transformers.js2css.id },
    });

    fireEvent.change(inputBox, { target: { value: `someProp: "someValue"` } });

    // TODO: this should only assert on the select state, not the output
    await wait(() =>
      expect(outputBox.textContent).toMatchInlineSnapshot(
        `"some-prop: someValue;"`
      )
    );
  });

  test("transforms input to new input language when transformer is changed", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");
    const transformerSelect = screen.getByRole("combobox");

    const transformer1 = transformers.css2js;
    const transformer2 = transformers.js2css;

    fireEvent.change(transformerSelect, {
      target: { value: transformer1.id },
    });

    fireEvent.change(inputBox, { target: { value: `some-props: someValue;` } });

    fireEvent.change(transformerSelect, {
      target: { value: transformer2.id },
    });

    await wait(() =>
      expect(inputBox.textContent).toMatchInlineSnapshot(`
        "{
          someProps: \\"someValue\\",
        }"
      `)
    );
  });

  test("clicking the swap button swaps the input and output languages", async () => {
    render(<Home />);
    const transformerSelect = screen.getByRole("combobox");
    const swapButton = screen.getByLabelText(/swap/i);

    // Make sure we know what transformer is initially selected
    fireEvent.change(transformerSelect, {
      target: { value: transformers.css2js.id },
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
});
