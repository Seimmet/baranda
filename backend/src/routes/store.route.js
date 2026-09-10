import { Router } from "express";

import {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
} from "../controllers/store.controller.js";

import {
  protectRoute,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", requireAdmin, createStore);
router.get("/", getStores);
router.get("/:id", getStore);
router.put("/:id", requireAdmin, updateStore);
router.delete("/:id", requireAdmin, deleteStore);

export default router;