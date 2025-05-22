"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const User_1 = require("../models/User");
class UserManager {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    createUser(name, email) {
        const user = new User_1.User(this.nextId++, name, email);
        this.users.push(user);
        return user;
    }
    getUsers() {
        return this.users;
    }
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    updateUser(id, name, email) {
        const user = this.getUserById(id);
        if (!user)
            return false;
        user.name = name;
        user.email = email;
        return true;
    }
    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
}
exports.UserManager = UserManager;
