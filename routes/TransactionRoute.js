import express from "express";
import {
    createTransaction,
    getTransactionById,
    getTransactionsByDeliveryStatus,
    updateDeliveryStatus
} from "../controller/TransactionController.js";

const router = express.Router();

router.post("/v1/createTransaction", createTransaction)
router.get("/v1/transactions/:id", getTransactionById)
router.patch("/v1/transaction", updateDeliveryStatus)
router.get("/v1/transaction/status", getTransactionsByDeliveryStatus)

export default router;
