import { Privilege } from "../models/privilege.model.js";

export async function createPrivilege(req, res) {
  try {
    const {
      name,
      code,
      description,
      resource,
      action,
    } = req.body;

    if (!name || !code || !resource || !action) {
      return res.status(400).json({
        error:
          "Name, code, resource and action are required",
      });
    }

    const existing = await Privilege.findOne({
      code: code.toLowerCase(),
    });

    if (existing) {
      return res.status(400).json({
        error: "Privilege already exists",
      });
    }

    const privilege = await Privilege.create({
      name,
      code: code.toLowerCase(),
      description,
      resource,
      action,
    });

    return res.status(201).json({
      message: "Privilege created successfully",
      privilege,
    });
  } catch (error) {
    console.error(
      "Error in createPrivilege controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getPrivileges(req, res) {
  try {
    const privileges = await Privilege.find({
      isActive: true,
    }).sort({
      resource: 1,
      action: 1,
    });

    return res.status(200).json({
      privileges,
    });
  } catch (error) {
    console.error(
      "Error in getPrivileges controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getPrivilege(req, res) {
  try {
    const { id } = req.params;

    const privilege = await Privilege.findById(id);

    if (!privilege) {
      return res.status(404).json({
        error: "Privilege not found",
      });
    }

    return res.status(200).json({
      privilege,
    });
  } catch (error) {
    console.error(
      "Error in getPrivilege controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updatePrivilege(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      resource,
      action,
      isActive,
    } = req.body;

    const privilege = await Privilege.findById(id);

    if (!privilege) {
      return res.status(404).json({
        error: "Privilege not found",
      });
    }

    privilege.name = name || privilege.name;
    privilege.description =
      description !== undefined
        ? description
        : privilege.description;

    privilege.resource = resource || privilege.resource;
    privilege.action = action || privilege.action;

    if (isActive !== undefined) {
      privilege.isActive = isActive;
    }

    await privilege.save();

    return res.status(200).json({
      message: "Privilege updated successfully",
      privilege,
    });
  } catch (error) {
    console.error(
      "Error in updatePrivilege controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}