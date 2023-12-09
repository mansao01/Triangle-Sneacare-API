import express from "express";
import {addItemType, deleteItemType} from "../controller/ItemTypeController.js";

const router = express.Router();

router.post("/v1/addItemType", addItemType)
router.post("/v1/deleteItemType", deleteItemType)

export default router;