//Задание

// 1. Добавьте возможность сохранения списка студентов на сервере.
// 2. При запуске приложения должна быть выполнена проверка на наличие данных на сервере.
// Если данные есть, то нужно вывести список студентов на экран.
// 3.Добавьте возможность удаления студентов из списка.

let students = [
    {   id: 1,
        firstName: "Иван",
        lastName: "Иванов",
        middleName: "Иванович",
        birthDate: new Date('2000-01-01'),
        startYear: 2019,
        faculty: "Факультет компьютерных наук"
    },
    {   id: 2,
        firstName: "Анна",
        lastName: "Петрова",
        middleName: "Сергеевна",
        birthDate: new Date('1999-03-15'),
        startYear: 2018,
        faculty: "Факультет бизнеса"
    },
    {   id: 3,
        firstName: "Алексей",
        lastName: "Сидоров",
        middleName: "Александрович",
        birthDate: new Date('2001-07-20'),
        startYear: 2019,
        faculty: "Факультет инженерии"
    },
    {   id: 4,
        firstName: "Мария",
        lastName: "Кузнецова",
        middleName: "Михайловна",
        birthDate: new Date('2000-11-30'),
        startYear: 2019,
        faculty: "Факультет искусств"
    },
    {   id: 5,
        firstName: "Дмитрий",
        lastName: "Федоров",
        middleName: "Викторович",
        birthDate: new Date('1998-05-10'),
        startYear: 2017,
        faculty: "Факультет математики"
    },
    {   id: 6,
        firstName: "Ольга",
        lastName: "Смирнова",
        middleName: "Владимировна",
        birthDate: new Date('1997-12-05'),
        startYear: 2016,
        faculty: "Факультет филологии"
    }
];


//3 Функция удаления студента
async function deleteStudent(studentId) {
    try {
        const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Ошибка при удалении студента');
        }

        // После успешного удаления обновляем список студентов
        students = students.filter(student => student.id !== studentId); // Убираем студента из локального массива
        renderStudents(students); // Обновляем отображение студентов
    } catch (error) {
        console.error(error);
        // Можно добавить уведомление для пользователя, если возникла ошибка
    }
}

// Функция вывода одного студента
function createStudentRow(student) {
    const age = new Date().getFullYear() - student.birthDate.getFullYear();
    const graduationYear = student.startYear + 4;
    const currentYear = new Date().getFullYear();
    const course = currentYear >= graduationYear ? 'закончил' : `${currentYear - student.startYear} курс`;
    const formattedDate = `${student.birthDate.toLocaleDateString()} (${age} лет)`;
    return `
        <tr>
            <td>${student.lastName} ${student.firstName} ${student.middleName}</td>
            <td>${student.faculty}</td>
            <td>${formattedDate}</td>
            <td>${student.startYear}-${graduationYear} (${course})</td>
        </tr>
    `;
}


//2. Новая функция. Убрали Функцию отрисовки студентов и заменили на новую. Функция отрисовки студентов
function renderStudents(students) {
    const studentList = document.getElementById('student-table-body'); //!тут studentList был заменен на student-table-body
    studentList.innerHTML = ''; // Очищаем предыдущий список студентов

    if (students.length === 0) {
        studentList.innerHTML = '<tr><td colspan="5">Студенты не найдены</td></tr>';
        return;
    }

    students.forEach(student => {
        studentList.innerHTML += createStudentRow(student); // Добавляем строку для каждого студента
    });
}
// Вызовите функцию отрисовки студентов при загрузке страницы
renderStudents(students);

// Функция загрузки студентов
async function loadStudents() {
    try {
        const response = await fetch('http://localhost:3000/api/students');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке студентов');
        }

        const serverStudents = await response.json();
        if (serverStudents.length > 0) {
            students = serverStudents; // Сохраняем студентов, полученных с сервера
            renderStudents(students); // Отображаем студентов на странице
        } else {
            renderStudents([]); // Если студентов нет, отображаем пустой список
        }
    } catch (error) {
        console.error(error);
    }
}
// Вызываем функцию загрузки студентов при загрузке страницы
document.addEventListener('DOMContentLoaded', loadStudents);

