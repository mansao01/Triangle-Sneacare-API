import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import RoleModel from "./RoleModel.js";

const UserModel = db.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    pictureUrl: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

RoleModel.hasMany(UserModel, {
    foreignKey: "roleId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
UserModel.belongsTo(RoleModel);

export default UserModel
