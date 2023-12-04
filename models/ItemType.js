import {DataTypes} from "sequelize";
import db from "../config/Database.js";

const ItemTypeModel = db.define("item_type", {
    itemType: {
        type: DataTypes.STRING, //helmet, shoes, bag, etc
    }
},{
    freezeTableName: true
})

export default ItemTypeModel