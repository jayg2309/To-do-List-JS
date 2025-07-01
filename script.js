document.addEventListener("DOMContentLoaded", () => {
  // step 1 - just grab the elements
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });

  addTaskButton.addEventListener("click", () => {
    const taskTest = todoInput.value.trim();
    if (taskTest === "") return;

    const newTask = {
      id: Date.now(), // a way to create id
      text: taskTest,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = ""; // clear input
    console.log(tasks);
  });
  //reading existing data from local storage and rendering to DOM
  function renderTask(task) {
    //create list item
    const li = document.createElement("li");
    //add attributes
    // if task completed
    if (task.completed) li.classList.add("completed");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
    <span> ${task.text}</span>
     <button> delete </button>
    `;
    li.addEventListener("click", (e) => {
      //figuring where it was clicked
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed; // true ka false, false ka true
      // removing and adding class completed
      li.classList.toggle("completed");
      saveTasks();
    });
    //adding listener just for the button
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // to stop event bubbling up (google)
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });
    todoList.appendChild(li);
  }

  // add data to local storage using function
  //localStorage API used
  // .setItem --> add to local storage
  // JSON.stringify --> converts to string
  // JSON.parse --> converts back to original form from string

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
