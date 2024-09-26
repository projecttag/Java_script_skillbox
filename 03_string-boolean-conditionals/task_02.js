// Входные данные фамилия и имя
let userName = "KRapivinA";
let userSurname = "oLgA";

// Преобразование имени
let formattedName = userName.substring(0, 1).toUpperCase() + userName.substring(1).toLowerCase();
// Преобразование фамилии
let formattedSurname = userSurname.substring(0, 1).toUpperCase() + userSurname.substring(1).toLowerCase();

// Вывод результатов
console.log("Имя:", formattedName);
console.log("Фамилия:", formattedSurname);

// Проверка изменений с помощью тернарного оператора тут заменили конструкцию иф и элс
console.log(userName === formattedName ? "Имя осталось без изменений" : "Имя было преобразовано");
console.log(userSurname === formattedSurname ? "Фамилия осталась без изменений" : "Фамилия была преобразована");
