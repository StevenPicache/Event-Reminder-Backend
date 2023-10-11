import { Event } from "../models/events"
import { fn, col, Op } from "sequelize";
import { AddEvent, Events } from "../types/events";
import moment from "moment";


enum EventSchema  {
    firstName = "firstName",
    lastName = "lastName",
    eventType = "eventType",
    eventDate = "eventDate",
}

type ErrorResponse = {
    code: number
    message: string
}

export const EventServices = {

    async getEvents(): Promise<Events[]> {
        const output: Events[] = []
        const dateFormat: string = 'YYYY-MM-DD'
        const startDate = new Date(moment().format(dateFormat)); 
        const endDate = new Date(moment().add(2, 'week').format(dateFormat)); 

        const res = await Event.findAll({
            attributes: [
                [fn('concat', col(EventSchema.firstName), ' ', col(EventSchema.lastName)), "name"],
                EventSchema.eventType,
                EventSchema.eventDate,
            ],
              
            where: {
                "eventDate": {
                    [Op.between]: [startDate, endDate], 
                }
            },
            order: [[EventSchema.eventDate, 'ASC']],
        });

        res.map((data) => output.push(data.toJSON()))
        return output
    },

    async addEvent(event: AddEvent): Promise<AddEvent | ErrorResponse> {
        const { firstName, lastName, eventType, eventDate } = event
        if (firstName && lastName && eventDate) {
            const res = await Event.create({ firstName, lastName, eventType, eventDate })
            return res.toJSON()
        } else {
            return {
                code: 400,
                message: "A required field is missing"
            } as ErrorResponse
        }
    },
}
