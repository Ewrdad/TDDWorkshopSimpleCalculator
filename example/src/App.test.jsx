import App from "./App.jsx";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

/*-----------------------------------------------------------------------------------------------------------------------
 * !  Example Tests TDD
 * These are some examples that can be used for TDD
 * They are written in chronological order meaning Id have to write the first test first
 *
 * To maintain the order of the tests some larger refactors have been skipped
 * To See refactored tests check AppRefactored.test.jsx
 *-----------------------------------------------------------------------------------------------------------------------*/

describe("App: structure tests", () => {
  it("has a header ", async () => {
    render(<App />);
    expect(await screen.findByText("Simple Calculator")).toBeInTheDocument();
    expect(true).toBeTruthy();
  });

  it("has 2 inputs", async () => {
    render(<App />);

    const inputA = screen.getByPlaceholderText("Enter first number");
    const inputB = screen.getByPlaceholderText("Enter second number");

    expect(inputA).toBeInTheDocument();
    expect(inputB).toBeInTheDocument();
  });

  it("has 2 number inputs", async () => {
    render(<App />);

    const inputA = screen.getByPlaceholderText("Enter first number");
    const inputB = screen.getByPlaceholderText("Enter second number");

    expect(inputA).toHaveAttribute("type", "number");
    expect(inputB).toHaveAttribute("type", "number");
  });

  it("has a calculate button", async () => {
    render(<App />);

    const button = screen.getByText("Calculate Now");

    expect(button).toBeInTheDocument();
  });

  it("has a calculate button that is a button", async () => {
    render(<App />);

    const button = screen.getByRole("button", { name: "Calculate Now" });

    expect(button).toBeInTheDocument();
  });

  it("has a results section", async () => {
    render(<App />);

    const results = screen.getByLabelText("Results");

    expect(results).toBeInTheDocument();
  });
});

describe("App: functionality tests", () => {
  it("should let you type in the first input", async () => {
    render(<App />);

    const inputA = screen.getByPlaceholderText("Enter first number");

    await fireEvent.change(inputA, { target: { value: 5 } });

    expect(inputA).toHaveValue(5);
  });

  it("should let you type in the second input", async () => {
    render(<App />);

    const inputB = screen.getByPlaceholderText("Enter second number");

    await fireEvent.change(inputB, { target: { value: 5 } });

    expect(inputB).toHaveValue(5);
  });

  it("should only let you type numbers in the first input", async () => {
    render(<App />);

    const inputA = screen.getByPlaceholderText("Enter first number");

    await fireEvent.change(inputA, { target: { value: "a" } });

    expect(inputA).toHaveValue(null);
  });

  it("should only let you type numbers in the second input", async () => {
    render(<App />);

    const inputB = screen.getByPlaceholderText("Enter second number");

    await fireEvent.change(inputB, { target: { value: "a" } });

    expect(inputB).toHaveValue(null);
  });

  it("should display something in the results section when the button is clicked", async () => {
    render(<App />);
    const results = screen.getByLabelText("Results");
    expect(results).toBeEmptyDOMElement();

    const button = screen.getByRole("button", { name: "Calculate Now" });
    fireEvent.click(button);

    expect(results).not.toBeEmptyDOMElement();
  });

  it("should display the correct result when the button is clicked", async () => {
    render(<App />);
    const results = screen.getByLabelText("Results");

    const inputA = screen.getByPlaceholderText("Enter first number");
    const inputB = screen.getByPlaceholderText("Enter second number");

    await fireEvent.change(inputA, { target: { value: 5 } });
    await fireEvent.change(inputB, { target: { value: 3 } });

    const button = screen.getByRole("button", { name: "Calculate Now" });
    fireEvent.click(button);

    expect(results).toHaveTextContent("15");
  });

  it("Should return zero if first input is empty", async () => {
    render(<App />);

    const inputA = screen.getByPlaceholderText("Enter first number");
    expect(inputA).toHaveValue(null);

    const inputB = screen.getByPlaceholderText("Enter second number");

    await fireEvent.change(inputB, { target: { value: 3 } });

    const button = screen.getByRole("button", { name: "Calculate Now" });
    fireEvent.click(button);

    const results = screen.getByLabelText("Results");

    expect(results).toHaveTextContent("0");
  });

  it("should return zero if second input is empty", async () => {
    render(<App />);

    const inputA = screen.getByPlaceholderText("Enter first number");

    await fireEvent.change(inputA, { target: { value: 5 } });

    const inputB = screen.getByPlaceholderText("Enter second number");
    expect(inputB).toHaveValue(null);

    const button = screen.getByRole("button", { name: "Calculate Now" });
    fireEvent.click(button);

    const results = screen.getByLabelText("Results");

    expect(results).toHaveTextContent("0");
  });
});
