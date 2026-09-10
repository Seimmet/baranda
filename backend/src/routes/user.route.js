// import { Router } from "express";

// import {
//   createUser,
//   getUsers,
//   getUser,
//   updateUser,
//   deleteUser,
// } from "../controllers/user.controller.js";

// import {
//   protectRoute,
//   requireAdmin,
// } from "../middleware/auth.middleware.js";

// const router = Router();

// router.use(protectRoute);

// router.post("/", requireAdmin, createUser);
// router.get("/", getUsers);
// router.get("/:id", getUser);
// router.put("/:id", requireAdmin, updateUser);
// router.delete("/:id", requireAdmin, deleteUser);

// export default router;

import { Router } from "express";

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import {
  protectRoute,
  requirePrivilege,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post(
  "/",
  requirePrivilege("user.create"),
  createUser
);

router.get(
  "/",
  requirePrivilege("user.view"),
  getUsers
);

router.get(
  "/:id",
  requirePrivilege("user.view"),
  getUser
);

router.put(
  "/:id",
  requirePrivilege("user.update"),
  updateUser
);

router.delete(
  "/:id",
  requirePrivilege("user.delete"),
  deleteUser
);

export default router;