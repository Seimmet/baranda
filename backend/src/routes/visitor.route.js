import { Router } from "express";

import {
  getVisitors,
  getVisitor,
  getVisitorActivity,
  getVisitorConversations,
} from "../controllers/visitor.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getVisitors);
router.get("/:id", getVisitor);
router.get("/:id/activity", getVisitorActivity);
router.get("/:id/conversations", getVisitorConversations);

export default router;