// Валидация и добавление студента
document.getElementById('student-form').addEventListener('submit', async function(event) { // 4. добавлена ф-я async для исп await внутри обработчика событий
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const birthDate = document.getElementById('birthDate').valueAsDate;
    const startYear = Number(document.getElementById('startYear').value);
    const faculty = document.getElementById('faculty').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Валидация
    errorMessage.textContent = ''; // Очищаем сообщение об ошибке
    if (!firstName || !lastName || !middleName || !birthDate || !faculty) {
        errorMessage.textContent = 'Все поля обязательны для заполнения.';
        return;
    }

    if (birthDate < new Date('1900-01-01') || birthDate > new Date()) {
        errorMessage.textContent = 'Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты.';
        return;
    }

    if (startYear < 2000 || startYear > new Date().getFullYear()) {
        errorMessage.textContent = 'Год начала обучения должен быть в диапазоне от 2000 до текущего года.';
        return;
    }

    // Создаем объект студента
    const newStudent = { firstName, lastName, middleName, birthDate: birthDate.toISOString(), startYear, faculty };


    // 1. Отправляем POST-запрос на сервер для создания нового студента
    try {
        // Отправляем POST-запрос на сервер для создания нового студента
        const response = await fetch('http://localhost:3000/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        });

        if (!response.ok) {
            throw new Error('Ошибка при добавлении студента');
        }

        const addedStudent = await response.json();
        students.push(addedStudent); // Добавляем нового студента в локальный массив
        renderStudents(students); // Обновляем таблицу
        this.reset(); // Очищаем форму
    } catch (error) {
        errorMessage.textContent = error.message; // Выводим ошибку
    }

    //1. Добавляем нового студента
    //1. Убрали эту часть кода так как она уже больше не нужна
    // Поскольку надо сохранять список студентов на сервере, эта часть кода больше не нужна, так как
    //  данные отправлены на сервер через API.
    // То есть заменили существующий код добавления нового студента на вызов API для создания студента.
    // students.push({ firstName, lastName, middleName, birthDate, startYear, faculty });
    // renderStudents(students); // Обновляем таблицу
    // this.reset(); // Очищаем форму
});


// Функции сортировки и фильтрации
let currentSort = 'fullName';

function sortStudents() {
    switch (currentSort) {
        case 'fullName':
            students.sort((a, b) => `${a.lastName} ${a.firstName} ${a.middleName}`.localeCompare(`${b.lastName} ${b.firstName} ${b.middleName}`));
            break;
        case 'faculty':
            students.sort((a, b) => a.faculty.localeCompare(b.faculty));
            break;
        case 'birthDate':
            students.sort((a, b) => a.birthDate - b.birthDate);
            break;
        case 'startYear':
            students.sort((a, b) => a.startYear - b.startYear);
            break;
    }
    renderStudents(students); // Обновляем таблицу после сортировки
}


function filterStudents() {
    let filteredStudents = students;

    const filterName = document.getElementById('filterName').value.trim().toLowerCase();
    const filterFaculty = document.getElementById('filterFaculty').value.trim().toLowerCase();
    const filterStartYear = Number(document.getElementById('filterStartYear').value);
    const filterEndYear = Number(document.getElementById('filterEndYear').value);

    if (filterName) {
        filteredStudents = filteredStudents.filter(student =>
            `${student.lastName} ${student.firstName} ${student.middleName}`.toLowerCase().includes(filterName)
        );
    }

    if (filterFaculty) {
        filteredStudents = filteredStudents.filter(student =>
            student.faculty.toLowerCase().includes(filterFaculty)
        );
    }

    if (filterStartYear) {
        filteredStudents = filteredStudents.filter(student =>
            student.startYear === filterStartYear
        );
    }

    if (filterEndYear) {
        const graduationYear = filterEndYear - 4;
        filteredStudents = filteredStudents.filter(student =>
            student.startYear === graduationYear
        );
    }

    renderStudents(filteredStudents); // Обновляем таблицу после фильтрации
}


// Добавляем события на поля фильтрации
document.getElementById('filterName').addEventListener('input', filterStudents);
document.getElementById('filterFaculty').addEventListener('input', filterStudents);
document.getElementById('filterStartYear').addEventListener('input', filterStudents);
document.getElementById('filterEndYear').addEventListener('input', filterStudents);

// Обработчики кликов для сортировки
document.getElementById('sortFullName').addEventListener('click', function() {
    currentSort = 'fullName';
    sortStudents();
});

document.getElementById('sortFaculty').addEventListener('click', function() {
    currentSort = 'faculty';
    sortStudents();
});

document.getElementById('sortBirthDate').addEventListener('click', function() {
    currentSort = 'birthDate';
    sortStudents();
});

document.getElementById('sortStartYear').addEventListener('click', function() {
    currentSort = 'startYear';
    sortStudents();
});





//Пометки

// 2. Новая функция. Убрали Функцию отрисовки студентов и заменили на новую
// function renderStudents(students) {
//     const studentList = document.getElementById('studentList'); // Предполагаем, что у вас есть элемент с id="studentList"
//     studentList.innerHTML = ''; // Очищаем предыдущий список студентов

//     students.forEach(student => {
//         const studentItem = document.createElement('div'); // Создаем новый элемент для студента
//         studentItem.textContent = `${student.firstName} ${student.lastName}`; // Выводим имя и фамилию студента

//         // Создаем кнопку удаления
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Удалить';
//         deleteButton.onclick = () => deleteStudent(student.id); // Привязываем функцию удаления к кнопке

//         studentItem.appendChild(deleteButton); // Добавляем кнопку в элемент студента
//         studentList.appendChild(studentItem); // Добавляем элемент студента в список
//     });

// }

// 2. Убрали Функцию отрисовки студентов и заменили на новую

// Функция отрисовки студентов
// function renderStudents(studentsArray) {
//     const tableBody = document.getElementById('student-table-body');
//     tableBody.innerHTML = ''; // Очищаем таблицу
//     studentsArray.forEach(student => {
//         tableBody.innerHTML += createStudentRow(student);
//     });
// }
