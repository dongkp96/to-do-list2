import "./styles.css";
import {projectModal, itemModal} from "./Functions/modals.js";
import {projectList, project, createProjectDom} from "./Functions/projects.js";
import {todoItem, createToDoDom, itemDelete, itemEdit} from "./Functions/todos.js";

projectModal();
itemModal();
/* Gives functionality to open/close add-to-do item modal and add project modal */

function clearToDoHTML(){
    document.querySelector("#to-do-items").innerHTML ="";
}

/* Clears to do Item section on screen */

function projectDelete(identifier, projectsList){
    const projectDeleteBtn = document.querySelector(".project" + identifier)
    if(!projectDeleteBtn){
        return;
    }

    projectDeleteBtn.addEventListener("click", (e)=>{
        const projectContainer = document.querySelector("#projects-container");
        const IDholder = "#" + e.target.className;
        const projectDom= document.querySelector(IDholder);
        if(projectDom){
            projectContainer.removeChild(projectDom);
            projectsList.removeProject(identifier);
            clearToDoHTML();
            alert(projectsList.projectList.length + " projects left");
        } 
    })


    /*
    Function to add delete button functionality to project DOMs to avoid repetition.
    This should be added to the UI file/module once project is done  
    */
}

function projectHighlight(project, projectsList){
    const projectCard = document.querySelector("#project" + project.identifier);
    projectCard.addEventListener('click', (e)=>{
        if(document.querySelectorAll(".highlighted")){
            const cards = document.querySelectorAll(".highlighted")
            cards.forEach((card)=>{
                card.classList.remove("highlighted")
            })
        }

        e.target.classList.add("highlighted");
        projectsList.currentProject = project;
        clearToDoHTML();
        if(e.target instanceof HTMLButtonElement){
            return;
        }else{
            if (project.todoList.length > 0){
                project.todoList.forEach((item) =>{
                    let title = item.title;
                    let description = item.description;
                    let priority = item.priority;
                    let date = item.dueDate;
                    let id = item.itemId;
                    createToDoDom(title, description, priority, date, id);
                    itemDelete(id, projectsList.currentProject);
                    itemEdit(id, projectsList.currentProject);
                })
            }
        }
    })

    /*
    Function used to set functionality in highlighting the current selected project by removing
    all other cards with the highlighted class then adding the class to the targeted div as
    well as set current project and will be used to populate to-do-items section
     */
    
}



const projectsList = new projectList();
const defaultProject = new project("Default", projectsList.retrieveIDcounter());

createProjectDom("Default Project", projectsList.retrieveIDcounter());
projectDelete(defaultProject.identifier, projectsList);
projectHighlight(defaultProject, projectsList);
document.querySelector("#project0").classList.add("highlighted");

projectsList.addProject(defaultProject);
projectsList.currentProject = defaultProject;

/*
Creates a project List object that contains an array that holds project objects then adds
a default project for the user then adds it to the project List in the project List object.
Sets the current project to be the default project created and adds functionality to both 
the div itself and its delete button
*/

const submitProjectBtn = document.querySelector("#submit");
submitProjectBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    /*Prevents default action of the submit button */
    const projectName = document.querySelector("#project-name").value;
    const newProject = new project(projectName, projectsList.retrieveIDcounter());
    createProjectDom(projectName, projectsList.retrieveIDcounter());
    projectsList.addProject(newProject);
    projectsList.currentProject = newProject;
    projectDelete(newProject.identifier, projectsList);
    projectHighlight(newProject, projectsList);

    /*
    Takes the value of the input in the project creator modal and uses it alongside
    the ID counter in the projectsList to make a new project, DOM is created and follows
    same path as above 
     */

    document.querySelector("#project-name").value ="";
    document.querySelector("#project-creator").close();

    /*Empties the input bar in the project creator modal and closes it */


})

