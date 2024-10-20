// Массив объектов студентов
let allStudents = [
    { name: 'Валя', age: 11 },
    { name: 'Таня', age: 24 },
    { name: 'Рома', age: 21 },
    { name: 'Надя', age: 34 },
    { name: 'Антон', age: 7 }
];

// Функция для создания списка студентов
function createStudentsList(listArr) {
    // Проверяем, существует ли уже список
    if (document.querySelector('ul')) {
        return; // Если список уже существует, ничего не делаем
    }

    // Создаем элемент ul
    const studentsList = document.createElement('ul');

    // Проходим по каждому объекту студента в массиве
    for (let i = 0; i < listArr.length; i++) {
        // Создаем элемент li для каждого студента
        const listItem = document.createElement('li');

        // Создаем h2 для имени студента
        const studentName = document.createElement('h2');
        studentName.textContent = listArr[i].name;

        // Создаем span для возраста студента
        const studentAge = document.createElement('span');
        studentAge.textContent = `Возраст: ${listArr[i].age} лет`;

        // Вставляем имя и возраст в li
        listItem.appendChild(studentName);
        listItem.appendChild(studentAge);

        // Добавляем li в ul
        studentsList.appendChild(listItem);
    }

    // Добавляем ul на страницу после кнопки
    const button = document.getElementById('showStudentsBtn');
    button.insertAdjacentElement('afterend', studentsList);
}

// Привязываем событие клика к кнопке
document.getElementById('showStudentsBtn').addEventListener('click', function() {
    createStudentsList(allStudents); // Вызываем функцию для отображения списка студентов
});
