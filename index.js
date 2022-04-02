document.addEventListener('DOMContentLoaded', function() {
  var toDoList = document.getElementById('todo-list');
  var addToDoButton = document.getElementById('addToDoButton');
  var removeToDoButtons = document.getElementsByClassName('remove-button');
  var inputFocus = false;
  var inputField = document.getElementById('inputField');


  // -------------- Add toDos ------------------------
  var addToDo = function() {
    var toDoItemDiv = document.createElement('div');
    toDoItemDiv.classList.add('row', 'todo-item');

    var toDoItem = document.createElement('h5');
    toDoItem.classList.add('col-xs-8');
    toDoItem.textContent = inputField.value;

    var removeToDoButton = document.createElement('button');
    removeToDoButton.classList.add('btn', 'btn-danger', 'remove-button');
    removeToDoButton.textContent= 'Remove';

    toDoItemDiv.appendChild(toDoItem);
    toDoItemDiv.appendChild(removeToDoButton);

    toDoList.appendChild(toDoItemDiv);
  };

  var checkThenAddToDo = function() {
    if (inputField.value !== '') {
      addToDo();
      inputField.value = '';
    } 
  };

  // Todos can be added by entering todo and 1) hitting 'Enter' or 2) clicking the 'Add todo' button
  addToDoButton.addEventListener('click', checkThenAddToDo);
  inputField.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      checkThenAddToDo();
    }
  });



  // ------ Add visual focus on input field upon click ----------
  var focusInputField = function(event) {
    if (event.target === inputField) {
      inputFocus = true;
      inputField.classList.add('box-shadow');
    } else {
      if (inputFocus === true) {
        inputField.classList.remove('box-shadow');
        inputFocus = false;
      }
    }
  };

  window.addEventListener('click', focusInputField);


  // ----------- Remove toDos --------------------
  var removeToDo = function(event) {
    for (var i = 0; i < removeToDoButtons.length; i++) {
      if (removeToDoButtons[i] === event.target) {
        var toDoToRemove = event.target;
        toDoToRemove.parentElement.remove();
      }
    }
  };

  toDoList.addEventListener('click', removeToDo);
});