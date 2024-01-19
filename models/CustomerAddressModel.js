import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";


const CustomerAddressModel = db.define("customerAddress", {
    title: {
        type: DataTypes.STRING
    },
    fullAddress: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.DOUBLE
    },
    longitude: {
        type: DataTypes.DOUBLE
    },
    notes: {
        type: DataTypes.STRING
    },
})

UserModel.belongsTo(CustomerAddressModel)

CustomerAddressModel.hasMany(UserModel, {
    foreignKey: "userId",
    onDelete: "cascade",
    onUpdate: "cascade"
})


export default CustomerAddressModel
