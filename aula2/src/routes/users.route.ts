import { Request, Response, NextFunction, Router } from "express";
import {StatusCodes} from'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users);
})

//uid: id do usuario
usersRoute.get('/users/:uid', (req: Request<{uid: string}>, res: Response, next: NextFunction) => {
    const uid = req.params.uid;
    res.status(200).send({uid});
})

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    console.log(req.body);    
    res.status(StatusCodes.CREATED).send(newUser)
})

usersRoute.put('/users/:uid', (req: Request<{uid: string}>, res: Response, next: NextFunction) => {
    const uid = req.params.uid
    const usermodify = req.body
    usermodify.uid = uid
    res.status(StatusCodes.OK).send({usermodify})
})

usersRoute.delete('/users/:uid', (req: Request<{uid: string}>, res: Response, next: NextFunction)=>{
    const uid = req.params.uid
    res.sendStatus(StatusCodes.OK)
})

export default usersRoute;