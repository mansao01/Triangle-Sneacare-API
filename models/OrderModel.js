import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";
import ServiceModel from "./ServiceModel.js";
import CartModel from "./CartModel.js";

const OrderModel = db.define("order", {
    id:{
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    washStatus: {
        type: DataTypes.STRING, //pending, cleaning, drying, ironing, packing, done
        allowNull: false
    },
    imageUrl:{
        type:DataTypes.STRING
    }
}, {
    freezeTableName: true
})

OrderModel.belongsTo(UserModel)
OrderModel.belongsTo(ServiceModel)
OrderModel.belongsTo(CartModel)

UserModel.hasMany(OrderModel, {
    foreignKey: "userId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
ServiceModel.hasMany(OrderModel, {
    foreignKey: "serviceId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
CartModel.hasMany(OrderModel, {
    foreignKey: "cartId",
    onDelete: "cascade",
    onUpdate: "cascade"
})

OrderModel.belongsTo(UserModel)

export default OrderModel
