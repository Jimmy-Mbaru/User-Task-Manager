// src/managers/TaskManager.ts
import { Task } from "../models/Task";
import { UserManager } from "../managers/UserManager";

export class TaskManager {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor(private userManager: UserManager) {}

  createTask(title: string, description: string): Task {
    const task = new Task(this.nextId++, title, description);
    this.tasks.push(task);
    return task;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  updateTask(id: number, title: string, description: string): boolean {
    const task = this.getTaskById(id);
    if (!task) return false;
    task.title = title;
    task.description = description;
    return true;
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  assignTask(taskId: number, userId: number): boolean {
    const task = this.getTaskById(taskId);
    const user = this.userManager.getUserById(userId);
    if (!task || !user) return false;
    task.assignedTo = userId;
    return true;
  }

  unassignTask(taskId: number): boolean {
    const task = this.getTaskById(taskId);
    if (!task || task.assignedTo === undefined) return false;
    task.assignedTo = undefined;
    return true;
  }

  getTasksByUserId(userId: number): Task[] {
    return this.tasks.filter(task => task.assignedTo === userId);
  }
}
