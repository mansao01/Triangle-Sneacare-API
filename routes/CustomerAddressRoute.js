import express from "express";
import {createCustomerAddress} from "../controller/CustomerAddressController.js";
import {authMiddleware} from "../middleware/Auth.js";

const router = express.Router();

router.post("/v1/createCustomerAddress", authMiddleware, createCustomerAddress)

export default router;
