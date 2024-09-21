let n = 0;
let m = 100;

let range = Math.abs(n - m);
let numberInRange = Math.round(Math.random() * range);
let min = Math.min(n,m);
console.log(min + numberInRange);