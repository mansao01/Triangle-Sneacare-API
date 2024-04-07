import express from "express";
import {addOrder} from "../controller/OrderController.js";

const router = express.Router();

router.post("/v1/addOrder", addOrder)

export default router;
