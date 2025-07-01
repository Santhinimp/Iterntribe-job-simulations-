const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-all");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");

// Function to update the task counter
function updateCounter() {
  const tasks = document.querySelectorAll("#task-list li");
  taskCounter.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''} remaining`;
}

// Function to create a new task item
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "task-item";

  const input = document.createElement("input");
  input.type = "text";
  input.value = taskText;
  input.setAttribute("readonly", true);

  const actions = document.createElement("div");
  actions.className = "action-buttons";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️"; // Edit emoji
  editBtn.className = "edit-btn";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️"; // Delete emoji
  deleteBtn.className = "delete-btn";

  // Toggle complete on clicking the task text
  input.addEventListener("click", () => {
    input.classList.toggle("completed");
  });

  // Edit task logic
  editBtn.addEventListener("click", () => {
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      input.focus();
      editBtn.textContent = "✔️"; // Save emoji
    } else {
      input.setAttribute("readonly", true);
      editBtn.textContent = "✏️"; // Back to edit emoji
    }
  });

  // Delete task logic
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCounter();
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(input);
  li.appendChild(actions);

  return li;
}

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTask = createTaskElement(taskText);
    taskList.appendChild(newTask);
    taskInput.value = "";
    updateCounter();
  }
}

// Add task on "Add" button click
addBtn.addEventListener("click", addTask);

// Add task on Enter key press
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Clear all tasks
clearBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  updateCounter();
});

