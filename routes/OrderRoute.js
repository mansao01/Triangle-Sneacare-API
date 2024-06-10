import express from "express";
import {addOrder, deleteOrder, updateWashStatus} from "../controller/OrderController.js";

const router = express.Router();

router.post("/v1/addOrder", addOrder)
router.patch("/v1/updateWashStatus", updateWashStatus)
router.delete("/v1/deleteOrder/:orderId", deleteOrder)

export default router;
