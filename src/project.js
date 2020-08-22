import { HandleTasks } from './tasks'

function HandleProjects () {
    const handleTasks = HandleTasks()

    let projectsStore = [
        'Default',
    ];
    if(localStorage.getItem('projects')) {
        projectsStore = JSON.parse(localStorage.getItem('projects'))
    }

    function notAddTask () {
        const taskModal = document.getElementById('task-modal')
        if (projectsStore.length === 0) {
            taskModal.style.visibility = 'hidden'
        }else {
            taskModal.style.visibility = 'visible'
        }

    }

    function showSelected () {
        const projectArray = Array.from(document.querySelectorAll('.project')) 
        if (projectArray[0] === undefined) return;

        projectArray[0].classList.add('selected')
        
        function removeAndAddclass (e) {

                let itemAlreadSelected = document.querySelector('.selected')

                if (itemAlreadSelected !== null) {

                    itemAlreadSelected.classList.remove('selected')
                }
            
            this.classList.add('selected')

        }

        projectArray.forEach( item => item.addEventListener('click', removeAndAddclass))
    }


    function removeProject (pos) {

        function removeEvent () {
            handleTasks.tasksStore.splice(pos, 1)
            projectsStore.splice(pos, 1)
            render()
            localStorage.setItem('projects', JSON.stringify(projectsStore))
        }

        let projectDeleteIcon = document.querySelectorAll('.delete-project')
        
        projectDeleteIcon.forEach(item => item.addEventListener('click', removeEvent))
    }

    function popTasks () {
        const projectArray = Array.from(document.querySelectorAll('.project')) 

        function getTasks (e) {
            let projectName = e.path[0].textContent
            handleTasks.render(projectsStore.indexOf(projectName))
        }
    
        projectArray.forEach( item => item.addEventListener('click', getTasks))
    }

    

    function addNewProject () {
        const newProjectButton = document.getElementById('new-project-button')

        newProjectButton.onclick = () => {
            const modal = document.getElementById('modal');
            const projectName = document.getElementById('project-input')

            if (projectName.value === '') return;
            
            projectsStore.push(projectName.value)
            render()
            projectName.value = ''
            modal.style.display = 'none';
            // task part 
            handleTasks.tasksStore.push([]) // adiciona uma array para armazenar os objetos (tasks)
            localStorage.setItem('projects', JSON.stringify(projectsStore)) 
            localStorage.setItem('tasks', JSON.stringify(handleTasks.tasksStore))
        }
    }

    function render () {
        const projectsWrapper = document.getElementById('projects-wrapper');
        projectsWrapper.innerHTML = ''

        for (let project of projectsStore){
            let pos = projectsStore.indexOf(project)

            const projectDiv = document.createElement('div');
            projectDiv.className = 'project';

            const pElement = document.createElement('p');
            pElement.textContent = project;

            const trashIconDiv = document.createElement('div')
            trashIconDiv.className = 'trash-icon delete-project'

            const img = document.createElement('img')
            img.setAttribute('src', 'https://image.flaticon.com/icons/svg/860/860778.svg')

            trashIconDiv.appendChild(img)
            projectDiv.appendChild(pElement);
            projectDiv.appendChild(trashIconDiv)
            projectsWrapper.appendChild(projectDiv);

            removeProject(pos)
        };
        popTasks()
        showSelected()
        notAddTask()
    };

    render();
    addNewProject();

    return {
        projectsStore,
    }
}

export {
    HandleProjects,
};