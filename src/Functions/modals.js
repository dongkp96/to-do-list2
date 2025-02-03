export function projectModal(){
    const createProjectDialog = document.querySelector("#project-creator");
    const addProjectBtn = document.querySelector("#add-project");
    addProjectBtn.addEventListener("click", ()=>{
        createProjectDialog.showModal();
    })

    const closeProjectModal = document.querySelector("#close");
    closeProjectModal.addEventListener("click", ()=>{
        document.querySelector("#project-name").value = "";
        createProjectDialog.close();
    })

    /*Gives opening and closing function for the add Project button */
}

export function itemModal(){
    const createItemDialog = document.querySelector("#item-creator");
    const showItemFormBtn = document.querySelector("#add-item");
    showItemFormBtn.addEventListener("click", ()=>{
        createItemDialog.showModal();
    }) 

    const closeItemFormBtn = document.querySelector("#close2");
    closeItemFormBtn.addEventListener("click", ()=>{
        createItemDialog.close();
    })

    const editItemDialog = document.querySelector("#item-editor");
    const closeItemEditBtn = document.querySelector("#close3");
    closeItemEditBtn.addEventListener("click", ()=>{
        editItemDialog.close();
    })

    /*Gives opening and closing function for the add to-do-item button */
}

