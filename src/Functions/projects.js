export class projectList{
    constructor(){
        this.projectList=[];
        this.projectId = 0;
        this.currentProject = "";
        /*
        List for tracking projects, initially will have 1 project at default.
        ProjectId is a counter that will increment by 1 each time  a project is added
        and will be unique to each project because it should not repeat 
        */
    }

    addProject(project){
        this.projectList.push(project);
        /*Meant to add a project Object/class into the list */
        this.projectId++;

    }

    retrieveIDcounter(){
        return this.projectId;
        /*Getter used to access the project Id value */
    }


    removeProject(identifier){
        this.projectList = this.projectList.filter(project => project.identifier !== identifier);
    }






    
}

export class project{
    constructor(name, identifier){
        this.name = name;
        this.identifier = identifier;
        this.itemId = 0;
        this.todoList= [];
        this.currentItem ="";
        /*
        Project name is a string, identifier could be index number in
        projectList array (this could be length of array etc)
        */
    }


    addItem(todoItem){
        this.todoList.push(todoItem);
        /*Used to add a todoItem object into the list */
        this.itemId ++;
    }

    retrieveItemIdCounter(){
        return this.itemId;
    }

    removeItem(ID){
        this.todoList = this.todoList.filter(todo => todo.itemId !== ID)
    }

    emptyList(){
        this.todoList = [];
    }

    retrieveItem(id){
        for (let i = 0; i < this.todoList.length; i++){
            if(this.todoList[i].itemId === id){
                return this.todoList[i];
            }
        }
    }

}

export function createProjectDom(projectName, IDnumber){
    const projectsContainer = document.querySelector("#projects-container");
    const project = document.createElement("div");
    project.setAttribute("class", "project")
    const projectID = "project" + IDnumber;
    project.setAttribute("id", projectID);
    project.setAttribute("tabindex", 0);


    const title = document.createElement("h3");
    title.textContent = projectName;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("type", "generic");
    deleteBtn.setAttribute("class", projectID);

    project.appendChild(title);
    project.appendChild(deleteBtn);
    projectsContainer.appendChild(project);

}