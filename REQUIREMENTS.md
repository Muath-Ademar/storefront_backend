# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- GET /products — Get all products
- GET /products/:id — Get a specific product by ID
- POST /products — Create a new product (token required)

#### Users
- GET /users — Get all users (token required)
- GET /users/:id — Get a specific user by ID (token required)
- POST /users — Create a new user
- POST /users/authenticate — Authenticate user and return a JWT token

#### Orders
- GET /orders/current/:userId — Get the current active order for a user (token required)
- POST /orders — Create a new order (token required)
- POST /orders/:userId/products/:productId - Add product to order (token required)

## Data Shapes
#### Users
- id → SERIAL PRIMARY KEY
- firstName → VARCHAR(100)
- lastName → VARCHAR(100)
- password → TEXT

#### Products
- id → SERIAL PRIMARY KEY
- name → VARCHAR(150)
- price → INTEGER

#### Orders
- id → SERIAL PRIMARY KEY
- user_id → INTEGER REFERENCES users(id)
- status → VARCHAR(20)

#### order_items
- id → SERIAL PRIMARY KEY
- user_id → INTEGER REFERENCES users(id)
- product_id -> INTEGER REFERENCES product_id
- quantity -> INTEGER


