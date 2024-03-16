import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import CartModel from "./CartModel.js";
import CustomerAddressModel from "./CustomerAddressModel.js";

// change to transaction
const CheckoutModel = db.define("checkout", {
    receiveByCustomer: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    deliveryMethod:{
        type:DataTypes.STRING, //pickup or delivery to customer
        allowNull: false
    },
    paymentMethod:{
        type:DataTypes.STRING, //cash or online
        allowNull: false
    },
    paymentStatus:{
        type:DataTypes.STRING, //pending or paid
        allowNull: false
    },
    deliveryStatus:{
        type:DataTypes.STRING, //pending, delivering, delivered
        allowNull: false
    },
}, {
    freezeTableName: true
})

CartModel.hasMany(CheckoutModel)
CustomerAddressModel.hasMany(CheckoutModel)


export default CheckoutModel
