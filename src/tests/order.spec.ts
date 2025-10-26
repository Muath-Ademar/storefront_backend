import {Order, OrderStore} from '../models/order'
import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import { User, UserStore } from "../models/user";

const userStore = new UserStore();
const request = supertest(app);
const store = new OrderStore()

describe('Order Model', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a getCurrentOrderByUser method', () => {
        expect(store.getCurrentOrderByUser).toBeDefined();
    });

    it('create method should add an order', async () => {
        const order: Order = {
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
          let token: string;
  
      beforeAll(async () => {
          const user = await userStore.create({
              firstname: 'John',
              lastname: 'Doe',
              password: 'password123'
          });
          token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
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


    