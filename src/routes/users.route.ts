import { Request, Response, NextFunction, Router } from "express";

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [{userName: 'G.M.R'}]
    res.status(200).send(users);
})

export default usersRoute;