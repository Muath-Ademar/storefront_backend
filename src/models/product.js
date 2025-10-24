import Client from '../database';
export class ProductStore {
    async index() {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM product';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Cannot get products');
        }
    }
    async show(id) {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM product WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO product (name, price) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new Product ${name}. Error: ${err}`);
        }
    }
}
