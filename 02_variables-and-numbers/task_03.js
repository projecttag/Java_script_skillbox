let n = 0;
let m = 100;

let range = Math.abs(n - m);
let numberInRange = Math.round(Math.random() * range);
let min = Math.min(n,m);
let max = Math.max(n,m);

// console.log(min + numberInRange);
// console.log(max + numberInRange);

console.log('Первое число больше', max > min);
console.log('Первое число больше', max < min);
console.log('Первое число больше', max >= min);
console.log('Первое число больше', max <= min);
console.log('Первое число больше', max === min);
console.log('Первое число больше', max !== min);
