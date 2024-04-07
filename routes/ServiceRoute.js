import express from "express";
import {
    addImageProduct,
    addService,
    deleteService,
    getServicesByCategory,
    getServices
} from "../controller/ServiceController.js";

const router = express.Router();

router.post("/v1/addService", addService)
router.post("/v1/addImageProduct", addImageProduct)
router.delete("/v1/deleteService/:id", deleteService)
router.get("/v1/servicesByCategory", getServicesByCategory)
router.get("/v1/getServices", getServices)


export default router;
