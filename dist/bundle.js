/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
      /******/
    }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
      /******/
    };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
  }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
    /******/
  };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
    /******/
  };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
  /******/
})
/************************************************************************/
/******/({

/***/ "./src/js/Controller.js":
/*!******************************!*\
  !*** ./src/js/Controller.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TodoStates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoStates */ \"./src/js/TodoStates.js\");\n/* harmony import */ var _UIController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIController */ \"./src/js/UIController.js\");\n\n\n// console.log(dataController) how does this work\n// find, closest(include current node) // find is used to find node just above the one cicked and closest will have current node and next\n\n// find(\"#abc\")\n// find(\".abc\")\n\n// closest(\".abc\")\n// closest(\"#abc\")\n\n// camel case ids and classes // done -- just chcek once more\n\n// render only the change - edit, delete --done\n\n//   modular pattern follow properly\n\n\n// use m - VC - use instances - JS classes - JS OOP\n\n\n\nlet controller = (function (uiController) {\n\n  const TaskObject = function (task) {\n    this.text = task;\n    this.id = Date.now();\n    this.status = \"\";\n    this.updated = false;\n  };\n\n  let taskMap = new Map();\n\n  const closestNode = function (element, dataAttribute) {\n\n    while (element.getAttribute(\"data-type\") !== dataAttribute) {\n      element = element.parentNode;\n    }\n    let getTargetNode = element;\n    return {\n      targetNode: getTargetNode,\n    };\n  }\n\n  const childNode = function (element, getDataAttribute) {\n    const numberOfChildNodes = element.targetNode.childNodes;\n    let counter = 0;\n    while (counter < numberOfChildNodes) {\n      if (element.targetNode.childNodes[counter].getAttribute(\"data-type\") === getDataAttribute)\n        break;\n      counter++;\n    }\n    const getChildNode = element.targetNode.childNodes[counter];\n    return getChildNode;\n  }\n\n  const addNewTask = function (task) {\n    let newTask = new TaskObject(task);\n    taskMap.set(newTask.id, newTask);\n    return taskMap;\n  }\n\n  const createNewTask = function () {\n    let task = uiController.getInput().trim();\n    if (!task) return;\n    // add item to datacontroller\n    let addItem = addNewTask(task);\n    //add item to UIController\n    uiController.renderItems(addItem);\n    // clearing input field\n    uiController.clearInputField();\n  };\n\n  const setStatusCompeleted = function (itemId) {\n    taskMap.get(itemId).status = _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].COMPLETED;\n    taskMap.get(itemId).updated = true;\n    return taskMap;\n  }\n\n  const setStatusEdited = function (itemId) {\n    taskMap.get(itemId).status = _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].EDITED;\n    taskMap.get(itemId).updated = true;\n  }\n\n  function getTypeOfEvent(event) {\n    let eventType = event.target.getAttribute(\"data-type\");\n    if (\n      eventType === _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].COMPLETED ||\n      eventType === _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].EDITED ||\n      eventType === _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].REMOVED\n    ) {\n      const element = event.target;\n      const itemId = parseInt(closestNode(element, \"card\").targetNode.id);\n      switch (eventType) {\n\n        case _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].COMPLETED: {\n          taskMap = setStatusCompeleted(itemId);\n          const element = event.target;\n          const requiredElement = closestNode(element, \"card\");\n          const targetElement = childNode(requiredElement, \"text\");\n          uiController.renderItems(taskMap, targetElement);\n          taskMap.get(itemId).updated = false;\n          break;\n        }\n\n        case _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].REMOVED: {\n          taskMap.get(itemId).status = _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].REMOVED;\n          taskMap.get(itemId).updated = true;\n          const element = event.target;\n          const todoCardElement = closestNode(element, \"card\");\n          uiController.renderItems(taskMap, todoCardElement);\n          taskMap.delete(itemId)\n          break;\n        }\n\n        case _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].EDITED: {\n          setStatusEdited(itemId);\n          const element = event.target;\n          const requiredElement = closestNode(element, \"card\");\n          const targetElement = childNode(requiredElement, \"text\");\n          uiController.renderItems(taskMap, targetElement);\n          taskMap.get(itemId).updated = false;\n          break;\n        }\n\n      }\n    }\n  }\n\n  function addTaskOnEnter(event) {\n    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {\n      createNewTask();\n    }\n  }\n\n  function markAllComplete() {\n    taskMap.forEach(function (task) {\n      task.status = _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARK_ALL_COMPLETE;\n      task.updated = true;\n      const requiredElement = closestNode(document.getElementById(task.id), \"card\");\n      const targetElement = childNode(requiredElement, \"text\");\n      uiController.renderItems(taskMap, targetElement);\n      taskMap.get(task.id).updated = false;\n    });\n  }\n\n  function getEditedTask(event) {\n    let taskObj = event.detail;\n    const { descriptiion, id } = taskObj;\n    taskMap.get(id).text = descriptiion;\n    taskMap.get(id).status = \"\";\n    taskMap.get(id).updated = true;//reseting the update\n  }\n\n  function deleteAll() {\n\n    taskMap.clear();\n    uiController.removeAllTask();\n  }\n\n  const setEventListeners = function () {\n\n    document\n      .getElementById(\"addTaskButton\")\n      .addEventListener(\"click\", createNewTask);\n\n    document\n      .getElementById(\"taskListWrapper\")\n      .addEventListener(\"click\", getTypeOfEvent);\n\n    document\n      .getElementById(\"todoDiscriptionInputField\")\n      .addEventListener(\"keypress\", addTaskOnEnter);\n\n    document\n      .getElementById(\"markAllComplete\")\n      .addEventListener(\"click\", markAllComplete);\n\n    document\n      .getElementById(\"deleteAll\")\n      .addEventListener(\"click\", deleteAll);\n\n    document.addEventListener(\"editedTaskDiscription\", getEditedTask);\n\n  };\n\n  return {\n    init: function () {\n      setEventListeners();\n    }\n  };\n})(_UIController__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\ncontroller.init();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (controller);\n\n\n\n//# sourceURL=webpack:///./src/js/Controller.js?");

      /***/
    }),

