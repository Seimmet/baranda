import { Router } from "express";

import {
  sendMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", sendMessage);

router.get("/conversation/:conversationId", getMessages);

router.get("/:id", getMessage);

router.put("/:id", updateMessage);

router.delete("/:id", deleteMessage);

export default router;