import express from "express";
import {
    addImageProduct,
    addService,
    deleteService,
    getServicesByCategory,
    getServices, updateService
} from "../controller/ServiceController.js";

const router = express.Router();

router.post("/v1/addService", addService)
router.post("/v1/addImageProduct", addImageProduct)
router.delete("/v1/deleteService/:id", deleteService)
router.get("/v1/servicesByCategory", getServicesByCategory)
router.get("/v1/services", getServices)
router.patch("/v1/updateService", updateService)


export default router;
