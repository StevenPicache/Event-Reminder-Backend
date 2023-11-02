import express, { Express, Request, Response, Router } from 'express';
import { EventServices } from '../services/events';

const router = express.Router()



/**
* Queries all the events within the next 2 weeks and return them in ASC order
*/
const getEvents = async (req: Request, res: Response) => {
    try {
        const result = await EventServices.getEvents()
        res.status(200).send(result);
    } catch (e: any) {
        /// TODO / TECH DEBT: Handle error properly without using type any
        console.error(e)
        res.status(500).send(e.toString())
    }
}


const addEvent = async (req: Request, res: Response) => {
    try {
        const result = await EventServices.addEvent(req.body)
        res.status(200).send(result);
    } catch (e: any) {
        /// TODO / TECH DEBT: Handle error properly without using type any
        console.error(e)
        res.status(500).send(e.toString())
    }

}


router.get('/v0/events', getEvents);
router.post('/v0/events', addEvent);
export default router