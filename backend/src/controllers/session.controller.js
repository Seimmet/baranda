import { Session } from "../models/session.model.js";

export async function getSessions(req, res) {
  try {
    const sessions = await Session.find({
      userId: req.user.id,
      revokedAt: null,
    })
      .select("-refreshTokenHash")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      sessions,
    });
  } catch (error) {
    console.error("Error in getSessions controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function revokeSession(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    session.revokedAt = new Date();

    await session.save();

    return res.status(200).json({
      message: "Session revoked successfully",
    });
  } catch (error) {
    console.error(
      "Error in revokeSession controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}