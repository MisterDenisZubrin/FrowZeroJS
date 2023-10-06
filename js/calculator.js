"use strict";

const calculator = document.querySelector(".calculator");
const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".calculator__button");

// Button activator logic

function toggleClass(target, targetClass) {
  target.classList.toggle(targetClass);
}

document.querySelector("#activator").addEventListener("click", () => {
  toggleClass(calculator, "calculator_active");
  if (calculator.classList.contains("calculator_active")) {
    screen.focus();
  }
});

// Calculator

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
    // Защита от 0 в начале числа
    if (firstNumber === "" && content === "0" && memory === "0") {
      firstNumber = 0;
      screen.value = 0;
      memory = "0";
    } else {
      if (!(content === "0" && memory === "0")) {
        if (memory === "0" && content !== "0") {
          memory = content;
          screen.value = screen.value.slice(0, -1) + memory;
        } else {
          screen.value += content;
          memory += content;
        }
      }
    }
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

// Ввод с клавиатуры

calculator.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate(firstNumber, memory, operator);
  } else if (e.key === ".") {
    e.preventDefault();
    reset();
  } else if (
    (e.key >= 0 && e.key <= 9) ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/"
  ) {
    e.preventDefault();
    setValue(e.key);
  }
});

// включение калькулятора через NumLock
// Идея в том, чтобы можно было активировать калькулятор при включении NumLock и работать только с правой частью клавиатуры. По приколу
// Ничего не мешает забиндить на другую клавишу, но нужно будет дополнительно включить проверку на расфокус, иначе при наборе текста в поле будет открываться калькулятор

document.addEventListener("keydown", (e) => {
  if (e.key === "NumLock" && e.getModifierState("NumLock") === true) {
    e.preventDefault();
    calculator.classList.add("calculator_active");
    screen.focus();
  } else if (e.key === "NumLock" && e.getModifierState("NumLock") === false) {
    e.preventDefault();
    calculator.classList.remove("calculator_active");
  }
});
