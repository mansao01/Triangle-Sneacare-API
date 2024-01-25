import express from "express";
import {createCustomerAddress, getCustomerAddresses} from "../controller/CustomerAddressController.js";
import {authMiddleware} from "../middleware/Auth.js";

const router = express.Router();

router.post("/v1/createCustomerAddress", authMiddleware, createCustomerAddress)
router.get("/v1/getCustomerAddress", authMiddleware, getCustomerAddresses)

export default router;
