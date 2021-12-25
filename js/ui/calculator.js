import { canvasUI } from "./../canvas_ui/canvas_ui.js";

const newButton = function (options) {
  const text = options.text ?? "";
  const fontColor = options.fontColor ?? "#000";
  const backgroundColor = options.backgroundColor ?? "#dee2e6";
  const backgroundColorOnClick = options.backgroundColorOnClick ?? "#e9ecef";
  const borderColor = options.borderColor ?? "#c0c0c0";

  return canvasUI.views.newView({
    type: "button",
    properties: {
      size: {
        width: ["%", 100],
        height: ["%", 100],
      },
      text,
      fontSize: 24,
      fontColor,
      fontWeight: 900,
      backgroundColor,
      backgroundColorOnClick,
      borderColor,
      borderSize: 2,
    },
  });
};

const newNumberButton = function (number) {
  const button = newButton({
    text: `${number}`,
  });
  button.set("number", number);
  return button;
};

const newOperatorButton = function (operator) {
  const button = newButton({
    text: operator,
    fontColor: "#FFF",
    backgroundColor: "#ff9100",
    backgroundColorOnClick: "#f6bd60",
    borderColor: "#ff5400",
  });
  button.set("operator", operator);
  return button;
};

const root = canvasUI.layouts.newLayout({
  type: "frame",
});

const calculator = canvasUI.layouts.newLayout({
  type: "grid",
  properties: {
    size: {
      width: ["px", 480],
      height: ["px", 600],
    },
    dimensions: {
      columns: [
        ["fr", 1, 3],
        ["px", 100, 1],
      ],
      rows: [["fr", 1, 5]],
    },
    gap: {
      horizontal: 20,
      vertical: 20,
    },
  },
});

root.addChild(calculator, {
  gravity: {
    horizontal: "middle",
    vertical: "middle",
  },
});

const displayText = canvasUI.views.newView({
  type: "text",
  properties: {
    size: {
      width: ["%", 100],
      height: ["px", 80],
    },
    text: "0",
    align: {
      horizontal: "right",
    },
    margin: 24,
    fontSize: 32,
    fontWeight: 900,
    fontColor: "#000",
    borderColor: "#c0c0c0",
    borderSize: 2,
  },
});

calculator.addChild(displayText, {
  span: [4, 1],
});

const numberButtons = [];
for (let i = 0; i <= 9; i++) numberButtons.push(newNumberButton(i));

calculator.addChild(numberButtons[0], { position: [0, 4] });

for (let num = 1; num <= 9; num++) {
  const column = (num - 1) % 3;
  const row = 3 - Math.floor((num - 1) / 3);
  calculator.addChild(numberButtons[num], {
    position: [column, row],
  });
}

const operatorButtons = [];
for (const operator of ["+", "-", "*", "/"])
  operatorButtons.push(
    newOperatorButton(operator, {
      text: operator,
      fontColor: "#FFF",
      backgroundColor: "#ff9100",
      backgroundColorOnClick: "#f6bd60",
      borderColor: "#ff5400",
    })
  );

for (let i = 0; i < 4; i++) {
  const column = 3;
  const row = i + 1;
  calculator.addChild(operatorButtons[i], {
    position: [column, row],
  });
}

const equalsButton = newButton({
  text: "=",
  fontColor: "#FFF",
  backgroundColor: "#ff9100",
  backgroundColorOnClick: "#f6bd60",
  borderColor: "#ff5400",
});

calculator.addChild(equalsButton, { position: [1, 4] });

const deleteButton = newButton({
  text: "DEL",
  fontColor: "#FFF",
  backgroundColor: "#ff9100",
  backgroundColorOnClick: "#f6bd60",
  borderColor: "#ff5400",
});

calculator.addChild(deleteButton, {
  position: [2, 4],
});

export const calculatorUI = {
  root,
  displayText,
  numberButtons,
  operatorButtons,
  equalsButton,
  deleteButton,
};
