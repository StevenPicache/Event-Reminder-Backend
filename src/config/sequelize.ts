import { Sequelize } from "sequelize"
import { config } from './config'

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
      host: config.host,
      dialect: 'postgres'
    }
)

async function testConnection(){
    try {
        await sequelize.authenticate()
        console.log("Database connection has been established")
    } catch (e) {
        console.log(e)
    }
}

async function testSyncTable(){
    try {
        await sequelize.sync({alter: true})
        console.log("Models synced/altered successfully")
    } catch (e) {
        console.log(e)
    }
}

export function SequelizeInit() { 
    console.log("Initializing tables")
    testConnection()
    testSyncTable()
}


export default sequelize