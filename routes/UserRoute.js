import express from "express";

import {register} from "../controller/UserController.js";

const router = express.Router();

router.post("/v1/register", register)


export default router;

