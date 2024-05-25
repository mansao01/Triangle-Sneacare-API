import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";


const CustomerAddressModel = db.define("customerAddress", {
    id:{
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING
    },
    receiverName: {
        type: DataTypes.STRING
    },
    phone: {
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

CustomerAddressModel.belongsTo(UserModel)

UserModel.hasMany(CustomerAddressModel)


export default CustomerAddressModel
