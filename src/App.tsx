import React, { useState } from "react";
import Button from "./components/common/Button";

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleButtonClick = (label: string) => {
    if (!isNaN(Number(label))) {
      setDisplay((prev) => (prev === "0" ? label : prev + label));
    } else if (label === "C") {
      setDisplay("0");
      setFirstOperand(null);
      setOperator(null);
    } else if (label === "=") {
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, Number(display), operator);
        setDisplay(` ${result}`);
        setFirstOperand(null);
        setOperator(null);
      }
    } else {
      if (firstOperand === null) {
        setFirstOperand(Number(display));
        setOperator(label);
        setDisplay("0");
      } else if (operator) {
        const result = calculate(firstOperand, Number(display), operator);
        setFirstOperand(result);
        setDisplay("0");
        setOperator(label);
      }
    }
  };

  const calculate = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : 0; // Handle division by zero
      default:
        return b;
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="display">
          {firstOperand !== null && `${firstOperand} ${operator ?? ""} `}
          {display}
        </div>
        <div className="buttons">
          {["7", "8", "9", "C"].map((label) => (
            <Button
              key={label}
              label={label}
              onClick={() => handleButtonClick(label)}
              className={label === "C" ? "operation" : ""}
            />
          ))}
          {["4", "5", "6", "*"].map((label) => (
            <Button
              key={label}
              label={label}
              onClick={() => handleButtonClick(label)}
              className={label === "*" ? "operation" : ""}
            />
          ))}
          {["1", "2", "3", "-"].map((label) => (
            <Button
              key={label}
              label={label}
              onClick={() => handleButtonClick(label)}
              className={label === "-" ? "operation" : ""}
            />
          ))}
          {["0", "/", "+", "="].map((label) => (
            <Button
              key={label}
              label={label}
              onClick={() => handleButtonClick(label)}
              className={label === "=" ? "operation" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
