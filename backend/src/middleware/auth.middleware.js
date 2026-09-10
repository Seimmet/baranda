import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Role from "../models/role.model.js";

import { ENV } from "../config/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token;

    // 1. Check Authorization header
    const authorization = req.headers.authorization;

    if (authorization?.startsWith("Bearer ")) {
      token = authorization.split(" ")[1];
    }

    // 2. Check HTTP-only cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!ENV.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured",
      });
    }

    // 3. Verify JWT
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    // 4. Retrieve current user
    const user = await User.findById(decoded.userId)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    // 5. Check account status
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated",
      });
    }

    // 6. Load current role and privileges
    let privileges = [];

    if (user.role) {
      const role = await Role.findOne({
        $or: [
          {
            organizationId: user.organizationId,
            key: user.role,
          },
          {
            organizationId: null,
            key: user.role,
            isSystem: true,
          },
        ],
      }).populate("privileges");

      if (role?.privileges) {
        privileges = role.privileges.map((privilege) => {
          if (typeof privilege === "string") {
            return privilege;
          }

          return privilege.key;
        });
      }
    }

    // 7. Attach authenticated user to request
    req.user = {
      id: user._id,
      organizationId: user.organizationId,
      name: user.name,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
      isActive: user.isActive,
      privileges,
    };

    next();
  } catch (error) {
    console.error("Authentication Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Authentication token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    next(error);
  }
};

/*
 * Require one or more roles.
 *
 * Example:
 * router.post("/", requireRole("owner", "admin"), controller);
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};

/*
 * Require a specific privilege.
 *
 * Example:
 * router.put(
 *   "/:id",
 *   requirePrivilege("user.update"),
 *   updateUser
 * );
 */
export const requirePrivilege = (...requiredPrivileges) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Owner has full organization access.
    if (req.user.role === "owner") {
      return next();
    }

    const userPrivileges = req.user.privileges || [];

    const hasPrivilege = requiredPrivileges.every((privilege) =>
      userPrivileges.includes(privilege)
    );

    if (!hasPrivilege) {
      return res.status(403).json({
        success: false,
        message: "You do not have the required privilege",
      });
    }

    next();
  };
};

// Convenience role middleware
export const requireOwner = requireRole("owner");

export const requireAdmin = requireRole(
  "owner",
  "admin"
);

export const requireAgent = requireRole(
  "owner",
  "admin",
  "agent"
);