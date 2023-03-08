import Todo from './Todo.js';

export function fillList() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  Todo.list.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', index);
    listItem.classList = 'item-container';

    const checkbox = document.createElement('input');
    checkbox.classList = 'checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = item.complete;

    const text = document.createElement('span');
    text.textContent = item.description;

    const textInput = document.createElement('textarea');
    textInput.classList = 'text-area';
    textInput.maxLength = 30;
    textInput.value = item.description;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.id = 'delete';
    deleteButton.innerHTML = '&CircleTimes;';

    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(textInput);
    listItem.appendChild(deleteButton);

    if (item.complete) {
      text.classList.add('complete');
      textInput.classList.add('complete');
    }

    checkbox.addEventListener('change', () => {
      item.complete = checkbox.checked;
      text.classList.toggle('complete');
      textInput.classList.toggle('complete');
      localStorage.setItem('todoList', JSON.stringify(Todo.list));
    });

    text.addEventListener('click', () => {
      text.style.display = 'none';
      textInput.style.display = 'block';
      textInput.focus();
    });

    textInput.addEventListener('blur', () => {
      text.style.display = 'block';
      textInput.style.display = 'none';
      item.description = textInput.value;
      text.textContent = item.description;
      localStorage.setItem('todoList', JSON.stringify(Todo.list));
    });

    deleteButton.addEventListener('click', () => {
      Todo.list.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(Todo.list));
      fillList();
    });

    todoList.appendChild(listItem);
  });
}

export function add(e) {
  if (e.code === 'Enter') {
    const newItem = new Todo(this.value, false);
    Todo.list.push(newItem);
    localStorage.setItem('todoList', JSON.stringify(Todo.list));
    this.value = '';
    fillList();
  }
}

export function deleteAll() {
  Todo.list = Todo.list.filter((item) => !item.complete);
  localStorage.setItem('todoList', JSON.stringify(Todo.list));
  fillList();
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('add-input');
  const deleteAllButton = document.getElementById('delete-all');

  input.addEventListener('keydown', add);
  deleteAllButton.addEventListener('click', deleteAll);

  fillList();
});
