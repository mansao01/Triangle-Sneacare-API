import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import itemType from "./ItemType.js";

const ItemNameModel = db.define("item_name", {
    productName: {
        type: DataTypes.STRING, // wash shoes deep clean, wash shoes quick clean, etc
        unique: true,
    }
},{
    freezeTableName: true
})

itemType.hasMany(ItemNameModel);

export default ItemNameModel