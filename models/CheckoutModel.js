import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import CartModel from "./CartModel.js";

const CheckoutModel = db.define("checkout", {
    receiveByCustomer: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    deliveryMethod:{
        type:DataTypes.STRING, //pickup or delivery to customer
        allowNull: false
    }
}, {
    freezeTableName: true
})

CartModel.hasMany(CheckoutModel)

export default CheckoutModel