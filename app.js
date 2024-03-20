import express from 'express';
import db from "./config/Database.js";
import dotEnv from 'dotenv';
import RoleRoute from "./routes/RoleRoute.js";
import bodyParser from "body-parser";
import UserRoute from "./routes/UserRoute.js";
import ItemTypeRoute from "./routes/ItemTypeRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import TransactionRoute from "./routes/SelectedProductRoute.js";
import CartRoute from "./routes/CartRoute.js";
import CheckoutRoute from "./routes/TransactionRoute.js";
import LocationRoute from "./routes/LocationRoute.js";
import CustomerAddressRoute from "./routes/CustomerAddressRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";

dotEnv.config()
const app = express()

try {
    await db.authenticate()
    console.log("Database connected")
    // await db.sync()
} catch (e) {
    console.log(e)
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(RoleRoute)
app.use(UserRoute)
app.use(ItemTypeRoute)
app.use(ProductRoute)
app.use(TransactionRoute)
app.use(CartRoute)
app.use(CheckoutRoute)
app.use(LocationRoute)
app.use(CustomerAddressRoute)
app.use(PaymentRoute)

app.get("/", (req, res) => {
    res.status(201).json({msg: "welcome to triangle sneacare api"})
})
app.get("/v1/test", (req, res) => {
    res.status(201).json({msg: "welcome to triangle sneacare api"})
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("Server start in " + PORT + " Port")
})
