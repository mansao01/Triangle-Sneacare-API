import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import ItemTypeModel from "./ItemTypeModel.js";

const ProductModel = db.define("product", {
    productName: {
        type: DataTypes.STRING, // wash shoes deep clean, wash shoes quick clean, etc
        unique: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
})

ItemTypeModel.hasMany(ProductModel);
ProductModel.belongsTo(ItemTypeModel); // Define the association


export default ProductModel
