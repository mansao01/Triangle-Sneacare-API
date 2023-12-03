import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import RoleModel from "./RoleModel.js";

const UserModel = db.define("admin", {
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
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

UserModel.hasMany(RoleModel, {
    foreignKey: "roleId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
RoleModel.belongsTo(UserModel)

export default UserModel