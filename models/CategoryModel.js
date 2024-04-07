import {DataTypes} from "sequelize";
import db from "../config/Database.js";

const CategoryModel = db.define("category", {
    itemType: {
        type: DataTypes.STRING, //helmet, shoes, bag, etc
        unique: true,
    }
},{
    freezeTableName: true
})

export default CategoryModel
