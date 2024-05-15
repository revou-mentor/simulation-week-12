const todos = [
  {
    id: 1,
    text: 'Belajar Javascript',
    isComplete: false,
  },
  {
    id: 2,
    text: 'Belajar Javascript 2',
    isComplete: true,
  },
  {
    id: 3,
    text: 'Belajar HTML',
    isComplete: true,
  },
  {
    id: 4,
    text: 'Belajar CSS',
    isComplete: false,
  },
];

const generateId = () => {
  const generatedId = Number(new Date());
  return generatedId;
};

const renderTodoList = () => {
  const completedTodo = document.querySelector('.completed-todo-list');
  const uncompletedTodo = document.querySelector('.uncompleted-todo-list');
  completedTodo.innerHTML = '';
  uncompletedTodo.innerHTML = '';

  todos.forEach((todo) => {
    const todoEl = document.createElement('li');

    const todoText = document.createElement('p');
    todoText.innerText = todo.text;

    const actionButtonContainer = document.createElement('div');
    actionButtonContainer.setAttribute('class', 'todo-button-container');

    const doneButton = document.createElement('button');
    doneButton.setAttribute('class', 'btn btn-success');
    doneButton.innerText = 'Done';
    doneButton.addEventListener('click', () => {
      const data = todos.find((td) => todo.id === td.id);
      if (data) {
        data.isComplete = true;
        renderTodoList();
      }
    });

    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'btn btn-danger');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => {
      const dataIndex = todos.findIndex((td) => todo.id === td.id);
      if (dataIndex !== undefined) {
        todos.splice(dataIndex, 1);
        renderTodoList();
      }
    });

    const undoButton = document.createElement('button');
    undoButton.setAttribute('class', 'btn btn-info');
    undoButton.innerText = 'Undo';
    undoButton.addEventListener('click', () => {
      const data = todos.find((td) => todo.id === td.id);
      if (data) {
        data.isComplete = false;
        renderTodoList();
      }
    });

    actionButtonContainer.append(todo.isComplete ? undoButton : doneButton, removeButton);

    todoEl.append(todoText, actionButtonContainer);

    if (todo.isComplete) {
      completedTodo.append(todoEl);
    } else {
      uncompletedTodo.append(todoEl);
    }
  });
};

window.addEventListener('DOMContentLoaded', () => {
  renderTodoList();

  const form = document.getElementById('todo-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const todoInput = document.getElementById('todo-input');
    const newTodo = {
      id: generateId(),
      text: todoInput.value,
      isComplete: false,
    };
    todoInput.value = '';
    todos.push(newTodo);
    renderTodoList();
  });
});
