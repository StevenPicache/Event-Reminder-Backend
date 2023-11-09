import express, { Express, Request, Response, Router } from 'express';
import { EventServices, SearchText } from '../services/events';

const router = express.Router()


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


const getSearchEvents = async (req: Request, res: Response) => {
    try {
        const searchText = req.params.param
        const result = await EventServices.searchEvents({searchText})
        res.status(200).send(result);
    } catch (e: any) {
        /// TODO / TECH DEBT: Handle error properly without using type any
        console.error(e)
        res.status(500).send(e.toString())
    }
}


router.get('/v0/events', getEvents);
router.get('/v0/events/:param', getSearchEvents);
router.post('/v0/events', addEvent);

export default router