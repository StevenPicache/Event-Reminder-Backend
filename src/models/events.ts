import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize";
import { User } from "./users";

const tableName = 'Event'
export const Event = sequelize.define(tableName, {
    eventId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    userId: {
        type: DataTypes.INTEGER
    },
    eventType: {
        allowNull: false,
        type: DataTypes.STRING
    },
    eventDate: {
        type: DataTypes.DATEONLY
    }
}, {
    freezeTableName: true
})

Event.belongsTo(User, {foreignKey: 'userId'})