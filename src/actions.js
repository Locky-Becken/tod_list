function actions () {

        const modal = document.getElementById('modal');
        const openProjectModal = document.getElementById('open-project-modal');
        const closeProjectModal = document.getElementById('close-project-modal');


    function handleProjectModal () { 
        openProjectModal.onclick = () => { /* abre o modal New Project */
            modal.style.display = 'flex';
        };

        closeProjectModal.onclick = () => { /* fecha o modal New Project */
            modal.style.display = 'none';
        };
    };

    function handleTaskModal () {

        const taskModal = document.getElementById('task-modal')
        const openTaskModal = document.getElementById('open-task-modal');
        const closeTaskModal = document.getElementById('close-task-modal');

        openTaskModal.onclick = () => {
            taskModal.style.display = 'flex';
        };

        closeTaskModal.onclick = () => {
            taskModal.style.display = 'none';
        };
    };

    function handleEditModal () {
        const editModal = document.getElementById('edit-modal')
        const closeeditModal = document.getElementById('close-edit-modal');

        closeeditModal.onclick = () => {
            editModal.style.display = 'none';
        };
    }
    handleEditModal()
    handleTaskModal();
    handleProjectModal();
}

export {
    actions,
};