const tarefaDigitada = document.querySelector(".new_task_input");
const botaoCriar = document.querySelector(".new_task_container_button");
const taskContainer = document.querySelector('.tasks_container');

const validacaoTarefa = () => tarefaDigitada.value.trim().length > 0;

const handleAddTask = () => {
    // Verifica se tem algo escrito
    const tarefaEValida = validacaoTarefa();

    if (!tarefaEValida) {
        return tarefaDigitada.classList.add("error");
    } 
    
    // Realiza a criação da tarefa 
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task_item');

    const taskContent = document.createElement('p');
    taskContent.innerText = tarefaDigitada.value;

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("fa-thin");
    deleteItem.classList.add("fa-check");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    taskContainer.appendChild(taskItemContainer);
    
    tarefaDigitada.value = '';

    updateLocalStorage();
};

const handleClick = (taskContent) => {
    const tasks = taskContainer.childNodes;

    for ( const task of tasks) {
        const currentTaskIsBeingCliked = task.firstChild.isSameNode(taskContent)

        if (currentTaskIsBeingCliked) {
            task.firstChild.classList.toggle("completed");
        }
    }
    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingCliked = (task.firstChild.isSameNode(taskContent))

        if (currentTaskIsBeingCliked) {
            taskItemContainer.remove();
        }
    }
    updateLocalStorage();
};



handleInputChange = () => {
    const tarefaEValida = validacaoTarefa();

    if (tarefaEValida) {
        return tarefaDigitada.classList.remove("error")
    }
}

const updateLocalStorage = () => {
    const tasks = taskContainer.childNodes;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed')

        return {description: content.innerText, isCompleted: isCompleted};
    })
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

    if (!tasksFromLocalStorage) return;
    
    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task_item');
    
        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;

        if (task.isCompleted) {
            taskContent.classList.add('completed');
        }
    
        taskContent.addEventListener('click', () => handleClick(taskContent))
    
        const deleteItem = document.createElement('i');
        deleteItem.classList.add("fa-thin");
        deleteItem.classList.add("fa-check");
    
        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
    
        taskContainer.appendChild(taskItemContainer);
    }
}

refreshTasksUsingLocalStorage();


botaoCriar.addEventListener("click", () => handleAddTask());

tarefaDigitada.addEventListener("change", () => handleInputChange())


