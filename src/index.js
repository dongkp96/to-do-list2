import "./styles.css";
import {projectModal, itemModal} from "./Functions/modals.js";
import {projectList, project, createProjectDom} from "./Functions/projects.js"

projectModal();
itemModal();
/* Gives functionality to open/close add-to-do item modal and add project modal */

const projectsList = new projectList();
const defaultProject = new project("Default", projectsList.retrieveIDcounter());
createProjectDom("Default Project", projectsList.retrieveIDcounter());
projectsList.addProject(defaultProject);
/*
Creates a project List object that contains an array that holds project objects then adds
a default project for the user then adds it to the project List in the project List object. 
*/

let currentProject = defaultProject;
