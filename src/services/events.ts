import { Event } from "../models/events"




interface Events {
    eventId: number,
    userId: string,
    eventType: string,
}

export interface EventData {
    userId?: number,
    eventType: String
    eventDate: Date,
}

export const EventServices = {
    /**
     * Document service
     * @param req 
     * @param res 
     */
    async getEventsService(): Promise<Events[]> {
        try {
            const output: Events[] = []
            const res = await Event.findAll()
            console.log(typeof res)
            console.log(res.map((data) => console.log(data)))
            res.map((data) => output.push(data.toJSON()))
            return output
        }
        catch (error) {
            throw new Error(`Error fetching data, ${error}`)
        }
    },

    async insertEvent(event: EventData): Promise<any> {
        try {
            const { userId, eventType, eventDate} = event
            const res = await Event.create({ userId, eventType, eventDate})
            console.log(res)
            return res
        } catch (e) {
            throw new Error(`Something went wrong${e}`)
        }
    },
}
