import { User, UserStore } from '../models/user';
import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const store = new UserStore();

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
        const user: User = {
            firstname: 'John',
            lastname: 'Doe',
            password: 'password123'
        };
        const createdUser = await store.create(user);
        console.log('Creating user in test:', user);
        expect(createdUser.firstname).toBe("John");
        expect(createdUser.lastname).toBe("Doe");
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

describe('User API Endpoints', () => {
    let token: string;

    beforeAll(async () => {
        const user = await store.create({
            firstname: 'John',
            lastname: 'Doe',
            password: 'password123'
        });
        token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    });
    it('GET /users should return a list of users', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    it('GET /users/:id should return the correct user', async () => {   
        const response = await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
    it('POST /users should create a new user and return a token', async () => {
        const response = await request
            .post('/users')
            .send({ firstname: 'Jane', lastname: 'Smith', password: 'mypassword' });
        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
    }); 
    it('POST /users/authenticate should authenticate a user and return a token', async () => {
        const response = await request
            .post('/users/authenticate')
            .send({ firstname: 'John', lastname: 'Doe', password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
