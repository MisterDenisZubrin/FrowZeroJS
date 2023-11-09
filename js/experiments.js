"use strict";

// Задача 1

Number.prototype.plus = function (value) {
  return this + value;
};

Number.prototype.minus = function (value) {
  return this - value;
};

document.querySelector("#task1").innerHTML = (2).plus(3).minus(1);
console.log((2).plus(3).minus(1));

// Комментарий: знал про прототипирование, но вот так никогда не делал. Довольно просто

// Задача 2

let resultString = "";
setTimeout(() => {
  console.log(" one");
  resultString += " one";
});

Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(" two");
    resultString += " two";
  });
});

setTimeout(() => {
  console.log(" three");
  resultString += " three";
});

Promise.resolve().then(() => {
  console.log(" four");
  resultString += " four";
});

console.log(" five");
resultString += " five";

setTimeout(
  () => (document.querySelector("#task2").textContent = resultString),
  1000
);

// Комментарий: баг с отображением р оставил. Починить = убрать code из p
// код -> таймауты -> промисы

// Задача 3

function checkBrackets(str = "") {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  let start = "",
    finish = ""; // Для проверки на вложенность (по условию они должны быть вложенные)

  for (let current of str.split("")) {
    if ([")", "]", "}"].indexOf(current) > -1) {
      // Проверка на закрывающую скобку
      start === "" ? (start = current) : (finish = current);
      if (pairs[current] !== stack.pop()) {
        return false;
      }
    } else {
      stack.push(current);
      start === "" ? (start = current) : (finish = current);
    }
  }

  if (pairs[finish] === start) {
    return stack.length === 0; // Стек пустой = все хорошо,true
  } else {
    return false;
  }
}
let bracketsResultString = "";
console.log(checkBrackets("{{}}")); //true
console.log(checkBrackets("{()}")); //true
console.log(checkBrackets("{{}")); //false
console.log(checkBrackets("{(})")); //false
console.log(checkBrackets("(){}")); //false

bracketsResultString += `${checkBrackets("{{}}")} `;
bracketsResultString += `${checkBrackets("{()}")} `;
bracketsResultString += `${checkBrackets("{{}")} `;
bracketsResultString += `${checkBrackets("{(})")} `;
bracketsResultString += `${checkBrackets("(){}")} `;
document
  .querySelector("#task3")
  .insertAdjacentText("beforeend", bracketsResultString);

// Комментарий. Довольно долго искал регулярное выражение, не нашел
// Наконец то увидел применение FIFO, FILO, LIFO и тд. Хочу еще попрактиковаться с алгоритмами

// Задача 4

const textPlainFunction = (value) => {
  let converted_number = value.charCodeAt(0);
  for (let i = 0; i < 99; i += 1) {
    if (i % 2 == 0) {
      converted_number += i ** 2;
    } else {
      converted_number -= i ** 3;
    }
  }
  return converted_number;
};

const memoFunction = () => {
  const cache = {}; // Замыкается, значения не стираются!
  return (letter) => {
    if (letter in cache) {
      return ` Из кэша: ${cache[letter]}`;
    } else {
      const result = textPlainFunction(letter);
      cache[letter] = result;
      return ` Посчитано: ${result}`;
    }
  };
};

const memo = memoFunction();

let memoResultString = "";

memoResultString += memo("a");
memoResultString += memo("b");
memoResultString += memo("a");
memoResultString += memo("a");
memoResultString += memo("c");
memoResultString += memo("d");

document
  .querySelector("#task4")
  .insertAdjacentText("beforeend", memoResultString);

/* Вопросы:
 1. Догадался, что замыкания здесь идеально подходят.
 Никогда их не использовал, поэтому после попыток посмотрел как правильно это пишется. Можно ли это было сделать еще проще/красивее?
 2. Я увидел ненужные/неработающие строки как подсказки. Так ли это было на самом деле?
 3. Что означают эти возведения в степень? Это математически что-то делает?
 4. Как я должен был увидеть без отладчика, что это берется из кэша?
*/

// Задача 5

let colors = ["red", "green", "blue", "yellow", "green"];

const howMuchColors = (arr) => {
  const colorsObj = {};
  for (let color of arr) {
    if (colorsObj[color]) {
      colorsObj[color] += 1;
    } else {
      colorsObj[color] = 1;
    }
  }
  console.log(colorsObj);
  return colorsObj;
};

const exampleObj = {
  red: 1,
  green: 2,
  blue: 1,
  yellow: 1,
};

document
  .querySelector("#task5")
  .insertAdjacentText(
    "beforeend",
    JSON.stringify(exampleObj) === JSON.stringify(howMuchColors(colors))
  );

// Помню эту задачу =) Обход бинарного дерева, если не ошибаюсь
// Я очень счастлив, что смог её повторить не заглядывая в решения или старые записи! Значит запомнил!
// Тесты не писал, глубокое сравнение объектов решил не делать, сравнил объекты по топорному =)

// Задача 6

const monthsToHuman = (date) => {
  const dateISO = date.split("-").reverse().join("-");
  const humanDate = new Date(dateISO);
  return `${humanDate.toLocaleString("default", {
    day: "2-digit",
  })} ${humanDate.toLocaleString("ru", {
    month: "long",
  })} ${humanDate.getFullYear()} `;
};

let monthResultString = "";
monthResultString += monthsToHuman("1-01-2001");
monthResultString += monthsToHuman("12-12-2012");

document
  .querySelector("#task6")
  .insertAdjacentText("beforeend", monthResultString);

// Решил перевести в Date, чтобы пользоваться его методами

// Задача 7

const myNumber = 52345;

Number.prototype.getTotalSum = function (number) {
  return number
    .toString()
    .split("")
    .reduce((sum, digit) => sum + +digit, 0);
};

document
  .querySelector("#task7")
  .insertAdjacentText("beforeend", myNumber.getTotalSum(myNumber));

// После прошлых задач это было очень просто
