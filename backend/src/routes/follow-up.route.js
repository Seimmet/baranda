import { Router } from "express";

import {
  createFollowUp,
  getFollowUps,
  getFollowUp,
  updateFollowUp,
  deleteFollowUp,
  cancelFollowUp,
  retryFollowUp,
} from "../controllers/follow-up.controller.js";

import {
  protectRoute,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", requireAdmin, createFollowUp);

router.get("/", getFollowUps);

router.get("/:id", getFollowUp);

router.put("/:id", requireAdmin, updateFollowUp);

router.delete("/:id", requireAdmin, deleteFollowUp);

router.put("/:id/cancel", requireAdmin, cancelFollowUp);

router.post("/:id/retry", requireAdmin, retryFollowUp);

export default router;