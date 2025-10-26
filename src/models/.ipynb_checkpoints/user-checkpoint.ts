import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("Cannot get users");
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users WHERE id = ($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const hashedPassword = bcrypt.hashSync(
                u.password + process.env.BCRYPT_PASSWORD,
                parseInt(process.env.SALT_ROUNDS as string)
            );
            const sql =
                "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [u.firstname, u.lastname, hashedPassword]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            console.error("DB Error:", err);
            throw new Error(`Could not add new User ${u.firstname}. Error: ${err}`);
        }
    }
    async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT password FROM users WHERE firstname=($1) AND lastname=($2)";
            const result = await conn.query(sql, [firstname, lastname]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(`Could not authenticate user ${firstname} ${lastname}. Error: ${err}`);
        }   
    }      
        
}