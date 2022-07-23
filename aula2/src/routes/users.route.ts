import { Request, Response, NextFunction, Router } from "express";
import {StatusCodes} from'http-status-codes';
import DatabaseError from "../models/errors/database.error.model";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users);
})

//uid: id do usuario
usersRoute.get('/users/:uid', async (req: Request<{uid: string}>, res: Response, next: NextFunction) => {
    try {
        const uid = req.params.uid;
        const user = await userRepository.findById(uid);
        res.status(StatusCodes.OK).send(user);
    } catch (error) {
        next(error);
    }
    
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    const uid = await userRepository.create(newUser)   
    res.status(StatusCodes.CREATED).send(uid)
})

usersRoute.put('/users/:uid', async (req: Request<{uid: string}>, res: Response, next: NextFunction) => {
    const uid = req.params.uid
    const usermodify = req.body
    usermodify.uid = uid
    await userRepository.update(usermodify)
    res.status(StatusCodes.OK).send()
})

usersRoute.delete('/users/:uid', async (req: Request<{uid: string}>, res: Response, next: NextFunction)=>{
    const uid = req.params.uid
    await userRepository.remove(uid)
    res.sendStatus(StatusCodes.OK)
})

export default usersRoute;