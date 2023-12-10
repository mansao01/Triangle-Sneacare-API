import express from "express";
import {addItemType, deleteItemType} from "../controller/ItemTypeController.js";

const router = express.Router();

router.post("/v1/addItemType", addItemType)
router.delete("/v1/deleteItemType/:id", deleteItemType)

export default router;
