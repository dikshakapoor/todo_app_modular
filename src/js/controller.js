
// camel case ids and classes , files, variables,

// render only the change - edit, delete 

// find, closest(include current node) 

// find("#abc")
// find(".abc")

// closest(".abc")
// closest("#abc")

// modular pattern follow properly, why to use IIFE

// use m - VC - use instances - JS classes - JS OOP

//new

//nothing to be shared by closure

//difference between class, object, instance - naming convention

// where is view?


import TODO_STATES from "./todoStates";
import domUtils from "./domUtils";
import todoView from "./todoView";



const abc = () => { return (console.log("hey")) } //scope is inside this module only so its not present in window object or global 
//scope



class TaskMap {
  constructor() {
    this.map = new Map();
  }
  get getTask() {
    return this.map.keys()
  }

  set setTask(taskDetails) {
    if (taskDetails[0] === null && taskDetails[1] === null)
      this.map.clear();

    else if (taskDetails[0] === null) {
      this.map.delete(id);
    }
    else this.map.set(taskDetails[0], taskDetails[1]);
  }
}

const Task = function (task) {
  this.text = task;
  this.id = Date.now();

};


const todoController = (function () {
  const todoTaskMap = new TaskMap();

  const addNewTask = function (task) {
    let newTask = new Task(task);
    todoTaskMap.setTask = [newTask.id, newTask];
    return newTask;
  }

  const createNewTask = function () {
    let task = getUserInput().trim();
    if (!task) return;
    let newTask = addNewTask(task);
    let taskListWrapperElement = document.getElementById("taskListWrapper");
    todoView.renderCard(newTask, taskListWrapperElement);
    clearInputField();
  };

  const editTask = function (editedTaskDiscription, textElement, id) {
    todoTaskMap.setTask = [id, editedTaskDiscription];
    todoView.renderEditedTask(editedTaskDiscription, textElement);
  }

  const handleKeyPress = function (event, textElement, taskId) {
    if (event.keyCode !== 13 || event.which !== 13) return null;
    let editedTaskDiscription = event.currentTarget.value;
    editTask(editedTaskDiscription, textElement, taskId);
  }

  const handleCardAction = function (event) {
    let state = event.target.getAttribute("data-type");
    if (
      state === TODO_STATES.COMPLETED ||
      state === TODO_STATES.EDITED ||
      state === TODO_STATES.REMOVED
    ) {
      const targetElement = event.target;
      const itemId = parseInt(domUtils().closestNode(targetElement, "card").id);
      const cardElement = document.getElementById(itemId);
      const textElement = domUtils().childNode(cardElement, "text");
      switch (state) {

        case TODO_STATES.COMPLETED: {
          textElement.classList.add("lineThrough");
          break;
        }

        case TODO_STATES.REMOVED: {
          cardElement.remove();
          todoTaskMap.setTask = [itemId, null];
          break;
        }

        case TODO_STATES.EDITED: {
          debugger;
          textElement.classList.remove("lineThrough")
          let task = textElement.innerText;
          textElement.innerHTML = "";
          let inputElement = document.createElement("input");
          textElement.appendChild(inputElement);
          inputElement.focus();
          inputElement.value = task;
          inputElement.addEventListener("keydown", (event) => { handleKeyPress(event, textElement, task.id) });
          inputElement.onblur = function () {
            let editedTaskDiscription = inputElement.value;
            editTask(editedTaskDiscription, textElement, task.id);
          }
          break;
        }
      }
    }
  }


  const removeAllTask = function () {
    document.getElementById("taskListWrapper").innerHTML = "";
  }

  const getUserInput = function () {
    return document.querySelector("#todoDiscriptionInputField").value;
  }

  const clearInputField = function () {
    document.getElementById("todoDiscriptionInputField").value = "";
  }

  const addTaskOnEnter = function (event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      createNewTask();
    }
  }

  const markAllTaskComplete = function () {
    debugger;
    const getAllkeys = [...todoTaskMap.getTask]; //converting object into array via spread operator
    getAllkeys.forEach(function (key) {
      const cardElement = domUtils().closestNode(document.getElementById(key), "card");
      const targetElement = domUtils().childNode(cardElement, "text");
      targetElement.classList.add("lineThrough");
    });
  }

  const deleteAllCards = function () {
    todoTaskMap.setTask = [null, null];
    removeAllTask();
  }

  const actionHandler = function () {
    document
      .getElementById("addTaskButton")
      .addEventListener("click", createNewTask);

    document
      .getElementById("taskListWrapper")
      .addEventListener("click", handleCardAction);

    document
      .getElementById("todoDiscriptionInputField")
      .addEventListener("keydown", addTaskOnEnter);

    document
      .getElementById("markAllComplete")
      .addEventListener("click", markAllTaskComplete);

    document
      .getElementById("deleteAll")
      .addEventListener("click", deleteAllCards);
  };

  return {
    init: function () {
      actionHandler();
    }
  };
})()


export default todoController;








