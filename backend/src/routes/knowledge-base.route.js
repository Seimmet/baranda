import { Router } from "express";

import {
  createKnowledgeBase,
  getKnowledgeBases,
  getKnowledgeBase,
  updateKnowledgeBase,
  deleteKnowledgeBase,
} from "../controllers/knowledge-base.controller.js";

import {
  protectRoute,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", requireAdmin, createKnowledgeBase);

router.get("/", getKnowledgeBases);

router.get("/:id", getKnowledgeBase);

router.put("/:id", requireAdmin, updateKnowledgeBase);

router.delete("/:id", requireAdmin, deleteKnowledgeBase);

export default router;