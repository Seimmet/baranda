import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";

export async function createUser(req, res) {
  try {
    const { name, email, password, imageUrl, roleId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long",
      });
    }

    const organizationId = req.user.organizationId;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({
      organizationId,
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }

    let selectedRole;

    if (roleId) {
      selectedRole = await Role.findOne({
        _id: roleId,
        $or: [
          { organizationId },
          { isSystemRole: true },
        ],
      });

      if (!selectedRole) {
        return res.status(400).json({
          error: "Invalid role",
        });
      }
    } else {
      selectedRole = await Role.findOne({
        code: "agent",
        isSystemRole: true,
      });
    }

    if (!selectedRole) {
      return res.status(500).json({
        error: "Default agent role has not been configured",
      });
    }

    const user = await User.create({
      organizationId,
      roleId: selectedRole._id,
      name,
      email: normalizedEmail,
      password,
      imageUrl,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error in createUser controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find({
      organizationId: req.user.organizationId,
    })
      .select("-password")
      .populate("roleId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Error in getUsers controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
      organizationId: req.user.organizationId,
    })
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
    console.error("Error in getUser controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, imageUrl, roleId, isActive } = req.body;

    const user = await User.findOne({
      _id: id,
      organizationId: req.user.organizationId,
    }).populate("roleId");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.roleId?.code === "owner") {
      if (roleId && roleId !== user.roleId._id.toString()) {
        return res.status(403).json({
          error: "The organization owner role cannot be changed",
        });
      }

      if (isActive === false) {
        return res.status(403).json({
          error: "The organization owner cannot be deactivated",
        });
      }
    }

    user.name = name || user.name;

    user.email = email
      ? email.toLowerCase()
      : user.email;

    user.imageUrl =
      imageUrl !== undefined
        ? imageUrl
        : user.imageUrl;

    if (roleId && roleId !== user.roleId?._id.toString()) {
      const role = await Role.findOne({
        _id: roleId,
        $or: [
          { organizationId: req.user.organizationId },
          { isSystemRole: true },
        ],
      });

      if (!role) {
        return res.status(400).json({
          error: "Invalid role",
        });
      }

      user.roleId = role._id;
    }

    if (isActive !== undefined) {
      user.isActive = isActive;
    }

    await user.save();

    const response = user.toObject();
    delete response.password;

    return res.status(200).json({
      message: "User updated successfully",
      user: response,
    });
  } catch (error) {
    console.error("Error in updateUser controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
      organizationId: req.user.organizationId,
    }).populate("roleId");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.roleId?.code === "owner") {
      return res.status(403).json({
        error: "The organization owner cannot be deactivated",
      });
    }

    user.isActive = false;

    await user.save();

    return res.status(200).json({
      message: "User deactivated successfully",
    });
  } catch (error) {
    console.error("Error in deleteUser controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}