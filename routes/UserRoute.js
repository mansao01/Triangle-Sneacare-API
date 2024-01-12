import express from "express";

import {
    getDrivers,
    getProfile,
    loginUser,
    logoutUser,
    register,
    registerDriver,
    updateUser, verifyEmail
} from "../controller/UserController.js";
import {authMiddleware} from "../middleware/Auth.js";

const router = express.Router();

router.post("/v1/register", register)
router.get("/v1/verify-email/:id", verifyEmail)
router.post("/v1/registerDriver", registerDriver)
router.post("/v1/login", loginUser)
router.post("/v1/logout", logoutUser)
router.get("/v1/profile", authMiddleware, getProfile)
router.get("/v1/drivers", getDrivers)
router.patch("/v1/updateUser", authMiddleware, updateUser)


export default router;

