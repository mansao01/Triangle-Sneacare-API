import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";
import ProductModel from "./ProductModel.js";
import CartModel from "./CartModel.js";

// change to selectedProduct
const SelectedProductModel = db.define("selectedProduct", {
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

SelectedProductModel.belongsTo(UserModel)
SelectedProductModel.belongsTo(ProductModel)
SelectedProductModel.belongsTo(CartModel)

UserModel.hasMany(SelectedProductModel, {
    foreignKey: "userId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
ProductModel.hasMany(SelectedProductModel, {
    foreignKey: "productId",
    onDelete: "cascade",
    onUpdate: "cascade"
})
CartModel.hasMany(SelectedProductModel, {
    foreignKey: "cartId",
    onDelete: "cascade",
    onUpdate: "cascade"
})

SelectedProductModel.belongsTo(UserModel)

export default SelectedProductModel
