let students = [
    {
        id: 1,
        name: "Иван",
        surname: "Иванов",
        lastname: "Иванович",
        birthday: new Date('2000-01-01').toISOString(),
        'studyStart': 2019,
        faculty: "Факультет компьютерных наук"
    },
    {
        id: 2,
        name: "Анна",
        surname: "Петрова",
        lastname: "Сергеевна",
        birthday: new Date('1999-03-15').toISOString(),
        'studyStart': 2018,
        faculty: "Факультет бизнеса"
    },
    {
        id: 3,
        name: "Алексей",
        surname: "Сидоров",
        lastname: "Александрович",
        birthday: new Date('2001-07-20').toISOString(),
        'studyStart': 2019,
        faculty: "Факультет инженерии"
    },
    {
        id: 4,
        name: "Мария",
        surname: "Кузнецова",
        lastname: "Михайловна",
        birthday: new Date('2000-11-30').toISOString(),
        'studyStart': 2019,
        faculty: "Факультет искусств"
    },
    {
        id: 5,
        name: "Дмитрий",
        surname: "Федоров",
        lastname: "Викторович",
        birthday: new Date('1998-05-10').toISOString(),
        'studyStart': 2017,
        faculty: "Факультет математики"
    },
    {
        id: 6,
        name: "Ольга",
        surname: "Смирнова",
        lastname: "Владимировна",
        birthday: new Date('1997-12-05').toISOString(),
        'studyStart': 2016,
        faculty: "Факультет филологии"
    }
];

// Функция удаления студента
async function deleteStudent(studentId) {
    try {
        const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Ошибка при удалении студента');
        }
        students = students.filter(student => student.id !== studentId);
        renderStudents(students);
    } catch (error) {
        console.error(error);
    }
}

// Функция вывода одного студента
function createStudentRow(student) {
    const age = new Date().getFullYear() - new Date(student.birthday).getFullYear();
    const graduationYear = Number(student['studyStart']) + 6; // Исправление - преобразование в число
    const currentYear = new Date().getFullYear();
    const course = currentYear >= graduationYear ? 'закончил' : `${currentYear - student['studyStart'] + 1} курс`;
    const formattedDate = `${new Date(student.birthday).toLocaleDateString()} (${age} лет)`;

    return `
        <tr>
            <td>${student.surname} ${student.name} ${student.lastname}</td>
            <td>${student.faculty}</td>
            <td>${formattedDate}</td>
            <td>${student['studyStart']}-${graduationYear} (${course})</td> <!-- Период обучения -->
            <td><button class="delete-btn" data-id="${student.id}">Удалить</button></td>
        </tr>
    `;
}

// Кнопка удаления студента
function addDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const studentId = parseInt(this.getAttribute('data-id'));
            deleteStudent(studentId);
        });
    });
}

// Обновление списка студентов
function renderStudents(students) {
    const studentList = document.getElementById('student-table-body');
    studentList.innerHTML = '';
    if (students.length === 0) {
        studentList.innerHTML = '<tr><td colspan="5">Студенты не найдены</td></tr>';
        return;
    }
    students.forEach(student => {
        studentList.innerHTML += createStudentRow(student);
    });

    // Добавляем слушатели событий для кнопок удаления
    addDeleteButtonListeners();
}
renderStudents(students);

// Загрузка студентов
async function loadStudents() {
    try {
        const response = await fetch('http://localhost:3000/api/students');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке студентов');
        }
        const serverStudents = await response.json();
        if (serverStudents.length > 0) {
            students = serverStudents;
            renderStudents(students);
        } else {
            renderStudents([]);
        }
    } catch (error) {
        console.error(error);
    }
}
document.addEventListener('DOMContentLoaded', loadStudents);

// Валидация и добавление студента
document.getElementById('student-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('firstName').value.trim();
    const surname = document.getElementById('lastName').value.trim();
    const lastname = document.getElementById('middleName').value.trim();
    const birthday = document.getElementById('birthDate').valueAsDate;
    const studyStart = Number(document.getElementById('startYear').value);
    const faculty = document.getElementById('faculty').value.trim();
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = '';
    if (!name || !surname || !lastname || !birthday || !faculty) {
        errorMessage.textContent = 'Все поля обязательны для заполнения.';
        return;
    }

    if (birthday < new Date('1900-01-01') || birthday > new Date()) {
        errorMessage.textContent = 'Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты.';
        return;
    }

    if (studyStart < 2000 || studyStart > new Date().getFullYear()) {
        errorMessage.textContent = 'Год начала обучения должен быть в диапазоне от 2000 до текущего года.';
        return;
    }

    const newStudent = { name, surname, lastname, birthday: birthday.toISOString(), 'studyStart': studyStart, faculty };

    try {
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
        students.push(addedStudent);
        renderStudents(students);
        this.reset();
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

// Функции сортировки и фильтрации
let currentSort = 'fullName';

function sortStudents() {
    switch (currentSort) {
        case 'fullName':
            students.sort((a, b) => `${a.surname} ${a.name} ${a.lastname}`.localeCompare(`${b.surname} ${b.name} ${b.lastname}`));
            break;
        case 'faculty':
            students.sort((a, b) => a.faculty.localeCompare(b.faculty));
            break;
        case 'birthday':
            students.sort((a, b) => new Date(a.birthday) - new Date(b.birthday));
            break;
        case 'studyStart':
            students.sort((a, b) => a['studyStart'] - b['studyStart']);
            break;
    }
    renderStudents(students);
}

function filterStudents() {
    let filteredStudents = students;
    const filterName = document.getElementById('filterName').value.trim().toLowerCase();
    const filterFaculty = document.getElementById('filterFaculty').value.trim().toLowerCase();
    const filterStartYear = Number(document.getElementById('filterStartYear').value);
    const filterEndYear = Number(document.getElementById('filterEndYear').value);

    if (filterName) {
        filteredStudents = filteredStudents.filter(student =>
            `${student.surname} ${student.name} ${student.lastname}`.toLowerCase().includes(filterName)
        );
    }

    if (filterFaculty) {
        filteredStudents = filteredStudents.filter(student =>
            student.faculty.toLowerCase().includes(filterFaculty)
        );
    }

    if (filterStartYear) {
        filteredStudents = filteredStudents.filter(student =>
            student['studyStart'] === filterStartYear
        );
    }

    if (filterEndYear) {
        filteredStudents = filteredStudents.filter(student =>
            (student['studyStart'] + 6) === filterEndYear // Сравниваем год окончания
        );
    }

    renderStudents(filteredStudents);
}

document.getElementById('filterName').addEventListener('input', filterStudents);
document.getElementById('filterFaculty').addEventListener('input', filterStudents);
document.getElementById('filterStartYear').addEventListener('input', filterStudents);
document.getElementById('filterEndYear').addEventListener('input', filterStudents);

document.getElementById('sortFullName').addEventListener('click', function () {
    currentSort = 'fullName';
    sortStudents();
});

document.getElementById('sortFaculty').addEventListener('click', function () {
    currentSort = 'faculty';
    sortStudents();
});

document.getElementById('sortBirthday').addEventListener('click', function () {
    currentSort = 'birthday';
    sortStudents();
});

document.getElementById('sortStudyStart').addEventListener('click', function () {
    currentSort = 'studyStart';
    sortStudents();
});
