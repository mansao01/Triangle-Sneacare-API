import express from "express";
import {addToCheckout} from "../controller/CheckoutController.js";

const router = express.Router();

router.post("/v1/addToCheckout", addToCheckout)

export default router;
