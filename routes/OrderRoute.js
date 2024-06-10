import express from "express";
import {
    addOrder,
    createOfflineOrder,
    deleteOrder,
    getOfflineOrders,
    updateWashStatus
} from "../controller/OrderController.js";

const router = express.Router();

router.post("/v1/addOrder", addOrder)
router.post("/v1/createOfflineOrder", createOfflineOrder)
router.get("/v1/getOfflineOrder", getOfflineOrders)
router.patch("/v1/updateWashStatus", updateWashStatus)
router.delete("/v1/deleteOrder/:orderId", deleteOrder)

export default router;
