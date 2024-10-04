let arr1 = [2, 2, 17, 21, 45, 12, 54, 31, 53];
let arr2 = [12, 44, 23, 5];

let result = [];
let totalLength = arr1.length + arr2.length;

for (let i = 0; i < totalLength; i++) {
    if (i < arr1.length) {
        result.push(arr1[i]); // Добавляем элементы из arr1
    } else {
        result.push(arr2[i - arr1.length]); // Добавляем элементы из arr2
    }
}

console.log(result);
