import { Router } from "express";

import {
  register,
  login,
  refreshToken,
  logout,
  getCurrentUser,
  changePassword,
} from "../controllers/auth.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// Protected routes
router.use(protectRoute);

router.post("/logout", logout);
router.get("/me", getCurrentUser);
router.put("/change-password", changePassword);

export default router;