export class todoItem{
    constructor(title, description, priority, dueDate, itemId){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.itemId = itemId;
    }


}

export function createToDoDom(title, description, priority, date, itemId){
    const itemContainer = document.querySelector("#to-do-items");
    const todoCard = document.createElement("div");
    todoCard.setAttribute("class", "item");
    todoCard.setAttribute("id", "item" + itemId);

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = title;
    itemTitle.setAttribute("class", "title");
    todoCard.appendChild(itemTitle);

    const itemDescription = document.createElement("p");
    itemDescription.textContent = description;
    itemDescription.setAttribute("class", "description");
    todoCard.appendChild(itemDescription);

    const itemPriority = document.createElement("p");
    itemPriority.textContent = priority;
    itemPriority.setAttribute("class", "priority");
    todoCard.appendChild(itemPriority);

    const itemDate = document.createElement("p");
    itemDate.textContent = date;
    itemDate.setAttribute("class", "date");
    todoCard.appendChild(itemDate);

    const itemBtnHolder = document.createElement("div");
    itemBtnHolder.setAttribute("class", "item-buttons");

    const editBtn = document.createElement("button");
    editBtn.textContent ="Edit";
    editBtn.setAttribute("type", "generic" );
    editBtn.setAttribute("class", "edit");
    editBtn.classList.add("item"+itemId);
    itemBtnHolder.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("type", "generic");
    deleteBtn.setAttribute("class", "delete");
    deleteBtn.classList.add("item"+itemId);
    itemBtnHolder.appendChild(deleteBtn);

    todoCard.appendChild(itemBtnHolder);

    itemContainer.appendChild(todoCard);

    /*
    Function used to create the to-do-item DOM from the values inside
    the item creator modal
     */


}

export function itemDelete(itemId, project){
    const itemDeleteBtn = document.querySelector(".delete.item" + itemId );
    if(!itemDeleteBtn){
        return;
    }

    itemDeleteBtn.addEventListener("click", (e) =>{
        const itemsContainer = document.querySelector("#to-do-items");
        const removedId = "#" + e.target.classList[1];
        const itemDom = document.querySelector(removedId);
        if(itemDom){
            itemsContainer.removeChild(itemDom);
            project.removeItem(itemId);
            alert(project.todoList.length);
        }

    })
    /*Similar function to the projectDelete btn that deletes the to-do-item DOM 
    and removes the item from the todoList array in the specified project */

}

export function itemEdit(itemId, project){
    const itemEditBtn = document.querySelector(".edit.item" +itemId);
    if(!itemEditBtn){
        return;
    }

    itemEditBtn.addEventListener("click", (e) =>{
        e.preventDefault();
        const itemEditorDialog = document.querySelector("#item-editor");
        itemEditorDialog.showModal();
        const currentItem = project.retrieveItem(itemId);
        document.querySelector("#edit-name").value = currentItem.title;
        document.querySelector("#edit-description").value = currentItem.description;
        document.querySelector("#edit-priority").value = currentItem.priority;
        document.querySelector("#edit-dueDate").value = currentItem.dueDate;
        project.currentItem = currentItem;

      /*
      Adds eventListener that opens the edit items dialog and then fills in its input fields with values
      from the todo item object that is currently being selected
      */
    })


}
