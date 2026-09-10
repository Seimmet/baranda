import { Router } from "express";

import {
  getOrganization,
  updateOrganization,
  getOrganizationStats,
} from "../controllers/organization.controller.js";

import {
  protectRoute,
  requireOwner,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getOrganization);
router.get("/stats", getOrganizationStats);

router.put("/", requireOwner, updateOrganization);

export default router;