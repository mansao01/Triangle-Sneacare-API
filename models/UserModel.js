import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import RoleModel from "./RoleModel.js";

const UserModel = db.define("user", {
    id:{
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
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
    phone: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    pictureUrl: {
        type: DataTypes.STRING
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    totalTransaction: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    otp:{
        type:DataTypes.STRING
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
