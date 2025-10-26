"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const userStore = new user_1.UserStore();
const request = (0, supertest_1.default)(server_1.default);
const store = new order_1.OrderStore();
describe('Order Model', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a getCurrentOrderByUser method', () => {
        expect(store.getCurrentOrderByUser).toBeDefined();
    });
    it('create method should add an order', async () => {
        const order = {
            user_id: 1,
            order_status: 'active',
            products: [{ product_id: 1, quantity: 2 }]
        };
        const createdOrder = await store.create(order);
        expect(createdOrder.user_id).toBe(1);
        expect(createdOrder.order_status).toBe('active');
    });
    it('getCurrentOrderByUser method should return the current order for a user', async () => {
        const currentOrder = await store.getCurrentOrderByUser('1');
        expect(currentOrder.user_id).toBe(1);
        expect(currentOrder.order_status).toBe('active');
    });
});
describe('Order API Endpoints', () => {
    let token;
    beforeAll(async () => {
        const user = await userStore.create({
            firstname: 'John',
            lastname: 'Doe',
            password: 'password123'
        });
        token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
    });
    it('POST /orders should create a new order', async () => {
        const response = await request
            .post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({
            user_id: 1,
            order_status: 'active',
            products: [{ product_id: 1, quantity: 2 }]
        });
        expect(response.status).toBe(201);
        expect(response.body.user_id).toBe(1);
        expect(response.body.order_status).toBe('active');
    });
    it('GET /orders/current/:userId should return the current order for a user', async () => {
        const response = await request
            .get('/orders/current/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.user_id).toBe(1);
        expect(response.body.order_status).toBe('active');
    });
});
