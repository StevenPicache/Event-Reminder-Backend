import { Event } from '../models/events'
import { Op } from 'sequelize'
import moment from 'moment'

enum EventSchema {
    eventId = 'eventId',
    firstName = 'firstName',
    lastName = 'lastName',
    eventType = 'eventType',
    eventDate = 'eventDate',
}

type Events = {
    eventId?: number
    firstName: string
    lastName: string
    eventType: string
    eventDate: Date
}

type QueryResponse = {
    code: number
    message: string
}

async function queryEvents(props?: { weekRange: number | undefined }) {
    let endDate
    let output: Events[] = []
    const dateFormat: string = 'YYYY-MM-DD'

    if (props === undefined) {
        endDate = new Date(moment().endOf('year').format(dateFormat))
    } else {
        const { weekRange } = props
        endDate = new Date(
            moment()
                .add(weekRange ?? 2, 'week')
                .format(dateFormat),
        )
    }

    const startDate = new Date(moment().format(dateFormat))

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
    return output
}

async function queryMatchedSearchEvents(props: { search: string }) {
    const { search } = props
    const output: Events[] = []
    if (search.length === 0) return output
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
                EventSchema.firstName,
                EventSchema.lastName,
                EventSchema.eventType,
            ].reduce((value, field) => {
                value[EventSchema[field]] = {
                    [Op.or]: [
                        { [Op.iLike]: `${search}%` },
                        { [Op.iLike]: `%${search}%` },
                    ],
                }
                return value
            }, {} as Record<string, any>),
        },
        order: [[EventSchema.eventDate, 'ASC']],
    })

    res.map((data) => output.push(data.toJSON()))

    return output
}

async function queryMatchedSearchAndWeekEvents(props: {
    search: string
    weekRange: number
}) {
    const { search, weekRange } = props
    const output: Events[] = []
    let endDate

    const dateFormat: string = 'YYYY-MM-DD'

    const startDate = new Date(moment().format(dateFormat))
    let endOfYear = new Date(moment().endOf('year').format(dateFormat))

    endDate = new Date(
        moment()
            .add(weekRange ?? endOfYear, 'week')
            .format(dateFormat),
    )
    if (search.length === 0) return output
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
            [Op.or]: [
                EventSchema.firstName,
                EventSchema.lastName,
                EventSchema.eventType,
            ].reduce((value, field) => {
                value[EventSchema[field]] = {
                    [Op.or]: [
                        { [Op.iLike]: `${search}%` },
                        { [Op.iLike]: `%${search}%` },
                    ],
                }
                return value
            }, {} as Record<string, any>),
        },
        order: [[EventSchema.eventDate, 'ASC']],
    })
    res.map((data) => output.push(data.toJSON()))
    return output
}

export const EventServices = {
    async getEvents(props: {
        search?: string
        range?: string
    }): Promise<Events[]> {
        let output: Events[] = []

        const { search, range } = props

        if (search && range) {
            let weekRange = parseInt(range)
            output = await queryMatchedSearchAndWeekEvents({
                search,
                weekRange,
            })
        } else if (
            search !== undefined &&
            search.length !== 0 &&
            range?.length === 0
        ) {
            output = await queryMatchedSearchEvents({ search })
        } else {
            if (range) {
                let weekRange = parseInt(range)
                output = await queryEvents({ weekRange })
            } else {
                output = await queryEvents()
            }
        }
        return output
    },

    async addEvent(event: Events): Promise<Events | QueryResponse> {
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
