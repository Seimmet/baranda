import { Router } from "express";

import {
  trackEvent,
  getVisitorEvents,
} from "../controllers/visitor-event.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

// Public tracking endpoint.
// Authentication should instead be done using the store/site
// identification mechanism.
router.post("/track", trackEvent);

// Dashboard endpoint
router.get("/:visitorId", protectRoute, getVisitorEvents);

export default router;