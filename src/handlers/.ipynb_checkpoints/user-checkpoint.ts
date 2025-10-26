import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'


const store = new UserStore()

const  index = async (_req: Request, res: Response) =>{
        try {
        const authorizationHeader = _req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        if(token){
            jwt.verify(token, process.env.TOKEN_SECRET as string)
        }
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) =>{
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
    const user = await store.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response) =>{
    try {
        
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,           
            password: req.body.password,
        }
        const newUser = await store.create(user)
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string)
        res.status(201).json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const password = req.body.password
    try {
        const user = await store.authenticate(firstname, lastname, password)  
        const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string)
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const user_routes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.post('/users/authenticate', authenticate)
}

export default user_routes