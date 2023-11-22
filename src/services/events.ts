import { Event } from '../models/events'
import { fn, col, Op } from 'sequelize'
import moment from 'moment'

// export type Events = {
//     id: number
//     name: string
//     eventType: string
//     eventDate: Date
// }

export type AddEvent = {
    firstName: string
    lastName: string
    eventType: string
    eventDate: Date
}

export type SearchText = {
    searchText: string
}

export type WeekRange = {
    range: number
}

enum EventSchema {
    eventId = 'eventId',
    firstName = 'firstName',
    lastName = 'lastName',
    eventType = 'eventType',
    eventDate = 'eventDate',
}

type QueryResponse = {
    code: number
    message: string
}

type Events = {
    eventId?: number
    firstName: string
    lastName: string
    eventType: string
    eventDate: Date
}

export const EventServices = {
    async getEvents(): Promise<Events[]> {
        let output: Events[] = []
        const dateFormat: string = 'YYYY-MM-DD'
        const startDate = new Date(moment().format(dateFormat))
        const endYear = new Date(moment().endOf('year').format(dateFormat))

        const res = await Event.findAll({
            attributes: [
                EventSchema.eventId,
                EventSchema.firstName,
                EventSchema.lastName,
                EventSchema.eventType,
                EventSchema.eventDate,
            ],

            where: {
                [EventSchema.eventDate]: {
                    [Op.between]: [startDate, endYear],
                },
            },
            order: [[EventSchema.eventDate, 'ASC']],
        })

        res.map((data) => output.push(data.toJSON()))
        return output
    },

    async getEventsWeekRange(
        props: WeekRange,
    ): Promise<Events[] | QueryResponse> {
        const { range } = props
        const defaultRange = 2
        const output: Events[] = []
        const dateFormat: string = 'YYYY-MM-DD'
        const startDate = new Date(moment().format(dateFormat))
        const endDate = new Date(
            moment()
                .add(range ?? defaultRange, 'week')
                .format(dateFormat),
        )

        if (range !== null) {
            const res = await Event.findAll({
                attributes: [
                    EventSchema.eventId,
                    EventSchema.firstName,
                    EventSchema.lastName,
                    EventSchema.eventType,
                    EventSchema.eventDate,
                ],

                where: {
                    [EventSchema.eventDate]: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                order: [[EventSchema.eventDate, 'ASC']],
            })
            res.map((data) => output.push(data.toJSON()))
        } else {
            return {
                code: 400,
                message: 'A required field is missing',
            } as QueryResponse
        }
        return output
    },

    async searchEvents(props: SearchText): Promise<Events[]> {
        const { searchText } = props
        const output: Events[] = []
        if (searchText.length === 0) return output
        /// Finds all records that matches with `searchText`. Name or event
        const res = await Event.findAll({
            attributes: [
                EventSchema.eventId,
                EventSchema.firstName,
                EventSchema.lastName,
                EventSchema.eventType,
                EventSchema.eventDate,
            ],

            where: {
                [Op.or]: [
                    {
                        [EventSchema.firstName]: {
                            [Op.or]: [
                                {
                                    [Op.iLike]: `${searchText}%`,
                                },
                                {
                                    [Op.iLike]: `%${searchText}%`,
                                },
                            ],
                        },
                    },
                    {
                        [EventSchema.lastName]: {
                            [Op.or]: [
                                {
                                    [Op.iLike]: `${searchText}%`,
                                },
                                {
                                    [Op.iLike]: `%${searchText}%`,
                                },
                            ],
                        },
                    },
                    {
                        [EventSchema.lastName]: {
                            [Op.or]: [
                                {
                                    [Op.iLike]: `${searchText}%`,
                                },
                                {
                                    [Op.iLike]: `%${searchText}%`,
                                },
                            ],
                        },
                    },
                    {
                        [EventSchema.eventType]: {
                            [Op.or]: [
                                {
                                    [Op.iLike]: `${searchText}%`,
                                },
                                {
                                    [Op.iLike]: `%${searchText}%`,
                                },
                            ],
                        },
                    },
                ],
            },
            order: [[EventSchema.eventDate, 'ASC']],
        })

        res.map((data) => output.push(data.toJSON()))

        return output
    },

    async addEvent(event: AddEvent): Promise<AddEvent | QueryResponse> {
        const { firstName, lastName, eventType, eventDate } = event
        if (firstName && lastName && eventType && eventDate) {
            const res = await Event.create({
                firstName,
                lastName,
                eventType,
                eventDate,
            })
            return res.toJSON()
        } else {
            return {
                code: 400,
                message: 'A required field is missing',
            } as QueryResponse
        }
    },

    async deleteEvent(props: {
        eventId: number
    }): Promise<void | QueryResponse> {
        const { eventId } = props
        if (eventId) {
            const res = await Event.destroy({
                where: {
                    eventId: eventId,
                },
            })

            if (res >= 0) {
                return {
                    code: 200,
                    message:
                        res === 0
                            ? `EventId ${eventId} was not found. ${res} row(s) were`
                            : `Successfully deleted ${res} row(s)`,
                } as QueryResponse
            }
        } else {
            return {
                code: 400,
                message: 'A required field is missing',
            } as QueryResponse
        }
    },

    async editEvent(props: Events): Promise<void | QueryResponse> {
        const { eventId, firstName, lastName, eventType, eventDate } = props
        if (
            eventId !== undefined &&
            firstName !== undefined &&
            lastName !== undefined &&
            eventType !== undefined &&
            eventDate !== undefined
        ) {
            const res = await Event.update(
                { eventId, ...props },
                {
                    where: {
                        eventId: eventId,
                    },
                },
            )
            return {
                code: 200,
                message: `${res} record was successfully updated`,
            } as QueryResponse
        } else {
            return {
                code: 400,
                message: 'A required field is missing',
            } as QueryResponse
        }
    },
}
