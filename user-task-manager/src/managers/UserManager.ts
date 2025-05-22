import { User } from "../models/User";

export class UserManager {
  private users: User[] = [];
  private nextId = 1;

  createUser(name: string, email: string): User {
    const user = new User(this.nextId++, name, email);
    this.users.push(user);
    return user;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  updateUser(id: number, name: string, email: string): boolean {
    const user = this.getUserById(id);
    if (!user) return false;
    user.name = name;
    user.email = email;
    return true;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