/***/ "./src/js/TodoStates.js":
/*!******************************!*\
  !*** ./src/js/TodoStates.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\nconst TODO_STATES = {\n  COMPLETED: \"COMPLETED\",\n  REMOVED: \"REMOVED\",\n  EDITED: \"EDITED\",\n  MARK_ALL_COMPLETE: \"MARK_ALL_COMPLETE\",\n  DELETE_ALL: \"DELETE_ALL\",\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TODO_STATES);\n\n//# sourceURL=webpack:///./src/js/TodoStates.js?");

      /***/
    }),

/***/ "./src/js/UIController.js":
/*!********************************!*\
  !*** ./src/js/UIController.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TodoStates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoStates */ \"./src/js/TodoStates.js\");\n\n\nlet uiController = (function () {\n\n\n  function fetchEditedTask(selectedElement, element, id) {\n    let editedTaskDiscription = element.value;\n    selectedElement.innerHTML = \"\";\n    let editedCardHtml = '<div class = \"task\" id = %id%><b>%editedText%</b>';\n    editedCardHtml = editedCardHtml.replace(\"%editedText%\", editedTaskDiscription);\n    selectedElement.insertAdjacentHTML(\"afterbegin\", editedCardHtml)\n    document.dispatchEvent(new CustomEvent(\"editedTaskDiscription\", {\n      detail: {\n        descriptiion: editedTaskDiscription,\n        id: id\n      }\n    }))\n  }\n\n  function renderCard(task, element) {\n\n    let html =\n      '<div data-type = \"card\" class = \"card\" id = %id%><div data-type = \"text\" class = \"task\" ><b>%text%</b> </div>' +\n      '<div class = \"icon\"><button data-type = \"COMPLETED\" class = \"COMPLETED\"><img data-type= \"COMPLETED\"src =_ionicons_svg_md-checkmark-circle.svg width = \"20px\" heigth = \"20px\">' +\n      '</button><button data-type = \"REMOVED\" class = \"REMOVED\"><img data-type=\"REMOVED\" img src = \"_ionicons_svg_md-trash.svg\"  width = \"20px\" height = \"20px\"></button><button data-type = \"EDITED\" class = \"EDITED\">' +\n      '<img data-type = \"EDITED\" src = \"_ionicons_svg_md-create.svg\" width = \"20px\" heigth = \"20px\"></button></button></div></div>';\n\n    html = html.replace(\"%text%\", task.text);\n    html = html.replace(\"%id%\", task.id);\n\n    element.insertAdjacentHTML(\"beforeend\", html);\n    task.updated = true;\n  }\n\n  return {\n\n    removeAllTask: function () {\n      document.getElementById(\"taskListWrapper\").innerHTML = \"\";\n    },\n\n    getInput: function () {\n      return document.querySelector(\"#todoDiscriptionInputField\").value;\n    },\n\n    clearInputField: function () {\n      document.getElementById(\"todoDiscriptionInputField\").value = \"\";\n    },\n\n    renderItems: function (taskList, selectedElement) {\n\n      taskList.forEach(function (task) {\n\n        if (task.status === \"\" && (task.updated === false)) {\n          let element = document.getElementById(\"taskListWrapper\");\n          return renderCard(task, element);\n        }\n        else if (task.updated === true && task.status) {\n\n          switch (task.status) {\n\n            case _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].COMPLETED: {\n              selectedElement.classList.add(\"checked\")\n              break;\n            }\n\n            case _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].EDITED: {\n              selectedElement.classList.remove(\"checked\")\n              selectedElement.innerHTML = \"\";\n              let element = document.createElement(\"input\");\n              selectedElement.appendChild(element);\n              element.focus();\n              element.value = task.text;\n              element.addEventListener(\"keypress\", handleKeyPress);\n              function handleKeyPress(event) {\n                if (event.keyCode !== 13 || event.which !== 13) return null;\n                fetchEditedTask(selectedElement, element, task.id);\n              }\n              element.onblur = function () {\n                fetchEditedTask(selectedElement, element, task.id);\n              }\n              break;\n            }\n\n            case _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].REMOVED: {\n              selectedElement.targetNode.remove();\n              break;\n            }\n\n            case _TodoStates__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARK_ALL_COMPLETE: {\n              selectedElement.classList.add(\"checked\");\n              break;\n            }\n\n          }\n\n        }\n      });\n\n    }\n  }\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (uiController);\n\n\n//# sourceURL=webpack:///./src/js/UIController.js?");

      /***/
    }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      eval("const controller = __webpack_require__(/*! ./Controller */ \"./src/js/Controller.js\")\n\ncontroller.init();\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

      /***/
    })

  /******/
});