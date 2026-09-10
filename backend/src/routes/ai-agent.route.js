import { Router } from "express";

import {
  createAIAgent,
  getAIAgents,
  getAIAgent,
  updateAIAgent,
  deleteAIAgent,
  activateAIAgent,
  deactivateAIAgent,
} from "../controllers/ai-agent.controller.js";

import {
  protectRoute,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", requireAdmin, createAIAgent);

router.get("/", getAIAgents);

router.get("/:id", getAIAgent);

router.put("/:id", requireAdmin, updateAIAgent);

router.delete("/:id", requireAdmin, deleteAIAgent);

router.put("/:id/activate", requireAdmin, activateAIAgent);

router.put("/:id/deactivate", requireAdmin, deactivateAIAgent);

export default router;