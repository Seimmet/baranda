import { Router } from "express";

import {
  getDashboardOverview,
  getDashboardActivity,
  getDashboardVisitors,
  getDashboardConversions,
} from "../controllers/dashboard.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getDashboardOverview);

router.get("/activity", getDashboardActivity);

router.get("/visitors", getDashboardVisitors);

router.get("/conversions", getDashboardConversions);

export default router;