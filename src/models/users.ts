import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize"

const tableName = 'User'
export const User = sequelize.define(tableName, {
    userId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    birthDate: {
        type: DataTypes.DATEONLY
    },
    weddingAnniversary: {
        type: DataTypes.DATEONLY
    }
}, {
    freezeTableName: true
})

