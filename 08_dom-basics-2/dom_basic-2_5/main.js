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

    // Функция для сохранения данных в LocalStorage
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Функция для чтения данных из LocalStorage
    function readFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    // создаём приложение с возможностью передавать контейнер и заголовок
    function createTodoApp(container, title = 'Список дел', listName = 'default') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let todos = readFromLocalStorage(listName);  // Читаем данные из LocalStorage

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        // Функция для управления состоянием кнопки
        function toggleButtonState() {
            todoItemForm.button.disabled = todoItemForm.input.value.trim() === '';
        }

        todoItemForm.input.addEventListener('input', toggleButtonState);

        // Функция для обновления списка дел и сохранения в LocalStorage
        function updateTodos() {
            saveToLocalStorage(listName, todos);
        }

        // Загружаем существующие дела из массива
        todos.forEach(todo => {
            const todoItem = createTodoItem(todo);
            todoItem.doneButton.addEventListener('click', function() {
                todo.done = !todo.done;  // Изменяем статус
                todoItem.item.classList.toggle('list-group-item-success', todo.done);
                updateTodos();  // Сохраняем изменения
            });
            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    todos = todos.filter(t => t.id !== todo.id);  // Удаляем из массива
                    updateTodos();  // Сохраняем изменения
                }
            });
            todoList.append(todoItem.item);
        });

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!todoItemForm.input.value.trim()) {
                return;
            }

            const id = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

            let todo = {
                id: id,
                name: todoItemForm.input.value.trim(),
                done: false
            };

            let todoItem = createTodoItem(todo);
            todoItem.doneButton.addEventListener('click', function() {
                todo.done = !todo.done;
                todoItem.item.classList.toggle('list-group-item-success', todo.done);
                updateTodos();  // Сохраняем изменения
            });

            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    todos = todos.filter(t => t.id !== todo.id);
                    updateTodos();  // Сохраняем изменения
                }
            });

            todoList.append(todoItem.item);
            todos.push(todo); // Добавляем новое дело в массив
            todoItemForm.input.value = '';
            toggleButtonState();
            updateTodos();  // Сохраняем изменения
        });

        toggleButtonState();
    }

    window.createTodoApp = createTodoApp;
})();

document.addEventListener('DOMContentLoaded', function() {
    createTodoApp(document.getElementById('todo-app'), 'Мои дела', 'my');
});
