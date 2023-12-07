import {DataTypes} from "sequelize";
import db from "../config/Database.js";


const RoleModel = db.define("role", {
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
})

export default RoleModel