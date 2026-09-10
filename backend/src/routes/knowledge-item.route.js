import { Router } from "express";

import {
  createKnowledgeItem,
  getKnowledgeItems,
  getKnowledgeItem,
  updateKnowledgeItem,
  deleteKnowledgeItem,
} from "../controllers/knowledge-item.controller.js";

import {
  protectRoute,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", requireAdmin, createKnowledgeItem);

router.get("/", getKnowledgeItems);

router.get("/:id", getKnowledgeItem);

router.put("/:id", requireAdmin, updateKnowledgeItem);

router.delete("/:id", requireAdmin, deleteKnowledgeItem);

export default router;