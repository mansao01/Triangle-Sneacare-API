import {DataTypes} from "sequelize";
import db from "../config/Database.js";

const CategoryModel = db.define("category", {
    id:{
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    itemType: {
        type: DataTypes.STRING, //helmet, shoes, bag, etc
        unique: true,
    }
},{
    freezeTableName: true
})

export default CategoryModel
