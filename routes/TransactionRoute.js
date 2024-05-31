import express from "express";
import {createTransaction} from "../controller/TransactionController.js";

const router = express.Router();

router.post("/v1/createTransaction", createTransaction)

export default router;
