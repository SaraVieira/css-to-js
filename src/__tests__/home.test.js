import React from "react";
import { render, wait } from "@testing-library/react";
import transformersMock from "../transformers";
import Home from "../home";

// The transform functions are already unit tested, so replace them with stubs
jest.mock("../transformers", () => {
  // TODO: use Transformer type (or will Jest KNOWWW that it should be same TYPE??? :O)
  return {
    css2js: {
      id: 0,
      name: "CSS => JS object",
      transform: jest.fn(x => x),
      from: "css",
      to: "js"
    },
    js2css: {
      id: 1,
      name: "JS object => CSS",
      transform: jest.fn(x => x),
      from: "js",
      to: "css"
    }
  };
});

describe("<Home />", () => {
  test("renders without exploding", () => {
    render(<Home />);
  });

  test("has an element that lets the user enter text", () => {
    const { getByRole } = render(<Home />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  test("calls the default transform function on load", () => {
    render(<Home />);
    const transformFunction = transformersMock.css2js.transform;
    wait(() => expect(transformFunction.mock.toHaveBeenCalled(1)));
  });

  // TODO: do we really want to assert on the number of function calls?
  // Why not set the input (either by firing an event or setting the value on
  // the dom element) and wait for the output to be changed?

  // TODO: can we somehow abstract away from the "default transformer"?
  // Maybe just use the "first" transformer as default? Though that's less explicit
  // and makes it harder to understand how the default transformer is set.
});
