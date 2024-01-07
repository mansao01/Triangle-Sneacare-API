import express from "express";
import {addRole, deleteRole} from "../controller/RoleController.js";
import {verifyToken} from "../middleware/VerifyToken.js";
import {updateUser} from "../controller/UserController.js";

const router = express.Router();

router.post("/v1/addRole",addRole)
router.delete("/v1/deleteRole/:id",verifyToken, deleteRole)
router.patch("/v1/updateUser/:id", updateUser)

export default router;
