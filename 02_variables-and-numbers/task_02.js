
let a = 13.123456789; // задано число с переменной а
let b = 2.123; // задано число с переменной b
let precision = 5; //задано округление в пять единиц после дробной части

// Извлечение дробной части числа
let aFraction = a - Math.floor(a);
let bFraction = b - Math.floor(b);

// Нормализация дробной части с учетом precision
let aNormalized =  Math.round(aFraction * Math.pow(10, precision));
let bNormalized =  Math.round(bFraction * Math.pow(10, precision));

// Сравнение чисел между собой aNormalized и bNormalized
console.log('Первое число больше', aNormalized > bNormalized );
console.log('Первое число меньше', aNormalized < bNormalized);
console.log('Первое число больше больше или равно', aNormalized >= bNormalized );
console.log('Первое число меньше или равно', aNormalized <= bNormalized );
console.log('Первое равно второму', aNormalized === bNormalized );
console.log('Первое число не равно второму', aNormalized !== bNormalized );
