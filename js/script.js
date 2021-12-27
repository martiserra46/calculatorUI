import { canvasUI } from "./canvas_ui/canvas_ui.js";
import { calculatorUI } from "./ui/calculator.js";

canvasUI.ui.newUI("#ui").init(calculatorUI.root);

const operation = [];

const displayOperation = function () {
  if (operation.length === 0) {
    calculatorUI.displayText.setProperty("text", "0");
    return;
  }
  let text = "";
  for (const value of operation) text += `${value}`;
  calculatorUI.displayText.setProperty("text", text);
};

const compute = function (operator, first, second) {
  return operator === "*"
    ? first * second
    : operator === "/"
    ? first / second
    : operator === "+"
    ? first + second
    : operator === "-"
    ? first - second
    : 0;
};

calculatorUI.numberButtons.forEach((button) => {
  button.addListener("mouseClick", function (component, event) {
    const number = component.get("number");
    if (operation.length === 0) {
      operation.push(number);
      displayOperation();
      return;
    }
    if (typeof operation[operation.length - 1] === "number") {
      let lastNumber = operation.pop();
      lastNumber = lastNumber * 10 + number;
      operation.push(lastNumber);
      displayOperation();
    }
    if (typeof operation[operation.length - 1] === "string") {
      operation.push(number);
      displayOperation();
    }
  });
});

calculatorUI.operatorButtons.forEach((button) => {
  button.addListener("mouseClick", function (component, event) {
    const operator = component.get("operator");
    if (operation.length === 0) return;
    if (typeof operation[operation.length - 1] === "string") return;
    operation.push(operator);
    displayOperation();
  });
});

calculatorUI.deleteButton.addListener(
  "mouseClick",
  function (component, event) {
    operation.splice(0, operation.length);
    displayOperation();
  }
);

calculatorUI.equalsButton.addListener(
  "mouseClick",
  function (component, event) {
    if (typeof operation[operation.length - 1] === "string") return;
    const operators = ["*", "/", "+", "-"];
    while (operators.length > 0) {
      const operator = operators.shift();
      for (let i = 0; i < operation.length; i++) {
        if (operation[i] === operator) {
          const prev = operation[i - 1];
          const next = operation[i + 1];
          const result = compute(operator, prev, next);
          operation.splice(i - 1, 3, result);
          i--;
        }
      }
    }
    displayOperation();
  }
);
