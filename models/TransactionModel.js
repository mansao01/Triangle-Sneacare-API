import {DataTypes} from "sequelize";
import db from "../config/Database.js";

const TransactionModel = db.define("transaction", {

}, {
    freezeTableName: true
})