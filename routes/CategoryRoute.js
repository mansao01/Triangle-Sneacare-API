import express from "express";
import {addCategory, deleteCategory, getCategories} from "../controller/CategoryController.js";

const router = express.Router();

router.post("/v1/addCategory", addCategory)
router.get("/v1/categories", getCategories)
router.delete("/v1/deleteCategory/:id", deleteCategory)

export default router;
