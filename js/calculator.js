"use strict";

// Button activator logic

function toggleClass(target, targetClass) {
  target.classList.toggle(targetClass);
}

const calculator = document.querySelector(".calculator");
document
  .querySelector("#activator")
  .addEventListener("click", () =>
    toggleClass(calculator, "calculator_active")
  );

// Calculator

const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".calculator__button");

let firstNumber = "",
  memory = "",
  operator = "";

function setValue(content) {
  if (
    content === "+" ||
    content === "-" ||
    content === "*" ||
    content === "/"
  ) {
    // Если до этого вводились операции, то нужно досчитать их. Иначе просто сохраняем первое число после ввода оператора
    if (operator !== "") {
      calculate(firstNumber, +memory, operator);
      memory = "";
    } else {
      // Если я продолжаю после =, то вспомнить последний результат
      if (!firstNumber) {
        firstNumber = +memory;
        memory = "";
      }
    }
    operator = content;
    screen.value += content;
  } else {
    memory += content;
    screen.value += content;
  }
}

function sum(num1, num2) {
  return +num1 + +num2;
}
function substract(num1, num2) {
  return +num1 - +num2;
}
function multyply(num1, num2) {
  return +num1 * +num2;
}
function divide(num1, num2) {
  return +num1 / +num2;
}

function setResult(value) {
  screen.value = value;
  firstNumber = value;
  memory = "";
  operator = "";
}

function reset() {
  screen.value = "";
  firstNumber = "";
  memory = "";
  operator = "";
}

function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      setResult(sum(num1, num2));
      break;
    case "-":
      setResult(substract(num1, num2));
      break;
    case "*":
      setResult(multyply(num1, num2));
      break;
    case "/":
      setResult(divide(num1, num2));
      break;
  }
}

buttons.forEach((button) => {
  const content = button.textContent;
  if (button.id === "enter") {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      calculate(firstNumber, memory, operator);
    });
  } else if (button.id === "clear") {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      reset();
    });
  } else {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      setValue(content);
    });
  }
});
