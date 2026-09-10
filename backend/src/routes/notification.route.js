import { Router } from "express";

import {
  getNotifications,
  getNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getNotifications);

router.get("/:id", getNotification);

router.put("/:id/read", markNotificationAsRead);

router.put("/read-all", markAllNotificationsAsRead);

router.delete("/:id", deleteNotification);

export default router;