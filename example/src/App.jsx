import "./App.css";
import { useState } from "react";

/**
 * @alias App
 * @description A simple App that calculates the product of two numbers
 * @example <App />
 * @returns {JSX.Element} App
 * @tests ./App.test.jsx ./AppRefactored.test.jsx
 */
function App() {
  const [Result, setResult] = useState("");
  const [FirstNumber, setFirstNumber] = useState();
  const [SecondNumber, setSecondNumber] = useState();

  return (
    <>
      <div>
        <h1>Simple Calculator</h1>
      </div>
      <div className="card">
        <p>Calculator here</p>
        <input
          type="number"
          placeholder="Enter first number"
          onChange={(event) => {
            setFirstNumber(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Enter second number"
          onChange={(event) => {
            setSecondNumber(event.target.value);
          }}
        />
        <button
          onClick={() => {
            setResult(parseInt(FirstNumber) * parseInt(SecondNumber));
          }}
        >
          Calculate Now
        </button>

        <h3 aria-label="Results">{Number.isNaN(Result) ? "0" : Result}</h3>
      </div>
    </>
  );
}

export default App;
