import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const CartModel = db.define("cart", {
    status: {
        type: DataTypes.STRING, //active or checkout
    }
}, {
    freezeTableName: true
})

CartModel.belongsTo(UserModel);

export default CartModel
