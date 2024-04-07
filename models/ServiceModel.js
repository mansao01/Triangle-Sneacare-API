import {DataTypes} from "sequelize";
import db from "../config/Database.js";
import CategoryModel from "./CategoryModel.js";

const ServiceModel = db.define("service", {
    serviceName: {
        type: DataTypes.STRING, // wash shoes deep clean, wash shoes quick clean, etc
        unique: true,
    },
    serviceDescription: {
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

ServiceModel.belongsTo(CategoryModel); // Define the association
CategoryModel.hasMany(ServiceModel);


export default ServiceModel
