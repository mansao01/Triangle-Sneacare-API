import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";


const AddressModel = db.define("address", {
    title: {
        type: DataTypes.STRING
    },
    detail: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.DOUBLE
    },
    longitude: {
        type: DataTypes.DOUBLE
    },
})

UserModel.belongsTo(AddressModel)

AddressModel.hasMany(UserModel, {
    foreignKey: "userId",
    onDelete: "cascade",
    onUpdate: "cascade"
})


export default AddressModel
