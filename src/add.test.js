/*eslint-disable */
import { add, fillList } from './add.js';

describe('todoList', () => {
   beforeEach(()=>{
    localStorage.clear();
   })
  describe('add', () => {
    it('should add a new todo item to the list when Enter is pressed', () => {
      // Arrange
      const input = document.createElement('input');
      input.value = 'Test item';
      const event = new KeyboardEvent('keydown', { code: 'Enter' });

      // Act
      add.call(input, event);

      // Assert
      expect(localStorage.getItem('todoList')).toContain('Test item');
      expect(input.value).toBe('');
      expect(document.querySelectorAll('.item-container').length).toBe(1);
      expect(document.querySelector('.item-container span').textContent).toBe('Test item');
    });

    it('should not add a new todo item to the list when a non-Enter key is pressed', () => {
      // Arrange
      const input = document.createElement('input');
      input.value = 'Test item';
      const event = new KeyboardEvent('keydown', { code: 'Space' });

      // Act
      add.call(input, event);

      // Assert
      expect(localStorage.getItem('todoList')).toBeNull();
      expect(input.value).toBe('Test item');
      expect(document.querySelectorAll('.item-container').length).toBe(0);
    });
  });

  describe('remove', () => {
    it('should remove the corresponding todo item from the list when the delete button is clicked', () => {
      // Arrange
      localStorage.setItem('todoList', JSON.stringify([
        { description: 'Test item 1', complete: false },
        { description: 'Test item 2', complete: false },
      ]));
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input class="checkbox" type="checkbox">
        <span>Test item 1</span>
        <textarea class="text-area" maxlength="30">Test item 1</textarea>
        <button type="button" id="delete">&CircleTimes;</button>
      `;
      document.body.appendChild(listItem);
      const deleteButton = listItem.querySelector('#delete');

      // Act
      deleteButton.click();

      // Assert
      expect(localStorage.getItem('todoList')).toContain('Test item 2');
      expect(document.querySelectorAll('.item-container').length).toBe(1);
      expect(document.querySelector('.item-container span').textContent).toBe('Test item 2');
    });
  });

  describe('fillList', () => {
    it('should populate the list with todo items from localStorage', () => {
      // Arrange
      localStorage.setItem('todoList', JSON.stringify([
        { description: 'Test item 1', complete: false },
        { description: 'Test item 2', complete: true },
      ]));

      // Act
      fillList();

      // Assert
      expect(document.querySelectorAll('.item-container').length).toBe(2);
      expect(document.querySelector('.item-container:nth-child(1) span').textContent).toBe('Test item 1');
      expect(document.querySelector('.item-container:nth-child(2) span').textContent).toBe('Test item 2');
      expect(document.querySelector('.item-container:nth-child(1) .checkbox').checked).toBe(false);
      expect(document.querySelector('.item-container:nth-child(2) .checkbox').checked).toBe(true);
      expect(document.querySelector('.item-container:nth-child(1) .complete')).toBeNull();
      expect(document.querySelector('.item-container:nth-child(2) .complete')).not.toBeNull();
    });
  });
});