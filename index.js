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

    // Create checkbox in front of todo item
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'col-xs-1');
    
  //   <input type="checkbox" id="scales" name="scales">
  // <label for="scales">Scales</label>

    var toDoItem = document.createElement('label');
    toDoItem.setAttribute('class', 'col-xs-8');
    toDoItem.textContent = inputField.value;

    // var toDoItem = document.createElement('h5');
    // toDoItem.classList.add('col-xs-8');
    // toDoItem.textContent = inputField.value;

    var removeToDoButton = document.createElement('button');
    removeToDoButton.classList.add('btn', 'btn-danger', 'remove-button');
    removeToDoButton.textContent= 'Remove';

    toDoItemDiv.appendChild(checkBox);
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
  var removeToDo = function() {
    var toDoToRemove = event.target;
    toDoToRemove.parentElement.remove();
  };

  toDoList.addEventListener('click', function(event) {
    for (var i = 0; i < removeToDoButtons.length; i++) {
      if (removeToDoButtons[i] === event.target) {
        removeToDo();
      }
    }
  });

  //------- Edit todos -------------------------------

  var editToDo = function() {
    var currentToDoToEdit = document.getElementsByClassName('editing')[0];
    console.log('currentToDoToEdit: ', currentToDoToEdit);
    // this adds two input fields to one todo item
    // todos disappear (as intended)
   
    var editInputField = document.createElement('input');
    editInputField.classList.add('edit');
    // add bootstrap classes, also for focus
    editInputField.classList.add('col-xs-8');
    currentToDoToEdit.appendChild(editInputField);
  };

    
  // listens for dblclicks
  toDoList.addEventListener('dblclick', function(event) {
    for (var i = 0; i < toDoList.children.length; i++) {
      // What is the event.target in case of a doubleclick? 
      // It is the label!!
      console.log('event.target: ', event.target);
      // If event.target is the second child of the current child element of toDoList, ie. the label element of that child:
      if (event.target === toDoList.children[i].children[1]) {
        // todo item becomes invisible immediately - put this later in the code?
        toDoList.children[i].classList.add('editing');
        editToDo();
      }
    }
  });

  // listens for keyup events
  toDoList.addEventListener('keyup', function(event) {
    var editInputField = document.getElementsByClassName('edit')[0];
    console.log('event.target: ', event.target);
    if (editInputField.value !== '') {
      if (event.key === 'Enter') {
        //not defined
        editInputField.parentElement.children[1].textContent = editInputField.value;
        editInputField.parentElement.classList.remove('editing');
        editInputField.classList.add('edited');
      } 
    }
  });


});


  

/* 
PROBLEMS:

Displaying edited content after editing todo item does not work in all cases

Last entry in input field is not deleted upon adding todo, or is displayed again // cannot reproduce issue

When editing a todo and clicking outside the edit input field, and clicking back into it, the Enter key does not lead to the edited todo being displayed as a regular todo item.
  When I dblclcik on another todo to edit it, the previous one still displays the input field. The enter key does not save the current todo either.

Nothing happens when user hits Esc after editing a todo.

delete input element on todo item when finished editing
Is it possible to add two input fields on one todo item by dblclicking several times?

removeToDo should not run everytime I click on a todo item. 
- Q: Can I add an event listener to the remove button?
- A: But then I would have as many event listeners as remove buttons.
- Better to check if the event-target is a remove button

*/