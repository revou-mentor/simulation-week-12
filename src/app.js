const todos = [
  { id: 1, text: "Satu", isComplete: true },
  { id: 2, text: "Dua", isComplete: false },
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

const createButtonEl = (text, classes) => {
  const buttonEl = document.createElement("button");
  buttonEl.innerText = text;
  classes.forEach((className) => buttonEl.classList.add(className));
  return buttonEl;
};

const createTodoEL = (todo) => {
  const newTodo = document.createElement("li");
  const todoText = document.createElement("p");
  todoText.innerText = todo.text;

  const actionButtonContainer = document.createElement("div");
  const doneButton = createButtonEl("Done", ["btn-done"]);
  doneButton.addEventListener("click", () => {
    handleDoneButton(todo.id);
  });

  const removeButton = createButtonEl("Remove", ["btn-remove"]);
  removeButton.addEventListener("click", () => {
    handleRemoveButton(todo.id);
  });

  const undoButton = createButtonEl("Undo", ["btn-undo"]);
  undoButton.addEventListener("click", () => {
    handleUndoButton(todo.id);
  });

  actionButtonContainer.append(todo.isComplete ? undoButton : doneButton, removeButton);
  newTodo.append(todoText, actionButtonContainer);
  return newTodo;
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

const createData = (text) => {
  return {
    id: generateId(),
    text,
    isComplete: false,
  };
};

const handleSubmitForm = () => {
  const form = document.getElementById("form-add-todo");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("input-add-todo");
    const data = createData(input.value);
    input.value = "";
    todos.push(data);
    renderTodoList();
  });
};
window.addEventListener("DOMContentLoaded", () => {
  renderTodoList();
  handleSubmitForm();
});
