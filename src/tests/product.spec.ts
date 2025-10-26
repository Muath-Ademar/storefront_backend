import { Product, ProductStore } from "../models/product";
import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import { User, UserStore } from "../models/user";

const userStore = new UserStore();

const request = supertest(app);

const store = new ProductStore();

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
    const product: Product = {
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
      let token: string;
  
      beforeAll(async () => {
          const user = await userStore.create({
              firstname: 'John',
              lastname: 'Doe',
              password: 'password123'
          });
          token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
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

