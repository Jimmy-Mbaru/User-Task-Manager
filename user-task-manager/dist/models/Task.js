"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
// src/Task.ts
class Task {
    constructor(id, title, description, assignedTo // this means a task *might* be assigned to a user
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignedTo = assignedTo;
    }
}
exports.Task = Task;
