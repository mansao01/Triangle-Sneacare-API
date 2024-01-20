import express from "express";
import {geoCode} from "../controller/LoacationController.js";

const router = express.Router();

router.get("/v1/geoCode", geoCode)

export default router;

