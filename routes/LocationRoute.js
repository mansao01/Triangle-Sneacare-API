import express from "express";
import {autoCompleteAddress, geoCode} from "../controller/LoacationController.js";

const router = express.Router();

router.get("/v1/geoCode", geoCode)
router.get("/v1/autoCompleteAddress", autoCompleteAddress)

export default router;

