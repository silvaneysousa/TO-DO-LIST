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

    const deliteItem = document.createElement('i');
    deliteItem.classList.add("fa-thin");
    deliteItem.classList.add("fa-check");

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deliteItem);

    taskContainer.appendChild(taskItemContainer);
    
    tarefaDigitada.value = '';

};

handleInputChange = () => {
    const tarefaEValida = validacaoTarefa();

    if (tarefaEValida) {
        return tarefaDigitada.classList.remove("error")
    }
}


botaoCriar.addEventListener("click", () => handleAddTask());

tarefaDigitada.addEventListener("change", () => handleInputChange())


