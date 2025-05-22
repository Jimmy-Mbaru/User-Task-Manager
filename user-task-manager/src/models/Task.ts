// src/Task.ts
export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public assignedTo?: number // this means a task *might* be assigned to a user
  ) {}
}
