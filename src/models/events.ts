import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize";

const tableName = 'Event'
export const Event = sequelize.define(tableName, {
    eventId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    eventType: {
        type: DataTypes.STRING
    },
    eventDate: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true
})
