
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



const abc = () => { return (console.log("hey")) }
//scope


const Task = function (task) {
  this.text = task;
  this.id = Date.now();
};

class TaskMap {
  constructor() {
    this._map = new Map();
  }

  get getTask() {
    return this._map.keys()
  }

  set setTask(taskDetails) {
    if (taskDetails[0] === null && taskDetails[1] === null)
      this._map.clear();

    else if (taskDetails[0] && taskDetails[1] === null) {
      this._map.delete(taskDetails[0]);
    }
    else this._map.set(taskDetails[0], taskDetails[1]);
  }
}


export class TodoController {

  constructor() {
    this.todoTaskMap = new TaskMap();
  }

  addNewTask(task) {
    let newTask = new Task(task);
    this.todoTaskMap.setTask = [newTask.id, newTask];
    return newTask;
  }

  getUserInput() {
    return document.querySelector("#todoDiscriptionInputField").value;
  }

  clearInputField() {
    document.getElementById("todoDiscriptionInputField").value = "";
  }
  createNewTask() {
    let task = this.getUserInput().trim();
    if (!task) return;
    let newTask = this.addNewTask(task);
    let taskListWrapperElement = document.getElementById("taskListWrapper");
    todoView.renderCard(newTask, taskListWrapperElement);
    this.clearInputField();
  };

  editTask(editedTaskDiscription, textElement, id) {
    this.todoTaskMap.setTask = [id, editedTaskDiscription];
    todoView.renderEditedTask(editedTaskDiscription, textElement);
  }

  handleKeyPress(event, textElement, taskId) {
    if (event.keyCode !== 13 || event.which !== 13) return null;
    let editedTaskDiscription = event.currentTarget.value;
    this.editTask(editedTaskDiscription, textElement, taskId);
  }

  handleCardAction(event) {
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
          this.todoTaskMap.setTask = [itemId, null];
          break;
        }

        case TODO_STATES.EDITED: {

          textElement.classList.remove("lineThrough")
          let task = textElement.innerText;
          textElement.innerHTML = "";
          let inputElement = document.createElement("input");
          textElement.appendChild(inputElement);
          inputElement.focus();
          inputElement.value = task;
          inputElement.addEventListener("keydown", (event) => { this.handleKeyPress(event, textElement, itemId) });
          inputElement.onblur = () => {
            let editedTaskDiscription = inputElement.value;
            this.editTask(editedTaskDiscription, textElement, itemId);
          }
          break;
        }
      }
    }
  }

  addTaskOnEnter(event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      this.createNewTask();
    }
  }

  markAllTaskComplete() {
    const getAllkeys = [...this.todoTaskMap.getTask];
    getAllkeys.forEach(function (key) {
      const cardElement = domUtils().closestNode(document.getElementById(key), "card");
      const targetElement = domUtils().childNode(cardElement, "text");
      targetElement.classList.add("lineThrough");
    });
  }

  removeAllTask() {
    document.getElementById("taskListWrapper").innerHTML = "";
  }

  deleteAllCards() {
    this.todoTaskMap.setTask = [null, null];
    this.removeAllTask();
  }

  init() {
    document
      .getElementById("addTaskButton")
      .addEventListener("click", this.createNewTask.bind(this));

    document
      .getElementById("taskListWrapper")
      .addEventListener("click", this.handleCardAction.bind(this));

    document
      .getElementById("todoDiscriptionInputField")
      .addEventListener("keydown", this.addTaskOnEnter.bind(this));

    document
      .getElementById("markAllComplete")
      .addEventListener("click", this.markAllTaskComplete.bind(this));

    document
      .getElementById("deleteAll")
      .addEventListener("click", this.deleteAllCards.bind(this));
  }

}









