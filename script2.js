document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('categoryFilter').addEventListener('change', filterByCategory);
    document.getElementById('cancelEditBtn').addEventListener('click', hideEditTaskForm);
    document.getElementById('confirmEditBtn').addEventListener('click', confirmEditTask);
    document.getElementById('cancelDeleteBtn').addEventListener('click', hideDeleteConfirmation);
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDeleteTask);

    loadTasksFromLocalStorage();
});

let tasks = [];
let editingTaskId = null;
let deletingTaskId = null;

function addTask() {
    const taskNameInput = document.getElementById('taskNameInput');
    const taskCategorySelect = document.getElementById('taskCategorySelect');
    const taskName = taskNameInput.value;
    const taskCategory = taskCategorySelect.value;

    if (taskName.trim() === '') {
        alert('Task name cannot be empty');
        return;
    }

    const newTask = {
        id: Date.now().toString(),
        name: taskName,
        category: taskCategory
    };

    tasks.push(newTask);
    saveTasksToLocalStorage();
    taskNameInput.value = '';
    taskCategorySelect.value = 'none';
    hideNewTaskForm();
    renderTasks();
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        const taskName = document.createElement('span');
        taskName.textContent = task.name;
        li.appendChild(taskName);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => showEditTaskForm(task.id));
        buttons.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => showDeleteConfirmation(task.id));
        buttons.appendChild(deleteBtn);

        li.appendChild(buttons);
        taskList.appendChild(li);
    });
}

// Rest of the code remains the same...


function showNewTaskForm() {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.new-task-form').style.display = 'block';
}

function hideNewTaskForm() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.new-task-form').style.display = 'none';
}

function showEditTaskForm(taskId) {
    editingTaskId = taskId;
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        document.getElementById('editTaskInput').value = task.name;
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.edit-task-form').style.display = 'block';
    }
}

function hideEditTaskForm() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.edit-task-form').style.display = 'none';
}

function confirmEditTask() {
    const newName = document.getElementById('editTaskInput').value;
    if (newName.trim() === '') {
        alert('Task name cannot be empty');
        return;
    }
    const task = tasks.find(t => t.id === editingTaskId);
    if (task) {
        task.name = newName;
        saveTasksToLocalStorage();
        renderTasks();
        hideEditTaskForm();
    }
}

function showDeleteConfirmation(taskId) {
    deletingTaskId = taskId;
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.delete-confirmation').style.display = 'block';
}

function hideDeleteConfirmation() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.delete-confirmation').style.display = 'none';
}

function confirmDeleteTask() {
    tasks = tasks.filter(t => t.id !== deletingTaskId);
    saveTasksToLocalStorage();
    renderTasks();
    hideDeleteConfirmation();
}

function filterTasks(filter) {
    renderTasks(filter);
}

function filterByCategory() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => selectedCategory === 'all' || task.category === selectedCategory);

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        const taskName = document.createElement('span');
        taskName.textContent = task.name;
        li.appendChild(taskName);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit'; // You can add an icon here if needed
        editBtn.addEventListener('click', () => showEditTaskForm(task.id));
        buttons.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete'; // You can add an icon here if needed
        deleteBtn.addEventListener('click', () => showDeleteConfirmation(task.id));
        buttons.appendChild(deleteBtn);

        li.appendChild(buttons);
        taskList.appendChild(li);
    });
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'page1index.html'; // Redirect to sign-in page
});

// Add the cancelNewTask function
function cancelNewTask() {
    hideNewTaskForm();
}


