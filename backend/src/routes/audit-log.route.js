import { Router } from "express";

import {
  getAuditLogs,
  getAuditLog,
} from "../controllers/audit-log.controller.js";

import {
  protectRoute,
  requireOwner,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);
router.use(requireOwner);

router.get("/", getAuditLogs);

router.get("/:id", getAuditLog);

export default router;