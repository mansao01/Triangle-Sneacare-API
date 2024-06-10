import express from "express";
import {
    createTransaction, getTransactionsByMonth,
    getTransactionById,
    getTransactionsByDeliveryStatus,
    updateDeliveryStatus, getTransactionsByMonthAndPaymentStatus
} from "../controller/TransactionController.js";

const router = express.Router();

router.post("/v1/createTransaction", createTransaction)
router.get("/v1/transactions/:id", getTransactionById)
router.patch("/v1/transaction", updateDeliveryStatus)
router.get("/v1/transactionsByDeliveryStatus", getTransactionsByDeliveryStatus)
router.get("/v1/getTransactionsByMonth", getTransactionsByMonth)
router.get("/v1/getTransactionsByMonthAndPaymentStatus", getTransactionsByMonthAndPaymentStatus)

export default router;
