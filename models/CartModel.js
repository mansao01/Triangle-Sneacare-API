import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const CartModel = db.define("cart", {
    status: {
        type: DataTypes.STRING, //active or checkout
    },
    totalPrice: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

CartModel.belongsTo(UserModel)
UserModel.hasMany(CartModel)
export default CartModel
