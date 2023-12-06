import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";
import ProductModel from "./ProductModel.js";
import CartModel from "./CartModel.js";

const TransactionModel = db.define("transaction", {
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    washStatus: {
        type: DataTypes.STRING, //cleaning, drying, ironing, packing, done
        allowNull: false
    }
}, {
    freezeTableName: true
})

UserModel.hasMany(TransactionModel, {
    foreignKey: "orderedBy",
    onDelete: "cascade",
    onUpdate: "cascade"
})
ProductModel.hasMany(TransactionModel, {
    foreignKey: "itemNameId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
CartModel.hasMany(TransactionModel, {
    foreignKey: "cartId",
    onDelete: "cascade",
    onUpdate: "cascade"
})


export default TransactionModel