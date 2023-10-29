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
    ')': '(',
    ']': '[',
    '}': '{'
  };
  let start = '', finish = ''; // Для проверки на вложенность (по условию они должны быть вложенные)

  for (let current of str.split('')) {
    if ([')', ']', '}'].indexOf(current) > -1) { // Проверка на закрывающую скобку
      start === '' ? start = current : finish = current 
      if (pairs[current] !== stack.pop()) {
        return false
      }
    } else {
      stack.push(current);
      start === '' ? start = current : finish = current
    }
  }

  if (pairs[finish] === start) {
    return stack.length === 0; // Стек пустой = все хорошо,true
  } else {
    return false
  }
  
}
let bracketsResultString = '';
console.log(checkBrackets("{{}}")); //true
console.log(checkBrackets("{()}")); //true
console.log(checkBrackets("{{}")); //false
console.log(checkBrackets("{(})")); //false
console.log(checkBrackets("(){}")); //false

bracketsResultString += `${checkBrackets("{{}}")} `;bracketsResultString += `${checkBrackets("{()}")} `;bracketsResultString += `${checkBrackets("{{}")} `;bracketsResultString += `${checkBrackets("{(})")} `;bracketsResultString += `${checkBrackets("(){}")} `;
document.querySelector('#task3').insertAdjacentText('beforeend', bracketsResultString);

// Комментарий. Довольно долго искал регулярное выражение, не нашел
// Наконец то увидел применение FIFO, FILO, LIFO и тд. Хочу еще попрактиковаться с алгоритмами
