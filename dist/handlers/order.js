"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new order_1.OrderStore();
const create = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const order = {
            user_id: req.body.user_id,
            order_status: req.body.order_status,
            products: req.body.products || [],
        };
        const newOrder = await store.create(order);
        res.status(201).json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const getCurrentOrderByUser = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const userId = req.params.userId;
    try {
        const currentOrder = await store.getCurrentOrderByUser(userId);
        res.json(currentOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_routes = (app) => {
    app.get('/orders/current/:userId', getCurrentOrderByUser);
    app.post('/orders', create);
};
exports.default = order_routes;
