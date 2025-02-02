import "./styles.css";
import {projectModal, itemModal} from "./Functions/modals.js";
import {projectList, project, createProjectDom} from "./Functions/projects.js"

projectModal();
itemModal();
/* Gives functionality to open/close add-to-do item modal and add project modal */

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
            alert(projectsList.projectList.length + " projects");
        } 
    })

    /*Function to add delete button functionality to project DOMs to avoid repetition */
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
    })

    
}


const projectsList = new projectList();
const defaultProject = new project("Default", projectsList.retrieveIDcounter());
createProjectDom("Default Project", projectsList.retrieveIDcounter());
projectDelete(defaultProject.identifier, projectsList);
projectHighlight(defaultProject, projectsList);

projectsList.addProject(defaultProject);
projectsList.currentProject = defaultProject;

/*
Creates a project List object that contains an array that holds project objects then adds
a default project for the user then adds it to the project List in the project List object.
Sets the current project to be the default project created. 
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



