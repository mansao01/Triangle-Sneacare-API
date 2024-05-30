import express from "express";
import {addOrder, deleteOrder} from "../controller/OrderController.js";

const router = express.Router();

router.post("/v1/addOrder", addOrder)
router.delete("/v1/deleteOrder/:orderId", deleteOrder)

export default router;
