document.getElementById('add-task').addEventListener('click', addTask);

window.addEventListener('load', loadTasks);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const todoList = document.getElementById('todo-list');
        const taskItem = createTaskItem(taskText, false);
        todoList.appendChild(taskItem);
        taskInput.value = '';
        saveTasks();
    }
}

function createTaskItem(taskText, completed) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = completed ? 'Annuler' : 'Terminer';
    completeButton.addEventListener('click', () => toggleTaskStatus(taskItem, completed));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    return taskItem;
}

function toggleTaskStatus(taskItem, completed) {
    const list = completed ? document.getElementById('todo-list') : document.getElementById('completed-list');
    const newTaskItem = createTaskItem(taskItem.firstChild.textContent, !completed);
    list.appendChild(newTaskItem);
    taskItem.remove();
    saveTasks();
}

function saveTasks() {
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');

    const tasks = {
        todo: [],
        completed: []
    };

    todoList.querySelectorAll('li').forEach(item => {
        tasks.todo.push(item.firstChild.textContent);
    });

    completedList.querySelectorAll('li').forEach(item => {
        tasks.completed.push(item.firstChild.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        const todoList = document.getElementById('todo-list');
        const completedList = document.getElementById('completed-list');

        tasks.todo.forEach(taskText => {
            const taskItem = createTaskItem(taskText, false);
            todoList.appendChild(taskItem);
        });

        tasks.completed.forEach(taskText => {
            const taskItem = createTaskItem(taskText, true);
            completedList.appendChild(taskItem);
        });
    }
}