import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import itemType from "./ItemType.js";

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

itemType.hasMany(ProductModel);

export default ProductModel