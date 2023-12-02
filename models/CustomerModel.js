import {DataTypes} from "sequelize";
import db from "../config/Database.js";

const CustomerModel = db.define("customer", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default CustomerModel