import express from 'express';
import db from "./config/Database.js";
import RoleRoute from "./routes/RoleRoute.js";
import bodyParser from "body-parser";
import UserRoute from "./routes/UserRoute.js";
import ItemTypeRoute from "./routes/ItemTypeRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";

const app = express()

try {
    await db.authenticate()
    console.log("Database connected")
    await db.sync()
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

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server start in " + PORT + " Port")
})
