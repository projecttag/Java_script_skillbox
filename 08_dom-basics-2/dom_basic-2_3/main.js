(function() {
    // создаём и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    // создаём и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;  // Изначально кнопка заблокирована

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        // возвращаем элементы формы
        return {
            form,
            input,
            button,
        };
    }

    // создаём и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    // создаём и возвращаем элемент списка с кнопками на основе объекта { id, name, done }
    function createTodoItem(todo) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = todo.name;

        // Если дело уже выполнено, добавляем соответствующий класс
        if (todo.done) {
            item.classList.add('list-group-item-success');
        }

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    // создаём приложение с возможностью передавать контейнер и заголовок
    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let todos = [];  // Массив для хранения дел

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        // Функция для управления состоянием кнопки
        function toggleButtonState() {
            if (todoItemForm.input.value.trim() === '') {
                todoItemForm.button.disabled = true;
            } else {
                todoItemForm.button.disabled = false;
            }
        }

        // Проверяем состояние кнопки при изменении ввода
        todoItemForm.input.addEventListener('input', toggleButtonState);

        // Проверяем состояние кнопки при отправке формы
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Игнорируем создание элемента, если пользователь ничего не ввёл в поле
            if (!todoItemForm.input.value.trim()) {
                return;
            }

            // Генерация уникального ID
            const id = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

            // Создаём объект дела
            let todo = {
                id: id,
                name: todoItemForm.input.value.trim(),
                done: false
            };

            let todoItem = createTodoItem(todo);

            // Добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                todo.done = !todo.done;
            });

            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    // Удаляем дело из массива
                    todos = todos.filter(t => t.id !== todo.id);
                }
            });

            // Создаём и добавляем в список новое дело
            todoList.append(todoItem.item);
            todos.push(todo); // Добавляем новое дело в массив

            // Обнуляем значение в поле и обновляем состояние кнопки
            todoItemForm.input.value = '';
            toggleButtonState();  // Проверяем и блокируем кнопку
        });

        // Устанавливаем правильное состояние кнопки при загрузке приложения
        toggleButtonState();
    }

    window.createTodoApp = createTodoApp;
})();
