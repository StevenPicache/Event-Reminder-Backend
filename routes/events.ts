import express, { Express, Request, Response, Router } from 'express';

const router = express.Router()


const eventServices = require('../services/events')

/**
 * Document routes
 * @param req 
 * @param res 
 */
const testEventRead = async (req: Request, res: Response) => {
    console.log("Reached test event")
    const result = await eventServices.testEventServicesFunction()
    console.log(result);
    res.send(result);
}

const testEventWrite = async (req: Request, res: Response) => {
    console.log("Reached test event")
    res.send('Reached test event');
}

const testEventDelete = async (req: Request, res: Response) => {
    console.log("Reached test event")
    res.send('Reached test event');
}

const testEventCreate = async (req: Request, res: Response) => {
    console.log("Reached test event")
    res.send('Reached test event');
}


router.get('/testEventRead', testEventRead);
router.put('/testEventWrite', testEventWrite);
router.delete('/testEventDelete', testEventDelete);
router.post('/testEventCreate', testEventCreate);

module.exports = router;