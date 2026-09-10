import { Router } from "express";

import {
  getConversions,
  getConversion,
  getConversionStats,
} from "../controllers/conversion.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getConversions);

router.get("/stats", getConversionStats);

router.get("/:id", getConversion);

export default router;