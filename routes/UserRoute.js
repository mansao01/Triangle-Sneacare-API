import express from "express";

import {getProfile, loginUser, logoutUser, register, updateUser} from "../controller/UserController.js";
import {authMiddleware} from "../middleware/Auth.js";

const router = express.Router();

router.post("/v1/register", register)
router.post("/v1/login", loginUser)
router.post("/v1/logout", logoutUser)
router.get("/v1/profile", authMiddleware, getProfile)
router.patch("/v1/updateUser/:id", updateUser)


export default router;

