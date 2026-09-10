import { Role } from "../models/role.model.js";
import { Privilege } from "../models/privilege.model.js";

export async function createRole(req, res) {
  try {
    const { name, code, description, privileges = [] } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        error: "Name and code are required",
      });
    }

    const organizationId = req.user.organizationId;

    const existingRole = await Role.findOne({
      organizationId,
      code: code.toLowerCase(),
    });

    if (existingRole) {
      return res.status(400).json({
        error: "Role with this code already exists",
      });
    }

    const validPrivileges = await Privilege.find({
      _id: { $in: privileges },
      isActive: true,
    });

    const role = await Role.create({
      organizationId,
      name,
      code: code.toLowerCase(),
      description,
      privileges: validPrivileges.map((item) => item._id),
      isSystemRole: false,
    });

    await role.populate("privileges");

    return res.status(201).json({
      message: "Role created successfully",
      role,
    });
  } catch (error) {
    console.error("Error in createRole controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getRoles(req, res) {
  try {
    const roles = await Role.find({
      $or: [
        { organizationId: req.user.organizationId },
        { isSystemRole: true },
      ],
    })
      .populate("privileges")
      .sort({ name: 1 });

    return res.status(200).json({
      roles,
    });
  } catch (error) {
    console.error("Error in getRoles controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getRole(req, res) {
  try {
    const { id } = req.params;

    const role = await Role.findOne({
      _id: id,
      $or: [
        { organizationId: req.user.organizationId },
        { isSystemRole: true },
      ],
    }).populate("privileges");

    if (!role) {
      return res.status(404).json({
        error: "Role not found",
      });
    }

    return res.status(200).json({
      role,
    });
  } catch (error) {
    console.error("Error in getRole controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { name, description, privileges } = req.body;

    const role = await Role.findOne({
      _id: id,
      organizationId: req.user.organizationId,
      isSystemRole: false,
    });

    if (!role) {
      return res.status(404).json({
        error: "Custom role not found",
      });
    }

    role.name = name || role.name;
    role.description =
      description !== undefined
        ? description
        : role.description;

    if (privileges) {
      const validPrivileges = await Privilege.find({
        _id: { $in: privileges },
        isActive: true,
      });

      role.privileges = validPrivileges.map(
        (item) => item._id
      );
    }

    await role.save();
    await role.populate("privileges");

    return res.status(200).json({
      message: "Role updated successfully",
      role,
    });
  } catch (error) {
    console.error("Error in updateRole controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteRole(req, res) {
  try {
    const { id } = req.params;

    const role = await Role.findOne({
      _id: id,
      organizationId: req.user.organizationId,
      isSystemRole: false,
    });

    if (!role) {
      return res.status(404).json({
        error: "Custom role not found",
      });
    }

    await role.deleteOne();

    return res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteRole controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}