const submitItemBtn = document.querySelector("#submit-item");
submitItemBtn.addEventListener("click", (e) =>{
    e.preventDefault()

    const title = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;
    const priority = document.querySelector("#task-priority").value;
    const date = document.querySelector("#task-duedate").value;
    const itemId = projectsList.currentProject.retrieveItemIdCounter();

    const newToDo = new todoItem(title, description, priority, date, itemId);
    projectsList.currentProject.addItem(newToDo);
    createToDoDom(title, description, priority, date, newToDo.itemId);
    itemDelete(newToDo.itemId, projectsList.currentProject);
    itemEdit(newToDo.itemId, projectsList.currentProject);


    /*Adds functionality to the add to do item modal  */

    document.querySelector("#task-name").value ="";
    document.querySelector("#task-description").value ="";
    document.querySelector("#task-duedate").value ="";

    document.querySelector("#item-creator").close();

    alert(projectsList.currentProject.todoList.length + " Items");
    /*Resets input areas in the item-creator modal */
})

const dateSortBtn = document.querySelector("#sort-date");
dateSortBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const sortedArray = [];
    const length = projectsList.currentProject.todoList.length;
    if(length >0){
        let sortedItems = projectsList.currentProject.todoList.slice().sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate));
        for (let item of sortedItems){
            sortedArray.push(item);
        }
        clearToDoHTML();
        sortedArray.forEach((item) =>{
            let title = item.title;
            let description = item.description;
            let priority = item.priority;
            let date = item.dueDate;
            let id = item.itemId;
            createToDoDom(title, description, priority, date, id);
            itemDelete(id, projectsList.currentProject);
            itemEdit(id, projectsList.currentProject);
        })
        
    }
    
})

const prioritySortBtn = document.querySelector("#sort-priority");
prioritySortBtn.addEventListener("click", () =>{
    const sortedArray = [];
    const length = projectsList.currentProject.todoList.length;
    if (length > 0){
        for(let i = 0; i<length; i++){
            if (projectsList.currentProject.todoList[i].priority === "high"){
                sortedArray.push(projectsList.currentProject.todoList[i])
            }
        }
        for(let j = 0; j<length; j++){
            if (projectsList.currentProject.todoList[j].priority === "moderate"){
                sortedArray.push(projectsList.currentProject.todoList[j])
            }
        }
        for(let k = 0; k<length; k++){
            if (projectsList.currentProject.todoList[k].priority === "low"){
                sortedArray.push(projectsList.currentProject.todoList[k])
            }
        }
        clearToDoHTML();
        sortedArray.forEach((item) =>{
            let title = item.title;
            let description = item.description;
            let priority = item.priority;
            let date = item.dueDate;
            let id = item.itemId;
            createToDoDom(title, description, priority, date, id);
            itemDelete(id, projectsList.currentProject);
            itemEdit(id, projectsList.currentProject);
        })
           
    }

})


const submitEditBtn = document.querySelector("#edit-item-submit");
submitEditBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const itemEditorDialog = document.querySelector("#item-editor");
    const editedTitle = document.querySelector("#edit-name").value;;
    const editedDescription = document.querySelector("#edit-description").value;
    const editedPriority = document.querySelector("#edit-priority").value;
    const editedDate = document.querySelector("#edit-dueDate").value;
    const currentProject = projectsList.currentProject;
    const currentItem = currentProject.currentItem;
    currentItem.title = editedTitle;
    currentItem.description = editedDescription;
    currentItem.priority = editedPriority;
    currentItem.dueDate = editedDate;
    /*
    This portion manipulates the values inside the todo item by setting them to the respective 
    values that was entered by the user 
     */

    const htmlIDselector = "#item" +currentItem.itemId;

    document.querySelector(htmlIDselector + " > .title").textContent = editedTitle;
    document.querySelector(htmlIDselector + " > .description").textContent = editedDescription;
    document.querySelector(htmlIDselector + " > .priority").textContent = editedPriority;
    document.querySelector(htmlIDselector + " > .date").textContent = editedDate;
    
    /*
    his portion of code replaces the values of the respective parts of the item DOM once 
    the submit button has been clicked
    */



    itemEditorDialog.close();
    
})




/*
*/