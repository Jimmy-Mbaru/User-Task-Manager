"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
// src/managers/TaskManager.ts
const Task_1 = require("../models/Task");
class TaskManager {
    constructor(userManager) {
        this.userManager = userManager;
        this.tasks = [];
        this.nextId = 1;
    }
    createTask(title, description) {
        const task = new Task_1.Task(this.nextId++, title, description);
        this.tasks.push(task);
        return task;
    }
    getTasks() {
        return this.tasks;
    }
    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }
    updateTask(id, title, description) {
        const task = this.getTaskById(id);
        if (!task)
            return false;
        task.title = title;
        task.description = description;
        return true;
    }
    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1)
            return false;
        this.tasks.splice(index, 1);
        return true;
    }
    assignTask(taskId, userId) {
        const task = this.getTaskById(taskId);
        const user = this.userManager.getUserById(userId);
        if (!task || !user)
            return false;
        task.assignedTo = userId;
        return true;
    }
    unassignTask(taskId) {
        const task = this.getTaskById(taskId);
        if (!task || task.assignedTo === undefined)
            return false;
        task.assignedTo = undefined;
        return true;
    }
    getTasksByUserId(userId) {
        return this.tasks.filter(task => task.assignedTo === userId);
    }
}
exports.TaskManager = TaskManager;
