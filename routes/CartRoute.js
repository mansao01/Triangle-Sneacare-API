import express from "express";
const router = express.Router();
import {addToCart} from "../controller/CartController.js";

router.post("/v1/addToCart", addToCart)

export default router;
