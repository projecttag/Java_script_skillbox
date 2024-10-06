// Функция для расчета возраста

function getAge(birthYear) {
    // Устанавливаем текущий год как 2022
    let currentYear = 2022;

    // Рассчитываем возраст
    let age = currentYear - birthYear;

    // Возвращаем результат
    return age;
}

// Примеры вызова функции и вывод результатов в консоль
console.log(getAge(1998));
console.log(getAge(1991));
console.log(getAge(2007));
