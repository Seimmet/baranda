import { Router } from "express";

import {
  createEngagementRule,
  getEngagementRules,
  getEngagementRule,
  updateEngagementRule,
  deleteEngagementRule,
  activateEngagementRule,
  deactivateEngagementRule,
} from "../controllers/engagement-rule.controller.js";

import {
  protectRoute,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", requireAdmin, createEngagementRule);

router.get("/", getEngagementRules);

router.get("/:id", getEngagementRule);

router.put("/:id", requireAdmin, updateEngagementRule);

router.delete("/:id", requireAdmin, deleteEngagementRule);

router.put("/:id/activate", requireAdmin, activateEngagementRule);

router.put("/:id/deactivate", requireAdmin, deactivateEngagementRule);

export default router;