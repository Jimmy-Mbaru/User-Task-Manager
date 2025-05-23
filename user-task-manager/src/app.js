const users = [];
const tasks = [];
let userId = 1;
let taskId = 1;

const userForm = document.getElementById("userForm");
const taskForm = document.getElementById("taskForm");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDescription");
const taskAssigneeSelect = document.getElementById("taskAssignee");
const taskListDiv = document.getElementById("taskList");

// Helper to update dropdown
function updateUserDropdown() {
  taskAssigneeSelect.innerHTML = `<option value="">Assign to...</option>`;
  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    taskAssigneeSelect.appendChild(option);
  });
}

// Display tasks grouped by users
function renderTasks() {
  taskListDiv.innerHTML = "";

  users.forEach(user => {
    const userTasks = tasks.filter(task => task.assignedTo === user.id);
    if (userTasks.length === 0) return;

    const userSection = document.createElement("div");
    userSection.classList.add("task-item");

    const header = document.createElement("h3");
    header.textContent = user.name;
    userSection.appendChild(header);

    userTasks.forEach(task => {
      const taskEl = document.createElement("div");
      taskEl.innerHTML = `
        <p><strong>${task.title}</strong>: ${task.description}</p>
        <div class="task-actions">
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="unassignTask(${task.id})">Unassign</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
      userSection.appendChild(taskEl);
    });

    taskListDiv.appendChild(userSection);
  });
}

// Event: Add User
userForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = userNameInput.value.trim();
  const email = userEmailInput.value.trim();
  if (!name || !email) return;

  users.push({ id: userId++, name, email });
  updateUserDropdown();
  userNameInput.value = "";
  userEmailInput.value = "";
});

// Event: Add Task
taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();
  const assignedTo = parseInt(taskAssigneeSelect.value);

  if (!title || !description || isNaN(assignedTo)) return;

  tasks.push({ id: taskId++, title, description, assignedTo });
  taskTitleInput.value = "";
  taskDescInput.value = "";
  taskAssigneeSelect.value = "";
  renderTasks();
});

// Edit Task
window.editTask = function (id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newTitle = prompt("Edit task title:", task.title);
  const newDesc = prompt("Edit task description:", task.description);
  if (newTitle) task.title = newTitle;
  if (newDesc) task.description = newDesc;

  renderTasks();
};

// Unassign Task
window.unassignTask = function (id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.assignedTo = null;
  renderTasks();
};

// Delete Task
window.deleteTask = function (id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
};
