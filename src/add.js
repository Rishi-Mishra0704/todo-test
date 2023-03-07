import Todo from './Todo.js';

export function fillList() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  Todo.list.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', item.index);
    listItem.classList = 'item-container';

    listItem.innerHTML = `
      <input class="checkbox" type="checkbox">
      <span>${item.description}</span>
      <textarea class="text-area" maxlength="30">${item.description}</textarea>
      <button type ="button" id="delete">&CircleTimes;</button>
      `;

    todoList.appendChild(listItem);

    const checkbox = listItem.querySelector('input');
    const text = listItem.querySelector('span');
    const textInput = listItem.querySelector('textarea');
    const deleteButton = listItem.querySelector('#delete');

    checkbox.addEventListener('change', () => {
      const index = parseInt(listItem.id, 10);
      Todo.list[index].update();
      text.classList.toggle('complete');
      textInput.classList.toggle('complete');
      localStorage.setItem('todoList', JSON.stringify(Todo.list));
    });

    text.addEventListener('click', () => {
      text.style.display = 'none';
      textInput.classList.toggle('edit-item');
    });

    textInput.addEventListener('keydown', (e) => {
      text.innerHTML = textInput.value;

      const index = parseInt(listItem.id, 10);
      Todo.list[index].description = text.innerHTML;

      localStorage.setItem('todoList', JSON.stringify(Todo.list));

      if (e.code === 'Enter') {
        text.style.display = 'block';
        textInput.classList.toggle('edit-item');
      }
    });

    deleteButton.addEventListener('click', () => {
      const index = parseInt(listItem.id, 10);
      Todo.list = Todo.list.filter((item) => item !== Todo.list[index]);
      Todo.list.forEach((item, i) => { item.index = i; });
      localStorage.setItem('todoList', JSON.stringify(Todo.list));
      fillList();
    });

    if (item.complete) {
      checkbox.checked = true;
      text.classList = 'complete';
    }
  });
}

export function add(e) {
  if (e.code === 'Enter') {
    const newItem = new Todo(this.value, false);

    localStorage.setItem('todoList', JSON.stringify(newItem.getList()));

    this.value = '';
    fillList();
  }
}
export function deleteAll() {
  Todo.list = Todo.list.filter((item) => item.complete === false);
  Todo.list.forEach((item, i) => { item.index = i; });
  localStorage.setItem('todoList', JSON.stringify(Todo.list));
  fillList();
}
