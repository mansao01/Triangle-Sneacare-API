import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const CartModel = db.define("cart", {
    id:{
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING, //active or checkout
    },
    totalPrice: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

CartModel.belongsTo(UserModel); // Define the association
UserModel.hasMany(CartModel);
export default CartModel
