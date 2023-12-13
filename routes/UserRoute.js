import express from "express";

import {loginUser, logoutUser, register} from "../controller/UserController.js";

const router = express.Router();

router.post("/v1/register", register)
router.post("/v1/login", loginUser)
router.post("/v1/logout", logoutUser)

export default router;

