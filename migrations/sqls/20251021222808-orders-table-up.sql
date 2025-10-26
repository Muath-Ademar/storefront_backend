CREATE TYPE status AS ENUM ('active', 'complete');

CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id integer REFERENCES users(id), order_status status, products JSON);