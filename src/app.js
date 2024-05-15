const todos = [
  {
    id: 1,
    text: "Belajar Dasar HTML ",
    isComplete: true,
  },
  {
    id: 2,
    text: "Belajar Advance HTML",
    isComplete: false,
  },
  {
    id: 3,
    text: "Belajar Git",
    isComplete: false,
  },
  {
    id: 4,
    text: "Belajar Basic Javascript",
    isComplete: false,
  },
];

const generateId = () => {
  const generatedId = +new Date();
  return generatedId;
};

const handleDoneButton = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.isComplete = true;
    renderTodoList();
  }
};

const handleUndoButton = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.isComplete = false;
    renderTodoList();
  }
};

const handleRemoveButton = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== undefined) {
    todos.splice(todoIndex, 1);
    renderTodoList();
  }
};

const createButtonEl = (text, className) => {
  const buttonEl = document.createElement("button");
  buttonEl.innerText = text;
  buttonEl.setAttribute("class", className);
  return buttonEl;
};

const createTodoEL = (todo) => {
  const todoEl = document.createElement("li");
  const todoText = document.createElement("p");
  todoText.innerText = todo.text;

  const actionButtonContainer = document.createElement("div");
  actionButtonContainer.setAttribute("class", "todo-button-container");

  const doneButton = createButtonEl("Done", "btn btn-success");
  doneButton.addEventListener("click", () => {
    handleDoneButton(todo.id);
  });

  const removeButton = createButtonEl("Remove", "btn btn-danger");
  removeButton.addEventListener("click", () => {
    handleRemoveButton(todo.id);
  });

  const undoButton = createButtonEl("Undo", "btn btn-info");
  undoButton.addEventListener("click", () => {
    handleUndoButton(todo.id);
  });

  actionButtonContainer.append(todo.isComplete ? undoButton : doneButton, removeButton);
  todoEl.append(todoText, actionButtonContainer);
  return todoEl;
};

const renderTodoList = () => {
  const completedTodoList = document.querySelector(".completed-todo-list");
  const uncompletedTodoList = document.querySelector(".uncompleted-todo-list");
  completedTodoList.innerHTML = "";
  uncompletedTodoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoEl = createTodoEL(todo);
    if (!todo.isComplete) uncompletedTodoList.append(todoEl);
    else completedTodoList.append(todoEl);
  });
};

const createPayload = (text) => {
  return {
    id: generateId(),
    text,
    isComplete: false,
  };
};

const handleSubmitForm = () => {
  const form = document.getElementById("todo-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("todo-input");
    const payload = createPayload(input.value);
    input.value = "";
    todos.push(payload);
    renderTodoList();
  });
};

window.addEventListener("DOMContentLoaded", () => {
  renderTodoList();
  handleSubmitForm();
});
