import { Event } from '../models/events'
import { fn, col, Op } from 'sequelize'
import { AddEvent, Events } from '../types/events'
import moment from 'moment'

enum EventSchema {
    firstName = 'firstName',
    lastName = 'lastName',
    eventType = 'eventType',
    eventDate = 'eventDate',
}

type ErrorResponse = {
    code: number
    message: string
}

export type SearchText = {
    searchText: string
}

export type WeekRange = {
    range: number
}

export const EventServices = {
    async getEvents(): Promise<Events[]> {
        let output: Events[] = []
        const dateFormat: string = 'YYYY-MM-DD'
        const startDate = new Date(moment().format(dateFormat))
        const endYear = new Date(moment().endOf('year').format(dateFormat))

        const res = await Event.findAll({
            attributes: [
                [
                    fn(
                        'concat',
                        col(EventSchema.firstName),
                        ' ',
                        col(EventSchema.lastName),
                    ),
                    'name',
                ],
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
    ): Promise<Events[] | ErrorResponse> {
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
                    [
                        fn(
                            'concat',
                            col(EventSchema.firstName),
                            ' ',
                            col(EventSchema.lastName),
                        ),
                        'name',
                    ],
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
            } as ErrorResponse
        }
        return output
    },

    async addEvent(event: AddEvent): Promise<AddEvent | ErrorResponse> {
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
            } as ErrorResponse
        }
    },

    async searchEvents(props: SearchText): Promise<Events[]> {
        const { searchText } = props
        const output: Events[] = []
        if (searchText.length === 0) return output
        /// Finds all records that matches with `searchText`. Name or event
        const res = await Event.findAll({
            attributes: [
                [
                    fn(
                        'concat',
                        col(EventSchema.firstName),
                        ' ',
                        col(EventSchema.lastName),
                    ),
                    'name',
                ],
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
}
