import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import CartModel from "./CartModel.js";
import CustomerAddressModel from "./CustomerAddressModel.js";
import UserModel from "./UserModel.js";

// change to transaction
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
        type:DataTypes.STRING, //pending, picking up, delivering, delivered
        allowNull: false
    },
    transactionDate:{
        type:DataTypes.DATE,
        allowNull: false
    },
}, {
    freezeTableName: true
})

CartModel.hasMany(TransactionModel)
CustomerAddressModel.hasMany(TransactionModel)

UserModel.hasMany(TransactionModel, {
    foreignKey: "userId",
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
