
let first = 13.1 + 0.2 + 0.3 + 0.4 + 0.5;
let second = 13.12345;
let precision = 5;

let firstNormalized =  Math.round(first * Math.pow(10, precision));
let secondNormalized =  Math.round(second * Math.pow(10, precision));

console.log('Первое число больше', first > second );
console.log('Первое число меньше', first < second );
console.log('Первое число больше больше или равно', first >= second );
console.log('Первое число меньше или равно', first <= second );
console.log('Первое равно второму', first === second );
console.log('Первое число не равно второму', first !== second );