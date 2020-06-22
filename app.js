// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const searchTodos = document.querySelector(".search-todos");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
searchTodos.addEventListener("keyup", findTodos);

// functions

// add new TODO
function addNewTodo(inputValue) {
  // create div with class todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = inputValue;
  newTodo.classList.add("todo-item");
  // move li inside div
  todoDiv.appendChild(newTodo);

  // CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  // add html code inside button tag
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  // move button inside div
  todoDiv.appendChild(completedButton);

  // CHECK trash BUTTON
  const trashButton = document.createElement("button");
  // add html code inside button tag
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  // move button inside div
  todoDiv.appendChild(trashButton);

  // move/APPEND DIV TO LIST
  todoList.appendChild(todoDiv);
}

// check TODO in local storage
function checkTodosInLocalStorage() {
  let todos;
  // check -- do i have thing in localstorage?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

// add todo function
function addTodo(event) {
  // prevent form from refresh
  event.preventDefault();

  // check empty todo input
  if (todoInput.value) {
    let inputText = todoInput.value.toLowerCase();
    todosItems = document.querySelectorAll(".todo-item");
    let itemText = [];

    todosItems.forEach((item) => {
      itemText.push(item.firstChild.textContent.toLocaleLowerCase());
    });

    if (itemText.includes(inputText)) {
      alert("Todos name already exists");
    } else {
      addNewTodo(todoInput.value);
      saveLocalTodos(todoInput.value);
      // clear Todo Input Value
      todoInput.value = "";
    }
  } else {
    alert("Make your TODO !");
  }
}

// delete & check todo function
function deleteCheck(e) {
  e.preventDefault();
  const item = e.target;

  // delete TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation class for css
    todo.classList.add("fall");
    removeLocalTodos(todo);
    // do function after css animation with 'transitionend' event
    todo.addEventListener("transitionend", function () {
      // delete TODO
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// function filter
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// save TODO to localstorage
function saveLocalTodos(todo) {
  // check -- do i have thing in localstorage?
  let todos = checkTodosInLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get Todos from local storage
function getTodos() {
  // check -- do i have thing in localstorage?
  let todos = checkTodosInLocalStorage();
  todos.forEach((todo) => {
    addNewTodo(todo);
  });
}

// delete TODOS from local storage
function removeLocalTodos(todo) {
  // check -- do i have thing in localstorage?
  let todos = checkTodosInLocalStorage();

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function findTodos(e) {
  // ambil isi dari input form filter
  const filterText = e.target.value.toLowerCase();

  // select semua class ".todo-item"
  const todosItems = document.querySelectorAll(".todo-item");

  todosItems.forEach((item) => {
    // ambil semua isi firstchild dari elemen item dan ubah ke huruf kecil
    const itemText = item.firstChild.textContent.toLowerCase();
    // cek apakah filterText ada di itemText
    if (itemText.indexOf(filterText) !== -1) {
      // tambahkan attribut style css ke elemen item (li)
      item.parentNode.setAttribute("style", "display:flex;");
    } else {
      item.parentNode.setAttribute("style", "display:none !important;");
    }
  });
}
