import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const  index = async (_req: Request, res: Response) =>{
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) =>{
    const product = await store.show(req.params.id)
}

const create = async (req: Request, res: Response) =>{
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        }
        const newProduct = await store.create(product)
        
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