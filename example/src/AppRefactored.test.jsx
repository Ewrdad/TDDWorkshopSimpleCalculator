import App from "./App.jsx";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

/**-----------------------------------------------------------------------------------------------------------------------
 * ! Refactored Example Tests TDD
 * These are some examples that can be used for TDD
 * They are written in chronological order meaning Id have to write the first test first
 *
 * This has been refactored so no longer shows the full journey
 * To see the full journey check App.test.jsx
 *-----------------------------------------------------------------------------------------------------------------------**/

//Components
const inputA = () => screen.getByPlaceholderText("Enter first number");
const inputB = () => screen.getByPlaceholderText("Enter second number");
const button = () => screen.getByRole("button", { name: "Calculate Now" });
const results = () => screen.getByLabelText("Results");

describe("App: structure tests", () => {
  it("has a header ", async () => {
    render(<App />);
    expect(await screen.findByText("Simple Calculator")).toBeInTheDocument();
    expect(true).toBeTruthy();
  });

  it("has 2 number inputs", async () => {
    render(<App />);

    expect(inputA()).toHaveAttribute("type", "number");
    expect(inputB()).toHaveAttribute("type", "number");
  });

  it("has a calculate button that is a button", async () => {
    render(<App />);

    expect(button()).toBeInTheDocument();
  });

  it("has a results section", async () => {
    render(<App />);

    expect(results()).toBeInTheDocument();
  });
});

describe("App: functionality tests", () => {
  it("should let you type in the first input", async () => {
    render(<App />);

    await fireEvent.change(inputA(), { target: { value: 5 } });

    expect(inputA()).toHaveValue(5);
  });

  it("should let you type in the second input", async () => {
    render(<App />);

    await fireEvent.change(inputB(), { target: { value: 5 } });

    expect(inputB()).toHaveValue(5);
  });

  it("should only let you type numbers in the first input", async () => {
    render(<App />);

    await fireEvent.change(inputA(), { target: { value: "a" } });

    expect(inputA()).toHaveValue(null);
  });

  it("should only let you type numbers in the second input", async () => {
    render(<App />);

    await fireEvent.change(inputB(), { target: { value: "a" } });

    expect(inputB()).toHaveValue(null);
  });

  it("should display something in the results section when the button is clicked", async () => {
    render(<App />);
    expect(results()).toBeEmptyDOMElement();

    fireEvent.click(button());

    expect(results()).not.toBeEmptyDOMElement();
  });

  it("should display the correct result when the button is clicked", async () => {
    render(<App />);

    await fireEvent.change(inputA(), { target: { value: 5 } });
    await fireEvent.change(inputB(), { target: { value: 3 } });

    fireEvent.click(button());

    expect(results()).toHaveTextContent("15");
  });

  it("Should return zero if first input is empty", async () => {
    render(<App />);

    expect(inputA()).toHaveValue(null);

    await fireEvent.change(inputB(), { target: { value: 3 } });

    fireEvent.click(button());

    expect(results()).toHaveTextContent("0");
  });

  it("should return zero if second input is empty", async () => {
    render(<App />);

    await fireEvent.change(inputA(), { target: { value: 5 } });

    expect(inputB()).toHaveValue(null);

    fireEvent.click(button());

    expect(results()).toHaveTextContent("0");
  });
});
