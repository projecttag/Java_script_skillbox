let n = 0;
let m = 100;

let range = Math.abs(n - m);
let numberInRange = Math.round(Math.random() * range);         // numberInRange помещен в переменную let
let numberInRangeSecond = Math.round(Math.random() * range);   // numberInRangeSecond помещен в переменную let
let min = Math.min(n,m);

console.log(min + numberInRange);       // вывод в консоль, первое число
console.log(min + numberInRangeSecond); // вывод в консоль, второе число

console.log('Первое число больше второго?', numberInRange > numberInRangeSecond); // исправлено, тк сравниваем числа друг с другом а не min и min
console.log('Первое число меньше второго?', numberInRange < numberInRangeSecond);
console.log('Первое число больше или равно второму?', numberInRange >= numberInRangeSecond);
console.log('Первое число меньше или равно второму?', numberInRange <= numberInRangeSecond);
console.log('Первое число равно второму?', numberInRange === numberInRangeSecond);
console.log('Первое число не равно второму?', numberInRange !== numberInRangeSecond);
