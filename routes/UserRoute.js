import express from "express";

import {
    getDrivers,
    getProfile,
    loginUser,
    logoutUser,
    register,
    registerDriver, resetPassword,
    sendResetPasswordRequest,
    updateUser, verifyEmail,
    getUserDetailById, addSuccessTransactionCount, refreshAccessToken, verifyOTP
} from "../controller/UserController.js";
import {authMiddleware} from "../middleware/Auth.js";
import {signInLimiter} from "../middleware/RateLimiter.js";

const router = express.Router();

router.post("/v1/register", register)
router.post("/v1/registerDriver", registerDriver)
router.post("/v1/login", signInLimiter, loginUser)
router.post("/v1/token", refreshAccessToken)

router.patch("/v1/updateUser", authMiddleware, updateUser)
router.post("/v1/logout", logoutUser)
router.get("/v1/profile", authMiddleware, getProfile)
router.get("/v1/profile/detail", authMiddleware, getUserDetailById)
router.post("/v1/addTransactionCount", authMiddleware, addSuccessTransactionCount)


router.get("/v1/verify-email/:id", verifyEmail)

router.get("/v1/drivers", getDrivers)

router.post("/v1/sendResetPassword", sendResetPasswordRequest)
router.post("/v1/verifyOtp", verifyOTP)
router.patch("/v1/resetPassword", resetPassword)


export default router;

