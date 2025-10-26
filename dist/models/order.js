"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (user_id, order_status, products) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [o.user_id, o.order_status, JSON.stringify(o.products)]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not create order for user ${o.user_id}. Error: ${err}`);
        }
    }
    async getCurrentOrderByUser(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
            const result = await conn.query(sql, [userId, 'active']);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find current order for user ${userId}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
