import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import jwt from 'jsonwebtoken'

const store = new ProductStore()

const  index = async (_req: Request, res: Response) =>{
    try {
        const products = await store.index()
        res.json(products)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) =>{
    try {
        const product = await store.show(req.params.id)
        res.json(product)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) =>{
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        if(token){
            jwt.verify(token, process.env.TOKEN_SECRET as string)
        }
    
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        }
        const newProduct = await store.create(product)
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}

export default product_routes