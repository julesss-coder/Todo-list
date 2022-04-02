**Requirements:**

- [x] It should have a headline
- [x] It should have an input field for new todos
  - [x] The input field should visually show when it is in focus.
- [x] It should have an 'add todo' button below the input field. 
  - [x] Clicking the button or hitting return should add the todo as the first item in the list above the input form, in the form of text.
  - [ ] The button should appear "pressed down" when clicked, and normal again after the click
    // The button remains active until you click elsewhere. I looked up a bootstrap example page on buttons, and they behaved the same way. It seems to be a default behaviour of Bootstrap 3.
    // I could change this by styling the button without Bootstrap classes, but with regular CSS.
- [x] Each list item should have a remove button.
  - [x] Clicking the remove button should remove the respective todo.

Goal: https://jqueryium-lab-to-do-list--altcademy.repl.co/



**Bootstrap 3 Breakpoints:**

Extra small devices Phones (<768px)	
Small devices Tablets (≥768px)
Medium devices Desktops (≥992px)
Large devices Desktops (≥1200px)



WHAT I LEARNED:

**Bootstrap grid system:**
- The intuitive, easy to understand grid I chose works. It doesn't have to be complicated. The complicated grid setup in the Altcademy example is not necessarily the best way.
- However, this may not be the case with webpages that have breakpoints.
- Draw out grid system on paper to see how to set it up in HTML.
- It is possible to add class="col-xs-8" etc. to the element carrying the content itself. I don't have to make a div class="col-xs-8"and then add a <p> with the content (the latter messed up the alignment, the former created correct alignment).


***JavaScript:***
**Does an event handler get the `event` argument automatically (`window.event`), or do I need to pass it in?**

The event property of the global object (window on the Web) was initially added by Microsoft in Internet Explorer. As it often happens, it then gradually found its way into other popular Web browsers and stayed there becoming another de-facto "standard" -- that is, without being formally specified by any actual authority at the time.

Eventually, WHATWG specified it retroactively in the name of backwards compatibility, defining it as the "current" event, with an attached cautionary note:

Web developers are strongly encouraged to instead rely on the Event object passed to event listeners, as that will result in more portable code. This attribute is not available in workers or worklets, and is inaccurate for events dispatched in shadow trees.

So, the idiomatic solution to the broad class of problems your use case belongs to is to attach an event listener on the element or its ancestor, typically with the addEventListener function, and be using the event object that is explicitly passed to the listener.
URL: https://stackoverflow.com/questions/58341832/event-is-deprecated-what-should-be-used-instead 

**Event listeners on input fields can detect keyup events. No need to add event listener to window instead.**

**DRY code**
I realized I had repeated myself in some places and repaired that by placing the repeated code inside a function.

'There’s a principle in programming called DRY, or Don’t Repeat Yourself. It usually means refactoring code by taking something done several times and turning it into a loop or a function. DRY code is easy to change, because you only have to make any change in one place.'
URL: https://codinglead.co/javascript/what-is-DRY-code