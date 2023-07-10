const todoInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

//Add a task
const addTask = () => {
    const taskText = todoInput.value.trim();

    if(taskText !==''){
        const taskItem = createTaskItem(taskText)
        //toggle completed
        todoList.appendChild(taskItem);
        todoInput.value = '';

        //Save task to local storage
        localStorage.setItem('tasks', JSON.stringify(todoList.children));
    }
}

//Create new task items
const createTaskItem = (taskText) => {
    const taskItem = document.createElement('li');
    taskItem.className= "todo-item";
//Check off tasks
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add('checkbox');
//Highlight tasks
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
//Delete tasks connection
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
//Event listener - delete button
    deleteBtn.addEventListener('click', deleteTask);
//Task functions
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteBtn);

    return taskItem
};

//Delete tasks function
const deleteTask = (event) => {
    const taskItem = event.target.parentNode;
    todoList.removeChild(taskItem);

    //Remove task from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(tasks.indexOf(taskItem), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Cross out tasks (styling)
const toggleTask = (event) => {
    const taskItem = event.target.parentNode;
    taskItem.classList.toggle('completed');
}

//Event listeners - add task
addTaskButton.addEventListener('click', addTask)
todoInput.addEventListener('keydown', function (event) {
    if(event.key === 'Enter'){
        addTask();
    }
})
//Event listeners - toggle
todoList.addEventListener('change', toggleTask);

//Examples of tasks preloaded
const initialTasks = ['Buy groceries', 'pay bills', 'walk the dog!'];
initialTasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    todoList.appendChild(taskItem);
});

//Get tasks from local storage
function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        todoList.innerHTML = tasks.map(task => createTaskItem(task));
    }
};

