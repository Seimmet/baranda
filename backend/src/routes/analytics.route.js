import { Router } from "express";

import {
  getOverviewAnalytics,
  getVisitorAnalytics,
  getConversationAnalytics,
  getConversionAnalytics,
  getSalesAnalytics,
} from "../controllers/analytics.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/overview", getOverviewAnalytics);

router.get("/visitors", getVisitorAnalytics);

router.get("/conversations", getConversationAnalytics);

router.get("/conversions", getConversionAnalytics);

router.get("/sales", getSalesAnalytics);

export default router;