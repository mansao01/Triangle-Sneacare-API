import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";
import ProductModel from "./ProductModel.js";
import CartModel from "./CartModel.js";

// change to selectedProduct
const TransactionModel = db.define("transaction", {
    id:{
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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

TransactionModel.belongsTo(UserModel)
TransactionModel.belongsTo(ProductModel)
TransactionModel.belongsTo(CartModel)

UserModel.hasMany(TransactionModel, {
    foreignKey: "userId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
ProductModel.hasMany(TransactionModel, {
    foreignKey: "productId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
CartModel.hasMany(TransactionModel, {
    foreignKey: "cartId",
    onDelete: "cascade",
    onUpdate: "cascade"
})

TransactionModel.belongsTo(UserModel)

export default TransactionModel
