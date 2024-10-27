// Этап 2: Создание массива студентов

const students = [
    {
        firstName: "Иван",
        lastName: "Иванов",
        middleName: "Иванович",
        birthDate: new Date('2000-01-01'),
        startYear: 2019,
        faculty: "Факультет компьютерных наук"
    },
    {
        firstName: "Анна",
        lastName: "Петрова",
        middleName: "Сергеевна",
        birthDate: new Date('1999-03-15'),
        startYear: 2018,
        faculty: "Факультет бизнеса"
    },
    {
        firstName: "Алексей",
        lastName: "Сидоров",
        middleName: "Александрович",
        birthDate: new Date('2001-07-20'),
        startYear: 2019,
        faculty: "Факультет инженерии"
    },
    {
        firstName: "Мария",
        lastName: "Кузнецова",
        middleName: "Михайловна",
        birthDate: new Date('2000-11-30'),
        startYear: 2019,
        faculty: "Факультет искусств"
    },
    {
        firstName: "Дмитрий",
        lastName: "Федоров",
        middleName: "Викторович",
        birthDate: new Date('1998-05-10'),
        startYear: 2017,
        faculty: "Факультет математики"
    },
    {
        firstName: "Ольга",
        lastName: "Смирнова",
        middleName: "Владимировна",
        birthDate: new Date('1997-12-05'),
        startYear: 2016,
        faculty: "Факультет филологии"
    }
];

// Этап 3: Функция вывода одного студента

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

// Этап 4: Функция отрисовки студентов

function renderStudents(studentsArray) {
    const tableBody = document.getElementById('student-table-body');
    tableBody.innerHTML = ''; // Очищаем таблицу
    studentsArray.forEach(student => {
        tableBody.innerHTML += createStudentRow(student);
    });
}

// Вызовите функцию отрисовки студентов при загрузке страницы
renderStudents(students);

// Этап 5: Валидация и добавление студента

document.getElementById('student-form').addEventListener('submit', function(event) {
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

    // Добавляем нового студента
    students.push({ firstName, lastName, middleName, birthDate, startYear, faculty });
    renderStudents(students); // Обновляем таблицу
    this.reset(); // Очищаем форму
});

// Этап 6: Функции сортировки и фильтрации
function sortStudents(criteria) {
    switch (criteria) {
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
            student.firstName.toLowerCase().includes(filterName) ||
            student.lastName.toLowerCase().includes(filterName) ||
            student.middleName.toLowerCase().includes(filterName)
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


