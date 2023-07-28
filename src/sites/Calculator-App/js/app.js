const calculator = document.getElementById("calculator-interface");
const display = document.getElementById("display");
const operandDisplay = document.getElementById("operand");
let currentOper = "";
let currentOperValue = "";
let currentDisplay = "default";
let displayText = "";
let currentVal = "";
let totalVal = "";
let readyToCalc = false;
let totaled = false;
let hasDecimal = false;
let operands = [`X<sup>Y</sup>`, `+`, `-`, `*`, `&#247;`];

/**
 * Resets the numerical display of the calculator
 */
const resetDisplay = () => {
  display.textContent = "";
  displayText = display.textContent;
};

/**
 * Returns value to null.
 */
const resetCurrentValue = () => {
  currentVal = "";
};

/**
 * Code to convert value to scientific notation with two decimals
 * Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential
 *
 * @param {number} x The number that will be parsed into scientific notation.
 * @param {number} f The number of digits after the decimal.
 * @return {string} represting the number x in scientific notation with f number of digts after the decimal
 */
function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

/**
 * updates the total value based on the current operation that is selected and displays it to the calculator display when it is finished.
 *
 */
const parseTotalValue = () => {
  if (currentOper === "exponent") {
    totalVal = Math.pow(totalVal, parseFloat(currentVal));
  } else if (currentOper === "add") {
    totalVal += parseFloat(currentVal);
  } else if (currentOper === "subtract") {
    totalVal -= parseFloat(currentVal);
  } else if (currentOper === "multiply") {
    totalVal = parseFloat(totalVal) * parseFloat(currentVal);
  } else if (currentOper === "divide") {
    totalVal = parseFloat(totalVal) / parseFloat(currentVal);
  }
  if (totalVal > 999999999) {
    totalVal = expo(totalVal, 2);
  }
  display.innerText = totalVal;
};

/**
 * Displays the currently selected operation in the corner of the calculator display
 *
 */
const displayCurrentOper = () => {
  if (currentOper === "exponent") {
    currentOperValue = operands[0];
    operandDisplay.style.fontSize = `1rem`;
  } else if (currentOper === "add") {
    currentOperValue = operands[1];
    operandDisplay.style.fontSize = `1.25rem`;
  } else if (currentOper === "subtract") {
    currentOperValue = operands[2];
    operandDisplay.style.fontSize = `1.25rem`;
  } else if (currentOper === "multiply") {
    currentOperValue = operands[3];
    operandDisplay.style.fontSize = `1.25rem`;
  } else if (currentOper === "divide") {
    currentOperValue = operands[4];
    operandDisplay.style.fontSize = `1.25rem`;
  }
  operandDisplay.innerHTML = currentOperValue;
};

/**
 * Takes the current value and modifies it with the supplied number before updating the calculator display
 * @param {number} num The number that will update the current value before it's displayed
 */
const updateDisplay = (num) => {
  currentVal += num;
  currentDisplay = "num";
  displayText += num;
  display.textContent = displayText;
};

/**
 * When a number is pressed on the calculator, a function to perform is selected based on the current operation
 *
 * @param {number} num The number being pressed on the calculator to use in operations.

 */
const parseNum = (num) => {
  if (currentDisplay === "default" || currentDisplay === "oper" || totaled) {
    resetDisplay();
    resetCurrentValue();
  }
  if (currentDisplay === "oper") {
    readyToCalc = true;
  }
  if (totaled) {
    totalVal = "";
    totaled = false;
    readyToCalc = false;
  }
  updateDisplay(num);
};

/**
 * Decides which function to perform when decimal key is pressed on calculator based on current calculator state
 */
const parseDecimal = () => {
  if (totaled) {
    totalVal = "";
    totaled = false;
    readyToCalc = false;
    resetCurrentValue();
    resetDisplay();
  }
  if (!hasDecimal) {
    if (currentDisplay === "default" || currentDisplay === "oper") {
      currentDisplay = "num";
      resetDisplay();
      updateDisplay("0.");
    } else if (currentDisplay === "num") {
      updateDisplay(".");
    }
    hasDecimal = true;
  }
};

/**
 * Decides what to do when an operand button on the calculator is pressed, will set current oper to pressed oper and display it as well
 *
 * @param {string} oper String name of operand to be performed
 */
const parseOper = (oper) => {
  if (readyToCalc) {
    parseTotalValue();
  } else {
    totalVal = parseFloat(currentVal);
  }
  if (totaled) {
    totaled = false;
  }
  currentOper = oper;
  currentDisplay = "oper";
  displayCurrentOper();
  hasDecimal = false;
};

/**
 * Parses the total value when equal sign is pressed and displays it to calculator display, also resets hasDecimal and currentOper values
 *
 */
const equals = () => {
  parseTotalValue();
  display.innerText = totalVal;
  operandDisplay.innerText = "";
  totaled = true;
  hasDecimal = false;
  currentOper = "";
};

/**
 * Returns calculator back to starting state
 */
const clearEverything = () => {
  resetDisplay();
  resetCurrentValue();
  updateDisplay("0");
  currentDisplay = "default";
  currentOper = "";
  currentOperValue = "";
  operandDisplay.innerHTML = "";
  hasDecimal = false;
  totaled = false;
  readyToCalc = false;
};

/**
 * Clears calculator displayed value without resetting stored value/operand
 *
 */
const clearDisplay = () => {
  resetDisplay();
  updateDisplay("0");
  currentDisplay = "default";
};

/**
 * Decides what to do when one of the function buttons is pressed
 *
 * @param {string} funct The name of the function that will be performed
 */
const parseFunct = (funct) => {
  if (funct === "equals" && readyToCalc) {
    equals();
  } else if (funct === "clear-everything") {
    clearEverything();
  } else if (funct === "clear-display") {
    clearDisplay();
  }
};

/**
 * primary calculator listener, listens for buttons to be pressed and depending on the class of button and current calculator state initiates the calculator's various functions
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
calculator.addEventListener("click", (e) => {
  const btn = e.target;
  if (btn.id !== "calculator-interface") {
    if (btn.classList.contains("num")) {
      parseNum(btn.id);
    } else if (btn.classList.contains("oper")) {
      if (currentDisplay === "num" || currentDisplay === "oper")
        parseOper(btn.id);
    } else if (btn.classList.contains("funct")) {
      parseFunct(btn.id);
    } else if (btn.classList.contains("dec")) {
      parseDecimal();
    }
  }
});
