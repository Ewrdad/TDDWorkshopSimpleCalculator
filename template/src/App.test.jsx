import App from "./App.jsx";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("App: structure tests", () => {
  it("has a header ", async () => {
    render(<App />);
    expect(await screen.findByText("Simple Calculator")).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});
