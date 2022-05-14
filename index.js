document.addEventListener('DOMContentLoaded', function() {
  var toDoList = document.getElementById('todo-list');
  var addToDoButton = document.getElementById('addToDoButton');
  var removeToDoButtons = document.getElementsByClassName('remove-button');
  var inputFocus = false;
  var inputField = document.querySelector('.inputField');


  // =========================================== Add toDos ===============================================================
  // var addToDo = function() {
  //   var toDoItemDiv = document.createElement('div');
  //   toDoItemDiv.classList.add('row', 'todo-item');

  //   // Create div for todo item, will be hidden when editing todo
  //   var toDoView = document.createElement('div');
  //   toDoView.classList.add('view');

  //   // Create checkbox in front of todo item
  //   var checkBox = document.createElement('input');
  //   checkBox.setAttribute('type', 'checkbox');
  //   checkBox.setAttribute('class', 'col-xs-1');
    
  //   // Create label that shows todo text
  //   var toDoItem = document.createElement('label');
  //   // toDoItem.setAttribute('class', 'col-xs-8');
  //   toDoItem.classList.add('col-xs-7', 'col-sm-8');
  //   toDoItem.textContent = inputField.value;

  //   // Create remove button
  //   var removeToDoButton = document.createElement('button');
  //   removeToDoButton.classList.add('btn', 'remove-button', 'col-xs-offset-1');
  //   removeToDoButton.textContent= 'Remove';

  //   // Create input field that shows when editing
  //   var inputEdit = document.createElement('input');
  //   inputEdit.classList.add('col-xs-8');
  //   inputEdit.classList.add('edit'); // What do I need to do with .edit? 

  //   toDoView.appendChild(checkBox);
  //   toDoView.appendChild(toDoItem);
  //   toDoView.appendChild(removeToDoButton);
  //   toDoItemDiv.appendChild(toDoView);
  //   toDoItemDiv.appendChild(inputEdit);

  //   toDoList.appendChild(toDoItemDiv);
  // };

  var addToDo = function() {
    var toDoItemDiv = document.createElement('div');
    toDoItemDiv.classList.add('row', 'todo-item');

    // Create div for todo item, will be hidden when editing todo
    var toDoView = document.createElement('div');
    toDoView.classList.add('view', 'col-xs-offset-1', 'col-xs-10');

    // Create label that shows todo text
    var toDoItem = document.createElement('label');
    toDoItem.textContent = inputField.value;

    // Create checkbox in front of todo item
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');

    toDoItem.appendChild(checkBox);

    // Create remove button
    var removeToDoButton = document.createElement('button');
    /* .pull-right works to pull remove button to the right, without having to specify offsets at different breakpoints */
    /* BUT .pull-right destroys alignment between todo item and remove button!! Will try something else. */
    removeToDoButton.classList.add('btn', 'remove-button', 'col-sm-offset-1');
    removeToDoButton.textContent= 'Remove';

    toDoView.appendChild(toDoItem);
    toDoView.appendChild(removeToDoButton);

    toDoItemDiv.appendChild(toDoView);

    // Create input field that shows when editing
    var inputEdit = document.createElement('input');
    // inputEdit.classList.add('col-xs-8');
    inputEdit.classList.add('edit', 'col-xs-offset-1', 'col-xs-10'); // What do I need to do with .edit? 

    toDoItemDiv.appendChild(inputEdit);

    toDoList.appendChild(toDoItemDiv);
  };

  var checkThenAddToDo = function() {
    if (inputField.value !== '') {
      addToDo();
      inputField.value = '';
    } 
  };


  // -----------Todos can be added by entering todo and 1) clicking the 'Add todo' button, or...-----------
  addToDoButton.addEventListener('click', checkThenAddToDo);

  // -----------2) hitting 'Enter' ------------------------
  inputField.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      checkThenAddToDo();
    }
  });


  // ===================================== Add visual focus on input field upon click =================================
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


  // ==================================== Remove toDos =======================================================================
  var removeToDo = function() {
    var toDoToRemove = event.target;
    // Remove whole div.row.todo-item, not just div.view
    toDoToRemove.parentElement.parentElement.remove();
  };

  toDoList.addEventListener('click', function(event) {
    for (var i = 0; i < removeToDoButtons.length; i++) {
      if (removeToDoButtons[i] === event.target) {
        removeToDo();
      }
    }
  });


  //====================================== Edit todos ============================================================================

  // ------------------- Handle new entries when editing -----------------------
  var editToDo = function() {
    var input = event.target.parentElement;
    // .editing on div.row.todo-item makes div.view invisible
    input.parentElement.classList.add('editing');
    input = input.parentElement.querySelector('.edit');
    input.value = event.target.textContent;
    input.focus();
  };


  toDoList.addEventListener('dblclick', function(event) {
    if (event.target.nodeName === 'LABEL') {
      editToDo();
    }
  });


  // ------------------Save new input or escape ----------------------------
  var editKeyUp = function() {
    var editedToDo = event.target;

    if (event.key === 'Enter') {
      // display new text instead of old todo
      // editedToDo.parentElement.getElementsByTagName('label')[0].textContent = editedToDo.value;
      editedToDo.parentElement.getElementsByTagName('label')[0].innerHTML = `${editedToDo.value}<input type="checkbox">`;
      editedToDo.blur();
      editedToDo.parentElement.classList.remove('editing');
    } else if (event.key === 'Escape') {
      // blur() doesn't do anything - is there a Bootstrap 3 way of doing this?
      editedToDo.blur();
      editedToDo.parentElement.classList.remove('editing');
    }    
  };

  toDoList.addEventListener('keyup', function(event) {
    // If keyup event happened on edit input field:
    if (event.target.classList.contains('edit') === true) {
      editKeyUp();
    }
  });

  // ------------ Handle when user starts editing todo and then clicks outside input field ---------------------------
  window.addEventListener('click', function(event) {
    // If user is currently editing input, ie. if '.editing' exists:
    if (document.querySelector('.editing')) {
      // If user clicks outside current input field:
      if (event.target.classList.contains('edit') === false) {
        // Make div.view visible, make input.edit invisible
        document.querySelector('.editing').classList.remove('editing');
      }
    }
  });
});