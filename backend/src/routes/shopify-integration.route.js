import { Router } from "express";

import {
  connectShopify,
  getShopifyIntegration,
  updateShopifyIntegration,
  disconnectShopify,
  syncShopifyStore,
} from "../controllers/shopify-integration.controller.js";

import {
  protectRoute,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/connect", requireAdmin, connectShopify);

router.get("/:storeId", getShopifyIntegration);

router.put("/:storeId", requireAdmin, updateShopifyIntegration);

router.post("/:storeId/sync", requireAdmin, syncShopifyStore);

router.delete("/:storeId", requireAdmin, disconnectShopify);

export default router;