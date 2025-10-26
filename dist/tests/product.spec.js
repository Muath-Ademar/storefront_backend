"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const userStore = new user_1.UserStore();
const request = (0, supertest_1.default)(server_1.default);
const store = new product_1.ProductStore();
describe("Product Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it("create method should add a product", async () => {
        const product = {
            name: "Test Product",
            price: 10,
        };
        const createdProduct = await store.create(product);
        expect(createdProduct.name).toBe("Test Product");
        expect(createdProduct.price).toBe(10);
    });
    it("show method should return the correct product", async () => {
        const product = await store.show("1");
        expect(product.id).toBe(1);
    });
});
describe("Product API Endpoints", () => {
    let token;
    beforeAll(async () => {
        const user = await userStore.create({
            firstname: 'John',
            lastname: 'Doe',
            password: 'password123'
        });
        token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
    });
    it("GET /products should return a list of products", async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    it("GET /products/:id should return the correct product", async () => {
        const response = await request.get("/products/1");
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
    it("POST /products should create a new product", async () => {
        const response = await request
            .post("/products")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New Product", price: 20 });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("New Product");
        expect(response.body.price).toBe(20);
    });
});
