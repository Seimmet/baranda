import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";
import { Organization } from "../models/organization.model.js";
import { Role } from "../models/role.model.js";
import { Session } from "../models/session.model.js";

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user._id,
      organizationId: user.organizationId,
      roleId: user.roleId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
}

function generateRefreshToken(user, sessionId) {
  return jwt.sign(
    {
      id: user._id,
      sessionId,
    },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export async function register(req, res) {
  try {
    const { organizationName, name, email, password } = req.body;

    if (!organizationName || !name || !email || !password) {
      return res.status(400).json({
        error:
          "Organization name, name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        error: "An account with this email already exists",
      });
    }

    const ownerRole = await Role.findOne({
      code: "owner",
      isSystemRole: true,
    });

    if (!ownerRole) {
      return res.status(500).json({
        error: "Owner role has not been configured",
      });
    }

    const slug =
      organizationName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") +
      "-" +
      Date.now();

    const organization = await Organization.create({
      name: organizationName,
      slug,
      plan: "free",
    });

    const user = await User.create({
      organizationId: organization._id,
      roleId: ownerRole._id,
      name,
      email: normalizedEmail,
      password,
      isEmailVerified: false,
      isActive: true,
    });

    organization.ownerId = user._id;
    await organization.save();

    const session = await Session.create({
      userId: user._id,
      refreshTokenHash: "temporary",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const refreshToken = generateRefreshToken(user, session._id);

    session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await session.save();

    const accessToken = generateAccessToken(user);

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "Account created successfully",
      accessToken,
      refreshToken,
      user: userResponse,
      organization,
    });
  } catch (error) {
    console.error("Error in register controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: "Your account has been deactivated",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    user.lastLoginAt = new Date();
    user.lastSeenAt = new Date();

    await user.save();

    const session = await Session.create({
      userId: user._id,
      refreshTokenHash: "temporary",
      userAgent: req.headers["user-agent"] || null,
      ipAddress: req.ip || null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const refreshToken = generateRefreshToken(user, session._id);

    session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await session.save();

    const accessToken = generateAccessToken(user);

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: userResponse,
    });
  } catch (error) {
    console.error("Error in login controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: "Refresh token is required",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    const session = await Session.findById(decoded.sessionId).select(
      "+refreshTokenHash"
    );

    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      return res.status(401).json({
        error: "Invalid or expired refresh token",
      });
    }

    const tokenMatches = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash
    );

    if (!tokenMatches) {
      return res.status(401).json({
        error: "Invalid refresh token",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: "User account is unavailable",
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.error("Error in refreshToken controller:", error);

    return res.status(401).json({
      error: "Invalid or expired refresh token",
    });
  }
}

export async function logout(req, res) {
  try {
    const { sessionId } = req.body;

    if (sessionId) {
      await Session.findOneAndUpdate(
        {
          _id: sessionId,
          userId: req.user.id,
        },
        {
          revokedAt: new Date(),
        }
      );
    }

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("roleId");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error in getMe controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "New password must be at least 8 characters long",
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const matches = await user.comparePassword(currentPassword);

    if (!matches) {
      return res.status(401).json({
        error: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    await Session.updateMany(
      {
        userId: user._id,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      }
    );

    return res.status(200).json({
      message: "Password changed successfully. Please log in again.",
    });
  } catch (error) {
    console.error("Error in changePassword controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}