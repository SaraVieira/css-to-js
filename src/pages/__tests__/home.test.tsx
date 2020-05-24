import React from "react";
import { render, screen, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { transformers } from "../../transformers";
import Home from "../home";

describe("<Home />", () => {
  test("renders without exploding", () => {
    render(<Home />);
  });

  test("has an element that lets the user enter text", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");

    userEvent.type(inputBox, "Some test input");

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

    userEvent.type(inputBox, `some-prop: someValue;`);

    await wait(() =>
      expect(outputBox.textContent).toMatchInlineSnapshot(
        `"{  someProp: \\"someValue\\",}"`
      )
    );
  });

  test("allows changing the transformer", async () => {
    render(<Home />);
    const combobox = screen.getByRole("combobox");

    expect(combobox).toBeInstanceOf(HTMLSelectElement);
    const transformerSelect = combobox as HTMLSelectElement;

    userEvent.selectOptions(
      transformerSelect,
      transformers.js2css.id.toString()
    );

    expect(transformerSelect.value).toBe(transformers.js2css.id.toString());
  });

  test("transforms input to new input language when transformer is changed", async () => {
    render(<Home />);
    const inputBox = screen.getByRole("textbox");
    const transformerSelect = screen.getByRole("combobox");

    const transformer1 = transformers.css2js;
    const transformer2 = transformers.js2css;

    userEvent.selectOptions(transformerSelect, transformer1.id.toString());

    userEvent.type(inputBox, `some-props: someValue;`);

    userEvent.selectOptions(transformerSelect, transformer2.id.toString());

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
    const combobox = screen.getByRole("combobox");
    const swapButton = screen.getByLabelText(/swap/i);

    expect(combobox).toBeInstanceOf(HTMLSelectElement);
    const transformerSelect = combobox as HTMLSelectElement;

    // Make sure we know what transformer is initially selected
    userEvent.selectOptions(
      transformerSelect,
      transformers.css2js.id.toString()
    );

    expect(transformerSelect.value).toBe(transformers.css2js.id.toString());

    userEvent.click(swapButton);

    expect(transformerSelect.value).toBe(transformers.js2css.id.toString());
  });
});
