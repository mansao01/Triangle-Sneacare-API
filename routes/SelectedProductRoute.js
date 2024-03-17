import express from "express";
import {addSelectedProduct} from "../controller/SelectedProductController.js";

const router = express.Router();

router.post("/v1/addSelectedProduct", addSelectedProduct)

export default router;
