import { Router } from "express";

import {
  createOffer,
  getOffers,
  getOffer,
  updateOffer,
  deleteOffer,
  activateOffer,
  deactivateOffer,
} from "../controllers/offer.controller.js";

import {
  protectRoute,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", requireAdmin, createOffer);

router.get("/", getOffers);

router.get("/:id", getOffer);

router.put("/:id", requireAdmin, updateOffer);

router.delete("/:id", requireAdmin, deleteOffer);

router.put("/:id/activate", requireAdmin, activateOffer);

router.put("/:id/deactivate", requireAdmin, deactivateOffer);

export default router;