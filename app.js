import express from 'express';
import db from "./config/Database.js";
import RoleRoute from "./routes/RoleRoute.js";
import bodyParser from "body-parser";
import UserRoute from "./routes/UserRoute.js";

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

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server start in " + PORT + " Port")
})