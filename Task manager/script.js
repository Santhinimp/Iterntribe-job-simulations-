const loadBtn = document.getElementById("loadTasksBtn");
const startBtn = document.getElementById("startProgressBtn");
const stopBtn = document.getElementById("stopProgressBtn");
const notifyBtn = document.getElementById("delayNotificationBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
const newTaskInput = document.getElementById("newTaskInput");
const taskContainer = document.getElementById("taskContainer");
const notificationPanel = document.getElementById("notificationPanel");

let tasks = [];
let progressIntervals = {};

async function loadTasks() {
  taskContainer.innerHTML = "<p>Loading tasks...</p>";
  await new Promise(resolve => setTimeout(resolve, 2000));
  tasks = [
    { id: 1, name: "Task Alpha", progress: 0, status: "Pending" },
    { id: 2, name: "Task Beta", progress: 0, status: "Pending" },
    { id: 3, name: "Task Gamma", progress: 0, status: "Pending" }
  ];
  displayTasks();
}

function displayTasks() {
  taskContainer.innerHTML = "";
  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.id = `task-${task.id}`;
    card.innerHTML = `
      <div class="task-header">
        <span><strong>${task.name}</strong></span>
        <span class="status ${getStatusClass(task.status)}">${task.status}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill ${getProgressClass(task.status)}" style="width: ${task.progress}%"></div>
      </div>
    `;
    taskContainer.appendChild(card);
  });
}

function startProgress() {
  tasks.forEach(task => {
    if (!progressIntervals[task.id] && task.progress < 100) {
      progressIntervals[task.id] = setInterval(() => {
        task.progress += 10;
        if (task.progress >= 100) {
          task.progress = 100;
          task.status = "Completed";
          clearInterval(progressIntervals[task.id]);
        } else {
          task.status = "In Progress";
        }
        updateTaskUI(task);
      }, 1000);
    }
  });
}

function stopProgress() {
  Object.values(progressIntervals).forEach(clearInterval);
  progressIntervals = {};
}

function updateTaskUI(task) {
  const card = document.getElementById(`task-${task.id}`);
  if (card) {
    card.querySelector(".progress-fill").style.width = `${task.progress}%`;
    card.querySelector(".status").textContent = task.status;
    card.querySelector(".status").className = `status ${getStatusClass(task.status)}`;
    card.querySelector(".progress-fill").className = `progress-fill ${getProgressClass(task.status)}`;
  }
}

function showDelayedNotification() {
  setTimeout(() => {
    notificationPanel.style.display = "block";
    notificationPanel.textContent = "🔔 Delayed Notification: Keep tracking your tasks!";
  }, 3000);
}

function getStatusClass(status) {
  if (status === "In Progress") return "status-progress";
  if (status === "Completed") return "status-completed";
  return "status-pending";
}

function getProgressClass(status) {
  if (status === "Completed") return "completed";
  if (status === "In Progress") return "in-progress";
  return "";
}

function addNewTask() {
  const taskName = newTaskInput.value.trim();
  if (!taskName) {
    alert("Please enter a task name.");
    return;
  }
  const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask = {
    id: newId,
    name: taskName,
    progress: 0,
    status: "Pending"
  };
  tasks.push(newTask);
  displayTasks();
  newTaskInput.value = "";
}

loadBtn.addEventListener("click", loadTasks);
startBtn.addEventListener("click", startProgress);
stopBtn.addEventListener("click", stopProgress);
notifyBtn.addEventListener("click", showDelayedNotification);
addTaskBtn.addEventListener("click", addNewTask);


