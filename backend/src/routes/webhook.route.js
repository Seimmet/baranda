import { Router } from "express";

import {
  handleShopifyWebhook,
} from "../controllers/shopify-integration.controller.js";

import {
  verifyShopifyWebhook,
} from "../middleware/webhook.middleware.js";

const router = Router();

router.post(
  "/shopify",
  verifyShopifyWebhook,
  handleShopifyWebhook
);

export default router;