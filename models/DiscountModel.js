import {DataTypes} from "sequelize";
import db from "../config/Database.js";



const DiscountModel = db.define("discount", {
    percentage: { // 10% discount
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: { // 10k discount
        type: DataTypes.INTEGER,
        allowNull: false
    },
    minimumPurchase: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }

},{
    freezeTableName: true
})
