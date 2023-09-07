const { Sequelize } = require('sequelize');

// const db = new Sequelize('postgres://localhost:3000/yourDatabaseNameHere')

// var Album = db.define('Events', {
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     eventType: {
//         type: Sequelize.ARRAY(Sequelize.STRING),
//         allowNull: false
//     },
//     date: {
//         type: Sequelize.date,
//         allowNull: false,
//     }
// });



// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: parseInt(process.env.DB_PORT || "5432")
// });

// const connectToDB = async () => {
//     try {
//         await pool.connect();
//     } catch (err) {
//         console.log(err);
//     }
// };
// connectToDB();
