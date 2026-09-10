import { AuditLog } from "../models/audit-log.model.js";

export async function getAuditLogs(req, res) {
  try {
    const {
      resource,
      action,
      userId,
    } = req.query;

    const filter = {
      organizationId: req.user.organizationId,
    };

    if (resource) {
      filter.resource = resource;
    }

    if (action) {
      filter.action = action;
    }

    if (userId) {
      filter.userId = userId;
    }

    const logs = await AuditLog.find(filter)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(500);

    return res.status(200).json({
      logs,
    });
  } catch (error) {
    console.error(
      "Error in getAuditLogs controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}