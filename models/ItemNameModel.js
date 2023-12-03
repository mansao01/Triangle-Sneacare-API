import {DataTypes} from "sequelize";
import db from "../config/Database.js";

const ItemNameModel = db.define("item_name", {
    itemName: {
        type: DataTypes.STRING,
        unique: true,
    }
},{
    freezeTableName: true
})