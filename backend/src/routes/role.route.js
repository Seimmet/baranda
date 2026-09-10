import { Router } from "express";

import {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
  assignPrivileges,
} from "../controllers/role.controller.js";

import {
  protectRoute,
  requireOwner,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getRoles);
router.get("/:id", getRole);

router.post("/", requireOwner, createRole);
router.put("/:id", requireOwner, updateRole);
router.delete("/:id", requireOwner, deleteRole);

router.put("/:id/privileges", requireOwner, assignPrivileges);

export default router;