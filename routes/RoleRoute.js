import express from "express";
import {addRole, deleteRole} from "../controller/RoleController.js";

const router = express.Router();

router.post("/v1/addRole", addRole)
router.delete("/v1/deleteRole/:id", deleteRole)

export default router;
