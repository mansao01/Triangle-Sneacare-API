import express from "express";
import {createTransaction, getTransactionById} from "../controller/TransactionController.js";

const router = express.Router();

router.post("/v1/createTransaction", createTransaction)
router.get("/v1/transactions/:id", getTransactionById)

export default router;
