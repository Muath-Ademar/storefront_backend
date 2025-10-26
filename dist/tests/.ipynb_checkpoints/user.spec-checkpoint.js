"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const store = new user_1.UserStore();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('create method should add a user', async () => {
        const user = {
            firstName: 'John',
            lastName: 'Doe',
            password: 'password123'
        };
        const createdUser = await store.create(user);
        console.log(createdUser);
        expect(createdUser.firstName).toBe('John');
        expect(createdUser.lastName).toBe('Doe');
    });
    it('index method should return a list of users', async () => {
        const users = await store.index();
        expect(users.length).toBeGreaterThan(0);
    });
    it('show method should return the correct user', async () => {
        const user = await store.show('1');
        expect(user.id).toBe(1);
    });
    it('authenticate method should return a user for correct credentials', async () => {
        const user = await store.authenticate('John', 'Doe', 'password123');
        expect(user).not.toBeNull();
    });
});
