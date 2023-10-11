import { Sequelize, where } from "sequelize"
import { User } from "../models/users"
import { Event } from "../models/events"
import { EventData, EventServices } from "./events"

interface LoginData {
    email: string
    password: string
}

interface LoginResponse {
    isAuthenticated: boolean
    token: string
    statusCode?: number
}

interface UserData {
    firstName: string,
    lastName: string,
    birthDate: Date
    weddingAnniversary: Date
}

enum EventType {
    Birthday = "Birthday",
    Wedding = "WeddingAnniversary"
}

async function createEvent(data: EventData) {
    await EventServices.insertEvent(data)
}

export const AuthService = {
    async createUser(user: UserData) {
        let firstName: string = user.firstName;
        let lastName: string =  user.lastName;
        let birthDate: Date =  user.birthDate ?? new Date();
        let weddingAnniversary: Date = user.weddingAnniversary;

        try {
            const id = await User.create({ firstName, lastName, birthDate, weddingAnniversary })
            let userId: number = id.dataValues.userId
     
            if (userId != null && birthDate) {
                createEvent({
                    userId: userId,
                    eventType: EventType.Birthday,
                    eventDate: birthDate
                })
            }
            if (userId && weddingAnniversary) {
                createEvent({
                    userId: userId,
                    eventType: EventType.Wedding,
                    eventDate: birthDate
                })
            }
        } catch (e) {
            console.error(e)
            throw Error(`${e}`)
        }
    },

    async login(params: LoginData): Promise<LoginResponse> {
        const { email, password } = params
        const returnValue: LoginResponse = {
            isAuthenticated: false,
            token:''
        }
        try {
            if (email != null && password == 'TESTPASSWORD') {
                returnValue.isAuthenticated = true
                returnValue.token = "TEST TOKEN"
            } else {
                returnValue.isAuthenticated = false
                returnValue.token = ''
            }
            return returnValue
        } catch (e) {
            console.log(e)
            console.error(e)
            throw Error("Someting went wrong")
        }
    },
}
