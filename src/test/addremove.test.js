/*eslint-disable */
import Todo from '../Todo';
import { add, deleteAll } from '../add';

describe('Todo App', () => {
  beforeEach(() => {
    // Clear the localStorage and Todo list before each test
    localStorage.clear();
    Todo.list = [];
  });

  test('Adding a new item', () => {
    const input = { value: 'Test item', code: 'Enter' };
    add.call(input); // Simulate adding a new item

    expect(Todo.list.length).toBe(1);
    expect(Todo.list[0].description).toBe('Test item');
    expect(Todo.list[0].complete).toBe(false);
    expect(localStorage.getItem('todoList')).toEqual(JSON.stringify(Todo.list));
  });

  test('Deleting an item', () => {
    // Add some test items to the list
    Todo.list.push(new Todo('Item 1', false));
    Todo.list.push(new Todo('Item 2', true));
    Todo.list.push(new Todo('Item 3', false));
  
    // Simulate deleting the second item
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.id = 'delete';
    deleteButton.innerHTML = '&CircleTimes;';
    deleteButton.addEventListener('click', deleteAll);
  
    const listItem = document.createElement('li');
    listItem.id = '1';
    const todoList = document.getElementById('todo-list');
    todoList.appendChild(listItem);
    listItem.appendChild(deleteButton);
  
    deleteButton.dispatchEvent(new MouseEvent('click'));
  
    expect(Todo.list.length).toBe(2);
    expect(Todo.list[0].description).toBe('Item 1');
    expect(Todo.list[1].description).toBe('Item 3');
    expect(localStorage.getItem('todoList')).toEqual(JSON.stringify(Todo.list));
  });
  
});
