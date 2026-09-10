import { Router } from "express";

import {
  createPrivilege,
  getPrivileges,
  getPrivilege,
  updatePrivilege,
  deletePrivilege,
} from "../controllers/privilege.controller.js";

import {
  protectRoute,
  requireOwner,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getPrivileges);
router.get("/:id", getPrivilege);

router.post("/", requireOwner, createPrivilege);
router.put("/:id", requireOwner, updatePrivilege);
router.delete("/:id", requireOwner, deletePrivilege);

export default router;