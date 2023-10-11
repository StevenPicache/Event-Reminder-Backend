import express, { Express, Request, Response, Router } from 'express';
import { EventServices } from '../services/events';

const router = express.Router()

/**
 * Document routes
 * @param req 
 * @param res 
 */
const getEvents = async (req: Request, res: Response) => {
    const result = await EventServices.getEventsService()
    res.send(result);
}

const insertEvent = async (req: Request, res: Response) => {
    const result = await EventServices.insertEvent(req.body)
    res.send(result);
}


router.get('/events', getEvents);
router.post('/events', insertEvent);
export default router