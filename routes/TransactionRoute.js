import express from "express";
import {
    createTransaction, getTransactionsByMonth,
    getTransactionByUserId,
    getTransactionsByDeliveryStatus,
    updateDeliveryStatus, getTransactionsByMonthAndPaymentStatus, getAllTransactions, sendFinishCleaningEmailToCustomer
} from "../controller/TransactionController.js";

const router = express.Router();

router.post("/v1/createTransaction", createTransaction)
router.post("/v1/sendFinishCleaningEmailToCustomer", sendFinishCleaningEmailToCustomer)
router.get("/v1/transactions/:id", getTransactionByUserId)
router.patch("/v1/transaction", updateDeliveryStatus)
router.get("/v1/transactionsByDeliveryStatus", getTransactionsByDeliveryStatus)
router.get("/v1/getTransactionsByMonth", getTransactionsByMonth)
router.get("/v1/getAllTransactions", getAllTransactions)
router.get("/v1/getTransactionsByMonthAndPaymentStatus", getTransactionsByMonthAndPaymentStatus)

export default router;
