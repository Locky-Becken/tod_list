function HandleTasks () {
    // valores padroes
    let tasksStore =  [
        [
            {
                name: 'task-1',
                date: '08/08/2020',
                detail: 'click over herre',
                priority:'Low' 
            },
            {
                name: 'task-2',
                date: '08/08/2000',
                detail: 'to see the details and to edit',
                priority:'High', 
            },
            
        ],
    ];
    if(localStorage.getItem('tasks')) {
        tasksStore = JSON.parse(localStorage.getItem('tasks'))
    }
    /* JSON.parse(localStorage.getItem('list_task')) */
      
    // faz um objeto para as tarefas
    function task (name, date, detail, priority ) { //return object
        return {name, date, detail, priority }
    };

    

    function editarModal (position, index) {
        // edit-modal e seus inputs
        const editModal = document.getElementById('edit-modal')
        const button = document.getElementById('new-edit-button')

        const name = document.getElementById('edit-name')
        const detail = document.getElementById('edit-detail')
        const date = document.getElementById('edit-date')
        const priority = document.getElementById('priority-2')
        
        
        button.onclick = () => {
            let priorityvalue = priority.options[priority.selectedIndex].value
            // converte a data do formato recebido (aaaa-mm-aa) p/ dd/mm/aaaa
            let dateRevert = date.value.split('-').reverse();
            let dateFormated = dateRevert.join('/');

            // alteras os valores antigos para os atuais
            tasksStore[position][index].name = name.value
            tasksStore[position][index].detail = detail.value
            tasksStore[position][index].date = dateFormated
            tasksStore[position][index].priority = priorityvalue
            
            render(position)
            editModal.style.display = 'none'
            localStorage.setItem('tasks', JSON.stringify(tasksStore))
        }
    }

    // função de remover
    function removeTask (position, index) {
        let taskDeleteIcon = document.querySelectorAll('.delete-task')

        function removeEvent () {
            tasksStore[position].splice(index, 1)
            render(position)
            localStorage.setItem('tasks', JSON.stringify(tasksStore))
        }

        taskDeleteIcon.forEach(item => item.addEventListener('click', removeEvent))
    }



    function addTasks (position) {

        // modal e seus inputs
        const taskModal = document.getElementById('task-modal')
        const button = document.getElementById('new-task-button')
        const name = document.getElementById('task-name')
        
        const priority = document.getElementById('priority')
        
        const detail = document.getElementById('task-detail')
        const date = document.getElementById('task-date')
        
        button.onclick = () => {
            if (name.value === '' || detail.value === '' || date.value === '') return;

            let priorityvalue = priority.options[priority.selectedIndex].value

            // converte a data do formato recebido (aaaa-mm-aa) p/ dd/mm/aaaa
             let dateRevert = date.value.split('-').reverse();
            let dateFormated = dateRevert.join('/');

            // envia a tarefa para a array
            tasksStore[position].push(task(name.value, dateFormated, detail.value, priorityvalue )); 

            render(position);

            //limpa os valores do task-modal
            name.value = '';
            date.value = '';
            detail.value = '';
            priority.selectedIndex = 0
            //fecha o task-modal
            taskModal.style.display = 'none'
            // salva no navegador
            localStorage.setItem('tasks', JSON.stringify(tasksStore))
        };
    };

    // colore a partir da escolha da prioridade
    function showPriorityColo (priority, element) {
        switch (priority) {
            case 'Low':
                return element.style.backgroundColor = 'green'
            case 'Medium':
                return element.style.backgroundColor = 'blue'
            case 'High':
                return element.style.backgroundColor = 'red'
        }
    } 

    function render (position) {
        let tasksWrapper = document.getElementById('tasks-wrapper');
        tasksWrapper.innerHTML = '';

        const editModal = document.getElementById('edit-modal')
        
        if (tasksStore[position] === undefined) return; /* no tasks */
        for (let task of tasksStore[position]) {

            // posição da tarefa na Array
            const index = tasksStore[position].indexOf(task)

            // tarefa
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';

            const name = document.createElement('p');
            name.textContent = task.name;
            
            const date = document.createElement('p');
            date.textContent = task.date;

            const detail = document.createElement('p');
            detail.textContent = task.detail;
            
            const priority = document.createElement('p');
            priority.textContent = task.priority;
            
            // check-box input
            const checkBoxDiv = document.createElement('div')
            checkBoxDiv.className = 'task-check'

            const chechBoxInput = document.createElement('input')
            chechBoxInput.setAttribute('type', 'checkbox')

            const checkBoxState = document.createElement('p')
            checkBoxState.textContent = 'Concluido'

            // icone de lixeira
            const trashIconDiv = document.createElement('div');
            trashIconDiv.className = 'trash-icon delete-task';

            const img = document.createElement('img');
            img.setAttribute('src', 'https://image.flaticon.com/icons/svg/860/860778.svg');

            //edit-div e seus atributos
            const editDiv = document.createElement('div')
            editDiv.className = 'edit-div'
            editDiv.addEventListener('click', (e) => { // abre o edit-modal
                
                editModal.style.display = 'flex'

                // inputs
                const name = document.getElementById('edit-name')
                const detail = document.getElementById('edit-detail')
                const date = document.getElementById('edit-date')
                const priority = document.getElementById('priority-2')
                
                // conerte a data de dd/mm/aaaa para aaaa-mm-dd
                let dateRevert = tasksStore[position][index].date.split('/').reverse();
                let dateFormated = dateRevert.join('-');

                // abre o edit-modal com os valores abaixo
                name.value = tasksStore[position][index].name
                detail.value = tasksStore[position][index].detail
                date.value = dateFormated

                let cont = true
                let j = 0
                
                // indentifica a prioridade e retorna o valor dessa prioridade
                while (cont) {
                    const opt = priority.options[j]
                    if (opt.value === tasksStore[position][index].priority){
                        priority.selectedIndex = j
                        cont = false
                    }
                    j += 1

                }
                
                editarModal(position, index)                    
            })

            checkBoxDiv.appendChild(chechBoxInput);
            checkBoxDiv.appendChild(checkBoxState);

            trashIconDiv.appendChild(img);
            

            editDiv.appendChild(name);
            editDiv.appendChild(date);
            editDiv.appendChild(detail);
            editDiv.appendChild(priority); 

            taskDiv.appendChild(editDiv)
            taskDiv.appendChild(checkBoxDiv);
            taskDiv.appendChild(trashIconDiv);

            tasksWrapper.appendChild(taskDiv);

            removeTask(position, index)
            showPriorityColo(task.priority, editDiv) 
            
        };
        checkCheckBox()
        addTasks(position);
    };

    // grifa a tarefa concluida (#remover)
    function checkCheckBox () {
        let inputs = Array.from(document.querySelectorAll('.task-check input')) 

        function checkState (e) {
            let position = e.path[2]

             if (position.style.textDecoration === 'line-through') { // nao concluido
                position.style.textDecoration = 'none'
                position.style.color = 'inherit'
            } else {                                                //concluido
                position.style.textDecoration = 'line-through'
                position.style.color = 'grey'
            }  
       
        }
        inputs.forEach ( item => item.addEventListener ('click', checkState))
    };

    
    // abre no primeiro item do menu
    render(0);


    return {
        render,
        tasksStore,
        checkCheckBox,
    }
};

export {
    HandleTasks,
};
