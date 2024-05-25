import {Sequelize} from "sequelize";


const db = new Sequelize("triangle_db", "root", "21NOvembeR", {
    host: "34.101.190.93",
    dialect: "mysql"
})

export default db
