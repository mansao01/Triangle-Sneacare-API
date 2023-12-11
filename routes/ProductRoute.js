import express from "express";
import {addImageProduct, addProduct, deleteProduct, getProducts} from "../controller/ProductController.js";

const router = express.Router();

router.post("/v1/addProduct", addProduct)
router.post("/v1/addImageProduct", addImageProduct)
router.delete("/v1/deleteProduct/:id", deleteProduct)
router.get("/v1/getProducts", getProducts)


export default router;
