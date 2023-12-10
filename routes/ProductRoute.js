import express from "express";
import {addProduct, deleteProduct, getProducts} from "../controller/ProductController.js";

const router = express.Router();

router.post("/v1/addProduct", addProduct)
router.delete("/v1/deleteProduct/:id", deleteProduct)
router.get("/v1/getProducts", getProducts)


export default router;
