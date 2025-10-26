import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import jwt from 'jsonwebtoken'  

const store = new OrderStore()


const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization  
        const token = authorizationHeader?.split(' ')[1]    
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET as string)  
        }   
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const order: Order = {
            user_id: req.body.user_id,
            order_status: req.body.order_status,
            products: req.body.products || [],   
        }
        const newOrder = await store.create(order)
        res.status(201).json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const getCurrentOrderByUser = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization  
        const token = authorizationHeader?.split(' ')[1]
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET as string)  
        }   
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    const userId = req.params.userId
    try {
        const currentOrder: Order = await store.getCurrentOrderByUser(userId)
        res.json(currentOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }   
}

const order_routes = (app: express.Application) => {
    app.get('/orders/current/:userId', getCurrentOrderByUser)
    app.post('/orders', create)
}   

export default order_routes