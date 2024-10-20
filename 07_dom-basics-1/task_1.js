// Функция для создания карточки студента
function createStudentCard(name, age) {
    // Создаем элемент div для карточки
    const card = document.createElement('div');

    // Применяем класс стилей к карточке
    // Использование className для установки классов в JavaScript позволяет
    // динамически применять стили к элементам на веб-странице, что делает ваш интерфейс более гибким и интерактивным.
    card.className = 'student-card';

    // Создаем заголовок h2 с именем студента
    const studentName = document.createElement('h2');
    studentName.textContent = name;

    // Создаем span с возрастом студента
    const studentAge = document.createElement('span');
    studentAge.textContent = `Возраст: ${age} лет`;

    // Вставляем элементы в карточку
    card.appendChild(studentName);
    card.appendChild(studentAge);

    // Добавляем карточку на страницу в body
    document.body.appendChild(card);
}

// Пример вызова функции
createStudentCard('Игорь', 17);

