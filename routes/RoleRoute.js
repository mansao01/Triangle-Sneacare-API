import express from "express";
import {addRole, deleteRole} from "../controller/RoleController.js";
import {verifyToken} from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/v1/addRole", verifyToken,addRole)
router.delete("/v1/deleteRole/:id", deleteRole)

export default router;
