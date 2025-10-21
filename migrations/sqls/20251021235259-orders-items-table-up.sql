CREATE TABLE orders_items (id SERIAL PRIMARY KEY, order_id integer REFERENCES orders(id), product_id integer REFERENCES product(id), quantity integer);
