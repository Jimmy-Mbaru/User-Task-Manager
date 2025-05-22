// src/main.ts
import { UserManager } from "./managers/UserManager";
import { TaskManager } from "./managers/TaskManager";

const userManager = new UserManager();
const taskManager = new TaskManager(userManager);

// Create users
const concepta = userManager.createUser("Concepta", "concepta@example.com");
const jimmy = userManager.createUser("Jimmy", "jimmy@example.com");

// Create tasks
const reportTask = taskManager.createTask("Write Report", "Write Q2 report");
const bugFixTask = taskManager.createTask("Fix Bug", "Fix login issue");

// Assign tasks
taskManager.assignTask(reportTask.id, concepta.id);
taskManager.assignTask(bugFixTask.id, jimmy.id);

// Show all users
console.log("Users:", userManager.getUsers());

// Show all tasks
console.log("Tasks:", taskManager.getTasks());

// Show Concepta's tasks
console.log(`Tasks assigned to ${concepta.name}:`, taskManager.getTasksByUserId(concepta.id));
