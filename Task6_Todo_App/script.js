const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = [];

// Add New Task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    id: Date.now() + Math.random(),
    text: taskText,
    completed: false,
  });

  taskInput.value = "";
  renderTasks();
}

// Display Tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = task.completed ? "Undo" : "Complete";

    completeBtn.addEventListener("click", function () {
      task.completed = !task.completed;
      renderTasks();
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });

      renderTasks();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  // Update Counters
  totalTasks.textContent = tasks.length;

  completedTasks.textContent = tasks.filter((task) => task.completed).length;

  // Empty Message
  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

// Add Button Click
addTaskBtn.addEventListener("click", addTask);

// Press Enter to Add Task
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Clear All Tasks
clearAllBtn.addEventListener("click", function () {
  if (tasks.length === 0) {
    return;
  }

  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

// Initial Display
renderTasks();
