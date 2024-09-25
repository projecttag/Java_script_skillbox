let n = 0;
let m = 100;

let range = Math.abs(n - m);
let numberInRange = Math.round(Math.random() * range);         // первое случайное число
let numberInRangeSecond = Math.round(Math.random() * range);   // второе случайное число
let min = Math.min(n, m);

let firstNumber = min + numberInRange;      // итоговое первое число
let secondNumber = min + numberInRangeSecond; // итоговое второе число

console.log(firstNumber);  // вывод в консоль, первое число
console.log(secondNumber); // вывод в консоль, второе число

// Сравнения двух получившихся чисел
console.log('Первое число больше второго?', firstNumber > secondNumber);
console.log('Первое число меньше второго?', firstNumber < secondNumber);
console.log('Первое число больше или равно второму?', firstNumber >= secondNumber);
console.log('Первое число меньше или равно второму?', firstNumber <= secondNumber);
console.log('Первое число равно второму?', firstNumber === secondNumber);
console.log('Первое число не равно второму?', firstNumber !== secondNumber);
