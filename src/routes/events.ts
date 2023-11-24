import express, { Request, Response } from 'express'
import { EventServices } from '../services/events'

const router = express.Router()

const getEvents = async (req: Request, res: Response) => {
    try {
        if (req.query) {
            const result = await EventServices.getEvents(req.query)
            res.status(200).send(result)
        }
    } catch (e: any) {
        console.error(e)
        res.status(500).send(e.toString())
    }
}

const addEvent = async (req: Request, res: Response) => {
    try {
        const result = await EventServices.addEvent(req.body)
        res.status(200).send(result)
    } catch (e: any) {
        console.error(e)
        res.status(500).send(e.toString())
    }
}

const deleteEvent = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id)
        const result = await EventServices.deleteEvent({ eventId })
        res.status(200).send(result)
    } catch (e: any) {
        console.error(e)
        res.status(500).send(e.toString())
    }
}

const editEvent = async (req: Request, res: Response) => {
    try {
        const paramBody = req.body
        const result = await EventServices.editEvent(paramBody)
        res.status(200).send(result)
    } catch (e: any) {
        console.error(e)
        res.status(500).send(e.toString())
    }
}

router.get('/v0/events', getEvents)
router.post('/v0/events', addEvent)
router.delete('/v0/events/delete/:id', deleteEvent)
router.put('/v0/events/edit/:id', editEvent)

export default router
