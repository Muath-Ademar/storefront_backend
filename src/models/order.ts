import Client from '../database'



export type Order = {
    id?: number;
    user_id: number;
    order_status: string;
}



export class OrderStore {
    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();  
            const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.user_id, o.order_status]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not create order for user ${o.user_id}. Error: ${err}`);
        }
    }
    
    async addProduct(quantity: number, userId: string, productId: string): Promise<void> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_items (quantity, user_id, product_id) VALUES($1, $2, $3)';
            await conn.query(sql, [quantity, userId, productId]);
            conn.release();
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order with ${userId}. Error: ${err}`);
        }
    }

    async getCurrentOrderByUser(userId: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
            const result = await conn.query(sql, [userId, 'active']);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find current order for user ${userId}. Error: ${err}`);
        }       
    }
}