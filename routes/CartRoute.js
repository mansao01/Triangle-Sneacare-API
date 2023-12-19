import express from "express";
const router = express.Router();
import {addToCart, getCart} from "../controller/CartController.js";

router.post("/v1/addToCart", addToCart)
router.get("/v1/getCart/:userId", getCart)


export default router;
