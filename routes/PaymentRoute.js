import express from "express";
import {cancelTransaction, charge, getTransactionPaymentStatus} from "../controller/PaymentController.js";



const router = express.Router();


router.post("/v1/transaction/charge", charge)
router.get("/v1/transaction/status", getTransactionPaymentStatus)
router.post("/v1/transaction/cancel", cancelTransaction)


export default router;
