import {DataTypes} from "sequelize";
import db from "../config/Database.js";

const ItemTypeModel = db.define("itemType", {
    itemType: {
        type: DataTypes.STRING, //helmet, shoes, bag, etc
        unique: true,
    }
},{
    freezeTableName: true
})

export default ItemTypeModel
