import express from "express";
import {addRole, deleteRole} from "../controller/RoleController.js";

const router = express.Router();

router.post("/v1/addRole", addRole)
router.post("/v1/deleteRole", deleteRole)

export default router;