import express, { Express, Request, Response, Router } from 'express'
import { EventServices, SearchText } from '../services/events'

const router = express.Router()

const getEvents = async (req: Request, res: Response) => {
    try {
        const result = await EventServices.getEvents()
        res.status(200).send(result)
    } catch (e: any) {
        console.error(e)
        res.status(500).send(e.toString())
    }
}

const getSearchEvents = async (req: Request, res: Response) => {
    try {
        const searchText = req.params.search
        const result = await EventServices.searchEvents({ searchText })

        res.status(200).send(result)
    } catch (e: any) {
        console.error(e)
        res.status(500).send(e.toString())
    }
}

const getEventWithRange = async (req: Request, res: Response) => {
    try {
        const range = parseInt(req.params.range)
        const result = await EventServices.getEventsWeekRange({ range })
        res.status(200).send(result)
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
        const eventId = parseInt(req.params.id)
        const paramBody = req.body
        console.log(paramBody)
        const result = await EventServices.editEvent(paramBody)
        res.status(200).send(result)
    } catch (e: any) {
        console.error(e)
        res.status(500).send(e.toString())
    }
}

router.get('/v0/events', getEvents)
router.get('/v0/events/:search', getSearchEvents)
router.get('/v0/events/range/:range', getEventWithRange)
router.post('/v0/events', addEvent)
router.delete('/v0/events/delete/:id', deleteEvent)
router.put('/v0/events/edit/:id', editEvent)

export default router
