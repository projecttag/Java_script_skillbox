// Функция для создания карточки студента
function createStudentCard(student) {
    // Создаем элемент div для карточки
    const card = document.createElement('div');

    // Применяем класс стилей к карточке
    card.className = 'student-card';

    // Создаем заголовок h2 с именем студента
    const studentName = document.createElement('h2');
    studentName.textContent = student.name;

    // Создаем span с возрастом студента
    const studentAge = document.createElement('span');
    studentAge.textContent = `Возраст: ${student.age} лет`;

    // Вставляем элементы в карточку
    card.appendChild(studentName);
    card.appendChild(studentAge);

    // Добавляем карточку на страницу в body
    document.body.appendChild(card);
}

// Пример использования функции
let studentObj = {
    name: 'Игорь',
    age: 17
};

createStudentCard(studentObj);  // Создаст карточку для студента Игорь
