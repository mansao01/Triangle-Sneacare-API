import express from "express";
import {
    createCustomerAddress, deleteCustomerAddress,
    getCustomerAddresses, getDetailCustomerAddress,
    updateCustomerAddress
} from "../controller/CustomerAddressController.js";
import {authMiddleware} from "../middleware/Auth.js";

const router = express.Router();

router.post("/v1/createCustomerAddress", authMiddleware, createCustomerAddress)
router.get("/v1/getCustomerAddress", authMiddleware, getCustomerAddresses)
router.get("/v1/customerAddress/details", authMiddleware, getDetailCustomerAddress)
router.put("/v1/customerAddress/update", authMiddleware, updateCustomerAddress)
router.delete("/v1/customerAddress/delete", authMiddleware, deleteCustomerAddress)


export default router;
