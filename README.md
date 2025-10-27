# Storefront Backend

This is the backend for the **Storefront** project, built with **TypeScript**, **Node.js**, **Express**, and **PostgreSQL**. It provides RESTful API endpoints for managing users, products, and orders in an e-commerce application. The backend includes authentication, authorization, and CRUD operations.

---

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [NPM scripts](#npm-script)



---

## Features

- User registration, authentication (JWT), and management  
- CRUD operations for products  
- Order management (create, view current order for a user)  
- Password hashing using bcrypt  
- Protected routes using JWT authentication  
- Fully tested with Jasmine and Supertest  

---

## Technologies

- Node.js  
- Express  
- TypeScript  
- PostgreSQL  
- Bcrypt for password hashing  
- JSON Web Tokens (JWT) for authentication  
- Jasmine and Supertest for testing  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Muath-Ademar/storefront_backend.git
cd storefront_backend
```

2. Install dependencies:

```bash
npm i
```

3. Run migrations for database tables:

```bash
db-migrate up
```

---

## Environment Variables

```bash
POSTGRES_HOST=localhost
POSTGRES_DB=your_data_base
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
BCRYPT_PASSWORD=your_secret_pepper
SALT_ROUNDS=10
TOKEN_SECRET=your_jwt_secret
ENV=test
```

---


## 🧠 NPM Scripts

| Script | Description |
|--------|--------------|
| `npm run start` | Runs the server using **ts-node** (development mode). |
| `npm run watch` | Automatically compiles TypeScript and restarts the server on changes. |
| `npm run test` | Compiles TypeScript, runs database migrations for testing, executes Jasmine tests, and drops the test database afterward. |
| `npm run tsc` | Compiles TypeScript files manually. |




















