// Global variables

var toDoList = document.getElementById('todo-list');
var addToDoButton = document.getElementById('addToDoButton');
var removeToDoButtons = document.getElementsByClassName('remove-button');
var newToDo;
var toDoItems = 0;
var inputFocus = false;
var inputField = document.getElementById('inputField');


// -------------- Add toDos ------------------------
var addToDo = function() {
  newToDo = inputField.value;
  toDoItems++;
  // Add the new todo and a remove button
  toDoList.insertAdjacentHTML('beforeend', 
  `<div id="toDoItem-${toDoItems}" class="row todo-item" style="opacity: 0">
    <h5 class="col-xs-8">${newToDo}</h5>
    <button class="btn btn-danger remove-button">Remove</button>
  </div>`);
  inputField.value = '';
};

// ToDos can be added by inputting todo and clicking the "add to do" button
window.addEventListener('click', 
function(event) {
  if (inputField.value.length > 0) {
    if (event.target === addToDoButton) {
      addToDo();
    }
  }
});

// ToDos can also be added by inputting todo and hitting Enter key
window.addEventListener('keyup', function(event) {
  if (inputField.value.length > 0) {
    if (event.key === "Enter") {
      addToDo(event);
    }
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
  console.log(event);
  console.log('window.event: ', window.event);
  for (var i = 0; i < removeToDoButtons.length; i++) {
    if (removeToDoButtons[i] === event.target) {
      var toDoId = i + 1;
      var toDoToRemove = document.getElementById(`toDoItem-${toDoId}`);
      toDoToRemove.remove();
      toDoItems--;
    }
  }
};

toDoList.addEventListener('click', removeToDo);