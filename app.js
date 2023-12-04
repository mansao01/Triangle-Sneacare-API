import express from 'express';
import db from "./config/Database.js";
import userModel from "./models/UserModel.js";
import itemNameModel from "./models/ItemNameModel.js";
import roleModel from "./models/RoleModel.js";
import transactionModel from "./models/TransactionModel.js";
import cartModel from "./models/CartModel.js";

const app = express()

try {
    console.log("Database connected")
    await db.sync()
    userModel.sync()
    itemNameModel.sync()
    roleModel.sync()
    transactionModel.sync()
    cartModel.sync()
} catch (e) {
    console.log(e)
}

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server start in " + PORT + " Port")
})