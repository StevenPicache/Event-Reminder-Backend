import express, { Express, Request, Response, Router } from 'express';
import { AuthService } from '../services/auth';
import { error } from 'console';

const router = express.Router();
const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.login(req.body)
        if (result.isAuthenticated == false) {
            res.status(401).send(result)
        } else {
            res.status(200).send(result)
        }
    } catch (e) {
        console.log(error)
        res.status(500).send('Something went wrong')
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.createUser(req.body)
        res.status(200).send("User successfully created")
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong')
    }
}

const getUserId = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.getUserId(req.body)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong')
    }
}



router.get('/v0/user', getUserId)
router.post('/v0/login', loginUser)
router.post('/v0/create', createUser)

export default router
