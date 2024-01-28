import express from "express";
import {
    autoCompleteAddress,
    geoCodeWithAddress,
    geoCodeWithPlaceId
} from "../controller/LoacationController.js";

const router = express.Router();

router.get("/v1/geoCodeWithAddress", geoCodeWithAddress)
router.get("/v1/geoCodeWithPlaceId", geoCodeWithPlaceId)
router.get("/v1/autoCompleteAddress", autoCompleteAddress)

export default router;

