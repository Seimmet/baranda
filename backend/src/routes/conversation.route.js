import { Router } from "express";

import {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
  assignConversation,
  closeConversation,
  transferConversation,
} from "../controllers/conversation.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", createConversation);

router.get("/", getConversations);

router.get("/:id", getConversation);

router.put("/:id", updateConversation);

router.put("/:id/assign", assignConversation);

router.put("/:id/transfer", transferConversation);

router.put("/:id/close", closeConversation);

export default router;