import express from "express";
import {
    createCustomerAddress, deleteCustomerAddress,
    getCustomerAddresses,
    updateCustomerAddress
} from "../controller/CustomerAddressController.js";
import {authMiddleware} from "../middleware/Auth.js";

const router = express.Router();

router.post("/v1/createCustomerAddress", authMiddleware, createCustomerAddress)
router.get("/v1/getCustomerAddress", authMiddleware, getCustomerAddresses)
router.put("/v1/customerAddress/update", authMiddleware, updateCustomerAddress)
router.delete("/v1/customerAddress/delete", authMiddleware, deleteCustomerAddress)


export default router;
