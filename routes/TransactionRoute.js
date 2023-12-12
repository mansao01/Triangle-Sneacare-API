import express from "express";
import {addTransaction} from "../controller/TransactionController.js";

const router = express.Router();

router.post("/v1/addTransaction", addTransaction)

export default router;
